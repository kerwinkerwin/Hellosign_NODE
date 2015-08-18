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

var signTemplate = function signTemplate(type,student, callback){
  var options;
  var tcOptions = {
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
  var welcomeOptions = {
    test_mode:1,
    template_id: '88c75960985757d22be9e7c3497e98d6a17ca4e6',
    signers:[
      {
        email_address: student.email,
        name: student.name,
        role: 'Student'
      }
    ],
    custom_fields: {
      "Student": student.name,
      "Cohort": student.cohort.name,
      "P0_Date": student.cohort.dates.P0,
      "BC_start":student.cohort.dates.Bootcamp,
      "Grad_start":student.cohort.dates.Graduation,
      "Careers":student.cohort.dates.Careers,
    }
  };

  if(type==="terms"){
    options = tcOptions;
  }else{
    options = welcomeOptions;
  }

  hellosign.signatureRequest.sendWithTemplate(options)
    .then(function(response){
      callback(response)
    })
    .catch(function(err){
      callback(err)
    });
};

module.exports ={
  getTemplateList:getTemplateList,
  signTemplate: signTemplate
};
