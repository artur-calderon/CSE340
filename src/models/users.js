import db from "./db.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
	const query =
		"SELECT u.user_id, u.name, u.email, r.role_name FROM public.users u JOIN roles r ON u.role_id = r.role_id";

	const result = await db.query(query);
	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("Executed SQL:", query);
	}
	return result.rows;
};

const createNewUser = async (name, email, passwordHash) => {
	const default_role = "user"; // Assuming 'user' is the default role name
	const query = `INSERT INTO public.users (name, email,  password_hash, role_id) VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) RETURNING user_id;`;

	const values = [name, email, passwordHash, default_role];
	const result = await db.query(query, values);
	if (result.rows.length === 0) {
		throw new Error("Failed to create user");
	}

	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("Executed SQL:", query);
		console.log("With values:", values);
	}

	return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
	const query =
		"SELECT u.user_id, u.name, u.email, u.password_hash, u.role_id, r.role_name FROM public.users u JOIN roles r ON u.role_id = r.role_id WHERE email = $1;";
	const values = [email];
	const result = await db.query(query, values);

	if (result.rows.length === 0) {
		return null; // No user found with the given email
	}
	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("Executed SQL:", query);
		console.log("With values:", values);
	}
	return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
	return await bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
	const user = await findUserByEmail(email);
	if (!user) {
		return null; // User not found
	}
	const isPasswordValid = await verifyPassword(password, user.password_hash);
	if (!isPasswordValid) {
		return null; // Invalid password
	}
	if (process.env.ENABLE_SQL_LOGGING === "true") {
		console.log("User authenticated successfully:", user.email);
	}

	return user; // Authentication successful
};

export { createNewUser, authenticateUser, getAllUsers };
