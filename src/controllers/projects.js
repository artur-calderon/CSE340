import {
	getAllProjects,
	getProjectDetails,
	getUpcomingProjects,
} from "../models/project.js";

import { getCategoriesByProjectId } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export const projectsPageController = async (req, res) => {
	const title = "Upcoming Service Projects";
	const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
	res.render("projects", { title, projects });
};

export const showProjectDetailsPage = async (req, res) => {
	const title = "Project Details";
	const projectId = req.params.id;
	const project = await getProjectDetails(projectId);
	const projectsCategories = await getCategoriesByProjectId(projectId);
	project.categories = projectsCategories;
	res.render("projectDetails", { title, project });
};
