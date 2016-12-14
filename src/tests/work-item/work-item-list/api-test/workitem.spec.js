/**
 * POC test for ALMighty REST API - goal is to create/delete NNN workitems daily and track
 * the throughput to track trends over time
 * See: http://frisbyjs.com/
 * @author naina-verma
 *
 * Prerequisites:
 * npm install --save-dev frisby
 * npm install -g jasmine-node
 *
 * Run by: jasmine-node <script name>
 *
 * TODO - Generate login token during test ("bin/alm-cli generate login -H demo.almighty.io")
 */

'use strict';

var frisby = require("frisby");
var url = "http://localhost:8080/api/";
var testREST = require('./workitem-api.page');

describe('testREST page', function () {
  var page, browserMode;
  page = new testREST();
  beforeEach(function () {
  
  });

  it('Get call for All workitems.', function() {
     var workitemresponse=page.GetWorkItem();
      workitemresponse.afterJSON(function(workitem) {
          workitem.meta.totalCount;
       });
      workitemresponse.toss();
  });
  
  it('post call for workitems.Post and Check Get request works for paricualar id', function() {
     var post=page.PostWorkItem("new","Automation post "+Math.random());  
     post.afterJSON(function(workitem) {
     workitem.data.id;
       });
  });
  it('post call for workitems with All workItem types', function() {
     var random=Math.random();
     var wi_types = ["userstory", "valueproposition", "fundamental","experience","feature","bug"];
     for(var i=0;i<wi_types.length;i++){
     var post=page.PostWorkItem("new","Automation post "+random,"description "+random,"system."+wi_types[i]);  
     }
  });
  it('post call for workitems with All workItem states', function() {
     var random=Math.random();
     var wi_state = ["new", "open", "in progress","resolved","closed"];
     for(var i=0;i<wi_state.length;i++){
     var post=page.PostWorkItem(wi_state[i],"Automation post "+random,"description "+random);  
     }
  });
  /** This test should fail because tital is mandatory- Bug*/
  it('Post without title', function() {
     var post=page.PostWorkItem("new","");  
     //post.inspectBody();
     post.afterJSON(function(workitem) {
     workitem.data.id;
       });
  });

});
