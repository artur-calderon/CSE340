import express from "express";
import { indexPageController, showDashboardPage } from "./controllers/index.js";
import {
	organizationsPageController,
	showOrganizationDetailsPage,
	showNewOrganizationPage,
	processNewOrganizationForm,
	organizationValidation,
	showEditOrganizationForm,
	processEditOrganizationForm,
} from "./controllers/organizations.js";
import {
	projectsPageController,
	showProjectDetailsPage,
	showNewProjectForm,
	processNewProjectForm,
	showEditProjectForm,
	processEditProjectForm,
	projectValidation,
} from "./controllers/projects.js";
import {
	processVolunteer,
	processUnvolunteer,
} from "./controllers/projects.js";
import { ensureAuthenticated } from "./middleware/auth.js";
import {
	categoriesPageController,
	showCategoryDetailsPage,
	showNewCategoryForm,
	processNewCategoryForm,
	showEditCategoryForm,
	processEditCategoryForm,
	showAssignCategoriesForm,
	processAssignCategoriesForm,
	categoryValidation,
} from "./controllers/categories.js";
import { testErrorController } from "./controllers/errors.js";

import {
	showRegistrationForm,
	processUserRegistrationForm,
	showLoginPage,
	processLoginForm,
	processLogout,
	requireLogin,
	showDashboard,
	showAdminPage,
	requireRole,
	showUsersPage,
} from "./controllers/users.js";

const router = express.Router();

router.get("/", indexPageController);
router.get("/register", showRegistrationForm);
router.post("/register", processUserRegistrationForm);
router.get("/login", showLoginPage);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);
router.get("/organizations", organizationsPageController);

router.get("/dashboard", requireLogin, showDashboard);
router.get("/admin", requireLogin, showAdminPage);

router.get("/organizations/:id", showOrganizationDetailsPage);
router.get("/new-organization", requireRole("admin"), showNewOrganizationPage);
router.post(
	"/new-organization",
	requireRole("admin"),
	organizationValidation,
	processNewOrganizationForm,
);
router.get(
	"/edit-organization/:id",
	requireRole("admin"),
	showEditOrganizationForm,
);
router.post(
	"/edit-organization/:id",
	requireRole("admin"),
	organizationValidation,
	processEditOrganizationForm,
);

router.get("/projects", projectsPageController);
router.get("/projects/:id", showProjectDetailsPage);
router.post("/projects/:id/volunteer", ensureAuthenticated, processVolunteer);
router.post(
	"/projects/:id/unvolunteer",
	ensureAuthenticated,
	processUnvolunteer,
);
router.get("/new-project", showNewProjectForm);
router.post("/new-project", projectValidation, processNewProjectForm);
router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidation, processEditProjectForm);
router.get("/projects/:projectId/assign-categories", showAssignCategoriesForm);
router.get("/new-project", requireRole("admin"), showNewProjectForm);
router.post(
	"/new-project",
	requireRole("admin"),
	projectValidation,
	processNewProjectForm,
);
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);
router.post(
	"/edit-project/:id",
	requireRole("admin"),
	projectValidation,
	processEditProjectForm,
);
router.get(
	"/projects/:projectId/assign-categories",
	requireRole("admin"),
	showAssignCategoriesForm,
);

router.post(
	"/projects/:projectId/assign-categories",
	requireRole("admin"),
	processAssignCategoriesForm,
);
router.get(
	"/project/:projectId/assign-categories",
	requireRole("admin"),
	showAssignCategoriesForm,
);
router.post(
	"/project/:projectId/assign-categories",
	requireRole("admin"),
	processAssignCategoriesForm,
);

router.get("/categories", categoriesPageController);
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
	"/new-category",
	requireRole("admin"),
	categoryValidation,
	processNewCategoryForm,
);
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
	"/edit-category/:id",
	requireRole("admin"),
	categoryValidation,
	processEditCategoryForm,
);
router.get("/categories/:id", showCategoryDetailsPage);

router.get("/test-error", testErrorController);

router.get("/dashboard", ensureAuthenticated, showDashboardPage);

export default router;
