module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please login to view this resource");
    res.redirect(`/login?dest=${req._parsedOriginalUrl.href}`);
  },
  isAdmin: function (req, res, next) {
    if (req.user?.role === "Admin") {
      return next();
    }
    req.flash("error_msg", "please login as admin to view this resource");
    res.redirect(`/login?dest=${req._parsedOriginalUrl.href}`);
    
  },
};
