import {
	getAllCategories,
	getProjectsByCategoryId,
	getCategoryById,
} from "../models/categories.js";

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

export { categoriesPageController, showCategoryDetailsPage };
