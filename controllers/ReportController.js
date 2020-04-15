const models = require("../models");
const config = require("../config/config");
const moment = require("moment");

// Render View
const index = (req, res) => {
    models.reports.findAll()
        .then(reports => {
                res.render('reports/index', {
                    reports: reports,
                    moment: moment
                })
            }
        )
};

// Render View with create form
const create = (req, res) => {
    res.render("reports/create")
};

// Create and store a new report
const store = (req, res) => {
    models.reports.create({
        type: req.body.type,
        description: req.body.description,
        location: req.body.location,
        employeeId: req.body.employeeId,
        reporterName: req.body.reporterName,
        reporterPhoneNumber: req.body.reporterPhoneNumber
    }).then(
        res.redirect('/~annemarieke/dagtentamen/74/reports')
    ).catch(err => {
        console.log(err);
        res.end();
    })
};

// Render the show view for a specific report
const show = (req, res) => {
    models.reports.findByPk((req.param('report')))
        .then(report => {
            res.render("reports/show", {
                report: report
            })
        })
};

// Destroy a specific report
const destroy = (req, res) => {
    const report = req.params.report;

    models.reports.findByPk(report)
        .then(report => {
            report.destroy();
            res.redirect('/~annemarieke/dagtentamen/74/reports')
        }).catch(err => {
            console.log(err);
            res.end()
        })
};

// Export all functions
module.exports = {
    index, create, store, destroy, show
};
