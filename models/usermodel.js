var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var users= new Schema({
	name:String,
	username:String,
	password:{type:String},
	email:{type:String},
	contact:{type:Number,default:0},	
	role:{type:String,default:"user"},
});

module.exports=mongoose.model("users",users);