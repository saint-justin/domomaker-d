const models = require('../models');

const { Account } = models;

// ----------------------- GET request handling -----------------------
const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
};

const logout = (req, res) => {
  res.redirect('/');
};

// ----------------------- PUT request handling -----------------------
const login = (req, res) => {
  // TODO
};

const signup = (req, res) => {
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) return res.status(400).json({ error: 'All fields are required' });
  if (req.body.pass !== req.body.pass2) return res.status(400).json({ error: 'Passwords do not match' });

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();

    savePromise.then(() => res.json({ redirect: '/maker' }));
    savePromise.catch((err) => {
      console.log(err);
      if (err.code = 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }
      return res.status(400).json({ error: 'An unaccounted for error has occurred' });
    });
  });
};

module.exports = {
  loginPage,
  signupPage,
  login,
  logout,
  signup,
};
