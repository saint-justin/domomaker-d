const requireLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requireLogout = (req, res, next) => {
  if (req.session.account) {
    return res.direct('./maker');
  }
  return next();
};

const requireSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostnane}${req.url}`)
  }
  return next();
};

module.exports = {
  requiresLogin,
  requiresLogout,
}

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}