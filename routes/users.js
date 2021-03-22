const express = require('express');
const User = require('../models/user');
const router = express.Router();

// All Users Route
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index', {
            users: users,
        });
    } catch (error) {
        res.redirect('/');
    }
});

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() });
});

// Create User Route
router.post('/', async (req, res) => {
    const user = new User({
        personal_number: req.body.personal_number,
        account_number: 1212121212,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        city: req.body.city,
    });
    try {
        const newUser = await user.save();
        res.redirect(`/users/${newUser.id}`);
    } catch {
        res.render('users/new', {
            user: user,
            errorMessage: 'Error creating user',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('users/show', {
            user: user,
        });
    } catch {
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('users/edit', { user: user });
    } catch {
        res.redirect('/users');
    }
});

router.put('/:id', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        user.first_name = req.body.first_name;
        await user.save();
        res.redirect(`/users/${user.id}`);
    } catch {
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('users/edit', {
                user: user,
                errorMessage: 'Error updating User',
            });
        }
    }
});

router.delete('/:id', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        await user.remove();
        res.redirect(`/users`);
    } catch {
        if (user == null) {
            res.redirect('/');
        } else {
            res.redirect(`/users/${user.id}`);
        }
    }
});

module.exports = router;
