import db from "./db.js";

const addVolunteerToProject = async (projectId, userId) => {
    const query = `INSERT INTO volunteer_signup (user_id, project_id) VALUES ($1, $2) ON CONFLICT (user_id, project_id) DO NOTHING RETURNING user_id, project_id;`;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows[0] || null;
};

const removeVolunteerFromProject = async (projectId, userId) => {
    const query = `DELETE FROM volunteer_signup WHERE user_id = $1 AND project_id = $2 RETURNING user_id, project_id;`;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows[0] || null;
};

const getProjectsForUser = async (userId) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.organization_id, sp.date, sp.description, sp.location, o.name AS organization_name
        FROM service_project sp
        INNER JOIN organization o ON sp.organization_id = o.organization_id
        INNER JOIN volunteer_signup vs ON sp.project_id = vs.project_id
        WHERE vs.user_id = $1
        ORDER BY sp.date;
    `;
    const params = [userId];
    const result = await db.query(query, params);
    return result.rows;
};

const isUserVolunteerForProject = async (projectId, userId) => {
    if (!userId) return false;
    const query = `SELECT 1 FROM volunteer_signup WHERE user_id = $1 AND project_id = $2 LIMIT 1;`;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

export { addVolunteerToProject, removeVolunteerFromProject, getProjectsForUser, isUserVolunteerForProject };
