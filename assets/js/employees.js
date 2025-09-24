// Employee Management System
let employees = [];
let filteredEmployees = [];
let currentPage = 1;
const itemsPerPage = 10;

// Initialize Employees Page
function initEmployeesPage() {
    const user = Auth.getUser();
    
    // Render sidebar and header
    document.getElementById('sidebarContainer').innerHTML = UIComponents.getSidebar(user.role);
    document.getElementById('headerContainer').innerHTML = UIComponents.getHeader('Gestion des Employés', 'Gérez tous les employés de votre entreprise');
    
    // Initialize sidebar functionality
    UIComponents.initSidebar();
    
    // Load employees data
    loadEmployees();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup form handlers
    setupFormHandlers();
}

// Load employees data (mock data)
function loadEmployees() {
    employees = [
        {
            id: 1,
            firstName: 'El hadji',
            lastName: 'SY',
            email: 'elhadjsy@gmail.com',
            phone: '+221 77 123 45 67',
            position: 'Développeur Fullstack',
            team: 'IT',
            contractType: 'CDI',
            salary: 200000,
            address: 'HLM',
            status: 'active',
            startDate: '2023-05-30',
            endDate: '2027-11-12',
            matricule: '67629',
            birthDate: '1998-02-21',
            gender: 'Non spécifié'
        },
        {
            id: 2,
            firstName: 'Marie',
            lastName: 'Dupont',
            email: 'marie.dupont@entreprise.com',
            phone: '+221 77 234 56 78',
            position: 'Responsable RH',
            team: 'RH',
            contractType: 'CDI',
            salary: 350000,
            address: 'Dakar Plateau',
            status: 'active',
            startDate: '2022-01-15',
            matricule: '67630',
            birthDate: '1985-08-12',
            gender: 'Féminin'
        },
        {
            id: 3,
            firstName: 'Jean',
            lastName: 'Martin',
            email: 'jean.martin@entreprise.com',
            phone: '+221 77 345 67 89',
            position: 'Designer UX/UI',
            team: 'Marketing',
            contractType: 'CDI',
            salary: 180000,
            address: 'Almadies',
            status: 'active',
            startDate: '2023-03-20',
            matricule: '67631',
            birthDate: '1990-11-05',
            gender: 'Masculin'
        },
        {
            id: 4,
            firstName: 'Sophie',
            lastName: 'Bernard',
            email: 'sophie.bernard@entreprise.com',
            phone: '+221 77 456 78 90',
            position: 'Comptable',
            team: 'Finance',
            contractType: 'CDD',
            salary: 150000,
            address: 'Mermoz',
            status: 'pending',
            startDate: '2024-01-10',
            endDate: '2024-12-31',
            matricule: '67632',
            birthDate: '1992-04-18',
            gender: 'Féminin'
        },
        {
            id: 5,
            firstName: 'Pierre',
            lastName: 'Moreau',
            email: 'pierre.moreau@entreprise.com',
            phone: '+221 77 567 89 01',
            position: 'Commercial',
            team: 'Ventes',
            contractType: 'CDI',
            salary: 220000,
            address: 'Sacré-Cœur',
            status: 'active',
            startDate: '2021-09-01',
            matricule: '67633',
            birthDate: '1988-07-22',
            gender: 'Masculin'
        }
    ];
    
    filteredEmployees = [...employees];
    renderEmployees();
    updatePagination();
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', Utils.debounce(filterEmployees, 300));
    }
    
    // Filter selects
    const teamFilter = document.getElementById('teamFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (teamFilter) teamFilter.addEventListener('change', filterEmployees);
    if (statusFilter) statusFilter.addEventListener('change', filterEmployees);
}

// Filter employees
function filterEmployees() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const teamFilter = document.getElementById('teamFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    filteredEmployees = employees.filter(employee => {
        const matchesSearch = !searchTerm || 
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm);
            
        const matchesTeam = !teamFilter || employee.team === teamFilter;
        const matchesStatus = !statusFilter || employee.status === statusFilter;
        
        return matchesSearch && matchesTeam && matchesStatus;
    });
    
    currentPage = 1;
    renderEmployees();
    updatePagination();
}

// Reset filters
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const teamFilter = document.getElementById('teamFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (searchInput) searchInput.value = '';
    if (teamFilter) teamFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    
    filteredEmployees = [...employees];
    currentPage = 1;
    renderEmployees();
    updatePagination();
}

