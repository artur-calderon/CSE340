import {
	getAllOrganizations,
	getOrganizationById,
	createOrganization,
	updateOrganization,
} from "../models/organizations.js";
import { getProjectByOrganizationId } from "../models/project.js";

import { body, validationResult } from "express-validator";

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Organization name is required")
		.isLength({ min: 3, max: 150 })
		.withMessage("Organization name must be between 3 and 150 characters"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Organization description is required")
		.isLength({ max: 500 })
		.withMessage("Organization description cannot exceed 500 characters"),
	body("contactEmail")
		.normalizeEmail()
		.notEmpty()
		.withMessage("Contact email is required")
		.isEmail()
		.withMessage("Please provide a valid email address"),
];

const organizationsPageController = async (req, res) => {
	const organizations = await getAllOrganizations();
	const title = "Our Partner Organizations";
	res.render("organizations", { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
	const organizationId = req.params.id;
	const organizationDetails = await getOrganizationById(organizationId);
	const projects = await getProjectByOrganizationId(organizationId);
	const title = "Organization Details";

	res.render("organizationDetails", {
		title,
		organization: organizationDetails,
		projects,
	});
};

const showNewOrganizationPage = (req, res) => {
	const title = "Add New Organization";
	res.render("newOrganization", { title });
};

const showEditOrganizationForm = async (req, res) => {
	const organizationId = req.params.id;
	const organizationDetails = await getOrganizationById(organizationId);
	const title = "Edit Organization";
	res.render("editOrganization", {
		title,
		organization: organizationDetails,
	});
};

const processNewOrganizationForm = async (req, res) => {
	const results = validationResult(req);

	if (!results.isEmpty()) {
		results.array().forEach((error) => {
			req.flash("error", error.msg);
		});
		return res.redirect("/new-organization");
	}

	const { name, description, contactEmail } = req.body;
	const logoFilename = "placeholder-logo.png"; // In a real app, you'd handle file uploads

	const organizationId = await createOrganization(
		name,
		description,
		contactEmail,
		logoFilename,
	);
	req.flash("success", "Organization created successfully!");
	res.redirect(`/organizations/${organizationId}`);
};

const processEditOrganizationForm = async (req, res) => {
	const organizationId = req.params.id;
	const { name, description, contactEmail } = req.body;
	const results = validationResult(req);

	if (!results.isEmpty()) {
		results.array().forEach((error) => {
			req.flash("error", error.msg);
		});
		return res.redirect(`/edit-organization/${organizationId}`);
	}

	const organizationUpdated = await updateOrganization(
		organizationId,
		name,
		description,
		contactEmail,
	);
	req.flash("success", "Organization updated successfully!");
	res.redirect(`/organizations/${organizationId}`);

	// Proceed with updating the organization
};

export {
	organizationsPageController,
	showOrganizationDetailsPage,
	showNewOrganizationPage,
	processNewOrganizationForm,
	organizationValidation,
	showEditOrganizationForm,
	processEditOrganizationForm,
};
