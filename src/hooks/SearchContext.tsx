import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchValue: string;
    setSearchValue: (value: string) => void;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <SearchContext.Provider
            value={{ searchValue, setSearchValue, searchOpen, setSearchOpen }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
