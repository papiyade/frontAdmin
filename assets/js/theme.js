// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }
    
    init() {
        // Load saved theme
        const savedTheme = Utils.getStorage('theme', 'light');
        this.setTheme(savedTheme);
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (Utils.getStorage('theme') === 'system') {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    // Set theme
    setTheme(theme) {
        this.currentTheme = theme;
        Utils.setStorage('theme', theme);
        
        if (theme === 'system') {
            const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(systemDark ? 'dark' : 'light');
        } else {
            this.applyTheme(theme);
        }
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // Apply theme to DOM
    applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        
        // Update meta theme color
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }
    
    // Toggle theme
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Check if dark mode
    isDark() {
        return document.documentElement.classList.contains('dark');
    }
    
    // Get theme toggle button HTML
    getThemeToggleButton() {
        const isDark = this.isDark();
        return `
            <button 
                onclick="Theme.toggleTheme()" 
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                title="${isDark ? 'Mode clair' : 'Mode sombre'}"
            >
                <i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
        `;
    }
}

// Create global theme instance
const Theme = new ThemeManager();
