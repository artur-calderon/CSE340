import { getProjectsForUser } from "../models/volunteers.js";

export const indexPageController = (req, res) => {
	const title = "Home";
	res.render("home", { title });
};

export const showDashboardPage = async (req, res) => {
	const userId = req.session && req.session.userId;
	if (!userId) {
		req.flash("error", "You must be logged in to view your dashboard");
		return res.redirect("/");
	}

	const title = "Dashboard";
	const volunteerProjects = await getProjectsForUser(userId);
	res.render("dashboard", { title, volunteerProjects });
};
