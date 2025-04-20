import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './db/db'
dotenv.config()

const app = express()

//route
app.use('/', () => {
    
})

//middleware
const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`server started at http://localhost:${PORT}`)
    ConnectDB()
})


