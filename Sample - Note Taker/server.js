const express = require("express")
const path = require("path")
//process.env.PORT  is for deployment to heroku so Heroku can assigned a port number to identify the server
const PORT = process.env.PORT || 3001

const app = express()
const route =require("./routes/index")
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


// modularized(put in separate files) the api routes
//http://localhost:3001/api
app.use("/api",route)




 




//html routes stay in server.js unmodularized
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






