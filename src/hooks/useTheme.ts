import { useEffect, useState } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(
        typeof window !== 'undefined'
            ? localStorage.theme
            : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        // 移除旧的类名
        root.classList.remove('light', 'dark');
        // 添加新的类名
        root.classList.add(theme);

        // 保存到本地存储
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
};

export default useTheme;
