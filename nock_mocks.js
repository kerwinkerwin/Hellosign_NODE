var nock = require('nock');
var baseUri = "https://api.hellosign.com/v3"

var hellosignTemplateList = nock(baseUri)
                          .get('/template/list')
                          .reply(200, "blah")

module.exports = {
  hellosignTemplate: hellosignTemplateList
}
