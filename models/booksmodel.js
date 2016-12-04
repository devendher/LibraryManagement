var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var books= new Schema({
	name:String,
	booktype:{type:String},
	author:String,
	quantity:{type:Number},
	status:{type:String,default:'Available'}
	
});

module.exports=mongoose.model("books",books);