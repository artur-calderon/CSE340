import express from "express";
import { indexPageController } from "./controllers/index.js";
import {
	organizationsPageController,
	showOrganizationDetailsPage,
} from "./controllers/organizations.js";
import { projectsPageController } from "./controllers/projects.js";
import { categoriesPageController } from "./controllers/categories.js";
import {
	errorMiddleware,
	notFoundErrorController,
	testErrorController,
} from "./controllers/errors.js";

const router = express.Router();

router.get("/", indexPageController);

router.get("/organizations", organizationsPageController);

router.get("/organizations/:id", showOrganizationDetailsPage);

router.get("/projects", projectsPageController);

router.get("/categories", categoriesPageController);

router.get("/test-error", testErrorController);

router.use(notFoundErrorController);

router.use(errorMiddleware);

export default router;
