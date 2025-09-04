import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
import leadRouter from "./routes/lead.routes.js"

//routes declaration
app.use("/api/v1/leads",leadRouter)


// http://localhost:3000/api/v1/leads/addLead




















export {app}