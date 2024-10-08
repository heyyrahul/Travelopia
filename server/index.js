const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const {tripRouter} = require("./routes/trip.routes")
const { adminRouter } = require("./routes/admin.routes")


const app = express()
app.use(cors());
app.use(express.json())
app.use("/users", userRouter)
app.use("/admin",adminRouter)
app.use("/trips",tripRouter)
const port = process.env.PORT || 8080

app.use('/', (req, res) => {
	res.send('Server is running! ')
})
 
app.listen(port, async() => {
	try { 
		await connection
		console.log("connected to the DB")
		console.log(`Server is running at port ${port}`)
	} catch (err) {
		console.log(err)
	}
})   