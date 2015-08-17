var dotenv = require('dotenv')
dotenv.load()
var unirest = require('unirest')
var baseUri = "https://api.hellosign.com/v3"
var auth = {
    user:process.env.HELLOSIGN_KEY,
    pass:"",
    sendImmediately:true
    }
var hellosign = require('hellosign-sdk')({key:process.env.HELLOSIGN_KEY});
var headers ={
    'Accept':'application/json',
    'Content-Type':'application/json'
  };

var getTemplateList = function getTemplateList(callback){
  unirest.get(baseUri + '/template/list')
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response);
    })
};

var signTemplate = function signTemplate(student, callback){
  console.log("hello?")
  var options = {
    test_mode:1,
    template_id: 'aa67d4e8143421720fba63b326656e63aff924eb',
    subject: 'Dev Academy Terms and Conditions',
    message: 'Hi ' + student.name + 'Please sign where required',
    signers:[
      {
        email_address: student.email,
        name: student.name,
        role: 'Student'
      }
    ],
    custom_fields: {
      "Student Name": student.name
    }
  };
  console.log(options);

  hellosign.signatureRequest.sendWithTemplate(options)
    .then(function(response){
      console.log("this");
      console.log(response);
    })
    .catch(function(err){
      console.log("2");
      console.log(err);
    });

};

module.exports ={
  getTemplateList:getTemplateList,
  signTemplate: signTemplate
};
