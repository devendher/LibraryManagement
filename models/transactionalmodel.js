var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var booksmodel=require('../models/booksmodel.js');

var transactions= new Schema({
	bookid:[{ type: Schema.Types.ObjectId, ref: 'books' }],
	username:{type:String},
	email:{type:String},
	contact:{type:Number},
	IssueDate:{type:Date,default:Date.now},
	DueDate:{type:Date},
	status:{type:String,default:'Barrowed'}
	
});

module.exports=mongoose.model("transactions",transactions);