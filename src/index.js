const express = require("express")
const mongoose = require("mongoose")
const route= require("./routes/route")
const app = express()
app.use(express.json())

const url = "mongodb+srv://raje-2565:vluxhd2m5OOHIg@cluster0.j5omh.mongodb.net/card"
mongoose.connect(url, { useNewUrlParser: true }
).then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err))


app.use("/", route)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("App is running on port" + port)
})