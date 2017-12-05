var express = require('express');
var router = express.Router();
var haveMedModel = require("../model/haveMedModel");

/* GET home page. */
router.get('/getHave', function(req, res, next) {
    haveMedModel.find({ flag: 1}, (err, docs) => {
        if (err || docs.length == 0) {
          res.send(err);
        } else {
          res.send(docs);
        }
    })
});

router.post('/findOnly', function(req, res, next) {
    haveMedModel.find({ mednum: req.body.mednum }, (err, docs) => {
      console.log("进入 findOnly")
        if (err || docs.length == 0) {
          res.send(err);
        } else {
          res.send(docs);
        }
    })
});
// router.post('/change', function(req, res, next) {
//     haveModel.update({ _id: req.body.id }, {
//             haveCount: req.body.haveCount
//         },
//         (err, b) => {
//             var result = {
//                 code: 1
//             }
//             if (err) {
//                 result.code = -109;
//                 result.message = "更改失败!";
//             }
//             res.send(JSON.stringify(result));
//         })

// });


router.post('/change', function(req, res, next) {
    haveMedModel.find({ mednum: req.body.mednum },(err, docs)=>{
      // console.log(docs);
      if(err || docs.length == 0){
          res.send("无数据");
          return;
        }else{
          docs[0].update({haveCount:req.body.haveCount},(err)=>{
            var result = {
              code:1
            }
            if(err) {
              console.log(err);
              result.code = -88;
              result.message = "修改失败";
            }
            res.send(JSON.stringify(result));
          })
        }
    })
});



router.post('/create', function(req, res, next) {
    var haveMedNew = new haveMedModel();

    // haveMedNew.num=req.body.num;
    haveMedNew.mednum=req.body.mednum;
    haveMedNew.medname=req.body.medname;
    haveMedNew.havePrice=req.body.inPrice;
    haveMedNew.haveCount=req.body.inCount;
    haveMedNew.company=req.body.provider;
    haveMedNew.guige=req.body.guige;

    haveMedNew.save((err) => {
        if (err) {
            res.send("入库失败");
        } else {
            res.send("入库成功");
        }
    });
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