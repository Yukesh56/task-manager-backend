const {connectDB, sql} = require("../config/db")

// Method to create a new task in the database.
async function createTask(taskData) {
    try{
        const { project_id, title, description, due_date, status, priority } = taskData;
        console.log(due_date)
        const pool = await connectDB(); // Making connection with the DB

        const query = `
            INSERT INTO Tasks (project_id, title, description, due_date, status, priority)
            VALUES (@project_id, @title, @description, @due_date, @status, @priority);
            SELECT SCOPE_IDENTITY() AS task_id;
        `;

        const result = await pool.request()
            .input("project_id", sql.Int, project_id)
            .input("title", sql.NVarChar, title)
            .input("description", sql.NVarChar, description)
            .input("due_date", sql.DateTime, due_date || null)
            .input("status", sql.VarChar, status)
            .input("priority", sql.VarChar, priority)
            .query(query);

        return result.recordset[0];
    }
    catch(error){
        console.log("Error in createTask----->", error.message)
        throw new Error(error.message)
    }
};

// Method to get the tasks from the database to the respective project
async function getTasksByProject(projectId) {
    try{
        const pool = await connectDB();
        let query = `
        SELECT * FROM Tasks 
        WHERE project_id = @project_id AND delete_status = 0
        ORDER BY created_at DESC
        `
        const result = await pool.request()
        .input("project_id", sql.Int, projectId)
        .query(query);

        return result.recordset;
    }
    catch(error){
        console.log("Error in getTasksByProject----->", error.message)
        throw new Error(error.message)
    }
};

// Method to update a particular task
async function updateTask(taskId, updates) {
    try{
        const { title, description, due_date, status, priority } = updates;
  
        const pool = await connectDB();

        const query = `
            UPDATE Tasks
            SET title = @title,
                description = @description,
                due_date = @due_date,
                status = @status,
                priority = @priority
            WHERE task_id = @task_id;
        `;

        await pool.request()
            .input("task_id", sql.Int, taskId)
            .input("title", sql.NVarChar, title)
            .input("description", sql.NVarChar, description)
            .input("due_date", sql.DateTime, due_date || null)
            .input("status", sql.VarChar, status)
            .input("priority", sql.VarChar, priority)
            .query(query);
    }
    catch(error){
        console.log("Error in updateTask----->", error.message)
        throw new Error(error.message)
    }
  
}

// Method to delete the task (soft Delete)
async function softDeleteTask(taskId) {
    try{
        const pool = await connectDB();

        await pool.request()
        .input("task_id", sql.Int, taskId)
        .query(`UPDATE Tasks SET delete_status = 1 WHERE task_id = @task_id`);
    }
    catch(error){
        console.log("Error in softDeleteTask----->", error.message)
        throw new Error(error.message)
    }
};

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  softDeleteTask,
};
