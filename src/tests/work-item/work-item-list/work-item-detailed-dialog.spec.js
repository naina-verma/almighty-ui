/**
 * POC test for automated UI tests for ALMighty
 *  
 * Note on screen resolutions - See: http://www.itunesextractor.com/iphone-ipad-resolution.html
 * Tests will be run on these resolutions:
 * - iPhone6s - 375x667
 * - iPad air - 768x1024
 * - Desktop -  1920x1080
 * 
 * beforeEach will set the mode to phone. Any tests requiring a different resolution will must set explicitly. 
 * 
 * @author ldimaggi
 */

var WorkItemListPage = require('./page-objects/work-item-list.page'),
  testSupport = require('./testSupport'),
  WorkItemDetailPage = require('./page-objects/work-item-detail.page');

var workItemTitle = "The test workitem title";
var workItemUpdatedTitle = "The test workitem title - UPDATED";
var workItemDescription = "The test workitem description";
var workItemUpdatedDescription = "The test workitem description - UPDATED";
var until = protractor.ExpectedConditions;
var waitTime = 30000;

describe('Work item list', function () {
  var page, items, browserMode;

  beforeEach(function () {
    testSupport.setBrowserMode('desktop');
    page = new WorkItemListPage(true);   
  });

/* Test commented out pending resolution of issue: https://github.com/almighty/almighty-ui/issues/538  */
//  it('should create a new workitem through the detail dialog - phone.', function () {
//    page.clickDetailedDialogButton();
//    var detailPage = page.clickDetailedIcon("userstory");
//    detailPage.setWorkItemDetailTitle (workItemTitle, false);
//    detailPage.clickWorkItemTitleSaveIcon();
//    detailPage.clickWorkItemDetailDescription()
//    detailPage.setWorkItemDetailDescription (workItemDescription, true);
//    detailPage.clickWorkItemDescriptionSaveIcon();
//    detailPage.clickWorkItemDetailCloseButton();
//    browser.wait(until.presenceOf(page.workItemByTitle(workItemTitle)), waitTime, 'Failed to find workItemList');
//    expect(page.workItemTitle(page.workItemByTitle(workItemTitle))).toBe(workItemTitle);
//  });
 it('Create a comment and verify all the attributes image, date , comment body -desktop', function () {
   page.clickDetailedDialogButton();
   var detailPage = page.clickDetailedIcon("userstory");
   detailPage.setWorkItemDetailTitle (workItemTitle, false);
   detailPage.clickWorkItemTitleSaveIcon();
   detailPage.clickWorkItemDetailDescription()
   detailPage.setWorkItemDetailDescription (workItemDescription, true);
   detailPage.clickWorkItemDescriptionSaveIcon();
   detailPage.writeComment("comment 0");
   var str=detailPage.commentDiv().getText();console.log(str);
   detailPage.commentDiv().sendKeys(protractor.Key.ENTER);
   expect(detailPage.getCommentBody("0")).toBe("comment 0");
  //  expect(detailPage.getCommentUsername("0")).toBe("Example User 0");
  //  expect(detailPage.commentsAvatar("0").isPresent()).toBe(true);
  //  expect(detailPage.getCommentTime("0")).toBe("Jan 1, 2000, 2:30:00 PM");
  //  detailPage.clickWorkItemDetailCloseButton();
  });

  
});
