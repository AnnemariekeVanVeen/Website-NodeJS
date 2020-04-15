const models = require("../models");
const bcrypt = require("bcrypt");
const config = require("../config/config");

// Render View
const index = (req, res) => {
    res.render("auth/login")
};

// Render Register View
const register = (req, res) => {
    res.render("auth/register")
};

// Render Show View
const show = (req, res) => {
models.employees.findByPk(req.param('employee'))
        .then(employee => {
            res.render("auth/show", {
                employee: employee
            })
        })
};

// Add an employee with bcrypt to hash the pin
const add = (req, res) => {
    const pin = req.body.pin;

    bcrypt.hash(pin, 10, function (err, hash) {
        models.employees.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pin: hash
        }).then(
            res.redirect('/~annemarieke/dagtentamen/74/login')
        ).catch(err => {
            console.log(err);
            res.end();
        })
    })
};

// Check if the employee is authenticated before redirecting
const authenticate = (req, res) => {
    models.employees.findOne({
        where: {lastName: req.body.lastName}
    }).then(employee => {
        bcrypt.compare(req.body.pin, employee.pin, function (err, result) {
            if (result) {
                req.session.employeeObject = {
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    pin: employee.pin
                };
                res.redirect('/~annemarieke/dagtentamen/74/show/' + employee.id);
            } else {
                res.send("Fout wachtwoord")
            }
        })
    }).catch(err => {
        res.send(err)
    });
};

// Log out the employee by clearing the session
const destroy = (req, res) => {
    req.session.emplyeeObject = null;
    res.redirect('/~annemarieke/dagtentamen/74/');
};

// Export functions
module.exports = {
    index, add, authenticate, register, destroy, show
};