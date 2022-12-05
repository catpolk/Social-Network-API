const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.send('Hello, users!');
// });

const {
    getUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router; 