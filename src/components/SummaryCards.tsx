import React, { useEffect, useState } from 'react';
import { Activity } from '@/utils/utils';

interface SummaryCardsProps {
    activities: Activity[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ activities }) => {
    const [stats, setStats] = useState({
        run: { count: 0, distance: 0 },
        swim: { count: 0, distance: 0 },
        ride: { count: 0, distance: 0 },
    });

    useEffect(() => {
        const newStats = {
            run: { count: 0, distance: 0 },
            swim: { count: 0, distance: 0 },
            ride: { count: 0, distance: 0 },
        };

        activities.forEach((activity) => {
            const distance = activity.distance / 1000; // Convert to KM
            if (activity.type === 'Run') {
                newStats.run.count++;
                newStats.run.distance += distance;
            } else if (activity.type === 'Swim') {
                newStats.swim.count++;
                newStats.swim.distance += distance;
            } else if (activity.type === 'Ride' || activity.type === 'VirtualRide') {
                newStats.ride.count++;
                newStats.ride.distance += distance;
            }
        });

        setStats(newStats);
    }, [activities]);

    // Helper to format distance efficiently
    const formatDistance = (dist: number) => Math.round(dist);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {/* Run Card */}
            <div className={`bg-neutral-50 dark:bg-[#0f1110] p-6 rounded-none flex items-center justify-between border-l-4 border-amber-400 dark:border-[#4ade80]`}>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-amber-500 dark:text-[#4ade80]">{stats.run.count}</span>
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Runs</span>
                </div>
                <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-extrabold text-amber-500 dark:text-[#4ade80]">{formatDistance(stats.run.distance)}</span>
                    <span className="text-xs uppercase font-bold text-amber-500 dark:text-[#4ade80] tracking-wider">KM</span>
                </div>
            </div>

            {/* Swim Card */}
            <div className={`bg-neutral-50 dark:bg-[#0f1110] p-6 rounded-none flex items-center justify-between border-l-4 border-blue-400 dark:border-[#4ade80]`}>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-blue-500 dark:text-[#4ade80]">{stats.swim.count}</span>
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Swims</span>
                </div>
                <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-extrabold text-blue-500 dark:text-[#4ade80]">{formatDistance(stats.swim.distance)}</span>
                    <span className="text-xs uppercase font-bold text-blue-500 dark:text-[#4ade80] tracking-wider">KM</span>
                </div>
            </div>

            {/* Ride Card */}
            <div className={`bg-neutral-50 dark:bg-[#0f1110] p-6 rounded-none flex items-center justify-between border-l-4 border-purple-400 dark:border-[#4ade80]`}>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-purple-500 dark:text-[#4ade80]">{stats.ride.count}</span>
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Rides</span>
                </div>
                <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-extrabold text-purple-500 dark:text-[#4ade80]">{formatDistance(stats.ride.distance)}</span>
                    <span className="text-xs uppercase font-bold text-purple-500 dark:text-[#4ade80] tracking-wider">KM</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
