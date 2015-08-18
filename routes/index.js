var express = require('express');
var router = express.Router();
var hellosign = require('../hellosign-facade.js');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates', function(req,res,next){
  hellosign.getTemplateList(function(err,response){
    if(err){
      next(err);
    }else
    res.status(200).json(response)
  });
});

router.post('/templates/signTerms', function(req,res,next){
  var student = req.body;
  var type = "terms"
  hellosign.signTemplate(type,student,function(err,response){
    if(err){
      next(err);
    }else
    res.status(201).json({error:"wahh"});
  })
})

router.post('/templates/signWelcome',function(req,res,next){
  var student = req.body;
  var type = "wel"
  hellosign.signTemplate(type,student,function(err,response){
    if(err){
      console.log(err)
      next(err);
    }else
    res.status(201).json(response);
  })
})

module.exports = router;
