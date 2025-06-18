const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getItems, createItem } = require('../controllers/itemsController');
const { getUser, login, register, updateUsername, deleteUser } = require('../controllers/userController');

router.post('/login', login);
router.post('/register', auth, register);
router.put('/users/:id', auth, updateUsername);
router.delete('/users/:id', auth, deleteUser);
router.get('/users', auth, getUser);
router.get('/items', getItems);
router.post('/items/create', createItem);

module.exports = router;