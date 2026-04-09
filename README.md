📘 Course Management System (Frontend)
======================================

A modern, fully responsive Course Management System built with **React + TypeScript + Redux Toolkit + Tailwind CSS**.This application allows users to manage courses, categories, enrollments, and user data through a clean and scalable interface.

🚀 Tech Stack
-------------

*   **React 18 + TypeScript**
    
*   **Vite**
    
*   **Redux Toolkit (State Management)**
    
*   **React Router v6**
    
*   **Axios (API Communication)**
    
*   **React Hook Form + Zod (Form Handling & Validation)**
    
*   **Tailwind CSS (UI & Responsiveness)**
    

🔌 API Integration
------------------

All data is fetched from the provided API:

👉 [https://register.cseconference.org/swagger/index.html](https://register.cseconference.org/swagger/index.html)

### 🔐 Admin Credentials

*   Email: [system@admin.com](mailto:system@admin.com)
    
*   Password: password123
    

✨ Features
----------

### 🔐 Authentication

*   Secure login system
    
*   JWT token stored in localStorage
    
*   Protected routes
    
*   Automatic logout on token expiration (401)
    

### 📊 Dashboard

*   Clean SaaS-style UI
    
*   Summary cards (Courses, Categories, Enrollments)
    
*   Responsive layout
    

### 📚 Courses Management

*   View all courses
    
*   Delete courses
    
*   Responsive:
    
    *   Table view (Desktop)
        
    *   Card view (Mobile)
        
*   Dynamic data rendering
    

### 👤 User Profile

*   Read-only user information page
    
*   Dynamically displays only available fields
    
*   Hidden empty fields
    

### ⚙️ System Features

*   Axios interceptors for:
    
    *   Authentication
        
    *   Error handling (401, 403, 500)
        
*   API response normalization:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   res.data?.data ?? res.data   `

*   Clean modular structure
    
*   Reusable UI components
    

📱 Responsiveness
-----------------

The application is fully responsive:

DeviceBehaviorMobileCard layouts, stacked UITabletGrid-based layoutDesktopSidebar + tables

### Implementations:

*   Tailwind breakpoints (sm, md, lg)
    
*   Responsive grids
    
*   Mobile-friendly navigation
    
*   Overflow handling for tables
    

📂 Project Structure
src/
│
├── api/
│   └── axios.ts                # Axios instance + interceptors
│
├── app/
│   └── store.ts                # Redux store configuration
│
├── features/
│   ├── auth/
│   │   └── authSlice.ts        # Auth state, login, logout, user fetch
│   │
│   ├── courses/
│   │   └── courseSlice.ts      # Course state & async actions
│   │
│   ├── categories/
│   │   └── categorySlice.ts    # Category state & CRUD logic
│   │
│   └── enrollments/
│       └── enrollmentSlice.ts  # Enrollment state management
│
├── services/
│   ├── auth.service.ts         # Auth API calls
│   ├── course.service.ts       # Course API calls
│   ├── category.service.ts     # Category API calls
│   └── enrollment.service.ts   # Enrollment API calls
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Input.tsx           # Input with validation UI
│   │   ├── Modal.tsx           # Reusable modal
│   │   ├── Table.tsx           # Desktop table
│   │   ├── Card.tsx            # Mobile card layout
│   │   ├── Loader.tsx          # Loading skeleton
│   │   └── EmptyState.tsx      # Empty UI state
│   │
│   └── shared/
│       └── Navbar.tsx          # Top navigation (mobile/desktop)
│
├── layouts/
│   └── DashboardLayout.tsx     # Sidebar + responsive layout
│
├── pages/
│   ├── Login.tsx               # Login page
│   ├── Register.tsx            # Register page
│   ├── Dashboard.tsx           # Dashboard overview
│   ├── Courses.tsx             # Course management
│   ├── Categories.tsx          # Category CRUD
│   ├── Enrollments.tsx         # Enrollment management
│   ├── Users.tsx               # User list
│   └── UserProfile.tsx         # Read-only user info page
│
├── routes/
│   └── index.tsx               # App routing + protected routes
│
├── hooks/
│   └── useAuth.ts              # Custom auth hook (optional)
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
├── utils/
│   └── handleResponse.ts       # API response handler
│
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind styles

⚙️ Installation & Setup
-----------------------

### 1\. Clone Repository
`   git clone   cd course-management-system   `

### 2\. Install Dependencies

`   npm install   `

### 3\. Run Development Server

`   npm run dev   `

👉 Open: [http://localhost:5173](http://localhost:5173/)

📸 Screenshots
--------------

Screenshots are included inside the project folder showing:

*   Login Page
    
*   Dashboard
    
*   Courses Page (Desktop & Mobile)
    
*   User Profile Page
    

🎥 Project Presentation
-----------------------

A short video presentation explaining:

*   Features
    
*   Implementation
    
*   Workflow
    

📁 Located in:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Project Presentation/   `


🧠 Design & Development Approach
--------------------------------

*   Focused on **clean architecture and scalability**
    
*   Followed **component reusability principles**
    
*   Ensured **consistent UI/UX**
    
*   Prioritized **performance and responsiveness**
    
*   Handled **API inconsistencies gracefully**
    

⚠️ Notes
--------

*   Some API responses may vary in structure → handled dynamically
    
*   Error handling implemented globally
    
*   Role-based restrictions may apply depending on API
    

📌 Future Improvements
----------------------

*   Course create/edit forms (modal-based)
    
*   Category & enrollment management UI
    
*   Advanced filtering and search
    
*   Toast notification system enhancement
    
*   Pagination support
    

👨‍💻 Author
------------

**Rasel Shikder**



