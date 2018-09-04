'use strict'

module.exports = function(app) {
    console.log("- - - - A")
    var controller = require('../controllers');

    app.route('/newdisc')
        .post(controller.add_new_disc);

    app.route('/getdiscs')
    	.post(controller.get_discs);

}
