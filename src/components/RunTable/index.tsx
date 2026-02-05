import React from 'react';
import { Activity, RunIds, sortDateFunc, formatPace, formatRunTime } from '@/utils/utils';
import { MapPin } from 'lucide-react';

interface IRunTableProperties {
  runs: Activity[];
  locateActivity: (_runIds: RunIds) => void;
  setActivity: (_runs: Activity[]) => void;
  runIndex: number;
  setRunIndex: (_ndex: number) => void;
}

const RunTable = ({
  runs,
  locateActivity,
  setActivity,
  runIndex,
  setRunIndex,
}: IRunTableProperties) => {
  const handleClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, run: Activity, index: number) => {
    e.stopPropagation(); // prevent card click
    if (runIndex === index) {
      setRunIndex(-1);
      locateActivity([]);
      return;
    }
    setRunIndex(index);
    locateActivity([run.run_id]);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold mr-4 dark:text-white">Recent Activities</h2>
      </div>

      <div className="overflow-x-auto bg-neutral-50 dark:bg-[#0f1110] rounded-lg shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
              <th className="p-4 font-medium w-1/4">Name / Location</th>
              <th className="p-4 font-medium text-right">Type</th>
              <th className="p-4 font-medium text-right">KM</th>
              <th className="p-4 font-medium text-right hidden sm:table-cell">Elev</th>
              <th className="p-4 font-medium text-right">Pace</th>
              <th className="p-4 font-medium text-right hidden sm:table-cell">BPM</th>
              <th className="p-4 font-medium text-right">Time</th>
              <th className="p-4 font-medium text-right text-gray-500 w-48">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-200 text-sm">
            {runs.sort(sortDateFunc).map((run, index) => {
              const distance = (run.distance / 1000).toFixed(2);
              const pace = formatPace(run.average_speed);
              const date = run.start_date_local.replace('T', ' ');
              return (
                <tr
                  key={run.run_id}
                  onClick={(e) => handleClick(e, run, index)}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer ${runIndex === index ? 'bg-gray-100 dark:bg-gray-800/50' : ''
                    }`}
                >
                  <td className="p-4">
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-[#4ade80] transition-colors">
                      {run.name}
                    </div>
                    {run.location_country && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <MapPin size={10} className="mr-1" /> {run.location_city || 'Unknown'}, {run.location_country}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold 
                      ${run.type === 'Run'
                          ? 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10'
                          : run.type === 'Ride' || run.type === 'VirtualRide'
                            ? 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/10'
                            : 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10'
                        }`}
                    >
                      {run.type}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-base font-bold text-amber-600 dark:text-[#4ade80]">
                    {distance}
                  </td>
                  <td className="p-4 text-right font-mono hidden sm:table-cell text-gray-400">
                    {Math.round(run.elevation_gain || 0)}
                  </td>
                  <td className="p-4 text-right font-mono text-gray-600 dark:text-yellow-200/80">
                    {pace}
                  </td>
                  <td className="p-4 text-right font-mono hidden sm:table-cell text-red-500 dark:text-red-300/80">
                    {Math.round(run.average_heartrate || 0)}
                  </td>
                  <td className="p-4 text-right font-mono text-gray-500 dark:text-gray-300">
                    {formatRunTime(run.moving_time)}
                  </td>
                  <td className="p-4 text-right font-mono text-gray-400 dark:text-gray-500 text-xs">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {runs.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No activities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RunTable;
