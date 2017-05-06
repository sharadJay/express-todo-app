$(document).ready(function () {
    $(".close").click(function (e) {
        var taskToBeDelete = e.target.getAttribute("data-task").split(" ").join("-");
        console.log(taskToBeDelete);
        $.ajax({
            url: "/tododelete/"+taskToBeDelete,
            type: "DELETE",
            success: function(result) {
                console.log("reloaded")
                location.reload()
            }
        })
    });

});