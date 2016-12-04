var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var booksmodel=require('../models/booksmodel.js');

var dt=new Date();
var newdate=dt.setDate(dt.getDate() + 5);
var transactions= new Schema({
	bookid:[{ type: Schema.Types.ObjectId, ref: 'books' }],
	username:{type:String},
	email:{type:String},
	contact:{type:Number},
	IssueDate:{type:Date,default:Date.now},
	DueDate:{type:Date,default:newdate},
	status:{type:String,default:'Borrowed'}
	
});

module.exports=mongoose.model("transactions",transactions);