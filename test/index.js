var expect = require("chai").expect;
var request = require("request");
var Faker = require('Faker');

describe("GET /templates", function(){
  var parsedResponse;
  var res;
  before(function(done){
    request('http://localhost:3000/templates', function(error,response,body){
      res = response;
      parsedResponse = JSON.parse(response.body)
      done();
    });
  });

  it("returns ok response", function(done){
    expect(res.statusCode).to.equal(200);
    done();
  });
  it("returns an array of templates", function(done){
    expect(parsedResponse.body.templates).to.be.a('Array');
    done();
  });
});

describe("POST /templates/signT&C", function(done){
  var parsedResponse;
  var res;
  before(function(done){
    request('http://localhost:3000/templates', function(error,response,body){
      res = response;
      parsedResponse = JSON.parse(response.body)
      done();
    });
  });
  
})
