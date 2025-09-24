// Reusable UI Components
class UIComponents {
    
    // Generate sidebar component
    static getSidebar(userRole) {
        const user = Auth.getUser();
        const menuItems = this.getMenuItems(userRole);
        
        return `
            <div id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-night-blue shadow-xl transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-gradient-start to-gradient-end">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <i class="fas fa-users-cog text-bic-blue"></i>
                        </div>
                        <span class="text-white font-semibold text-lg">Dashboard RH</span>
                    </div>
                    <button id="closeSidebar" class="lg:hidden text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- User Info -->
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                        ${Auth.getUserAvatar()}
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                ${user?.name || 'Utilisateur'}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                                ${this.getRoleLabel(userRole)}
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation Menu -->
                <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    ${menuItems.map(item => this.getMenuItem(item)).join('')}
                </nav>
                
                <!-- Sidebar Footer -->
                <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onclick="Auth.logout()" 
                        class="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                        <i class="fas fa-sign-out-alt mr-3"></i>
                        Déconnexion
                    </button>
                </div>
            </div>
            
            <!-- Sidebar Overlay -->
            <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden"></div>
        `;
    }
    
    // Generate header component
    static getHeader(title, subtitle = '') {
        return `
            <header class="bg-white dark:bg-night-blue shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between px-6 py-4">
                    <div class="flex items-center space-x-4">
                        <button id="toggleSidebar" class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="fas fa-bars"></i>
                        </button>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">${title}</h1>
                            ${subtitle ? `<p class="text-sm text-gray-500 dark:text-gray-400">${subtitle}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <!-- Search -->
                        <div class="relative hidden md:block">
                            <input 
                                type="text" 
                                placeholder="Rechercher..." 
                                class="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bic-blue focus:border-transparent"
                            >
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        
                        <!-- Notifications -->
                        <button class="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="fas fa-bell"></i>
                            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                        </button>
                        
                        <!-- Theme Toggle -->
                        ${Theme.getThemeToggleButton()}
                        
                        <!-- User Menu -->
                        <div class="relative">
                            <button id="userMenuBtn" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                ${Auth.getUserAvatar()}
                                <i class="fas fa-chevron-down text-gray-400"></i>
                            </button>
                            
                            <!-- User Dropdown -->
                            <div id="userMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden z-50">
                                <div class="py-2">
                                    <a href="#" onclick="Router.navigate('/profile')" class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i class="fas fa-user mr-3"></i>
                                        Mon Profil
                                    </a>
                                    <a href="#" onclick="Router.navigate('/settings')" class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i class="fas fa-cog mr-3"></i>
                                        Paramètres
                                    </a>
                                    <hr class="my-2 border-gray-200 dark:border-gray-600">
                                    <button onclick="Auth.logout()" class="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                        <i class="fas fa-sign-out-alt mr-3"></i>
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
    
    // Generate stat card component
    static getStatCard(title, value, icon, color = 'blue', trend = null) {
        const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            red: 'from-red-500 to-red-600',
            yellow: 'from-yellow-500 to-yellow-600',
            indigo: 'from-indigo-500 to-indigo-600'
        };
        
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">${title}</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white">${value}</p>
                        ${trend ? `
                            <div class="flex items-center mt-2">
                                <i class="fas fa-arrow-${trend.direction} text-${trend.direction === 'up' ? 'green' : 'red'}-500 mr-1"></i>
                                <span class="text-sm text-${trend.direction === 'up' ? 'green' : 'red'}-500 font-medium">${trend.value}%</span>
                                <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">vs mois dernier</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center">
                        <i class="fas ${icon} text-white text-xl"></i>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Generate table component
    static getTable(headers, rows, actions = []) {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                ${headers.map(header => `
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        ${header}
                                    </th>
                                `).join('')}
                                ${actions.length > 0 ? '<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>' : ''}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                            ${rows.map(row => `
                                <tr class="table-row">
                                    ${row.map(cell => `
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            ${cell}
                                        </td>
                                    `).join('')}
                                    ${actions.length > 0 ? `
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div class="flex items-center justify-end space-x-2">
                                                ${actions.map(action => `
                                                    <button class="text-${action.color}-600 hover:text-${action.color}-900 dark:text-${action.color}-400 dark:hover:text-${action.color}-300" title="${action.title}">
                                                        <i class="fas ${action.icon}"></i>
                                                    </button>
                                                `).join('')}
                                            </div>
                                        </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Generate modal component
    static getModal(id, title, content, size = 'md') {
        const sizeClasses = {
            sm: 'max-w-md',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl'
        };
        
        return `
            <div id="${id}" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden modal-backdrop">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${sizeClasses[size]} modal-enter">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${title}</h3>
                        <button onclick="UIComponents.closeModal('${id}')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Generate button component
    static getButton(text, type = 'primary', size = 'md', icon = null, onclick = '') {
        const typeClasses = {
            primary: 'gradient-bg hover:gradient-bg-hover text-white',
            secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
            success: 'bg-green-500 hover:bg-green-600 text-white',
            danger: 'bg-red-500 hover:bg-red-600 text-white',
            warning: 'bg-yellow-500 hover:bg-yellow-600 text-white'
        };
        
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
        };
        
        return `
            <button 
                onclick="${onclick}"
                class="${typeClasses[type]} ${sizeClasses[size]} font-medium rounded-lg transition-all duration-300 btn-animate focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bic-blue"
            >
                ${icon ? `<i class="fas ${icon} mr-2"></i>` : ''}
                ${text}
            </button>
        `;
    }
    
    // Helper methods
    static getMenuItems(role) {
        const menus = {
            superadmin: [
                { icon: 'fa-tachometer-alt', label: 'Tableau de Bord', route: '/superadmin/dashboard' },
                { icon: 'fa-building', label: 'Entreprises', route: '/superadmin/companies' },
                { icon: 'fa-user-shield', label: 'Administrateurs', route: '/superadmin/admins' },
                { icon: 'fa-chart-bar', label: 'Statistiques', route: '/superadmin/stats' },
                { icon: 'fa-cog', label: 'Paramètres', route: '/settings' }
            ],
            admin: [
                { icon: 'fa-tachometer-alt', label: 'Tableau de Bord', route: '/admin/dashboard' },
                { icon: 'fa-users', label: 'Utilisateurs', route: '/admin/users' },
                { icon: 'fa-users-cog', label: 'Équipes', route: '/admin/teams' },
                { icon: 'fa-project-diagram', label: 'Projets', route: '/admin/projects' },
                { icon: 'fa-building', label: 'Configuration', route: '/admin/company-config' },
                { icon: 'fa-user', label: 'Profil', route: '/profile' }
            ],
            hr: [
                { icon: 'fa-tachometer-alt', label: 'Tableau de Bord', route: '/hr/dashboard' },
                { icon: 'fa-users', label: 'Employés', route: '/hr/employees' },
                { icon: 'fa-users-cog', label: 'Équipes', route: '/hr/teams' },
                { icon: 'fa-file-alt', label: 'Candidatures', route: '/hr/applications' },
                { icon: 'fa-briefcase', label: 'Offres d\'emploi', route: '/hr/job-offers' },
                { icon: 'fa-user', label: 'Profil', route: '/profile' }
            ],
            employee: [
                { icon: 'fa-tachometer-alt', label: 'Tableau de Bord', route: '/employee/dashboard' },
                { icon: 'fa-tasks', label: 'Mes Tâches', route: '/employee/tasks' },
                { icon: 'fa-project-diagram', label: 'Mes Projets', route: '/employee/projects' },
                { icon: 'fa-comments', label: 'Messages', route: '/employee/messages' },
                { icon: 'fa-user', label: 'Profil', route: '/profile' }
            ]
        };
        
        return menus[role] || [];
    }
    
    static getMenuItem(item) {
        const isActive = Router.isCurrentRoute(item.route);
        return `
            <a 
                href="#" 
                onclick="Router.navigate('${item.route}')"
                class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive 
                        ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }"
            >
                <i class="fas ${item.icon} mr-3 w-5"></i>
                ${item.label}
            </a>
        `;
    }
    
    static getRoleLabel(role) {
        const labels = {
            superadmin: 'Super Administrateur',
            admin: 'Administrateur',
            hr: 'Ressources Humaines',
            employee: 'Employé'
        };
        return labels[role] || 'Utilisateur';
    }
    
    // Modal methods
    static openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    
    static closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Initialize sidebar functionality
    static initSidebar() {
        const toggleBtn = document.getElementById('toggleSidebar');
        const closeBtn = document.getElementById('closeSidebar');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            });
        }
        
        // User menu toggle
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userMenu = document.getElementById('userMenu');
        
        if (userMenuBtn && userMenu) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('hidden');
            });
            
            document.addEventListener('click', () => {
                userMenu.classList.add('hidden');
            });
        }
    }
}
