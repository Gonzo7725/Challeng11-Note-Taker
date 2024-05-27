const router=require("express").Router()
const fs =require("fs")
//http://localhost:3001/api/notes/
router.get("/",(req,res)=>{
    fs.readFile("./db/db.json","utf8",(err,data)=>{
      const newData= JSON.parse(data)
      res.json(newData)
    })
  })
  
  
  router.post("/api/notes",(req,res)=>{
     
  })

  module.exports=router
