var express = require('express');
var router = express.Router();
var hellosign = require('../hellosign-facade.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates', function(req,res,next){
  hellosign.getTemplateList(function(response){
    res.status(200).json(response)
  });
});

router.post('/templates/sign', function(req,res,next){
  // console.log(req.body);
  var student = req.body;
  hellosign.signTemplate(student,function(response){
    console.log(response);
  })
})

module.exports = router;
