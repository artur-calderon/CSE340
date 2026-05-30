import {
	getAllProjects,
	getProjectDetails,
	getUpcomingProjects,
	createProject,
	updateProject,
} from "../models/project.js";

import { getAllOrganizations } from "../models/organizations.js";

import { getCategoriesByProjectId } from "../models/categories.js";

import { body, validationResult } from "express-validator";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 3, max: 200 })
		.withMessage("Title must be between 3 and 200 characters"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ max: 1000 })
		.withMessage("Description must be less than 1000 characters"),
	body("location")
		.trim()
		.notEmpty()
		.withMessage("Location is required")
		.isLength({ max: 200 })
		.withMessage("Location must be less than 200 characters"),
	body("date")
		.notEmpty()
		.withMessage("Date is required")
		.isISO8601()
		.withMessage("Date must be a valid date format"),
	body("organizationId")
		.notEmpty()
		.withMessage("Organization is required")
		.isInt()
		.withMessage("Organization must be a valid integer"),
];

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

export const showNewProjectForm = async (req, res) => {
	const title = "Create New Project";
	const organizations = await getAllOrganizations();
	res.render("newProject", { title, organizations });
};

export const showEditProjectForm = async (req, res) => {
	const projectId = req.params.id;
	const title = "Edit Project";
	const project = await getProjectDetails(projectId);
	const organizations = await getAllOrganizations();

	res.render("edit-project", { title, project, organizations });
};

export const processNewProjectForm = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		errors.array().forEach((error) => {
			req.flash("error", error.msg);
		});

		return res.redirect("/new-project");
	}

	const { title, organizationId, date, description, location } = req.body;

	const projectId = await createProject(
		title,
		organizationId,
		date,
		description,
		location,
	);

	req.flash("success", "Project created successfully!");
	res.redirect(`/projects/${projectId}`);
};

export const processEditProjectForm = async (req, res) => {
	const projectId = req.params.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		errors.array().forEach((error) => {
			req.flash("error", error.msg);
		});

		return res.redirect(`/edit-project/${projectId}`);
	}

	const { title, organizationId, date, description, location } = req.body;

	await updateProject(
		projectId,
		title,
		organizationId,
		date,
		description,
		location,
	);

	req.flash("success", "Project updated successfully!");
	res.redirect(`/projects/${projectId}`);
};

export { projectValidation };
