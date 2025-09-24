// Mock Data for Laravel Integration
// This file contains all mock data that can be easily replaced with Laravel API calls

class MockData {
    // Companies data
    static companies = [
        {
            id: 1,
            name: 'TechCorp SARL',
            email: 'contact@techcorp.sn',
            sector: 'Technologie',
            address: 'Dakar, Sénégal',
            phone: '+221 33 123 45 67',
            website: 'https://techcorp.sn',
            employees_count: 156,
            status: 'active',
            created_at: '2022-01-15',
            logo: null
        },
        {
            id: 2,
            name: 'FinanceMax',
            email: 'info@financemax.sn',
            sector: 'Finance',
            address: 'Dakar Plateau',
            phone: '+221 33 234 56 78',
            website: 'https://financemax.sn',
            employees_count: 89,
            status: 'active',
            created_at: '2023-03-20'
        }
    ];

    // Users data
    static users = [
        {
            id: 1,
            email: 'superadmin@admin.com',
            password: 'admin123',
            role: 'superadmin',
            name: 'Super Administrateur',
            avatar: null,
            permissions: ['all'],
            created_at: '2022-01-01'
        },
        {
            id: 2,
            email: 'admin@entreprise.com',
            password: 'admin123',
            role: 'admin',
            name: 'Administrateur Entreprise',
            company: 'TechCorp SARL',
            company_id: 1,
            avatar: null,
            permissions: ['company_management', 'user_management', 'team_management', 'project_management'],
            created_at: '2022-01-15'
        },
        {
            id: 3,
            email: 'rh@entreprise.com',
            password: 'rh123',
            role: 'hr',
            name: 'Responsable RH',
            company: 'TechCorp SARL',
            company_id: 1,
            avatar: null,
            permissions: ['employee_management', 'recruitment', 'team_view'],
            created_at: '2022-02-01'
        },
        {
            id: 4,
            email: 'employe@entreprise.com',
            password: 'emp123',
            role: 'employee',
            name: 'El hadji SY',
            company: 'TechCorp SARL',
            company_id: 1,
            team: 'Team IT',
            team_id: 1,
            avatar: null,
            permissions: ['task_management', 'project_view'],
            created_at: '2023-05-30'
        }
    ];

    // Employees data
    static employees = [
        {
            id: 1,
            firstName: 'El hadji',
            lastName: 'SY',
            email: 'elhadjsy@gmail.com',
            phone: '+221 77 123 45 67',
            position: 'Développeur Fullstack',
            team: 'IT',
            team_id: 1,
            contractType: 'CDI',
            salary: 200000,
            address: 'HLM',
            status: 'active',
            startDate: '2023-05-30',
            endDate: '2027-11-12',
            matricule: '67629',
            birthDate: '1998-02-21',
            gender: 'Non spécifié',
            company_id: 1
        },
        {
            id: 2,
            firstName: 'Marie',
            lastName: 'Dupont',
            email: 'marie.dupont@entreprise.com',
            phone: '+221 77 234 56 78',
            position: 'Responsable RH',
            team: 'RH',
            team_id: 2,
            contractType: 'CDI',
            salary: 350000,
            address: 'Dakar Plateau',
            status: 'active',
            startDate: '2022-01-15',
            matricule: '67630',
            birthDate: '1985-08-12',
            gender: 'Féminin',
            company_id: 1
        },
        {
            id: 3,
            firstName: 'Jean',
            lastName: 'Martin',
            email: 'jean.martin@entreprise.com',
            phone: '+221 77 345 67 89',
            position: 'Designer UX/UI',
            team: 'Marketing',
            team_id: 3,
            contractType: 'CDI',
            salary: 180000,
            address: 'Almadies',
            status: 'active',
            startDate: '2023-03-20',
            matricule: '67631',
            birthDate: '1990-11-05',
            gender: 'Masculin',
            company_id: 1
        }
    ];

    // Teams data
    static teams = [
        {
            id: 1,
            name: 'Team IT',
            description: 'Équipe de développement et informatique',
            manager: 'Saliou Kama',
            manager_id: 1,
            members_count: 12,
            projects_count: 5,
            color: 'blue',
            company_id: 1,
            created_at: '2022-01-15'
        },
        {
            id: 2,
            name: 'Marketing',
            description: 'Équipe marketing et communication',
            manager: 'Marie Dupont',
            manager_id: 2,
            members_count: 8,
            projects_count: 3,
            color: 'green',
            company_id: 1,
            created_at: '2022-02-01'
        },
        {
            id: 3,
            name: 'Finance',
            description: 'Équipe comptabilité et finance',
            manager: 'Pierre Moreau',
            manager_id: 3,
            members_count: 6,
            projects_count: 2,
            color: 'purple',
            company_id: 1,
            created_at: '2022-02-15'
        }
    ];

