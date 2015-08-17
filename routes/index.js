var express = require('express');
var router = express.Router();
var hellosign = require('../hellosign-facade.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req,res,next){
  hellosign.getTemplateList(function(response){
    res.status(200).json(response)
  });
});

module.exports = router;
