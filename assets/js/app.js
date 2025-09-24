// Main Application
class App {
    constructor() {
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }
    
    async start() {
        console.log('🚀 Starting Dashboard RH Application...');
        
        // Initialize theme first
        Theme.init();
        
        // Setup auto logout
        Auth.setupAutoLogout(30);
        
        // Initialize router and handle initial route
        this.initRouter();
        
        // Handle initial route
        const initialPath = window.location.hash.slice(1) || '/';
        console.log('📍 Initial path:', initialPath);
        
        await Router.handleRoute(initialPath);
        
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const app = document.getElementById('app');
            
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    app.classList.remove('hidden');
                    app.style.opacity = '0';
                    
                    // Fade in app
                    setTimeout(() => {
                        app.style.transition = 'opacity 0.5s ease-in-out';
                        app.style.opacity = '1';
                    }, 50);
                }, 500);
            }
        }, 1000);
        
        console.log('✅ Dashboard RH Application Started');
        console.log('👤 Current User:', Auth.getUser());
        console.log('🎨 Current Theme:', Theme.getCurrentTheme());
    }
    
    initRouter() {
        // Handle hash changes for SPA routing
        window.addEventListener('hashchange', async () => {
            const path = window.location.hash.slice(1) || '/';
            console.log('🔄 Route changed to:', path);
            await Router.handleRoute(path);
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', async () => {
            const path = window.location.hash.slice(1) || '/';
            console.log('⬅️ Browser navigation to:', path);
            await Router.handleRoute(path);
        });
    }
}

// Global navigation function
window.navigateTo = (path) => {
    window.location.hash = path;
};

// Initialize app when script loads
const app = new App();
