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

export { getAllProjects, getProjectByOrganizationId };
