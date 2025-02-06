const express = require("express");
const mongoose = require("mongoose")
const app = express();
const categoryRoutes = require("./routes/category");
const port = 3000;

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Server running")
})

app.use("/category",categoryRoutes)

async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017",{
        dbName:"e-commerce-store-db"
    })
    console.log("mongodb connected successfully.")
}

connectDB().catch((error) => {
    console.error(error)
})
app.listen(port, () => {
    console.log("Server running on port :",port)
})