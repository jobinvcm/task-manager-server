const mysqlController = require("../controller/mysqlController");
const firebaseController = require("../controller/firebaseController")

console.log(firebaseController)

var createTables = [
  {
    name:
      "CREATE TABLE IF NOT EXISTS `tasks` (`id` int(11) NOT NULL,`task` varchar(200) NOT NULL,`status` tinyint(1) NOT NULL DEFAULT '1',`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);"
  },
  {
    name:
      "CREATE TABLE IF NOT EXISTS `priority` (`id` int(11) NOT NULL,`task` varchar(200) NOT NULL,`status` tinyint(1) NOT NULL DEFAULT '1',`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);"
  },
  {
    name:
      "CREATE TABLE IF NOT EXISTS `users` (`id` int(11) NOT NULL,`name` varchar(200) NOT NULL, `username` varchar(200) NOT NULL,`password` varchar(200) NOT NULL,`status` tinyint(1) NOT NULL DEFAULT '1',`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);"
  }
];

var deleteTables = [{ name: "DROP TABLE IF EXISTS `tasks`;" }];

function postRoutes(app) {
  app.post("/add-task", function(req, res) {
    var reqBody = req.body;
    firebaseController.addContent(reqBody.refName, reqBody.data)
  });

  app.post("/check-user-signed-in", function(req, res) {
    var reqBody = req.body;
    firebaseController.checkUserSignedIn(reqBody.uid, reqBody.idToken, res);
  })
  app.post("/get-all-content", function (req, res) {
    var reqBody = req.body;
    firebaseController.getAllContent(reqBody.refName, res)
  })
  app.post("/get-all-users", function (req, res) {
    firebaseController.getAllContent("/Users", res)
  })
  app.post("/get-all-tasks-not-done", function (req, res) {
    firebaseController.getTodoTasks(res)
  })
  app.post("/get-all-tasks-done", function (req, res) {
    firebaseController.getDoneTasks(res)
  })
  app.post("/get-todays-tasks", function (req, res) {
    firebaseController.getTodaysTasks(res)
  })
  app.post("/get-weeks-tasks", function (req, res) {
    firebaseController.getWeeksTasks(res)
  })
  app.post("/get-status", function (req, res) {
    var taskId = req.body.taskId;
    firebaseController.getStatus(taskId, res)
  })
}

function getRoutes(app) {
  app.get("/add-tables", function(req, res) {
    createTables.forEach(function(tableQuery) {
      mysqlController.doQuery(tableQuery.name);
    });
    res.send("Tables Added");
  });

  app.get("/delete-tables", function(req, res) {
    deleteTables.forEach(function(tableName) {
      mysqlController.doQuery(tableName.name);
    });
    res.send("deleted");
  });

  app.get("/close-query", function(req, res) {
    mysqlController.closeQuery();
    res.send("closed");
  });
}

exports.postRoutes = function(app) {
  postRoutes(app);
};

exports.getRoutes = function(app) {
  getRoutes(app);
};
