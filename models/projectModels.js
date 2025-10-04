const {connectDB, sql} = require("../config/db")

// Method to create a new Project
async function createProject(userId, projectName, description){
    try{
        const pool = await connectDB();
        console.log(userId, projectName, description)
        let query = `insert into Projects(user_id, name, description)
                    values(@user_id, @name, @description);
                    SELECT SCOPE_IDENTITY() AS project_id;`
        let result = await pool.request()
                    .input("user_id", sql.Int, userId)
                    .input("name", sql.NVarChar, projectName)
                    .input("description", sql.NVarChar, description)
                    .query(query)

        return result.recordset[0]
    }
    catch(error){
        console.log("Error in Creating project----->", error.message)
        throw new Error(error.message)
    }
};


// Method to get the projects to the respective user
async function getProjects(userId){
    try{
        console.log(userId)
        const pool = await connectDB();
        let query = `select project_id, name, description, created_at
                    from projects where user_id = @user_id`
        let result = await pool.request()
                     .input("user_id", sql.Int, userId)
                     .query(query)
        console.log(result)
        return result.recordset;
    }
    catch(error){
        console.log("Error in getProjects----->", error.message)
        throw new Error(error.message)
    }
};


// Method to update the project
async function updateProject(projectId, name, description){
    try{
        const pool = await connectDB();

        let query = `update projects set name = @name, description = @description
                        where project_id = @project_id`
        await pool.request()
        .input("name", sql.NVarChar, name)
        .input("description", sql.NVarChar, description)
        .input("project_id", sql.Int, projectId)
        .query(query)
    }
    catch(error){
        console.log("Error in updateProject----->", error.messageessage)
        throw new Error(error.message)
    }
};

//Method to delete the project(Hard Delete)
async function deleteProject(projectId){
    try{
        const pool = await connectDB();
        let query = `Delete projects where project_id = @project_id`
        await pool.request()
        .input("project_id", sql.Int, projectId)
        .query(query)
    }
    catch(error){
        console.log("Error in deleteProject----->", error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
}