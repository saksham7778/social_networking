const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');


router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',usersController.sign_up);
router.get('/sign-in',usersController.sign_in);

router.post('/create',usersController.create);
router.post('/create-session',  
                passport.authenticate('local',{failureRedirect: '/users/sign-in'}),usersController.createSession);

router.get('/sign-out',usersController.sign_out);

                                            

                                            
module.exports = router; 