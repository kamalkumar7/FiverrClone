import express from "express"
import {} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/test", (req, res) => {
    res.send("it Works")
})

export default router;