const express = require("express");
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

router.use(authMiddleware)
//router to create project
router.post('/createproject', projectController.createProject);

//router to get the projects
router.get('/getprojects', projectController.getProjects);

// router to update project
router.put('/:id', projectController.updateProject);

//router to delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;