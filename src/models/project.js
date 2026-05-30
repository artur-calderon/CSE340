import db from "./db.js";

const getAllProjects = async () => {
	const query = `SELECT sp.project_id, sp.title, sp.organization_id, sp.date, o.name AS organization_name FROM public.service_project sp INNER JOIN public.organization o ON sp.organization_id = o.organization_id ORDER BY date;`;
	const result = await db.query(query);
	return result.rows;
};

const getProjectByOrganizationId = async (organizationId) => {
	const query = `SELECT sp.project_id, sp.title, sp.organization_id, sp.date, o.name AS organization_name FROM public.service_project sp INNER JOIN public.organization o ON sp.organization_id = o.organization_id WHERE sp.organization_id = $1 ORDER BY date;`;
	const queryParams = [organizationId];
	const result = await db.query(query, queryParams);
	return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
	const query = `SELECT sp.project_id, sp.title, sp.organization_id, sp.date, sp.description, o.name AS organization_name FROM public.service_project sp INNER JOIN public.organization o ON sp.organization_id = o.organization_id WHERE sp.date >= CURRENT_DATE ORDER BY date LIMIT $1;`;
	const queryParams = [number_of_projects];
	const result = await db.query(query, queryParams);
	return result.rows;
};

const getProjectDetails = async (projectId) => {
	const query = `SELECT sp.project_id, sp.title, sp.organization_id, sp.date, sp.description, sp.location, o.name AS organization_name FROM public.service_project sp INNER JOIN public.organization o ON sp.organization_id = o.organization_id WHERE sp.project_id = $1;`;
	const queryParams = [projectId];
	const result = await db.query(query, queryParams);
	return result.rows[0];
};

const createProject = async (
	title,
	organizationId,
	date,
	description,
	location,
) => {
	const query = `INSERT INTO public.service_project (title, organization_id, date, description, location) VALUES ($1, $2, $3, $4, $5) RETURNING project_id;`;
	const queryParams = [title, organizationId, date, description, location];
	const result = await db.query(query, queryParams);

	if (result.rows.length === 0) {
		throw new Error("Failed to create project");
	}

	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("Created new project with ID:", result.rows[0].project_id);
	}

	return result.rows[0].project_id;
};

const updateProject = async (
	projectId,
	title,
	organizationId,
	date,
	description,
	location,
) => {
	const query = `
		UPDATE public.service_project
		SET title = $2, organization_id = $3, date = $4, description = $5, location = $6
		WHERE project_id = $1
		RETURNING project_id;
	`;
	const queryParams = [
		projectId,
		title,
		organizationId,
		date,
		description,
		location,
	];
	const result = await db.query(query, queryParams);

	if (result.rows.length === 0) {
		throw new Error("Failed to update project");
	}

	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("Updated project with ID:", projectId);
	}

	return result.rows[0].project_id;
};

export {
	getAllProjects,
	getProjectByOrganizationId,
	getUpcomingProjects,
	getProjectDetails,
	createProject,
	updateProject,
};
