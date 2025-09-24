// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }
    
    init() {
        // Check if user is already logged in
        const savedUser = Utils.getStorage('currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.isAuthenticated = true;
        }
    }
    
    // Mock users database
    static users = [
        {
            id: 1,
            email: 'superadmin@admin.com',
            password: 'admin123',
            role: 'superadmin',
            name: 'Super Administrateur',
            avatar: null,
            permissions: ['all']
        },
        {
            id: 2,
            email: 'admin@entreprise.com',
            password: 'admin123',
            role: 'admin',
            name: 'Administrateur Entreprise',
            company: 'TechCorp SARL',
            companyId: 1,
            avatar: null,
            permissions: ['company_management', 'user_management', 'team_management', 'project_management']
        },
        {
            id: 3,
            email: 'rh@entreprise.com',
            password: 'rh123',
            role: 'hr',
            name: 'Responsable RH',
            company: 'TechCorp SARL',
            companyId: 1,
            avatar: null,
            permissions: ['employee_management', 'recruitment', 'team_view']
        },
        {
            id: 4,
            email: 'employe@entreprise.com',
            password: 'emp123',
            role: 'employee',
            name: 'El hadji SY',
            company: 'TechCorp SARL',
            companyId: 1,
            team: 'Team IT',
            teamId: 1,
            avatar: null,
            permissions: ['task_management', 'project_view']
        }
    ];
    
    // Login method
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = AuthSystem.users.find(u => 
                    u.email === email && u.password === password
                );
                
                if (user) {
                    // Remove password from user object
                    const { password: _, ...userWithoutPassword } = user;
                    
                    this.currentUser = userWithoutPassword;
                    this.isAuthenticated = true;
                    
                    // Save to localStorage
                    Utils.setStorage('currentUser', userWithoutPassword);
                    Utils.setStorage('authToken', this.generateToken());
                    
                    resolve({
                        success: true,
                        user: userWithoutPassword,
                        message: 'Connexion réussie'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Email ou mot de passe incorrect'
                    });
                }
            }, 1000); // Simulate API delay
        });
    }
    
    // Logout method
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear localStorage
        Utils.removeStorage('currentUser');
        Utils.removeStorage('authToken');
        
        // Redirect to login
        Router.navigate('/login');
        Utils.showToast('Déconnexion réussie', 'success');
    }
    
    // Generate mock token
    generateToken() {
        return btoa(JSON.stringify({
            userId: this.currentUser.id,
            timestamp: Date.now(),
            random: Math.random()
        }));
    }
    
    // Check if user has permission
    hasPermission(permission) {
        if (!this.isAuthenticated || !this.currentUser) return false;
        
        // SuperAdmin has all permissions
        if (this.currentUser.role === 'superadmin') return true;
        
        return this.currentUser.permissions.includes(permission);
    }
    
    // Check if user has role
    hasRole(role) {
        if (!this.isAuthenticated || !this.currentUser) return false;
        return this.currentUser.role === role;
    }
    
    // Get user info
    getUser() {
        return this.currentUser;
    }
    
    // Check authentication status
    isLoggedIn() {
        return this.isAuthenticated && this.currentUser !== null;
    }
    
    // Get dashboard route based on role
    getDashboardRoute() {
        if (!this.isAuthenticated) return '/login';
        
        switch (this.currentUser.role) {
            case 'superadmin':
                return '/superadmin/dashboard';
            case 'admin':
                return '/admin/dashboard';
            case 'hr':
                return '/hr/dashboard';
            case 'employee':
                return '/employee/dashboard';
            default:
                return '/login';
        }
    }
    
    // Middleware for route protection
    requireAuth(callback) {
        if (!this.isLoggedIn()) {
            Router.navigate('/login');
            Utils.showToast('Veuillez vous connecter', 'warning');
            return false;
        }
        
        if (callback) callback();
        return true;
    }
    
    // Middleware for role-based access
    requireRole(roles, callback) {
        if (!this.requireAuth()) return false;
        
        const userRole = this.currentUser.role;
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        
        if (!allowedRoles.includes(userRole)) {
            Utils.showToast('Accès non autorisé', 'error');
            Router.navigate(this.getDashboardRoute());
            return false;
        }
        
        if (callback) callback();
        return true;
    }
    
    // Update user profile
    async updateProfile(profileData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Update current user
                this.currentUser = { ...this.currentUser, ...profileData };
                
                // Update in mock database
                const userIndex = AuthSystem.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    AuthSystem.users[userIndex] = { ...AuthSystem.users[userIndex], ...profileData };
                }
                
                // Update localStorage
                Utils.setStorage('currentUser', this.currentUser);
                
                resolve({
                    success: true,
                    message: 'Profil mis à jour avec succès'
                });
            }, 500);
        });
    }
    
    // Change password
    async changePassword(currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Find user with password
                const user = AuthSystem.users.find(u => u.id === this.currentUser.id);
                
                if (user && user.password === currentPassword) {
                    // Update password
                    user.password = newPassword;
                    
                    resolve({
                        success: true,
                        message: 'Mot de passe modifié avec succès'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Mot de passe actuel incorrect'
                    });
                }
            }, 500);
        });
    }
    
    // Get user avatar or initials
    getUserAvatar() {
        if (this.currentUser?.avatar) {
            return `<img src="${this.currentUser.avatar}" alt="Avatar" class="w-8 h-8 rounded-full object-cover">`;
        } else {
            const initials = Utils.getInitials(this.currentUser?.name || 'U');
            const bgColor = Utils.randomColor();
            return `<div class="w-8 h-8 ${bgColor} rounded-full flex items-center justify-center text-white text-sm font-semibold">${initials}</div>`;
        }
    }
    
    // Session management
    refreshSession() {
        if (this.isLoggedIn()) {
            Utils.setStorage('authToken', this.generateToken());
        }
    }
    
    // Auto logout after inactivity
    setupAutoLogout(minutes = 30) {
        let timeout;
        
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.logout();
                Utils.showToast('Session expirée. Veuillez vous reconnecter.', 'warning');
            }, minutes * 60 * 1000);
        };
        
        // Reset timeout on user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimeout, true);
        });
        
        resetTimeout();
    }
}

// Create global auth instance
const Auth = new AuthSystem();
