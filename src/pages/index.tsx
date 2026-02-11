import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from '@/components/Layout';
import RunMap from '@/components/RunMap';
import RunTable from '@/components/RunTable';
import TypeFilter from '@/components/TypeFilter';
import SummaryCards from '@/components/SummaryCards';
import SearchList from '@/components/SearchList';
import useActivities from '@/hooks/useActivities';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import {
  Activity,
  IViewState,
  filterAndSortRuns,
  filterYearRuns,
  filterTypeRuns,
  geoJsonForRuns,
  getBoundsForGeoData,
  scrollToMap,
  sortDateFunc,
  titleForShow,
  RunIds,
  filterRunBySearch,
} from '@/utils/utils';
import { useSearch } from '@/hooks/SearchContext';

const Index = () => {
  const { siteTitle } = useSiteMetadata();
  const { activities, thisYear, years } = useActivities();
  const { searchValue, searchOpen } = useSearch();
  const [year, setYear] = useState(thisYear);
  const [runIndex, setRunIndex] = useState(-1);
  const [selectedType, setSelectedType] = useState('All');

  // Filter runs based on year and type
  const [runs, setActivity] = useState(
    filterAndSortRuns(activities, year, filterYearRuns, sortDateFunc, null, null)
  );

  const [title, setTitle] = useState('');
  const [geoData, setGeoData] = useState(geoJsonForRuns(runs));
  // for auto zoom
  const bounds = getBoundsForGeoData(geoData);
  const [intervalId, setIntervalId] = useState<number>();

  const [viewState, setViewState] = useState<IViewState>({
    ...bounds,
  });

  // Re-filter when year or type changes
  useEffect(() => {
    let filtered = activities;

    // 1. Filter by Year (if not 'Total', though TimeFilter is usually year specific)
    if (year !== 'Total') {
      filtered = filtered.filter((run) => filterYearRuns(run, year));
    }

    // 2. Filter by Type
    if (selectedType !== 'All') {
      filtered = filtered.filter((run) => filterTypeRuns(run, selectedType));
    }

    // 3. Filter by Search
    if (searchValue) {
      filtered = filtered.filter((run) => filterRunBySearch(run, searchValue));
    }

    // 4. Sort
    filtered = filtered.sort(sortDateFunc);

    setActivity(filtered);
    setGeoData(geoJsonForRuns(filtered));
    setRunIndex(-1);

    if (year !== 'Total') {
      setTitle(`${year} ${selectedType === 'All' ? 'Heatmap' : selectedType + ' Heatmap'}`);
    } else {
      setTitle(`Total Heatmap`);
    }

  }, [year, selectedType, activities, searchValue]);

  // Handle map bounds update when runs change
  useEffect(() => {
    // Only auto-zoom if we have runs and bounds
    if (runs.length > 0) {
      const newBounds = getBoundsForGeoData(geoJsonForRuns(runs));
      if (newBounds && (viewState.zoom ?? 0) > 3) {
        setViewState(prev => ({
          ...prev,
          ...newBounds
        }));
      }
    }
  }, [runs]);

  const changeYear = (y: string) => {
    setYear(y);
    scrollToMap();
  };

  const changeType = (type: string) => {
    setSelectedType(type);
    scrollToMap();
  };

  const locateActivity = (runIds: RunIds) => {
    const ids = new Set(runIds);

    const selectedRuns = !runIds.length
      ? runs
      : runs.filter((r: any) => ids.has(r.run_id));

    if (!selectedRuns.length) {
      return;
    }

    const lastRun = selectedRuns.sort(sortDateFunc)[0];

    if (!lastRun) {
      return;
    }
    setGeoData(geoJsonForRuns(selectedRuns));
    setTitle(titleForShow(lastRun));
    clearInterval(intervalId);
    scrollToMap();
  };

  useEffect(() => {
    setViewState({
      ...bounds,
    });
  }, [geoData]);

  // Animation for map data loading
  useEffect(() => {
    const runsNum = runs.length;
    // maybe change 20 ?
    const sliceNum = runsNum >= 10 ? runsNum / 10 : 1;
    let i = sliceNum;
    const id = setInterval(() => {
      if (i >= runsNum) {
        clearInterval(id);
      }

      const tempRuns = runs.slice(0, i);
      setGeoData(geoJsonForRuns(tempRuns));
      i += sliceNum;
    }, 10);
    setIntervalId(id);
  }, [runs]);

  return (
    <Layout>
      <div className="w-full lg:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Search Results Dropdown - Positioned relative to the content container but fixed/absolute at top right effectively */}
        {searchOpen && searchValue && (
          <div className="absolute top-0 right-0 mt-4 mr-4 z-50">
            <SearchList runs={runs} locateActivity={scrollToMap} />
          </div>
        )}

        <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 pb-20 w-full">
          {/* 2. Map Module */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <h2 className="text-3xl font-extrabold bg-black dark:bg-white text-white dark:text-black px-4 py-1 inline-block transform -skew-x-6">
                Workouts Map
              </h2>
            </div>
            <div className="relative w-full h-[400px] md:h-[500px] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 group">
              <RunMap
                title={title}
                viewState={viewState}
                geoData={geoData}
                setViewState={setViewState}
                changeYear={changeYear}
                thisYear={year}
              />
            </div>
          </div>

          {/* 3. Type Selection Module */}
          <TypeFilter
            selectedType={selectedType}
            onSelectType={changeType}
          />

          {/* 4. Category Summary Module */}
          <SummaryCards activities={runs} />

          {/* 5. Detail Module */}
          <RunTable
            runs={runs}
            locateActivity={locateActivity}
            setActivity={setActivity}
            runIndex={runIndex}
            setRunIndex={setRunIndex}
          />

          {/* Footer info */}
          <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 text-center text-gray-400 text-sm">
            <p>Displaying workouts for Rollin</p>
            <p className="mt-2 text-xs text-gray-300 dark:text-gray-500">Last synced: Just now</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
