import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './db/db'
import authRouter from './route/auth.routes'
import cookieParser from 'cookie-parser'
import userRouter from './route/user.routes'
import followRouter from './route/follow.route'
import pinRouter from './route/pins.route'
import boardRouter from './route/boards.route'
import pinBoardRouter from './route/pinBoard.route'
import likesRouter from './route/likes.route'
import commentRouter from './route/comment.route'
import notificationRouter from './route/notification.route'
dotenv.config()

const app = express()
const PORT = process.env.PORT

//middleware
app.use(express.static("public")) 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//route
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/follow", followRouter)
app.use("/api/v1/pin", pinRouter)
app.use("/api/v1/boards", boardRouter)
app.use("/api/v1/pinBoard", pinBoardRouter)
app.use("/api/v1/likes", likesRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/notification", notificationRouter)

app.listen(PORT, ()=> {
    console.log(`server started at http://localhost:${PORT}`)
    ConnectDB()
})


