import { Link } from 'react-router-dom';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import useTheme from '@/hooks/useTheme';

const Header = () => {
  const { logo, siteUrl, navLinks } = useSiteMetadata();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 dark:bg-slate-900/80 bg-white/80 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-16">
        {/* 左侧 Logo 区 */}
        <div className="flex items-center">
          <a href={siteUrl} className="group flex items-center gap-3">
            {/* 
                Original avatar hidden/commented out based on previous feedback, 
                but using siteUrl logic.
                If siteUrl is '/', it goes home.
             */}
            <span className="font-bold text-lg tracking-tight sm:block dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Rollin
            </span>
          </a>
        </div>

        {/* 右侧 导航链接 + 主题切换 */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-5">
            {navLinks.map((n, i) => (
              <a
                key={i}
                href={n.url}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {/* 
                   If we wanted icons, we'd need to add them to navLinks or map them here. 
                   For now, text links as requested in user snippet. 
                */}
                {n.name}
              </a>
            ))}
          </div>

          {/* 分割线 */}
          <div className="h-5 w-[1px] bg-gray-200 dark:bg-gray-700"></div>

          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-all hover:ring-2 hover:ring-gray-300 dark:bg-gray-800 dark:hover:ring-gray-600"
          >
            {theme === 'dark' ? (
              // 月亮图标 (显示在深色模式，点击切换回浅色)
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // 太阳图标 (显示在浅色模式，点击切换回深色)
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
