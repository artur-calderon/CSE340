import {
	getAllCategories,
	getProjectsByCategoryId,
	getCategoryById,
	createCategory,
	updateCategory,
	updateCategoryAssignments,
	getCategoriesByProjectId as getCategoriesByServiceProjectId,
} from "../models/categories.js";

import { getProjectDetails } from "../models/project.js";

import { body, validationResult } from "express-validator";

const categoryValidation = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Category name is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Category name must be between 3 and 100 characters"),
];

const categoriesPageController = async (req, res) => {
	const title = "Service Categories";
	const categories = await getAllCategories();
	res.render("categories", { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
	const categoryId = req.params.id;
	const title = "Category Details";
	const projects = await getProjectsByCategoryId(categoryId);
	const category = await getCategoryById(categoryId);
	res.render("categoriesDetails", {
		title,
		projects,
		category,
	});
};

const showNewCategoryForm = (req, res) => {
	const title = "Create New Category";
	res.render("new-category", { title });
};

const processNewCategoryForm = async (req, res) => {
	const results = validationResult(req);

	if (!results.isEmpty()) {
		results.array().forEach((error) => {
			req.flash("error", error.msg);
		});
		return res.redirect("/new-category");
	}

	const { name } = req.body;
	const categoryId = await createCategory(name);
	req.flash("success", "Category created successfully!");
	res.redirect(`/categories/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
	const categoryId = req.params.id;
	const title = "Edit Category";
	const category = await getCategoryById(categoryId);

	res.render("edit-category", {
		title,
		category,
	});
};

const processEditCategoryForm = async (req, res) => {
	const categoryId = req.params.id;
	const results = validationResult(req);

	if (!results.isEmpty()) {
		results.array().forEach((error) => {
			req.flash("error", error.msg);
		});
		return res.redirect(`/edit-category/${categoryId}`);
	}

	const { name } = req.body;
	await updateCategory(categoryId, name);
	req.flash("success", "Category updated successfully!");
	res.redirect(`/categories/${categoryId}`);
};

const showAssignCategoriesForm = async (req, res) => {
	const projectId = req.params.projectId;
	const projectDetails = await getProjectDetails(projectId);
	const categories = await getAllCategories();
	const assignedCategories = await getCategoriesByServiceProjectId(projectId);
	const title = "Assign Categories to Project";

	res.render("assign-categories", {
		title,
		projectId,
		projectDetails,
		categories,
		assignedCategories,
	});
};

const processAssignCategoriesForm = async (req, res) => {
	const projectId = req.params.projectId;
	const selectedCategoryIds = req.body.categoryIds || [];
	const categoryIdsArray = Array.isArray(selectedCategoryIds)
		? selectedCategoryIds
		: [selectedCategoryIds];

	await updateCategoryAssignments(projectId, categoryIdsArray);
	req.flash("success", "Categories updated successfully.");
	res.redirect(`/projects/${projectId}`);
};

export {
	categoriesPageController,
	showCategoryDetailsPage,
	showNewCategoryForm,
	processNewCategoryForm,
	showEditCategoryForm,
	processEditCategoryForm,
	showAssignCategoriesForm,
	processAssignCategoriesForm,
	categoryValidation,
};
