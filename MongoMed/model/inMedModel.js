var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var inMedSchema = new Schema({
    num 	 	: String,
    mednum   	: String,
    inPrice   	: String,
    inCount    	: String,
    inDate 		: String,
    Date    	: { type: Date, default: Date.now   },
    provider    : String,
    flag     	: { type: Number, default: 1 }
});

var inMedModel = mongoose.model('in', inMedSchema);

module.exports = inMedModel;