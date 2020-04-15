const models = require("../models");
const config = require("../config/config");

// Render View
const index = (req, res) => {
    res.render('home/index');
};

// Export functions
module.exports = {
    index
};
