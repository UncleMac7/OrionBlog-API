const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/Users");
const postRoute = require("./Routes/Posts");
const categoriesRoute = require("./Routes/Categories");
const multer = require("multer");
const cors = require('cors');
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    

}).then (console.log("MongoDB is Connected")).catch((err)=> console.log(err))


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },filename:(req,file,cb) =>{
        cb(null,req.body.name)
    },
});

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
});

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/category",categoriesRoute)


app.listen("3001", () => {
    console.log("Server is running");

});