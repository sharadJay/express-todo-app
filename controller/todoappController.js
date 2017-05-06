var model = require("../model/tasks");

module.exports = function (app) {

    app.get("/todo", function (req, res) {
        model.getTasks(function(tasks){
            res.render("todoPage.ejs", tasks)
        });
    });

    app.post("/todo", function (req, res) {
        model.addTask(req.body);
        res.redirect("/todo");
    });

    app.delete("/tododelete/:task", function (req, res) {
        model.removeTask(req.params.task,function(){
            res.sendStatus(200)
        });
    });
};