    // Projects data
    static projects = [
        {
            id: 1,
            name: 'Refonte Site Web',
            description: 'Refonte complète du site web de l\'entreprise',
            team: 'Team IT',
            team_id: 1,
            progress: 75,
            status: 'in-progress',
            deadline: '2024-10-15',
            budget: 500000,
            company_id: 1,
            created_at: '2024-07-01'
        },
        {
            id: 2,
            name: 'Campagne Marketing Q4',
            description: 'Campagne marketing pour le quatrième trimestre',
            team: 'Marketing',
            team_id: 2,
            progress: 45,
            status: 'in-progress',
            deadline: '2024-11-30',
            budget: 200000,
            company_id: 1,
            created_at: '2024-08-15'
        },
        {
            id: 3,
            name: 'Audit Financier',
            description: 'Audit financier annuel de l\'entreprise',
            team: 'Finance',
            team_id: 3,
            progress: 90,
            status: 'review',
            deadline: '2024-09-30',
            budget: 150000,
            company_id: 1,
            created_at: '2024-06-01'
        }
    ];

    // Job offers data
    static jobOffers = [
        {
            id: 1,
            title: 'Développeur Frontend React',
            description: 'Nous recherchons un développeur Frontend expérimenté en React',
            department: 'IT',
            location: 'Dakar',
            type: 'CDI',
            salary_min: 180000,
            salary_max: 250000,
            requirements: ['React', 'JavaScript', 'CSS', 'Git'],
            status: 'active',
            applications_count: 15,
            company_id: 1,
            created_at: '2024-09-01',
            expires_at: '2024-10-01'
        },
        {
            id: 2,
            title: 'Designer UX/UI',
            description: 'Designer créatif pour améliorer l\'expérience utilisateur',
            department: 'Marketing',
            location: 'Dakar',
            type: 'CDI',
            salary_min: 150000,
            salary_max: 200000,
            requirements: ['Figma', 'Adobe Creative Suite', 'UX Research'],
            status: 'active',
            applications_count: 8,
            company_id: 1,
            created_at: '2024-09-10',
            expires_at: '2024-10-10'
        }
    ];

    // Applications data
    static applications = [
        {
            id: 1,
            job_offer_id: 1,
            candidate_name: 'Marie Dubois',
            candidate_email: 'marie.dubois@email.com',
            candidate_phone: '+221 77 111 22 33',
            cv_path: '/uploads/cv/marie_dubois.pdf',
            cover_letter: 'Je suis très intéressée par ce poste...',
            status: 'pending',
            experience_years: 3,
            applied_at: '2024-09-22'
        },
        {
            id: 2,
            job_offer_id: 1,
            candidate_name: 'Jean Dupont',
            candidate_email: 'jean.dupont@email.com',
            candidate_phone: '+221 77 222 33 44',
            cv_path: '/uploads/cv/jean_dupont.pdf',
            cover_letter: 'Fort de mes 5 ans d\'expérience...',
            status: 'interview',
            experience_years: 5,
            applied_at: '2024-09-21'
        },
        {
            id: 3,
            job_offer_id: 2,
            candidate_name: 'Sophie Martin',
            candidate_email: 'sophie.martin@email.com',
            candidate_phone: '+221 77 333 44 55',
            cv_path: '/uploads/cv/sophie_martin.pdf',
            cover_letter: 'Passionnée par le design...',
            status: 'pending',
            experience_years: 2,
            applied_at: '2024-09-20'
        }
    ];

    // Tasks data
    static tasks = [
        {
            id: 1,
            title: 'Développer la page de connexion',
            description: 'Créer une page de connexion moderne et responsive',
            status: 'completed',
            priority: 'high',
            assignee_id: 4,
            assignee_name: 'El hadji SY',
            project_id: 1,
            due_date: '2024-09-20',
            completed_at: '2024-09-19',
            created_at: '2024-09-15'
        },
        {
            id: 2,
            title: 'Réviser le code du module utilisateur',
            description: 'Code review et optimisation du module utilisateur',
            status: 'in-progress',
            priority: 'medium',
            assignee_id: 4,
            assignee_name: 'El hadji SY',
            project_id: 1,
            due_date: '2024-09-25',
            created_at: '2024-09-18'
        },
        {
            id: 3,
            title: 'Préparer la présentation client',
            description: 'Préparer les slides pour la présentation client',
            status: 'pending',
            priority: 'high',
            assignee_id: 4,
            assignee_name: 'El hadji SY',
            project_id: 1,
            due_date: '2024-09-28',
            created_at: '2024-09-20'
        }
    ];

