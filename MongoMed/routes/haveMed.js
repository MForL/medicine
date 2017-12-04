var express = require('express');
var router = express.Router();
var haveMedModel = require("../model/haveMedModel");

/* GET home page. */
router.get('/getOut', function(req, res, next) {
    haveMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
          res.send(err);
        } else {
          res.send(docs);
        }
    })
});

router.get('/find', (req, res) => {
  // 通过模型去查找数据库
  haveMedModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


module.exports = router;