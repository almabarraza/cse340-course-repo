import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, processNewOrganizationForm } from './controllers/organizations.js';
import { processNewProjectForm, showNewProjectForm, showProjectsPage, projectValidation } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectDetailsPage, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showAssignCategoriesForm, processAssignCategoriesForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, showDashboard, requireLogin, requireRole } from './controllers/users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
//Route for service project details page
router.get('/project/:id', showProjectDetailsPage);
//Route for category details page
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route to display edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
// Route to display organization list for create a new project
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle the new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
// Route to display server project data 
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
// Route to edit server project
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);
// Route for category page
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', requireRole('admin'), processNewCategoryForm);
// Route to display the edith category form
router.get('/edit-category/:id', requireRole('admin'), categoryValidation, showEditCategoryForm);
// Route to handle the edit category form
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
//User login routes
//Calls to show login form
router.get('/login', showLoginForm);
//Route to handle login
router.post('/login', processLoginForm);
//Route to show login out
router.get('/logout', processLogout);
//Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);



// error-handling routes
router.get('/test-error', testErrorPage);

export default router;