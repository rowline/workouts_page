import { Link } from 'react-router-dom';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import useTheme from '@/hooks/useTheme';
import { useSearch } from '@/hooks/SearchContext';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const { navLinks } = useSiteMetadata();
  const { theme, toggleTheme } = useTheme();
  const { searchOpen, setSearchOpen, searchValue, setSearchValue } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    // Outer wrapper for sticky positioning and background color (full width)
    <div className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">

      {/* 
            Main Menu Container being the constrained element directly.
            Classes mimic the blog's body constraints:
            max-w-7xl mx-auto (centering)
            px-6 sm:px-14 md:px-24 lg:px-32 (responsive horizontal padding)
            py-1 (vertical padding - REDUCED from py-6 to match home page height ~53px)
            
            This ensures the content inside (Rollin link, nav) aligns with the blog's text column.
        */}
      <div className="main-menu flex items-center justify-between max-w-7xl mx-auto px-6 py-1 sm:px-14 md:px-24 md:justify-start lg:px-32 space-x-3">

        <div className="flex flex-1 items-center justify-between">
          <nav className="flex space-x-3">
            <a href="/" className="text-2xl font-extrabold text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors">
              Rollin
            </a>
          </nav>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-5 md:ml-12 h-12">
            {/* Sports Link */}
            <a href="/sports/" className="flex items-center text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 ml-5">
              <span className="mr-1">
                <span className="relative block icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4">
                    <path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                  </svg>
                </span>
              </span>
              <p className="text-base font-medium">Sports</p>
            </a>

            {/* Race Log Link */}
            <a href="/racelog/" className="flex items-center text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 ml-5">
              <span className="mr-1">
                <span className="relative block icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4">
                    <path fill="currentColor" d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-2.8-5.6-5.6-11.2-9.8-16.8l-50.6 58.8s-81.4-103.6-87.1-110.6C133.1 243.8 112 273.2 112 306.8C112 375.4 162.6 416 225.7 416z"></path>
                  </svg>
                </span>
              </span>
              <p className="text-base font-medium">Race Log</p>
            </a>

            {/* Work Link */}
            <a href="/work/" className="flex items-center text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 ml-5">
              <span className="mr-1">
                <span className="relative block icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-4 w-4">
                    <path fill="currentColor" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
                  </svg>
                </span>
              </span>
              <p className="text-base font-medium">Work</p>
            </a>

            {/* Search Input */}
            {searchOpen && (
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Name, Date, Loc..."
                className="w-48 border-b border-gray-300 dark:border-gray-600 bg-transparent px-2 py-1 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 transition-all"
                onBlur={() => {
                  if (!searchValue) setSearchOpen(false);
                }}
              />
            )}

            {/* Search Button */}
            <button
              id="search-button"
              aria-label="Search"
              className="text-base hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <span className="relative block icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="svg-inline--fa fa-search fa-w-16 h-5 w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128-128 128z"
                  ></path>
                </svg>
              </span>
            </button>

            {/* Dark Mode Switcher */}
            <div className="ltr:mr-14 rtl:ml-14 flex items-center">
              <button
                onClick={toggleTheme}
                aria-label="Dark mode switcher"
                type="button"
                className="text-base hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {theme === 'dark' ? (
                  <div className="flex items-center justify-center">
                    <span className="relative block icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                        <path fill="currentColor" d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"></path>
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="relative block icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                        <path fill="currentColor" d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"></path>
                      </svg>
                    </span>
                  </div>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="-my-2 -mr-2 md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="block p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 shadow-lg p-5 flex flex-col space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchOpen(true);
              }}
              placeholder="Search runs..."
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          <a href="/sports/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2">Sports</a>
          <a href="/racelog/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2">Race Log</a>
          <a href="/work/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2">Work</a>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Appearance</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400"
            >
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
