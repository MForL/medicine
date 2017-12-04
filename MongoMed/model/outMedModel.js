var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var outMedSchema = new Schema({
    buyernum	: String,
    mednum   	: String,
    outPrice   	: String,
    outCount    : String,
    outDate    	: String,
    flag     	: { type: Number, default: 1 },
    date     	: { type: Date, default: Date.now }
});

var outMedModel = mongoose.model('out', outMedSchema);

module.exports = outMedModel;