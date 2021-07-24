require('dotenv').config()

const express = require('express'),
    PORT = process.env.PORT || 3010;

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(PORT, (e)=>{
    if(e) console.log(e);
    console.log(`App is listening on PORT ${PORT}`);
})