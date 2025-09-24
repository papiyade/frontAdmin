// Main Application
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }
    
    start() {
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
        }, 1500);
        
        // Setup auto logout
        Auth.setupAutoLogout(30);
        
        // Initialize theme
        Theme.init();
        
        console.log('🚀 Dashboard RH Application Started');
        console.log('📱 Current User:', Auth.getUser());
        console.log('🎨 Current Theme:', Theme.getCurrentTheme());
    }
}

// Initialize app when script loads
const app = new App();
