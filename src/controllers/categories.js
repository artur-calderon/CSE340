import { getAllCategories } from "../models/categories.js";

const categoriesPageController = async (req, res) => {
	const title = "Service Categories";
	const categories = await getAllCategories();
	res.render("categories", { title, categories });
};

export { categoriesPageController };
