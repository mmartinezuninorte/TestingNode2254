import express from 'express'

const app = express()

app.use(express.json())

app.get("/ping", (req, res)=>{
    res.send("pong")
})

app.get("/tasks", (req,res)=>{
    res.json([])
})

app.post("/tasks", (req, res)=>{
    const {title, description} = req.body
    res.json({
        title,
        description,
        id: "ejemploID"
    })
})

export default app