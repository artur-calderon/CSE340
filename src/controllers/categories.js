import {
	getAllCategories,
	getProjectsByCategoryId,
	getCategoryById,
	updateCategoryAssignments,
	getCategoriesByProjectId as getCategoriesByServiceProjectId,
} from "../models/categories.js";

import { getProjectDetails } from "../models/project.js";

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
	showAssignCategoriesForm,
	processAssignCategoriesForm,
};
