const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const jobsController = require('../controllers/jobsControllers');

// custumer routes

router.get('/jobs', jobsController.jobs);
router.get('/adminJobList', jobsController.adminJobList);
router.get('/create_job', jobsController.create_job);
router.get('/editJob/:id', jobsController.editJob);
router.post('/editJob/:id', jobsController.postEditJob);
router.post('/create_job', jobsController.postCreate_job);
router.post('/adminJobList/:id', jobsController.postDeleteJob);

router.get('/', userController.homepage);
router.get('/login', userController.login);
router.get('/contact', userController.contact);
router.get('/signup', userController.signup);
router.get('/apply', userController.apply);
router.get('/admin', userController.admin);
router.get('/logout', userController.logout);
router.get('/editApplicant/:id', userController.editApplicant);
router.get('/studentApp', userController.studentApp);

/////////POST ROUTES/////////
router.post('/login', userController.postLogin);
router.post('/editApplicant/:id', userController.postEditApplicant);
router.post('/sign_up', userController.postSignup);
router.post('/apply', userController.postApply);
router.post("/deleteApplicant/:id", userController.postDeleteApplicant);
router.post('/search', userController.postSearch);
router.post('/studentApp/:id', userController.postStudentApp)
router.post('/updateStatus/:applicant_id', userController.postUpdateStatus);

module.exports = router;