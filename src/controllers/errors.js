export const errorMiddleware = (err, req, res, next) => {
	console.error("error occurred:", err.message);
	console.error("stack trace:", err.stack);

	const status = err.status || 500;
	const template = status === 404 ? "404" : "500";
	const context = {
		title: status === 404 ? "Page Not Found" : "Server Error",
		error: err.message,
		stack: err.stack,
	};
	res.status(status).render(`errors/${template}`, context);
};

export const testErrorController = (req, res, next) => {
	const err = new Error("This is a test error");
	err.status = 500;
	next(err);
};

export const notFoundErrorController = (req, res, next) => {
	const err = new Error("Page not found");
	err.status = 404;
	next(err);
};
