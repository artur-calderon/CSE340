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
import { processVolunteer, processUnvolunteer } from "./controllers/projects.js";
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

const router = express.Router();

router.get("/", indexPageController);

router.get("/organizations", organizationsPageController);

router.get("/organizations/:id", showOrganizationDetailsPage);
router.get("/new-organization", showNewOrganizationPage);
router.post(
	"/new-organization",
	organizationValidation,
	processNewOrganizationForm,
);
router.get("/edit-organization/:id", showEditOrganizationForm);
router.post(
	"/edit-organization/:id",
	organizationValidation,
	processEditOrganizationForm,
);

router.get("/projects", projectsPageController);
router.get("/projects/:id", showProjectDetailsPage);
router.post("/projects/:id/volunteer", ensureAuthenticated, processVolunteer);
router.post("/projects/:id/unvolunteer", ensureAuthenticated, processUnvolunteer);
router.get("/new-project", showNewProjectForm);
router.post("/new-project", projectValidation, processNewProjectForm);
router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidation, processEditProjectForm);
router.get("/projects/:projectId/assign-categories", showAssignCategoriesForm);
router.post(
	"/projects/:projectId/assign-categories",
	processAssignCategoriesForm,
);
router.get("/project/:projectId/assign-categories", showAssignCategoriesForm);
router.post(
	"/project/:projectId/assign-categories",
	processAssignCategoriesForm,
);

router.get("/categories", categoriesPageController);
router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidation, processNewCategoryForm);
router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidation, processEditCategoryForm);
router.get("/categories/:id", showCategoryDetailsPage);

router.get("/test-error", testErrorController);

router.get("/dashboard", ensureAuthenticated, showDashboardPage);

export default router;
