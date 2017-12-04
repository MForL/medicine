var express = require('express');
var router = express.Router();
var haveMedModel = require("../model/haveMedModel");
var outMedModel = require("../model/outMedModel");

/* GET home page. */

//售药时,先查询库存中的药
router.get('/getOut', function(req, res, next) {
    haveMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
	      res.send(err);
	    } else {
	      res.send(docs);
	    }
    })
});
//售药就是更改havecount
router.post('/change', function(req, res, next) {
    haveModel.update({ _id: req.body.id }, {
            haveCount: req.body.haveCount
        },
        (err, b) => {
            var result = {
                code: 1
            }
            if (err) {
                result.code = -109;
                result.message = "更改失败!";
            }
            res.send(JSON.stringify(result));
        })

});

router.post('/create', function(req, res, next) {
    var outMedNew = new outMedModel();
    // outMedNew.num=req.body.num;
    outMedNew.buyernum=req.body.outMedNew;
    outMedNew.mednum=req.body.outMedNew;
    outMedNew.outPrice=req.body.outMedNew;
    outMedNew.outCount=req.body.outMedNew;
    outMedNew.outDate=req.body.outMedNew;
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