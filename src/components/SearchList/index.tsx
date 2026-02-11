import React from 'react';
import { Activity, formatRunTime, sortDateFunc } from '@/utils/utils';
import { useSearch } from '@/hooks/SearchContext';

interface ISearchListProps {
    runs: Activity[];
    locateActivity: (runIds: number[]) => void;
}

const SearchList = ({ runs, locateActivity }: ISearchListProps) => {
    const { setSearchOpen, setSearchValue } = useSearch();

    const handleSelect = (run: Activity) => {
        locateActivity([run.run_id]);
        setSearchOpen(false);
        // Optional: Keep search value or clear it? Keeping it helps user see what they searched.
        // setSearchValue(''); 
    };

    if (runs.length === 0) {
        return (
            <div className="absolute top-20 right-4 w-72 max-h-96 overflow-y-auto bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                No results found
            </div>
        )
    }

    return (
        <div className="absolute top-20 right-4 w-80 max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-50">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {runs.sort(sortDateFunc).map((run) => (
                    <li
                        key={run.run_id}
                        onClick={() => handleSelect(run)}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                    {run.name}
                                </h4>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {run.start_date_local.replace('T', ' ')}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
                                    {(run.distance / 1000).toFixed(2)} km
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {formatRunTime(run.moving_time)}
                                </div>
                            </div>
                        </div>
                        {run.location_country && (
                            <div className="mt-1 text-xs text-gray-400 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {run.location_country}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchList;
