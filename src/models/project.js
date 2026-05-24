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

export {
	getAllProjects,
	getProjectByOrganizationId,
	getUpcomingProjects,
	getProjectDetails,
};
