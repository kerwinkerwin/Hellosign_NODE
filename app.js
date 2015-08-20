var dotenv = require('dotenv')
dotenv.load()
var app = require('express')()
var hellosignCredentials = {
  apiKey:process.env.HELLOSIGN_KEY
}
var hellosign = require('./hellosign-facade.js')(hellosignCredentials)


var server = app.listen(3000, function () {
  var port = server.address().port
  console.log('Server started on port: ' + port)
})

app.get('/templates', function(req,res,next){
  hellosign.getTemplateList(function(err,response){
    if(err){
      next(err);
    }else
    res.status(200).json(response)
  });
});

app.post('/templates/signTerms', function(req,res,next){
  var student = req.body;
  var type = "terms"
  hellosign.signTemplate(type,student,function(err,response){
    if(err){
      next(err);
    }else
    res.status(201).json(response);
  })
})

app.post('/templates/signWelcome',function(req,res,next){
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

// view engine setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
