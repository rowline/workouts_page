import React from 'react';

interface TypeFilterProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

const TYPES = [
    { label: 'Running', value: 'Run' },
    { label: 'Swimming', value: 'Swim' },
    { label: 'Cycling', value: 'Ride' },
    // { label: 'Hiking', value: 'Hike' },
    // { label: 'Indoor Cycling', value: 'VirtualRide' },
];

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onSelectType }) => {
    return (
        <div className="mb-6 flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
            <div className="flex space-x-12">
                {TYPES.map((type) => (
                    <button
                        key={type.value}
                        onClick={() => onSelectType(selectedType === type.value ? 'All' : type.value)}
                        className={`flex items-center text-2xl font-bold transition-all duration-200 ${selectedType === type.value
                                ? 'text-black dark:text-white scale-105'
                                : 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400'
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
            <div className="text-sm text-gray-400 font-mono hidden sm:block">FILTER BY TYPE</div>
        </div>
    );
};

export default TypeFilter;
