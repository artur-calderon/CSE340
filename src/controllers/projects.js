import { getAllProjects } from "../models/project.js";

export const projectsPageController = async (req, res) => {
	const title = "Service Projects";
	const projects = await getAllProjects();
	res.render("projects", { title, projects });
};
