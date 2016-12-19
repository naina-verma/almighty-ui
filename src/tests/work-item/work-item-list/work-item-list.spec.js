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

describe('Work item list', function () {
  var page, items, browserMode;

  beforeEach(function () {
    testSupport.setBrowserMode('phone');
    page = new WorkItemListPage(true);    
    
    workItemMockData = {
      pageTitle:'Some Title 14 Details',
      workItemTitle:'Some Title 14', 
      workItemDescription:'Some Description 14',
      workItemType:'system.userstory',
      workItemCreator:'someOtherUser14',
      workItemAssignee:'someUser14',
      workItemState:'New'
    }; 
  });

  it('should have the right mock data in the first entry - phone.', function() {
    expect(page.workItemTitle(page.firstWorkItem)).toBe('Some Title 14');
  });
  
  it('should have the right mock data in the first entry - desktop.', function() {
    testSupport.setBrowserMode('desktop');		  
    expect(page.workItemTitle(page.firstWorkItem)).toBe('Some Title 14');
  });

  it('should create a new workitem - phone.', function () {
    page.clickWorkItemQuickAdd();
    page.typeQuickAddWorkItemTitle('Some Title');
    page.clickQuickAddSave().then(function() {
      expect(page.workItemTitle(page.firstWorkItem)).toBe('Some Title');
      expect(page.workItemTitle(page.workItemByNumber(0))).toBe('Some Title');
    });
  });
 
 it('should create a new workitem - desktop.', function () {
    testSupport.setBrowserMode('desktop');	
    page.clickWorkItemQuickAdd();
    page.typeQuickAddWorkItemTitle('Some Title');
    page.clickQuickAddSave().then(function() {
      expect(page.workItemTitle(page.firstWorkItem)).toBe('Some Title');
      expect(page.workItemTitle(page.workItemByNumber(0))).toBe('Some Title');
    });
  });	 

  it('should contain right mock data on detail page - desktop.', function() { 
    testSupport.setBrowserMode('desktop');
    page.workItemViewId(page.firstWorkItem).getText().then(function (text) { 
      var detailPage = page.clickWorkItemTitle(page.firstWorkItem, text);
      expect(detailPage.clickWorkItemDetailTitle.getText()).toBe(workItemMockData.workItemTitle);   
      expect(detailPage.workItemDetailDescription.getText()).toContain(workItemMockData.workItemDescription);
      expect(detailPage.workItemDetailState.getText()).toBe(workItemMockData.workItemState);
      detailPage.clickWorkItemDetailCloseButton();
     });
   });
});
