var expect = require("chai").expect;
var request = require("request");
var Faker = require('Faker');
var nock_mocks = require('../nock_mocks.js');
var nock = require('nock');

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
  this.timeout(10000);
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
  var mock_response = {
    signature_request:
     { signature_request_id: '2535de5e35c38d9adc97f4deaf54c538145967ae',
       title: 'Dev Academy Terms and Conditions',
       original_title: 'Dev Academy Terms and Conditions',
       subject: 'Dev Academy Terms and Conditions',
       message: 'Hi LouiePlease sign where required',
       test_mode: true,
       metadata: {},
       is_complete: false,
       has_error: false,
       custom_fields: [ [Object] ],
       response_data: [],
       signing_url: 'https://www.hellosign.com/editor/sign?guid=2535de5e35c38d9adc97f4deaf54c538145967ae',
       signing_redirect_url: null,
       final_copy_uri: '/v3/signature_request/final_copy/2535de5e35c38d9adc97f4deaf54c538145967ae',
       files_url: 'https://api.hellosign.com/v3/signature_request/files/2535de5e35c38d9adc97f4deaf54c538145967ae',
       details_url: 'https://www.hellosign.com/home/manage?guid=2535de5e35c38d9adc97f4deaf54c538145967ae',
       requester_email_address: 'accounts@devacademy.co.nz',
       signatures: [ [Object] ],
       cc_email_addresses: [] },
    statusCode: 200,
    statusMessage: 'OK'
  }
  describe("with correct information", function(){

    before(function(done){
      request.post({
        headers: {'Content-Type':'application/json'},
        url:'http://localhost:3000/templates/signTerms',
        body:JSON.stringify(student)
      },function(error,response,body){
        res = response;
        parsedResponse = JSON.parse(response.body);
        done();
      });
      // parsedResponse = mock_response;
    });

    xit("responds ok", function(done){
      expect(res.statusCode).to.equal(201);
      done();
    });

    describe("returns", function(){
      var keys = ["title", "subject","message","signing_url","custom_fields"];

      it("signature request", function(done){
        console.log(parsedResponse.signature_request.custom_fields);
        console.log(parsedResponse.signature_request.signatures);
        expect(Object.keys(parsedResponse)).to.contain("signature_request")
        expect(parsedResponse.signature_request).to.not.be.undefined;
        done();
      })
      keys.forEach(function(currentKey){
        it(" "+currentKey+ "", function(done){
            expect(Object.keys(parsedResponse.signature_request).indexOf(currentKey)).to.not.equal(-1)
            expect(parsedResponse.signature_request[currentKey]).to.not.be.undefined;
            done();
        });
      });
    });
    describe("Signature request", function(){
      it("Has correct students name", function(done){
        expect(names to match)
      })
      it("Is sent to correct email", function(done){

      })
      it("has a signature id", function(done){

      })
      it("has correct status code", function(done){
        expect(status code to be awaiting signature)
      })
    })
  });
});
