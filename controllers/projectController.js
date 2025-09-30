const projectModel = require("../models/projectModels")

//controller method to create a project
async function createProject(req, res){
    try {
        const { name, description } = req.body;
        const userId = req.user.userId;
        const project = await projectModel.createProject(userId, name, description);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};


// Controller method to get the projects
async function getProjects(req, res){
  try {
    console.log("Inside the method");
    
    const userId = req.user.userId;
    const projects = await projectModel.getProjects(userId);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// controller method to update the project
async function updateProject(req, res){
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    await projectModel.updateProject(id, name, description);
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Controller method to delete the project
async function deleteProject(req, res){
  try {
    const { id } = req.params;
    await projectModel.deleteProject(id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};


module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
}
