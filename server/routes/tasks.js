let express = require("express");
let router = express.Router();
let mongojs = require("mongojs");
let db = mongojs("mongodb://joseph:Ff_3156!@ds263837.mlab.com:63837/firstapp", ["tasks"]);


//Get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single tasks
router.get('/task/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
//Save tasks
router.post("/task", function(req, res, next){
    var tasks = req.body;
    if(!tasks.title || !(tasks.isDone + " ")){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.tasks.save(tasks, function(err, tasks){
            if(err){
                res.send(err);
            }
            res.json(tasks);
        });
    }
});
//Delete Task
router.delete('/task/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
//Update
router.put('/task/:id', (req, res, next) => {
    let tasks = req.body;
    let updTasks = {};
    
    if(tasks.isDone){
        updTasks.isDone = tasks.isDone;
    }

    if(tasks.title){
        updTasks.title = tasks.title;
    }

    if(!updTasks){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTasks, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;