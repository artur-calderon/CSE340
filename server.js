import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./src/route.js";
import { testConnection } from "./src/models/db.js";
import {
	notFoundErrorController,
	errorMiddleware,
} from "./src/controllers/errors.js";
import session from "express-session";
import flashMiddleware from "./src/middleware/flash.js";

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 60 * 1000 }, // Session expires after 60 minutes of inactivity
	}),
);

// Allow Express to receive and process common POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flashMiddleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views")); // Set the views directory

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	if (NODE_ENV === "development") {
		console.log(`${req.method} ${req.url}`);
	}

	res.locals.isLogged_in = false;
	if (req.session.user) {
		res.locals.isLogged_in = true;
		res.locals.user = req.session.user;
	}
	next();
});

app.use((req, res, next) => {
	res.locals.NODE_ENV = NODE_ENV;
	next();
});

// Expose current user id to views (if any). The app uses `req.session.userId` when authenticated.
app.use((req, res, next) => {
	res.locals.currentUserId = req.session && req.session.userId;
	next();
});

app.use(router);

app.use(notFoundErrorController);
app.use(errorMiddleware);

app.listen(PORT, async () => {
	try {
		await testConnection();
		console.log(`Server is running at http://127.0.0.1:${PORT}`);
		console.log(`Environment: ${NODE_ENV}`);
	} catch (error) {
		console.error("Error connecting to the database: ", error);
	}
});
