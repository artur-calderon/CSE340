import db from "./db.js";

const getAllProjects = async () => {
	const query = `SELECT sp.project_id, sp.title, sp.organization_id, sp.date, o.name AS organization_name FROM public.service_project sp INNER JOIN public.organization o ON sp.organization_id = o.organization_id ORDER BY date;`;
	const result = await db.query(query);
	return result.rows;
};

export { getAllProjects };
