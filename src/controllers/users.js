import bcrypt from "bcrypt";
import {
	createNewUser,
	authenticateUser,
	getAllUsers,
} from "../models/users.js";
import { getProjectsForUser } from "../models/volunteers.js";

const showRegistrationForm = (req, res) => {
	res.render("user-registration", { title: "Register" });
};

const processUserRegistrationForm = async (req, res) => {
	const { name, email, password } = req.body;
	console.log("Received registration data:", { name, email }); // Log received data for debugging
	try {
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		const userId = await createNewUser(name, email, passwordHash);
		console.log("User created with ID:", userId);
		res.redirect("/login");
	} catch (error) {
		console.error("Error creating user:", error);
		req.flash("error", "Failed to create user. Please try again.");
		res.redirect("/register");
	}
};

const showLoginPage = (req, res) => {
	res.render("user-login", { title: "Login" });
};

const processLoginForm = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await authenticateUser(email, password);
		if (user) {
			req.session.user = user;
			req.session.userId = user.user_id; // ensure other controllers using userId work
			req.flash("success", "Login successful!");
			console.log("User authenticated:", user);
			return res.redirect("/dashboard");
		}
		req.flash("error", "Invalid email or password. Please try again.");
		return res.redirect("/login");
	} catch (error) {
		console.error("Error during authentication:", error);
		req.flash("error", "An error occurred during login. Please try again.");
		return res.redirect("/login");
	}
};

const processLogout = (req, res) => {
	req.flash("success", "You have been logged out.");
	req.session.destroy();
	res.redirect("/login");
};

const requireLogin = (req, res, next) => {
	if (!req.session.user || !req.session) {
		req.flash("error", "You must be logged in to access this page.");
		return res.redirect("/login");
	}
	next();
};

const requireRole = (role) => {
	return (req, res, next) => {
		if (!req.session || !req.session.user) {
			req.flash("error", "You must be logged in to access this page.");
			return res.redirect("/login");
		}

		if (req.session.user.role_name !== role) {
			req.flash(
				"error",
				"You do not have permission to access this page.",
			);
			return res.redirect("/");
		}
		next();
	};
};

const showDashboard = async (req, res) => {
	const user = req.session.user;
	const userId = req.session && req.session.userId;
	let volunteerProjects = [];
	if (userId) {
		volunteerProjects = await getProjectsForUser(userId);
	}

	res.render("dashboard", { title: "Dashboard", user, volunteerProjects });
};

const showAdminPage = (req, res) => {
	const title = "Admin Panel";
	res.render("admin-page", { title, user: req.session.user });
};

const showUsersPage = async (req, res) => {
	const title = "Registered users on the system";
	const usersRegistered = await getAllUsers();
	res.render("users-page", {
		title,
		users: usersRegistered,
	});
};

export {
	showRegistrationForm,
	processUserRegistrationForm,
	showLoginPage,
	processLoginForm,
	processLogout,
	requireLogin,
	requireRole,
	showDashboard,
	showAdminPage,
	showUsersPage,
};
