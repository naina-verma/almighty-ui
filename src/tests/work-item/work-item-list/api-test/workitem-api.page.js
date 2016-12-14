'use strict';

var frisby = require("frisby");
var url = "http://localhost:8080/api/";
/* frisby.globalSetup is used by all REST requests */
frisby.globalSetup({
  request: {
    headers: { 'Content-Type': 'application/json',
               'Accept': 'application/json',
               'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IlRlc3QgRGV2ZWxvcGVyIiwiaW1hZ2VVUkwiOiIiLCJ1dWlkIjoiNGI4Zjk0YjUtYWQ4OS00NzI1LWI1ZTUtNDFkNmJiNzdkZjFiIn0.ML2N_P2qm-CMBliUA1Mqzn0KKAvb9oVMbyynVkcyQq3myumGeCMUI2jy56KPuwIHySv7i-aCUl4cfIjG-8NCuS4EbFSp3ja0zpsv1UDyW6tr-T7jgAGk-9ALWxcUUEhLYSnxJoEwZPQUFNTWLYGWJiIOgM86__OBQV6qhuVwjuMlikYaHIKPnetCXqLTMe05YGrbxp7xgnWMlk9tfaxgxAJF5W6WmOlGaRg01zgvoxkRV-2C6blimddiaOlK0VIsbOiLQ04t9QA8bm9raLWX4xOkXN4ubpdsobEzcJaTD7XW0pOeWPWZY2cXCQulcAxfIy6UmCXA14C07gyuRs86Rw'
             }
           }
});
var TestPage = function () {  
};

TestPage.prototype  = Object.create({}, {
  GetWorkItem:   {
    value: function ()
    {
        var workitems = frisby.create('Should be successful in connecting to REST API - workitems endpoint');
        workitems.get(url + 'workitems').expectStatus(200);
        workitems.expectHeaderContains('Content-Type', 'application/vnd.api+json');
        workitems.toss();
        return workitems;
     }
  },
  PostWorkItem: {
      value: function(state="new",title="automation title",description="automation description",workitemtype="system.userstory")
      {
          var postworkitem = frisby.create('Should be successful in creating new workitems')
          postworkitem.post(url + 'workitems',{"data":{"attributes":{"system.state":state,"system.title":title,"system.description":description},"relationships":{"baseType":{"data":{"id":workitemtype,"type":"workitemtypes"}}},"type":"workitems"}},{ json: true })
          postworkitem.expectHeaderContains('Content-Type', 'application/vnd.api+json');
          //postworkitem.inspectBody();
          postworkitem.expectStatus(201);
          var workitem_var,workitem;
          postworkitem.afterJSON(function(workitem) {
          frisby.create('Get WorkItem by id')
          .get(url + 'workitems/' + workitem.data.id).expectStatus(200)
          .toss()
          return postworkitem;
            });
          postworkitem.toss();
        return postworkitem;
      }
  },
  PutWorkItem: {
      value: function(state="new",title="automation11 title",description="automation description",workitemtype="system.userstory")
      {
          
          var putworkitem = frisby.create('Should be successful in creating new workitems')
          putworkitem.patch(url + 'workitems/400',{"data":{"attributes":{"system.state":state,"system.title":title,"system.description":description,"version": 1},"id":"400","relationships":{"baseType":{"data":{"id":workitemtype,"type":"workitemtypes"}}},"type":"workitems"}},{ json: true })
          putworkitem.expectHeaderContains('Content-Type', 'application/vnd.api+json');
          putworkitem.inspectBody();
          putworkitem.expectStatus(200);
          putworkitem.afterJSON(function(workitem) {
          frisby.create('Get WorkItem by id')
          .get(url + 'workitems/' + workitem.data.id).expectStatus(200)
          .toss()
            });
          putworkitem.toss();
        return putworkitem;
      }
  },

  afterGetJsonparseId:{
      value: function(workitems)
      {
          workitems.afterJSON(function(workitem) {
          frisby.create('Get WorkItem by id')
          .get(url + 'workitems/' + workitem.data.id).expectStatus(200)
          .toss();

      });
          
      }
  }, 

});

module.exports = TestPage;
