const ensureAuthenticated = (req, res, next) => {
    // This app uses `req.session.userId` to track authenticated users.
    if (req.session && req.session.userId) {
        return next();
    }
    req.flash("error", "You must be logged in to perform that action");
    return res.redirect("/");
};

export { ensureAuthenticated };
