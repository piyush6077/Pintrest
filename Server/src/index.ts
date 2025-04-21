import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './db/db'
import authRouter from './route/auth.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT


//middleware
app.use(express.json())

//route
app.use("/api/v1/auth", authRouter)


app.listen(PORT, ()=> {
    console.log(`server started at http://localhost:${PORT}`)
    ConnectDB()
})


