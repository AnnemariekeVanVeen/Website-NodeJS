const express = require("express");
const controllers = require("../controllers/index");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// User routes
router
    .get("/", controllers.HomeController.index)
    .get("/login", controllers.EmployeeController.index)
    .get("/register", controllers.EmployeeController.register)
    .get("/logout", controllers.EmployeeController.destroy)
    .get("/show/:employee", controllers.EmployeeController.show)
    .post("/add", controllers.EmployeeController.add)
    .post("/authenticate", controllers.EmployeeController.authenticate);

// Report routes
router
    .get("/reports", controllers.ReportController.index)
    .get("/create", controllers.ReportController.create)
    .get("/showReport/:report", controllers.ReportController.show)
    .post("/storeReport", controllers.ReportController.store)
    .post("/destroyReport/:report", controllers.ReportController.destroy);

module.exports = router;
