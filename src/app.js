import express from "express"


const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
import leadRouter from "./routes/lead.routes.js"

//routes declaration
app.use("/api/v1/leads",leadRouter)


// http://localhost:3000/api/v1/leads/addLead




















export {app}