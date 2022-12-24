module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please login to view this resource");
    res.redirect(`/login?dest=${req._parsedOriginalUrl.href}`);
  },
  isAdmin: function (req, res, next) {
    if (req.user?.role !== "Admin") {
      res.status(401);
      res.render("unauthorized", {
        title: "401",
        layout: "layout/main-layout",
        cssName: "notfound",
      });
    } else {
      return next();
    }
    // req.flash("error_msg", "please login as admin to view this resource");
  },
};
