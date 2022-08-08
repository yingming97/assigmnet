var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {MongoClient, ServerApiVersion} = require('mongodb');
const {Schema} = require("mongoose");
const uri = "mongodb+srv://YingMing:01672545642Aa@cluster0.b8mwo.mongodb.net/Assignment?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('Lỗi'));
const CP = mongoose.model('hinhnens', new Schema({
    title: String,
    content: String,
    time: String,
    linkAnh: String,
}))
/* GET home page. */
router.get('/', function (req, res, next) {

    CP.find({}, function (error, result) {
        if (error) throw error;
        res.render('index', {TieuDe: "Home", data: result});
        console.log(result.length)
    })
});
router.get('/upload', function (req, res) {
    res.render('upload', {TieuDe: 'Upload'});
});
router.post('/create', async function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const linkAnh = req.body.linkAnh;
    const today = new Date();
    let timeStr = '';
    h = today.getHours();
    m = today.getMinutes();
    if (h > 12) {
        h = h - 12;
        timeStr = h + " : " + m + " PM"
    } else {
        timeStr = h + " : " + m + " AM"
    }
    const hinhNen = new CP({
        title: title,
        content: content,
        linkAnh: linkAnh,
        time: timeStr
    });

    await hinhNen.save();
    res.redirect('/');
});
router.get('/delete/', function (req, res) {
    const id = req.query.id;
    CP.deleteOne({_id: id}, function (error) {
        if (error) throw error;
        res.redirect('/')
    })
})
router.get('/updateForm/', function (req, res) {
    const id = req.query.id;
    CP.findOne({_id: id}, function (error, result) {
        res.render('update', {TieuDe:'Update',data: result})
    })
})
router.post('/update', async function (req, res) {
    const id = req.body.id
    const title = req.body.title;
    const content = req.body.content;
    const linkAnh = req.body.linkAnh;
    const today = new Date();
    let timeStr = '';
    h = today.getHours();
    m = today.getMinutes();
    if (h > 12) {
        h = h - 12;
        timeStr = h + " : " + m + " PM"
    } else {
        timeStr = h + " : " + m + " AM"
    }
    await CP.updateOne({_id: id}, {
        title: title,
        content: content,
        linkAnh: linkAnh,
        time: timeStr
    }, null)

    res.redirect('/')
})

router.get('/getImages', function (req, res, next) {
    CP.find({}, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});

module.exports = router;
