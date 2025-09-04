import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {app} from "./app.js"

dotenv.config();


connectDB()
.then(() => {

    app.on("ERROR", (err) => {
        console.log("ERROR",err);
        throw err;
    })

    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB CONNECTION FAILED!!!",err);
});



