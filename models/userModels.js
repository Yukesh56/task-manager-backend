const {connectDB, sql} = require("../config/db")

//create a new user
async function createUser(name, email, passwordHash){
    try{
        const pool = await connectDB();
        let query = `insert into Users(name, email, password_hash)
                values(@name, @email, @password_hash)`
        await pool.request()
        .input("name",sql.NVarChar, name)
        .input("email", sql.NVarChar, email)
        .input("password_hash", sql.NVarChar, passwordHash)
        .query(query)
    }   
    catch(error){
        console.log("Error in Creating User----->", error.essage)
    }
    
};

//Get User by mail ID
async function getUserByEmail(email){
    try{
        const pool = await connectDB();
        let query = `select * from Users where email = @email`
        let result = await pool.request()
        .input("email", sql.NVarChar, email)
        .query(query)
        return result.recordset[0]
    }
    catch(error){
        console.log("Error in getting User by mailId----->", error.essage)
        
    }
}

module.exports = {
    createUser,
    getUserByEmail
}
