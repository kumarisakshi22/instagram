const express = require("express");
const app = express()
const port = process.env.port || 5000;
const mongoose = require("mongoose")
const { mongoURL } = require("./keys")
const cors = require("cors")
const path = require("path")


app.use(cors())
require("./models/model")
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"))
mongoose.connect(mongoURL)
mongoose.connection.on("connected", () => {
    console.log("succesfully connected to mongo");
})

mongoose.connection.on("error", () => {
    console.log("Not connected to mongo");
})

//serving the frontend 
app.use(express.static(path.join(__dirname, "./frontend/build")))

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "./frontend/build/index.html"),
//         function (err) {
//             res.status(500).send(err)
//         }
//     )
// })

app.use('/', function(req, res, next) {
    console.log('req is -> %s', req.url);
    if (req.url == '/dashboard') {
        console.log('redirecting to  -> %s', req.url);
        res.render('dashboard');
    } else {
        res.render('index');
    }

});
app.listen(port, () => {
    console.log("server is running at "+port);
})

