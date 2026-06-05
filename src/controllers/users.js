import bcrypt from "bcrypt";
import { createNewUser, authenticateUser } from "../models/users.js";

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
			req.flash("success", "Login successful!");
			console.log("User authenticated:", user);
			return res.redirect("/");
		}
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

export {
	showRegistrationForm,
	processUserRegistrationForm,
	showLoginPage,
	processLoginForm,
	processLogout,
};
