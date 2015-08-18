var expect = require("chai").expect;
var request = require("request");
var Faker = require('Faker');

xdescribe("GET /templates", function(){

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

describe("POST /templates/signTerms", function(){
  this.timeout(6000);
  var parsedResponse;
  var res;
  var student =  {
            "name": Faker.name.firstName(),
            "email":Faker.internet.email(),
            "cohort": {
                "name":"Weka",
                "dates":{
                    "P0": "21/02/2015",
                    "Bootcamp":"21/04/2015",
                    "Graduation":"22/06/2015",
                    "Careers":"22/08/2015"
                }
            }
        };
  student1 = JSON.stringify(student);
  before(function(done){
    request.post({
      headers: {'Content-Type':'application/json'},
      url:'http://localhost:3000/templates/signTerms',
      body:JSON.stringify(student)
    },function(error,response,body){
      res = response;
      done();
    });
  });

  it("returns 201", function(done){
    expect(res.statusCode).to.equal(201);
    done();
  });
});
