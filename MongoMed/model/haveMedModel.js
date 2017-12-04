var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var haveMedSchema = new Schema({
    mednum   	: String,
    medname 	: String,
    havePrice   : String,
    haveCount   : String,
    guige    	: String,
    company    	: String,
    flag     	: { type: Number, default: 1 },
    date     	: { type: Date, default: Date.now }
});

var haveMedModel = mongoose.model('have', haveMedSchema);

module.exports = haveMedModel;