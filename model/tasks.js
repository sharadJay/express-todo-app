var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/todo';

var insertDocument = function (db, task, callback) {
    // Get the documents collection
    var collection = db.collection('tasks');
    // Insert some documents
    collection.insertMany([
        task
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 documents into the task collection");
        callback(db, result);
    });
}

var getDocuments = function (callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var collection = db.collection('tasks');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            var tasks = [];
            docs.forEach(function (currentDoc) {
                tasks.push(currentDoc.task)
            })
            db.close();
            return callback(tasks);
        });
    });
}


module.exports = {
    getTasks: function (renderCallback) {
        getDocuments(function (tasks) {
            renderCallback({"tasks": tasks});
        })
    },
    addTask: function (task) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            insertDocument(db, task, function () {
                db.close();
            });
        });
    },
    removeTask: function (task, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            var collection = db.collection('tasks');
            collection.deleteOne({"task": task.split("-").join(" ")}, function (err, result) {
                assert.equal(null, err);
                db.close();
                callback();
            });
        });

    }
}