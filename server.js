import app from "./src/app";
import connectDB from "./src/config/db";


await connectDB()

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})