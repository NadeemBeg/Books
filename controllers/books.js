const booksModel = require("../models/books");
var multer = require('multer');
const { findById } = require("../models/books");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req.bodyreq.bodyreq.body1222222", file);
        cb(null, "./books_Image");
    },
    filename: (req, file, cb) => {
        if (file) {
            var data = req.body;
            console.log("data", data);
            cb(null, (new Date()).getTime() + file.originalname);//png
        }
        else {
            cb({
                status: 404,
                message: "File Not Found"
            });
        }
    }
});

const createBookWithImage = multer({ storage: storage }).single('uploadBookImage');

exports.bookCreate = async (req, res) => {
    createBookWithImage(req, res, err => {
        if (err) {
            return res.json(err);
        }
        else {
            var files = req.file;
            console.log("files", files);
            if (files !== null) {
                var image_url = process.env.HOST + files.path;
                var fileName = files.filename;
                var data = req.body;
                console.log("data", data);
                var bookName = data.name;
                var authorName = data.author;
                if (bookName == null || bookName == "" || bookName == undefined) {
                    return res.json({
                        status: 404,
                        message: "Please Enter Book Name"
                    })
                }
                if (authorName == null || authorName == "" || authorName == undefined) {
                    return res.json({
                        status: 404,
                        message: "Please Enter Book Author Name"
                    })
                }
                data = new booksModel(data);
                data.set('image_url', image_url);
                data.set('fileName', fileName);
                console.log("data", data);
                data.save((err, saveData) => {
                    if (err) {
                        return res.json({
                            status: 500,
                            message: "Some thing is wrong"
                        })
                    }
                    else {
                        return res.json({
                            status: 200,
                            message: "Book Successfully Created"
                        })
                    }
                });

            }
        }
    })
}
exports.getOneBook = async (req, res) => {
    const data = req.body;
    var id = data.id;
    if (id == null || id == "" || id == undefined) {
        return res.json({
            status: 400,
            message: "Please Enter Book ID"
        })
    }
    booksModel.findOne({ _id: id, isDelete: false }, { name: 1, author: 1, price: 1, pages: 1, image_url: 1 }, (err, data) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Some thing is wrong"
            })
        }
        else {
            // console.log("data",data);
            if (!data) {
                return res.json({
                    status: 404,
                    message: "Data Not Found"
                })
            }
            else {
                return res.json({
                    status: 200,
                    data: data
                })
            }

        }
    })
}
exports.findAllBook = async (req, res) => {
    booksModel.find({ isDelete: false }, { name: 1, author: 1, price: 1, pages: 1, image_url: 1 }, (err, data) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Some thing is wrong"
            })
        }
        else {
            // console.log("data", data)
            return res.json({
                status: 200,
                data: data
            })
        }
    })
}
exports.deleteBook = async (req, res) => {
    const data = req.body;
    var id = data.id;
    if (id == null || id == "" || id == undefined) {
        return res.json({
            status: 400,
            message: "Please Enter Book ID"
        })
    }
    booksModel.findOneAndUpdate({ _id: id },{$set:{isDelete:true}},(err, data) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Some thing is wrong"
            })
        }
        else {
            console.log("data",data);
                return res.json({
                    status: 200,
                    message: "Book Successfully Deleted"
                })

        }
    })
}
exports.updateBookdetails = async (req, res) => {
    createBookWithImage(req, res, err => {
        if (err) {
            return res.json(err);
        }
        else {
            var files = req.file;
            console.log("files", files);
            if (files !== null && files !== undefined && files !== "") {
                var image_url = process.env.HOST + files.path;
                var fileName = files.filename;
                
                var data = req.body;
                var id = data.id;
                if (id == null || id == "" || id == undefined) {
                    return res.json({
                        status: 400,
                        message: "Please Enter Book ID"
                    })
                }
                booksModel.findById(id,(err,datafind)=>{
                    if (err) {
                        return res.json({
                            status: 500,
                            message: "Some thing is wrong"
                        })
                    }
                    else {

                        var bookName = data.name;
                        var authorName = data.author;
                        var price = data.price;
                        var pages = data.pages;
                        if (bookName == null || bookName == "" || bookName == undefined) {
                            bookName = datafind.name
                        }
                        if (authorName == null || authorName == "" || authorName == undefined) {
                            bookName = datafind.author
                        }
                        if (price == null || price == "" || price == undefined) {
                            price = datafind.price
                        }
                        if (pages == null || pages == "" || pages == undefined) {
                            pages = datafind.pages
                        }

                        booksModel.findOneAndUpdate({_id:id},{$set:{name:bookName,author:authorName,price:price,pages:pages,image_url:image_url,fileName:fileName}},(err,updateData)=>{
                            if (err) {
                                return res.json({
                                    status: 500,
                                    message: "Some thing is wrong"
                                })
                            }
                            else{
                                return res.json({
                                    status:200,
                                    message:"Book Details successfully updated"
                                })
                            }
                        })

                    }


                })

            }
            else{
                console.log("there");
                var data = req.body;
                var id = data.id;
                if (id == null || id == "" || id == undefined) {
                    return res.json({
                        status: 400,
                        message: "Please Enter Book ID"
                    })
                }
                booksModel.findById(id,(err,datafind)=>{
                    if (err) {
                        return res.json({
                            status: 500,
                            message: "Some thing is wrong"
                        })
                    }
                    else {

                        var bookName = data.name;
                        var authorName = data.author;
                        var price = data.price;
                        var pages = data.pages;
                        if (bookName == null || bookName == "" || bookName == undefined) {
                            bookName = datafind.name
                        }
                        if (authorName == null || authorName == "" || authorName == undefined) {
                            bookName = datafind.author
                        }
                        if (price == null || price == "" || price == undefined) {
                            price = datafind.price
                        }
                        if (pages == null || pages == "" || pages == undefined) {
                            pages = datafind.pages
                        }

                        booksModel.findOneAndUpdate({_id:id},{$set:{name:bookName,author:authorName,price:price,pages:pages}},(err,updateData)=>{
                            if (err) {
                                return res.json({
                                    status: 500,
                                    message: "Some thing is wrong"
                                })
                            }
                            else{
                                return res.json({
                                    status:200,
                                    message:"Book Details successfully updated"
                                })
                            }
                        })

                    }


                })
            }
        }
    })
}