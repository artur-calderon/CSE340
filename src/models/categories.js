import db from "./db.js";

const getAllCategories = async () => {
	const query = `SELECT category_id, name FROM public.categories;`;
	const result = await db.query(query);
	return result.rows;
};

const getCategoryById = async (categoryId) => {
	const query = `SELECT category_id, name FROM public.categories WHERE category_id = $1;`;
	const values = [categoryId];
	const result = await db.query(query, values);
	return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {
	const query = `
		SELECT sp.project_id, sp.title, sp.description
		FROM public.service_project sp
		JOIN public.service_project_category c ON sp.project_id = c.project_id
		WHERE c.category_id = $1;
	`;
	const values = [categoryId];
	const result = await db.query(query, values);
	return result.rows;
};

const getCategoriesByProjectId = async (projectId) => {
	const query = `
		SELECT c.category_id, c.name
		FROM public.categories c
		JOIN public.service_project_category spc ON c.category_id = spc.category_id
		WHERE spc.project_id = $1;
	`;
	const values = [projectId];
	const result = await db.query(query, values);
	return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
	const query = `
		INSERT INTO public.service_project_category (project_id, category_id)
		VALUES ($1, $2);
	`;

	await db.query(query, [projectId, categoryId]);
};

const createCategory = async (name) => {
	const query = `
		INSERT INTO public.categories (name)
		VALUES ($1)
		RETURNING category_id;
	`;

	const result = await db.query(query, [name]);

	if (result.rows.length === 0) {
		throw new Error("Failed to create category");
	}

	return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
	const query = `
		UPDATE public.categories
		SET name = $2
		WHERE category_id = $1
		RETURNING category_id;
	`;

	const result = await db.query(query, [categoryId, name]);

	if (result.rows.length === 0) {
		throw new Error("Failed to update category");
	}

	return result.rows[0].category_id;
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
	const deleteQuery = `
		DELETE FROM public.service_project_category
		WHERE project_id = $1;
	`;

	await db.query(deleteQuery, [projectId]);

	for (const categoryId of categoryIds) {
		await assignCategoryToProject(projectId, categoryId);
	}
};

export {
	getAllCategories,
	getCategoryById,
	getProjectsByCategoryId,
	getCategoriesByProjectId,
	createCategory,
	updateCategory,
	updateCategoryAssignments,
};
