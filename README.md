# Dashboard RH - Frontend Admin

## 🎯 Description

Dashboard RH complet et moderne pour la gestion des ressources humaines et des équipes. Interface responsive développée avec HTML, Tailwind CSS et JavaScript vanilla, prête pour l'intégration Laravel.

## ✨ Fonctionnalités

### 🔐 Authentification Multi-Rôles
- **SuperAdmin** : Gestion globale des entreprises et administrateurs
- **Admin Entreprise** : Gestion complète de l'entreprise
- **RH** : Gestion des employés, recrutement, équipes
- **Employé** : Gestion des tâches personnelles et projets

### 📊 Dashboards Spécialisés
- Statistiques en temps réel avec graphiques interactifs
- Cartes de métriques animées
- Actions rapides contextuelles
- Notifications et alertes

### 👥 Gestion des Employés (CRUD Complet)
- Liste paginée avec filtres et recherche
- Formulaires de création/modification
- Profils détaillés avec documents RH
- Export CSV des données
- Gestion des contrats et salaires

### 🏢 Gestion d'Entreprise
- Configuration entreprise avec wizard form
- Gestion des équipes et projets
- Statistiques analytiques
- Paramètres personnalisables

### 🎨 Design Moderne
- Interface responsive (mobile-first)
- Mode sombre/clair
- Animations fluides
- Couleurs bleu nuit/bleu bic
- Boutons avec gradients linéaires

## 🏗️ Architecture

### Structure des Fichiers
```
frontAdmin/
├── index.html                 # Point d'entrée
├── assets/
│   ├── css/
│   │   └── style.css         # Styles personnalisés
│   └── js/
│       ├── app.js            # Application principale
│       ├── auth.js           # Système d'authentification
│       ├── router.js         # Routage client-side
│       ├── components.js     # Composants UI réutilisables
│       ├── theme.js          # Gestion des thèmes
│       ├── utils.js          # Fonctions utilitaires
│       ├── data.js           # Données mockées pour Laravel
│       └── employees.js      # Gestion des employés
└── pages/
    ├── auth/
    │   └── login.html        # Page de connexion
    ├── superadmin/
    │   └── dashboard.html    # Dashboard SuperAdmin
    ├── admin/
    │   └── dashboard.html    # Dashboard Admin
    ├── hr/
    │   ├── dashboard.html    # Dashboard RH
    │   └── employees.html    # Gestion employés
    └── employee/
        └── dashboard.html    # Dashboard Employé
```

### Technologies Utilisées
- **HTML5** : Structure sémantique
- **Tailwind CSS** : Framework CSS utilitaire
- **JavaScript ES6+** : Logique applicative
- **Chart.js** : Graphiques interactifs
- **Font Awesome** : Icônes
- **Google Fonts** : Typographie (Inter)

## 🚀 Installation et Utilisation

### Prérequis
- Serveur web (Apache/Nginx) ou serveur de développement
- Navigateur moderne supportant ES6+

### Installation
1. Cloner le repository
```bash
git clone https://github.com/papiyade/frontAdmin.git
cd frontAdmin
```

2. Servir les fichiers via un serveur web
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

3. Accéder à l'application
```
http://localhost:8000
```

### Comptes de Test
```
SuperAdmin: superadmin@admin.com / admin123
Admin:      admin@entreprise.com / admin123  
RH:         rh@entreprise.com / rh123
Employé:    employe@entreprise.com / emp123
```

## 🔧 Intégration Laravel

### 1. Structure des Données

Le fichier `assets/js/data.js` contient toutes les structures de données mockées qui correspondent aux modèles Laravel :

#### Modèles Principaux
- **Companies** : Entreprises
- **Users** : Utilisateurs avec rôles
- **Employees** : Employés avec détails RH
- **Teams** : Équipes de travail
- **Projects** : Projets d'entreprise
- **JobOffers** : Offres d'emploi
- **Applications** : Candidatures
- **Tasks** : Tâches individuelles

### 2. API Endpoints

Les endpoints Laravel suggérés sont définis dans `MockData.getApiEndpoints()` :

```javascript
// Authentification
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

// Employés
GET    /api/employees
POST   /api/employees
GET    /api/employees/{id}
PUT    /api/employees/{id}
DELETE /api/employees/{id}

// Autres endpoints...
```

### 3. Remplacement des Données Mockées

Pour intégrer avec Laravel, remplacer les appels `MockData.*` par des requêtes API :

```javascript
// Avant (Mock)
const employees = await MockData.getEmployees();

// Après (Laravel API)
const response = await fetch('/api/employees');
const employees = await response.json();
```

### 4. Authentification Laravel

Adapter le système d'auth pour utiliser Laravel Sanctum/Passport :

```javascript
// Dans auth.js
async login(email, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
    }
    return false;
}
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `tailwind.config.js` :
- **Bleu nuit** : `#0f172a`
- **Bleu bic** : `#3b82f6`
- **Gradients** : Personnalisables via CSS

### Thèmes
Le système de thème sombre/clair est géré par `theme.js` et utilise les classes Tailwind `dark:`.

### Composants
Les composants UI réutilisables sont dans `components.js` :
- Sidebar dynamique
- Header avec recherche
- Modals animées
- Cartes de statistiques
- Tables avec pagination

## 📱 Responsive Design

L'interface est entièrement responsive avec des breakpoints Tailwind :
- **Mobile** : `< 768px`
- **Tablet** : `768px - 1024px`
- **Desktop** : `> 1024px`

## 🔒 Sécurité

### Authentification
- Vérification des rôles côté client
- Redirection automatique selon les permissions
- Session management avec localStorage

### Validation
- Validation des formulaires côté client
- Sanitisation des données d'entrée
- Protection contre les injections XSS

## 🚀 Performance

### Optimisations
- Chargement asynchrone des pages
- Debouncing des recherches
- Lazy loading des composants
- Mise en cache des données

### Métriques
- Temps de chargement initial : < 2s
- Temps de navigation : < 500ms
- Score Lighthouse : > 90

## 🧪 Tests

### Tests Manuels
1. Tester tous les rôles utilisateur
2. Vérifier la responsivité sur différents appareils
3. Tester les fonctionnalités CRUD
4. Valider les formulaires
5. Tester le mode sombre/clair

### Tests Automatisés (À implémenter)
- Tests unitaires avec Jest
- Tests d'intégration avec Cypress
- Tests de performance avec Lighthouse CI

## 📈 Évolutions Futures

### Fonctionnalités Prévues
- [ ] Système de messagerie interne
- [ ] Calendrier intégré
- [ ] Rapports PDF automatisés
- [ ] Notifications push
- [ ] API REST complète
- [ ] Application mobile (React Native/Flutter)

### Améliorations Techniques
- [ ] Migration vers TypeScript
- [ ] Implémentation PWA
- [ ] Optimisation des performances
- [ ] Tests automatisés complets

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- **Email** : support@dashboard-rh.com
- **Documentation** : [Wiki du projet](https://github.com/papiyade/frontAdmin/wiki)
- **Issues** : [GitHub Issues](https://github.com/papiyade/frontAdmin/issues)

---

**Développé avec ❤️ pour une gestion RH moderne et efficace**
