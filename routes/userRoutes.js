const express=require('express')
const { userSignUp } =require('../controllers/userSinUp');
const {userSignIn} =require('../controllers/userSinIn');
const userLogout=require('../controllers/userLogout');
const { forgotPassword } = require('../controllers/forgotPassword');
const { resetPassword } = require('../controllers/resetPassword');
// const authToken =require ('../midlleware/authToken')
// const {registreValidation,validator}=require('../midlleware/Validator')


const router = express.Router();
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: User Signup
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new account.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the new account.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created user.
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: The username of the new user.
 *                   example: johndoe
 *       400:
 *         description: Invalid input or missing required fields.
 */

router.post('/signup', userSignUp);

router.post('/signin', userSignIn);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

//router.post("/signup",userSinUp)

// router.post('/signup', function(req,res){
//     userSinUp
// });
// router.post('/signin', function(req,res){
//     userSinIn
// });
// // router.post('/logout', userLogout);
// router.post('/logout', function(req,res){
//     userLogout
// });

module.exports=router;