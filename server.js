const express=require("express")
const path=require("path")

const PORT=process.env.PORT || 3001

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const fs=require("fs")

app.get("/api/notes",(req,res)=>{
    fs.readFile("./db/db.json","utf8",(err,data)=>{
        const newData=JSON.parse(data)
        res.json(newData)
    })
})

app.post("/api/notes", (req, res) => {
    
    fs.readFile("./db/db.json", "utf8", (err, data) => {
       if (err) {
           console.error(err);
           return res.status(500).json({ error: 'Error reading notes data' })
       }
       const notes = JSON.parse(data )
       const newNote = req.body
       newNote.id = notes.length + 1 
       notes.push(newNote);
       fs.writeFile("./db/db.json", JSON.stringify(notes, null,"\t"), (err) => {
           if (err) {
               console.error(err);
               return res.status(500).json({ error: 'Error writing new note' })
           }
           res.json(newNote)
       })
   })
})

app.delete("/api/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error Deleting Note' });
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId)
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Internal Server Error' })
            }
            res.status(204).send()
        })
    })
})
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})




app.listen(PORT,()=>{
    console.log("App is listening at PORT:http://localhost:"+PORT)
})