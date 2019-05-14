require("dotenv").config();

var keyName = process.env.F_SECRETKEY;
var admin = require("firebase-admin");

var serviceAccount = require(`../${keyName}`);

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nucleustechnology-b578d.firebaseio.com",
  storageBucket: process.env.F_STORAGEBUCKET
});

function checkUserSignedIn(uid, idToken, res) {
  app
    .auth()
    .verifyIdToken(idToken, true)
    .then(payLoad => {
      if (uid === payLoad.uid) {
        console.log(payLoad);
        res.send({ signedIn: true });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
function addContent(refName, data) {
  app
    .database()
    .ref(refName)
    .set(data);
}
function getAllContent(refName, res) {
  var ref = app.database().ref(refName);

  ref.on(
    "value",
    function(snapshot) {
      res.send(snapshot.val());
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}
function getTodoTasks(res) {
  var ref = app.database().ref("/tasks");
  ref
    .orderByChild("status")
    .equalTo(false)
    .on(
      "value",
      function(snapshot) {
        res.send(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function getDoneTasks(res) {
  var ref = app.database().ref("/tasks");
  ref
    .orderByChild("status")
    .equalTo(true)
    .on(
      "value",
      function(snapshot) {
        res.send(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function getStatus(taskId ,res) {
  var ref = app.database().ref(`/tasks/${taskId}/status`);
  ref
    .on(
      "value",
      function(snapshot) {
        res.send(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function getTodaysTasks(res) {
  var ref = app.database().ref("/tasks");
  ref
    .orderByChild("dueDate")
    .equalTo(new Date().toDateString())
    .on(
      "value",
      function(snapshot) {
        var tasks = snapshot.val();
        var tasksItems = { tasksDone: [], tasksNotDone: [] };
        if (tasks) {
          Object.keys(tasks).forEach(function(key) {
            if (tasks[key].status) {
              tasksItems.tasksDone.push(tasks[key]);
            } else {
              tasksItems.tasksNotDone.push(tasks[key]);
            }
          });
        }
        res.send(tasksItems);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function getWeeksTasks(res) {
  var ref = app.database().ref("/tasks");
  var today = new Date()
  var now = parseInt(today.getTime());
  var oneWeek   = (new Date().setDate(today.getDate()+7));
  var newOneWeek = new Date(oneWeek).getTime()
  
  ref
    .orderByChild("dueDateTimestamp")
    .startAt(now)
    .endAt(parseInt(newOneWeek))
    .once(
      "value",
      function(snapshot) {
        var tasks = snapshot.val();
        var tasksItems = { tasksDone: [], tasksNotDone: [] };
        if (tasks) {
          Object.keys(tasks).forEach(function(key) {
            if (tasks[key].status) {
              tasksItems.tasksDone.push(tasks[key]);
            } else {
              tasksItems.tasksNotDone.push(tasks[key]);
            }
          });
        }
        res.send(tasksItems);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function addUser(params) {
  app.auth().createUser({
    email: params.username,
    password: params.password
  });
}
function userLogin(params) {
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(params)
    .then(function(user) {
      console.log(user);
    })
    .catch(function(error) {
      console.log(error);
    });
}

module.exports = {
  firebaseInint: () => firebaseInit(),
  addContent: (refName, data) => addContent(refName, data),
  checkUserSignedIn: (uid, idToken, res) => checkUserSignedIn(uid, idToken, res),
  addUser: (params) => addUser(params),
  userLogin: (params) => userLogin(params),
  getAllContent: (refName, res) => getAllContent(refName, res),
  getTodoTasks: (res) => getTodoTasks(res),
  getDoneTasks: (res) => getDoneTasks(res),
  getTodaysTasks: (res) => getTodaysTasks(res),
  getStatus: (res) => getStatus(res),
  getWeeksTasks: (res) => getWeeksTasks(res)
}
