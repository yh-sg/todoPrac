//Dependencies
require('dotenv').config()
const express = require('express'),
    mysql = require('mysql2/promise');

//variables
const PORT = process.env.PORT || 3010,
    app = express(),
    SLEECTALLQUERY = `SELECT * FROM todo`,
    SLEECTONEQUERY = `SELECT * FROM todo WHERE id=?`,
    INSERTQUERY = `INSERT INTO todo (title, description) VALUES (?, ?)`,
    UPDATEQUERY = `UPDATE todo SET title=?, description=? WHERE id=?`,
    DELETEQUERY = `DELETE FROM todo WHERE id=?`;
//! For update and delete must always remember to put WHERE. 
//! Otherwise will delete/update everything. 

//Sql connection pool
const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    port:parseInt(process.env.port),
    password:process.env.password,
    waitForConnections: true,
    connectionLimit:4,
})

//Start app function^^
const startApp = async(app,pool) => {
    try {
        const conn = await pool.getConnection();

        console.log("Pinging database....?");
        await conn.ping();
        conn.release();
        
        app.listen(PORT, (e)=>{
            if(e) console.log(e);
            console.log(`App is listening on PORT ${PORT}`);
        })
    } catch (e) {
        console.log("Error, cannot ping to data", e);
    }
}

//MiddleWares
app.use(express.json()); //middleware which parses json, for the body/header

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/todos",async(req,res)=>{
    //!Get connection from sql
    const conn = await pool.getConnection()

    try {
        const result = await conn.query(SLEECTALLQUERY);
        //! Deconstruct results return from sql statement
        const [rows, fields] = result;
        //!https://www.restapitutorial.com/httpstatuscodes.html FYI status code
        res.status(200).json({data: rows})
    } catch (e) {
        res.status(404).json({message: "Unable to get all data"})
    } finally {
        //!Must release everytime after done with database.
        conn.release()
    }
})

app.get("/todo/:id",async(req,res)=>{
    const conn = await pool.getConnection(),
        id = req.params.id
    //*Resources
    //*e.g. http://localhost:4000/todo/1
    //*Breakdown
        //! http:// -> Protocol/Scheme
        //! localhost -> Domain name
        //! :4000 -> Port
        //! path -> /todo/1
        //! request params from the path, :id. from the example, :id is 1

    try {
        const result = await conn.query(SLEECTONEQUERY,[id]);
        const [rows, fields] = result;
        res.status(200).json({data: rows})
    } catch (e) {
        res.status(404).json({message: "Unable to get the data", e})
    } finally {
        conn.release()
    }
})

app.post("/createTodo",async(req,res)=>{
    const conn = await pool.getConnection(),
        {title, description} = req.body;
        //!request body that was feed into it.
    try {
        const insert = await conn.query(INSERTQUERY,[title, description]);
        const id = insert[0].insertId;
        const result = await conn.query(SLEECTONEQUERY,[id]);
        res.status(201).json({
            data: result[0]
        })
        
    } catch (e) {
        res.status(409).json({message: e})
    } finally {
        conn.release()
    }
})

app.put("/updateTodo/:id",async(req,res)=>{
    const conn = await pool.getConnection(),
        {title, description} = req.body,
        id = req.params.id
    try {
        await conn.query(UPDATEQUERY,[title, description, id]);
        const result = await conn.query(SLEECTONEQUERY,[id]);
        res.status(201).json({
            data: result[0]
        })
        
    } catch (e) {
        res.status(409).json({message: e})
    } finally {
        conn.release()
    }
})

app.delete("/deleteTodo/:id",async(req,res)=>{
    const conn = await pool.getConnection()
        id = req.params.id;
    try {
        const result = await conn.query(SLEECTONEQUERY,[id]);
        await conn.query(DELETEQUERY,[id]);
        res.status(201).json({
            data: result[0]
        })
    } catch (e) {
        res.status(405).json({message: e})
    } finally {
        conn.release()
    }
})

startApp(app, pool);