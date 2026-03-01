import cors from 'cors'
import express from 'express'
import predictRoutes from './routes/predictRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import cookieparser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use("/api/auth" , authRoutes)

const PORT = process.env.PORT ||5000


//routes
app.use("/api" , predictRoutes)

app.listen(PORT, ()=> {
    console.log(`Backend running at ${PORT}`)
})