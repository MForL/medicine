var express = require('express');
var router = express.Router();
var inMedModel = require("../model/inMedModel");

/* GET home page. */
router.get('/getIn', function(req, res, next) {
    inMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
	      res.send(err);
	    } else {
	      res.send(docs);
	    }
    })
});
// --------------增	
router.post('/create', function(req, res, next) {
    var inMedNew = new inMedModel();
    // inMedNew.num=req.body.num;
    inMedNew.mednum=req.body.mednum;
    inMedNew.inPrice=req.body.inPrice;
    inMedNew.inCount=req.body.inCount;
    inMedNew.inDate=req.body.inDate;
    inMedNew.provider=req.body.provider;

    inMedNew.save((err) => {
        if (err) {
            res.send("商品保存失败");
        } else {
            res.send("商品保存成功");
        }
    });
});

router.get('/find', (req, res) => {
  // 通过模型去查找数据库

  inMedModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


module.exports = router;