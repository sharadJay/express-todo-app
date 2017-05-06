var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todo');
var Schema = mongoose.Schema
var todo = new Schema({
    task: {type: String, default: ''}
});

var todoModel = mongoose.model('tasks', todo);

module.exports = function (app) {

    app.get("/todo", function (req, res) {
        todoModel.find({}, function (err, docs) {
            if(err) throw err;
            var tasks = []
            docs.forEach(function (currentDoc) {
                tasks.push(currentDoc.task)
            });
            res.render("todoPage.ejs", {"tasks": tasks})
        })
    });

    app.post("/todo", function (req, res) {
        todoModel(req.body).save(function (err, result) {
            if (err) throw err;
            res.redirect("/todo");
        })
    });

    app.delete("/tododelete/:task", function (req, res) {
        todoModel.findOne({"task": req.params.task.split("-").join(" ")}, function (err, result) {
            if(err) throw err;
            result.remove(function (err, result) {
                res.sendStatus(200);
            });
        });
    });
};