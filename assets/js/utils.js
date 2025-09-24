// Utility Functions
class Utils {
    // Show toast notification
    static showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[type] || 'bg-blue-500';
        
        const icon = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        }[type] || 'fas fa-info-circle';
        
        toast.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 notification-enter max-w-sm`;
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.remove()" class="ml-auto">
                <i class="fas fa-times hover:text-gray-200"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('notification-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // Format date
    static formatDate(date, format = 'dd/mm/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        switch(format) {
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            case 'mm/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            default:
                return d.toLocaleDateString('fr-FR');
        }
    }
    
    // Format currency
    static formatCurrency(amount, currency = 'FCFA') {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
    }
    
    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Generate random ID
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    // Validate email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate phone
    static validatePhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    }
    
    // Get initials from name
    static getInitials(name) {
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }
    
    // Truncate text
    static truncate(text, length = 50) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }
    
    // Deep clone object
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    // Check if object is empty
    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
    // Capitalize first letter
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Generate random color
    static randomColor() {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
            'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Local storage helpers
    static setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }
    
    static getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    }
    
    static removeStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
    
    // Animation helpers
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    static fadeOut(element, duration = 300) {
        let start = null;
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(initialOpacity - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Form validation
    static validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, value] of Object.entries(formData)) {
            if (rules[field]) {
                const fieldRules = rules[field];
                
                // Required validation
                if (fieldRules.required && (!value || value.trim() === '')) {
                    errors[field] = 'Ce champ est requis';
                    continue;
                }
                
                // Min length validation
                if (fieldRules.minLength && value.length < fieldRules.minLength) {
                    errors[field] = `Minimum ${fieldRules.minLength} caractères requis`;
                    continue;
                }
                
                // Email validation
                if (fieldRules.email && !this.validateEmail(value)) {
                    errors[field] = 'Format email invalide';
                    continue;
                }
                
                // Phone validation
                if (fieldRules.phone && !this.validatePhone(value)) {
                    errors[field] = 'Format téléphone invalide';
                    continue;
                }
                
                // Custom validation
                if (fieldRules.custom && !fieldRules.custom(value)) {
                    errors[field] = fieldRules.message || 'Valeur invalide';
                }
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    // Loading state management
    static showLoading(element, text = 'Chargement...') {
        const originalContent = element.innerHTML;
        element.dataset.originalContent = originalContent;
        element.disabled = true;
        element.innerHTML = `
            <i class="fas fa-spinner fa-spin mr-2"></i>
            ${text}
        `;
    }
    
    static hideLoading(element) {
        element.disabled = false;
        element.innerHTML = element.dataset.originalContent || element.innerHTML;
        delete element.dataset.originalContent;
    }
    
    // File size formatter
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // URL helpers
    static getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    static setQueryParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    }
}