// Render employees table
function renderEmployees() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('employeesTableBody');
    if (!tbody) return;
    
    if (pageEmployees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <i class="fas fa-users text-4xl mb-4"></i>
                    <p class="text-lg font-medium mb-2">Aucun employé trouvé</p>
                    <p class="text-sm">Essayez de modifier vos filtres de recherche</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pageEmployees.map(employee => `
        <tr class="table-row">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-10 h-10 ${Utils.randomColor()} rounded-full flex items-center justify-center mr-4">
                        <span class="text-white font-semibold text-sm">${Utils.getInitials(employee.firstName + ' ' + employee.lastName)}</span>
                    </div>
                    <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${employee.firstName} ${employee.lastName}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${employee.position}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">${employee.email}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${employee.phone || 'N/A'}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">${employee.position}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${employee.contractType}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">${employee.team || 'Aucune'}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${
                    employee.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    employee.status === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }">
                    ${employee.status === 'active' ? 'Actif' : employee.status === 'inactive' ? 'Inactif' : 'En attente'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                    <button onclick="viewEmployee(${employee.id})" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="Voir le profil">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editEmployee(${employee.id})" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteEmployee(${employee.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update counts
    const employeeCount = document.getElementById('employeeCount');
    const totalEmployees = document.getElementById('totalEmployees');
    const startRange = document.getElementById('startRange');
    const endRange = document.getElementById('endRange');
    
    if (employeeCount) employeeCount.textContent = filteredEmployees.length;
    if (totalEmployees) totalEmployees.textContent = filteredEmployees.length;
    if (startRange) startRange.textContent = startIndex + 1;
    if (endRange) endRange.textContent = Math.min(endIndex, filteredEmployees.length);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <button onclick="changePage(${currentPage - 1})" class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                <button class="px-3 py-2 text-sm bg-bic-blue text-white rounded-lg">${i}</button>
            `;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button onclick="changePage(${i})" class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">${i}</button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="px-3 py-2 text-sm text-gray-400">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderEmployees();
    updatePagination();
}

// View employee profile
function viewEmployee(id) {
    Router.navigate(`/hr/employee/${id}`);
}

// Edit employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;
    
    // Fill edit form
    const form = document.getElementById('editEmployeeForm');
    if (form) {
        Object.keys(employee).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = employee[key] || '';
            }
        });
        
        UIComponents.openModal('editEmployeeModal');
    }
}

// Delete employee
function deleteEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${employee.firstName} ${employee.lastName} ?`)) {
        employees = employees.filter(emp => emp.id !== id);
        filteredEmployees = filteredEmployees.filter(emp => emp.id !== id);
        renderEmployees();
        updatePagination();
        Utils.showToast('Employé supprimé avec succès', 'success');
    }
}

// Export employees
function exportEmployees() {
    Utils.showToast('Préparation de l\'export...', 'info');
    
    setTimeout(() => {
        const csvContent = [
            ['Prénom', 'Nom', 'Email', 'Téléphone', 'Poste', 'Équipe', 'Statut', 'Salaire'].join(','),
            ...filteredEmployees.map(emp => [
                emp.firstName,
                emp.lastName,
                emp.email,
                emp.phone || '',
                emp.position,
                emp.team || '',
                emp.status,
                emp.salary || ''
            ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employes-${Utils.formatDate(new Date(), 'yyyy-mm-dd')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        Utils.showToast('Export terminé !', 'success');
    }, 1500);
}

// Setup form handlers
function setupFormHandlers() {
    // Add employee form
    const addForm = document.getElementById('addEmployeeForm');
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(addForm);
            const employeeData = Object.fromEntries(formData);
            
            // Add new employee
            const newEmployee = {
                id: Math.max(...employees.map(emp => emp.id)) + 1,
                ...employeeData,
                status: 'active',
                startDate: new Date().toISOString().split('T')[0],
                matricule: String(67629 + employees.length)
            };
            
            employees.push(newEmployee);
            filteredEmployees = [...employees];
            
            renderEmployees();
            updatePagination();
            
            UIComponents.closeModal('addEmployeeModal');
            addForm.reset();
            Utils.showToast('Employé créé avec succès !', 'success');
        });
    }
    
    // Edit employee form
    const editForm = document.getElementById('editEmployeeForm');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(editForm);
            const employeeData = Object.fromEntries(formData);
            const id = parseInt(employeeData.id);
            
            // Update employee
            const index = employees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...employeeData, id };
                filteredEmployees = [...employees];
                
                renderEmployees();
                updatePagination();
                
                UIComponents.closeModal('editEmployeeModal');
                Utils.showToast('Employé modifié avec succès !', 'success');
            }
        });
    }
}
