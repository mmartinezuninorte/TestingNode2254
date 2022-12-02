import express from 'express'

const app = express()

app.use(express.json())

app.get("/ping", (req, res)=>{
    res.send("pong")
})

app.get("/tasks", (req,res)=>{
    res.json([])
})

//  ||
app.post("/tasks", (req, res)=>{
    const {title, description} = req.body
    if (!title || !description) return res.status(400).json({message:"Bad Request"})
    res.json({
        title,
        description,
        id: "ejemploID"
    })
})

export default app