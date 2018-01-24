let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

let index = require("./server/routes/index");
let tasks = require("./server/routes/tasks");

let app = express();

const port = process.env.PORT || 8080;

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Set static folder
app.use(express.static(path.join(__dirname, "dist")));
 
//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);
app.use("/api", tasks);

app.listen(port, ()=> console.log("Server Started on port 3000"));