import express from "express";
import { indexPageController } from "./controllers/index.js";
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
} from "./controllers/projects.js";
import {
	categoriesPageController,
	showCategoryDetailsPage,
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

router.get("/categories", categoriesPageController);
router.get("/categories/:id", showCategoryDetailsPage);

router.get("/test-error", testErrorController);

export default router;
