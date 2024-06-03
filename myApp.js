let express = require('express');
require('dotenv').config({
    path: './secrets.env'
});
let bodyParser = require('body-parser');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
// app.use((req, res, next) => {
//     console.log(req.method + ' ' + req.path + ' - ' + req.ip)
//     next();
// });
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
    let message = "Hello, JSON!";
    if(process.env.MESSAGE_STYLE == 'uppercase') message = message.toUpperCase(); 
    res.json(
        {
            "message": message
        }
    );
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send(
        {
            "time": req.time
        }
    );
})

app.get('/:word/echo', (req, res) => {
    res.json(
        {
            "word": req.params.word
        }
    )
})

app.route('/name')
.get((req, res) => {
    let name = req.query.first + ' ' + req.query.last;
    res.json(
        {
            'name': name
        }
    );
})
.post((req, res) => {
    res.json({
        'name': req.body.first + ' ' + req.body.last
    })
});

 module.exports = app;
