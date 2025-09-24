// Simple Client-Side Router
class ClientRouter {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle initial route
        this.handleRoute(window.location.pathname);
    }
    
    // Register a route
    route(path, handler) {
        this.routes[path] = handler;
    }
    
    // Navigate to a route
    navigate(path) {
        window.location.hash = path;
    }
    
    // Handle route changes
    async handleRoute(path) {
        this.currentRoute = path;
        
        // Find matching route
        let handler = this.routes[path];
        
        // If no exact match, try pattern matching
        if (!handler) {
            for (const [routePath, routeHandler] of Object.entries(this.routes)) {
                if (this.matchRoute(routePath, path)) {
                    handler = routeHandler;
                    break;
                }
            }
        }
        
        // If still no handler, try default route
        if (!handler) {
            handler = this.routes['/'] || this.routes['/login'];
        }
        
        if (handler) {
            try {
                await handler(path);
            } catch (error) {
                console.error('Route handler error:', error);
                this.handleError(error);
            }
        } else {
            this.handle404();
        }
    }
    
    // Simple pattern matching for dynamic routes
    matchRoute(pattern, path) {
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length !== pathParts.length) {
            return false;
        }
        
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const pathPart = pathParts[i];
            
            // Skip dynamic segments (starting with :)
            if (patternPart.startsWith(':')) {
                continue;
            }
            
            if (patternPart !== pathPart) {
                return false;
            }
        }
        
        return true;
    }
    
    // Extract parameters from dynamic routes
    extractParams(pattern, path) {
        const params = {};
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const pathPart = pathParts[i];
            
            if (patternPart.startsWith(':')) {
                const paramName = patternPart.substring(1);
                params[paramName] = pathPart;
            }
        }
        
        return params;
    }
    
    // Handle 404 errors
    handle404() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-night-blue">
                <div class="text-center">
                    <div class="text-6xl font-bold text-gray-400 dark:text-gray-600 mb-4">404</div>
                    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Page non trouvée</h1>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">La page que vous recherchez n'existe pas.</p>
                    <button onclick="Router.navigate('/')" class="gradient-bg text-white px-6 py-3 rounded-lg hover:gradient-bg-hover transition-all duration-300 btn-animate">
                        <i class="fas fa-home mr-2"></i>
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        `;
    }
    
    // Handle route errors
    handleError(error) {
        console.error('Router error:', error);
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-night-blue">
                <div class="text-center">
                    <div class="text-6xl font-bold text-red-400 mb-4">⚠️</div>
                    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Erreur</h1>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">Une erreur s'est produite lors du chargement de la page.</p>
                    <button onclick="location.reload()" class="gradient-bg text-white px-6 py-3 rounded-lg hover:gradient-bg-hover transition-all duration-300 btn-animate">
                        <i class="fas fa-refresh mr-2"></i>
                        Recharger la page
                    </button>
                </div>
            </div>
        `;
    }
    
    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    // Check if current route matches pattern
    isCurrentRoute(pattern) {
        return this.matchRoute(pattern, this.currentRoute);
    }
}

// Create global router instance
const Router = new ClientRouter();

// Define all application routes
Router.route('/', () => {
    if (Auth.isLoggedIn()) {
        Router.navigate(Auth.getDashboardRoute());
    } else {
        Router.navigate('/login');
    }
});

Router.route('/login', async () => {
    if (Auth.isLoggedIn()) {
        Router.navigate(Auth.getDashboardRoute());
        return;
    }
    
    const response = await fetch('pages/auth/login.html');
    const html = await response.text();
    document.getElementById('app').innerHTML = html;
    
    // Initialize login form
    initLoginForm();
});

// SuperAdmin routes
Router.route('/superadmin/dashboard', async () => {
    Auth.requireRole('superadmin', async () => {
        const response = await fetch('pages/superadmin/dashboard.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initSuperAdminDashboard();
    });
});

Router.route('/superadmin/companies', async () => {
    Auth.requireRole('superadmin', async () => {
        const response = await fetch('pages/superadmin/companies.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initCompaniesPage();
    });
});

Router.route('/superadmin/admins', async () => {
    Auth.requireRole('superadmin', async () => {
        const response = await fetch('pages/superadmin/admins.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initAdminsPage();
    });
});

// Admin routes
Router.route('/admin/dashboard', async () => {
    Auth.requireRole('admin', async () => {
        const response = await fetch('pages/admin/dashboard.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initAdminDashboard();
    });
});

Router.route('/admin/users', async () => {
    Auth.requireRole('admin', async () => {
        const response = await fetch('pages/admin/users.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initUsersPage();
    });
});

Router.route('/admin/company-config', async () => {
    Auth.requireRole('admin', async () => {
        const response = await fetch('pages/admin/company-config.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initCompanyConfigPage();
    });
});

Router.route('/admin/teams', async () => {
    Auth.requireRole('admin', async () => {
        const response = await fetch('pages/admin/teams.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initTeamsPage();
    });
});

Router.route('/admin/projects', async () => {
    Auth.requireRole('admin', async () => {
        const response = await fetch('pages/admin/projects.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initProjectsPage();
    });
});

// HR routes
Router.route('/hr/dashboard', async () => {
    Auth.requireRole('hr', async () => {
        const response = await fetch('pages/hr/dashboard.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initHRDashboard();
    });
});

Router.route('/hr/employees', async () => {
    Auth.requireRole('hr', async () => {
        const response = await fetch('pages/hr/employees.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initEmployeesPage();
    });
});

Router.route('/hr/employee/:id', async (path) => {
    Auth.requireRole('hr', async () => {
        const params = Router.extractParams('/hr/employee/:id', path);
        const response = await fetch('pages/hr/employee-profile.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initEmployeeProfile(params.id);
    });
});

Router.route('/hr/teams', async () => {
    Auth.requireRole('hr', async () => {
        const response = await fetch('pages/hr/teams.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initHRTeamsPage();
    });
});

Router.route('/hr/applications', async () => {
    Auth.requireRole('hr', async () => {
        const response = await fetch('pages/hr/applications.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initApplicationsPage();
    });
});

Router.route('/hr/job-offers', async () => {
    Auth.requireRole('hr', async () => {
        const response = await fetch('pages/hr/job-offers.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initJobOffersPage();
    });
});

// Employee routes
Router.route('/employee/dashboard', async () => {
    Auth.requireRole('employee', async () => {
        const response = await fetch('pages/employee/dashboard.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initEmployeeDashboard();
    });
});

Router.route('/employee/tasks', async () => {
    Auth.requireRole('employee', async () => {
        const response = await fetch('pages/employee/tasks.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initTasksPage();
    });
});

Router.route('/employee/projects', async () => {
    Auth.requireRole('employee', async () => {
        const response = await fetch('pages/employee/projects.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initEmployeeProjectsPage();
    });
});

Router.route('/employee/messages', async () => {
    Auth.requireRole('employee', async () => {
        const response = await fetch('pages/employee/messages.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initMessagesPage();
    });
});

// Profile and settings routes (available to all authenticated users)
Router.route('/profile', async () => {
    Auth.requireAuth(async () => {
        const response = await fetch('pages/common/profile.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initProfilePage();
    });
});

Router.route('/settings', async () => {
    Auth.requireAuth(async () => {
        const response = await fetch('pages/common/settings.html');
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        initSettingsPage();
    });
});
