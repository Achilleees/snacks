//** Requiring in express.Router**//
const expressUser = require('express');
const routerUser = expressUser.Router();

//** Path to file controllers**//
const userControllerUser = require("../controllers/userController.js");
const cookieControllerUser = require("../controllers/cookieController.js");


routerUser.post('/signup', userControllerUser.createUser, cookieControllerUser.createSessionCookie, (req, res) => {
    res.status(200).json('success');
});

routerUser.post('/login', userControllerUser.verifyUser, cookieControllerUser.createSessionCookie, (req, res) => {
    res.status(200).json('success');
});

routerUser.post('/logout', cookieControllerUser.deleteSessionCookie, (req, res) => {
    res.status(200).json('success');
});

routerUser.get('/verifySession', cookieControllerUser.sessionValidation, (req, res) => {
    res.status(200).json({ status: true });
});

module.exports = routerUser;