    // Statistics data
    static statistics = {
        superadmin: {
            companies_total: 247,
            companies_active: 189,
            users_total: 12847,
            revenue_monthly: 45230
        },
        admin: {
            users_total: 156,
            teams_active: 12,
            projects_active: 24,
            tasks_completed_percentage: 89
        },
        hr: {
            employees_total: 156,
            job_offers_active: 8,
            applications_pending: 23,
            teams_total: 12
        },
        employee: {
            tasks_total: 15,
            tasks_in_progress: 5,
            tasks_completed: 8,
            projects_assigned: 3
        }
    };

    // API simulation methods
    static async getCompanies() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.companies), 500);
        });
    }

    static async getUsers(companyId = null) {
        return new Promise(resolve => {
            let users = this.users;
            if (companyId) {
                users = users.filter(user => user.company_id === companyId);
            }
            setTimeout(() => resolve(users), 500);
        });
    }

    static async getEmployees(companyId = null) {
        return new Promise(resolve => {
            let employees = this.employees;
            if (companyId) {
                employees = employees.filter(emp => emp.company_id === companyId);
            }
            setTimeout(() => resolve(employees), 500);
        });
    }

    static async getTeams(companyId = null) {
        return new Promise(resolve => {
            let teams = this.teams;
            if (companyId) {
                teams = teams.filter(team => team.company_id === companyId);
            }
            setTimeout(() => resolve(teams), 500);
        });
    }

    static async getProjects(companyId = null) {
        return new Promise(resolve => {
            let projects = this.projects;
            if (companyId) {
                projects = projects.filter(project => project.company_id === companyId);
            }
            setTimeout(() => resolve(projects), 500);
        });
    }

    static async getJobOffers(companyId = null) {
        return new Promise(resolve => {
            let offers = this.jobOffers;
            if (companyId) {
                offers = offers.filter(offer => offer.company_id === companyId);
            }
            setTimeout(() => resolve(offers), 500);
        });
    }

    static async getApplications(jobOfferId = null) {
        return new Promise(resolve => {
            let applications = this.applications;
            if (jobOfferId) {
                applications = applications.filter(app => app.job_offer_id === jobOfferId);
            }
            setTimeout(() => resolve(applications), 500);
        });
    }

    static async getTasks(userId = null) {
        return new Promise(resolve => {
            let tasks = this.tasks;
            if (userId) {
                tasks = tasks.filter(task => task.assignee_id === userId);
            }
            setTimeout(() => resolve(tasks), 500);
        });
    }

    static async getStatistics(role) {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.statistics[role] || {}), 500);
        });
    }

    // CRUD operations simulation
    static async createEmployee(employeeData) {
        return new Promise(resolve => {
            const newEmployee = {
                id: Math.max(...this.employees.map(emp => emp.id)) + 1,
                ...employeeData,
                status: 'active',
                startDate: new Date().toISOString().split('T')[0],
                matricule: String(67629 + this.employees.length)
            };
            this.employees.push(newEmployee);
            setTimeout(() => resolve(newEmployee), 500);
        });
    }

    static async updateEmployee(id, employeeData) {
        return new Promise(resolve => {
            const index = this.employees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                this.employees[index] = { ...this.employees[index], ...employeeData };
                setTimeout(() => resolve(this.employees[index]), 500);
            } else {
                setTimeout(() => resolve(null), 500);
            }
        });
    }

    static async deleteEmployee(id) {
        return new Promise(resolve => {
            const index = this.employees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                this.employees.splice(index, 1);
                setTimeout(() => resolve(true), 500);
            } else {
                setTimeout(() => resolve(false), 500);
            }
        });
    }

    // Laravel API endpoints mapping
    static getApiEndpoints() {
        return {
            // Authentication
            login: '/api/auth/login',
            logout: '/api/auth/logout',
            me: '/api/auth/me',
            
            // Companies
            companies: '/api/companies',
            company: (id) => `/api/companies/${id}`,
            
            // Users
            users: '/api/users',
            user: (id) => `/api/users/${id}`,
            
            // Employees
            employees: '/api/employees',
            employee: (id) => `/api/employees/${id}`,
            
            // Teams
            teams: '/api/teams',
            team: (id) => `/api/teams/${id}`,
            
            // Projects
            projects: '/api/projects',
            project: (id) => `/api/projects/${id}`,
            
            // Job Offers
            jobOffers: '/api/job-offers',
            jobOffer: (id) => `/api/job-offers/${id}`,
            
            // Applications
            applications: '/api/applications',
            application: (id) => `/api/applications/${id}`,
            
            // Tasks
            tasks: '/api/tasks',
            task: (id) => `/api/tasks/${id}`,
            
            // Statistics
            statistics: '/api/statistics',
            
            // File uploads
            upload: '/api/upload',
            
            // Reports
            reports: '/api/reports'
        };
    }

    // Get applications data
    static async getApplications() {
        return [
            {
                id: 1,
                candidate_name: 'Aminata Diallo',
                email: 'aminata.diallo@email.com',
                phone: '+221 77 123 45 67',
                position: 'Développeur Frontend',
                experience: '3 ans d\'expérience en développement web avec React et Vue.js. Passionnée par l\'UX/UI et les nouvelles technologies.',
                status: 'pending',
                applied_at: '2024-09-20'
            },
            {
                id: 2,
                candidate_name: 'Moussa Ba',
                email: 'moussa.ba@email.com',
                phone: '+221 78 987 65 43',
                position: 'Designer UX/UI',
                experience: '5 ans d\'expérience en design d\'interfaces utilisateur. Expert en Figma, Adobe Creative Suite.',
                status: 'reviewed',
                applied_at: '2024-09-18'
            },
            {
                id: 3,
                candidate_name: 'Fatou Sall',
                email: 'fatou.sall@email.com',
                phone: '+221 76 456 78 90',
                position: 'Chef de Projet',
                experience: '7 ans d\'expérience en gestion de projets IT. Certifiée PMP et Scrum Master.',
                status: 'accepted',
                applied_at: '2024-09-15'
            },
            {
                id: 4,
                candidate_name: 'Omar Ndiaye',
                email: 'omar.ndiaye@email.com',
                phone: '+221 77 321 54 87',
                position: 'Développeur Backend',
                experience: '4 ans d\'expérience avec Node.js, Python et bases de données. Spécialisé en APIs REST.',
                status: 'rejected',
                applied_at: '2024-09-12'
            }
        ];
    }

    // Get job offers data
    static async getJobOffers() {
        return [
            {
                id: 1,
                title: 'Développeur Frontend Senior',
                department: 'IT',
                type: 'CDI',
                level: 'Senior',
                location: 'Dakar, Sénégal',
                salary_min: 800000,
                salary_max: 1200000,
                description: 'Nous recherchons un développeur frontend senior pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant les dernières technologies.',
                requirements: 'React, Vue.js, TypeScript, 5+ ans d\'expérience',
                status: 'active',
                applications_count: 23,
                deadline: '2024-10-30',
                created_at: '2024-09-01'
            },
            {
                id: 2,
                title: 'Designer UX/UI',
                department: 'Design',
                type: 'CDI',
                level: 'Confirmé',
                location: 'Dakar, Sénégal',
                salary_min: 600000,
                salary_max: 900000,
                description: 'Rejoignez notre équipe créative en tant que designer UX/UI. Vous concevrez des interfaces utilisateur intuitives et attrayantes.',
                requirements: 'Figma, Adobe Creative Suite, 3+ ans d\'expérience',
                status: 'active',
                applications_count: 18,
                deadline: '2024-11-15',
                created_at: '2024-09-05'
            },
            {
                id: 3,
                title: 'Chef de Projet Digital',
                department: 'Management',
                type: 'CDI',
                level: 'Senior',
                location: 'Dakar, Sénégal',
                salary_min: 1000000,
                salary_max: 1500000,
                description: 'Nous cherchons un chef de projet expérimenté pour piloter nos projets digitaux stratégiques.',
                requirements: 'PMP, Agile/Scrum, 5+ ans d\'expérience',
                status: 'paused',
                applications_count: 12,
                deadline: '2024-12-01',
                created_at: '2024-08-20'
            }
        ];
    }

    // Get projects data
    static async getProjects() {
        return [
            {
                id: 1,
                name: 'Plateforme E-commerce',
                description: 'Développement d\'une plateforme e-commerce moderne avec React et Node.js',
                team: 'Team IT',
                status: 'in-progress',
                progress: 75,
                budget: 5000000,
                deadline: '2024-12-15',
                created_at: '2024-06-01'
            },
            {
                id: 2,
                name: 'Application Mobile RH',
                description: 'Application mobile pour la gestion des ressources humaines',
                team: 'Team Mobile',
                status: 'in-progress',
                progress: 45,
                budget: 3500000,
                deadline: '2024-11-30',
                created_at: '2024-07-15'
            },
            {
                id: 3,
                name: 'Système de Facturation',
                description: 'Système automatisé de facturation et comptabilité',
                team: 'Team Finance',
                status: 'review',
                progress: 90,
                budget: 2800000,
                deadline: '2024-10-20',
                created_at: '2024-05-10'
            },
            {
                id: 4,
                name: 'Site Web Corporate',
                description: 'Refonte complète du site web de l\'entreprise',
                team: 'Team Design',
                status: 'completed',
                progress: 100,
                budget: 1500000,
                deadline: '2024-09-01',
                created_at: '2024-03-01'
            }
        ];
    }
}
