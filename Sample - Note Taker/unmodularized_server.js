const express = require("express")
const path = require("path")
//process.env.PORT  is for deployment to heroku so Heroku can assigned a port number to identify the server
const PORT = process.env.PORT || 3001

const app = express()

//browser (input firstname =>"Phil") -> Phil=>kewhfkdshfs->app.use(kewhfkdshfs=>Phil)  ->server.js
//extended exact data from original after parsing.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const fs =require("fs")


//api routes


app.get("/api/notes",(req,res)=>{
  fs.readFile("./db/db.json","utf8",(err,data)=>{
    const newData= JSON.parse(data)
    res.json(newData)
  })
})


app.post("/api/notes",(req,res)=>{
   
})

app.get("/notes",(req,res)=>{
  res.sendFile( path.join(__dirname,"./public/notes.html") )
})


 

//html routes
//http://localhost:3001/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


 

app.listen(PORT, () => {
    console.log("App is listening at PORT: http://localhost:" + PORT)
})






