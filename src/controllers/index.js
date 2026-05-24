export const indexPageController = (req, res) => {
	const title = "Home";
	res.render("home", { title });
};
