var express = require('express');
var router = express.Router();
var haveMedModel = require("../model/haveMedModel");
var outMedModel = require("../model/outMedModel");

/* GET home page. */

//售药时,先查询库存中的药
router.get('/getHave', function(req, res, next) {
    haveMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
	      res.send(err);
	    } else {
	      res.send(docs);
	    }
    })
});

router.get('/getOut', function(req, res, next) {
    outMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
          res.send(err);
        } else {
          res.send(docs);
        }
    })
});
//售药就是更改havecount


router.post('/create', function(req, res, next) {
    var outMedNew = new outMedModel();
    // outMedNew.num=req.body.num;
    // outMedNew.buyernum=req.body.outMedNew;
    outMedNew.mednum=req.body.mednum;
    outMedNew.outPrice=req.body.outPrice;
    outMedNew.outCount=req.body.outCount;
    outMedNew.outDate=req.body.outDate;
    // outMedNew.outDate=req.body.outMedNew;
    outMedNew.save((err) => {
        if (err) {
            res.send("售药信息保存失败");
        } else {
            res.send("售药信息保存成功");
        }
    });
});

router.get('/find', (req, res) => {
  // 通过模型去查找数据库
  outMedModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;