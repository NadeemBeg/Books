var mongoose = require("mongoose");

var booksInfo = new mongoose.Schema(
{
	name: {
		type: String,
		optional: false,
		required: true,
        trim:true
	},
	image_url:{
		type: String,
		trim:true,
		optional: true
	},
    author: {
		type: String,
		optional: false,
		required: true,
        trim:true
	},
    fileName:{
        type: String,
		optional: false,
		required: true,
        trim:true
    },
    pages: {
		type: Number,
        default:0
	},
    price: {
		type: Number,
        default:0
	},
	isDelete:{
		type: Boolean,
		default:false
	}
},
	{ timestamps: true }
);
module.exports = mongoose.model("BooksInfo", booksInfo);