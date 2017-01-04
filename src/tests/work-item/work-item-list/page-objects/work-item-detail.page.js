/**
 * AlMighty page object example module for work item list page
 * See: http://martinfowler.com/bliki/PageObject.html,
 * https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings
 * @author ldimaggi@redhat.com
 * TODO - Complete the page object model pending completion of UI at: http://demo.almighty.io/
 */

'use strict';

/*
 * Work Item Detail Page Definition
 */

let testSupport = require('../testSupport');
let constants = require("../constants");
let until = protractor.ExpectedConditions;

class WorkItemDetailPage {

 constructor() {
 };

/* Note - The order of UI element defintions in this page object are top-->bottom, left->right */

  get workItemDetailId () {
    return element(by.id("wi-detail-id"));
  }

  get workItemDetailCloseButton () {
    return element(by.css(".pficon-close.detail-close"));
  }

  clickWorkItemDetailCloseButton () {
    return this.workItemDetailCloseButton.click();
  }

  get workItemDetailType () {
    return element(by.id("wi-detail-type"));
  }

  setWorkItemDetailType (newTypeString, append) {
    return this.workItemDetailType.sendKeys(newTypeString);
  }

  /* This UI element is only displayed when the user accesses the detail page of an existing work item */
  get clickWorkItemDetailTitle () {
    return element(by.id("wi-detail-title-click"));
  }

  clickWorkItemDetailTitleClick () {
    return this.clickWorkItemDetailTitle.click();
  }

  get workItemDetailTitle () {
    return element(by.id("wi-detail-title"));
  }

  setWorkItemDetailTitle (newTitleString, append) {
    if (!append) { this.workItemDetailTitle.clear(newTitleString) };
    return this.workItemDetailTitle.sendKeys(newTitleString);
  }

  /* Icon edit buttons */
  workItemTitleClick () {
    this.editHover().click();
  }

  get workItemTitleDiv () {    
    return element(by.id("title-click-div"));
  }

  clickWorkItemTitleDiv () {
    return this.workItemTitleDiv.click();
  }

  clickWorkItemTitleById () {
  return element(by.id("wi-detail-title-ne")); 
  }

  get workItemTitleEditIcon () {    
    return element(by.id("workItemTitle_btn_edit")); 
  }
  
  workItemTitleEditIconById () {    
    return element(by.id("workItemTitle_btn_edit"));
  }

  clickWorkItemTitleEditIcon () {
    return this.workItemTitleEditIcon.click(); 
  }

  get workItemTitleSaveIcon () {
    return element(by.id("workItemTitle_btn_save"));
  }

  workItemTitleSaveIconById () {
    return element(by.id("workItemTitle_btn_save"));
  }

  clickWorkItemTitleSaveIcon () {
    return this.workItemTitleSaveIcon.click();
  }

  get workItemTitleCancelIcon () {
    return element(by.id("workItemTitle_btn_cancel"));
  }

  clickWorkItemTitleCancelIcon () {
    return this.workItemTitleCancelIcon.click();
  }
  searchAssigneeInput (AssigneeSearchInput) {
    return element(by.id("userAssigneeSearchInput")).sendKeys(AssigneeSearchInput);
  }
  get workItemDetailState () {
    return element(by.id("wi-detail-state"));
  }

  setWorkItemDetailState (newStateString) {
    return this.workItemDetailState.sendKeys(newStateString);
  }

  workItemDetailAvatar () {
    return element(by.css(".pull-left.user-assign-avatar"));
  }

  get workItemDetailDescription () {
    return element(by.id("wi-detail-desc"));
  }

  workItemDetailDescriptionById () {
    return element(by.id("wi-detail-desc"))
  }

  clickWorkItemDetailDescription () {
    return this.workItemDetailDescription.click();
  }

  setWorkItemDetailDescription (newDescriptionString, append) {
    if (!append) { this.workItemDetailDescription.clear(newDescriptionString) };
    return this.workItemDetailDescription.sendKeys(newDescriptionString); 
  }

  get workItemDescriptionEditIcon () {
    return element(by.id("workItemDesc_btn_edit"));
  }

  clickWorkItemDescriptionEditIcon () {
    return this.workItemDescriptionEditIcon.click();
  }

  get workItemDescriptionSaveIcon () {
    return element(by.id("workItemdesc_btn_save"));
  }

  workItemDescriptionSaveIconById () {
    return element(by.id("workItemdesc_btn_save"));
  }

  clickWorkItemDescriptionSaveIcon () {
    return this.workItemDescriptionSaveIcon.click();
  }

  get workItemDescriptionCancelIcon () {
    return element(by.id("workItemdesc_btn_cancel"));
  }

  clickWorkItemDescriptionCancelIcon () {
    return this.workItemDescriptionCancelIcon.click();
  }

  titleValidation () {
    return element(by.css(".clearfloat.alert.alert-danger"));
  }

  titleAlert () {
    return element(by.xpath(".//[@id='wi-title-div'][.//[contains(@class, 'alert-danger')]]"));
  }

  titleAlertValidation () {
    return element(by.xpath(".//*[@id='wi-title-div']//p[.//text()[contains(.,'Title is required')]]"));
  }

  /*
    UI elements for workitem types detail page
  */

  WorkItemTypeDropDownList () {
    return element.all(by.css(".dropdown-menu.mobMarginL20 li a "));
  }

  clickWorkItemTypeDropDownList (number) {
    return element.all(by.css(".dropdown-text")).get(number);
  }

  WorkItemTypeDropDownListCount () {
      return element.all(by.css(".dropdown-menu.mobMarginL20 li a")).count(); 
  }

  clickWorkItemButton () {
    return element(by.css(".wi-type-icon")).click();
      //return element(by.xpath('.//*[@id="workItemList_OuterWrap_0"]/div/div[2]/div/ul/li[2]/a')).click(); }
  }

  clickworkItemDetailTypeIcon () {
    return element(by.css(".pull-left.dropdown-kebab-pf.detail-type-dropdown")).click(); 
  }

  userstroyIcon () {
    return element(by.xpath('//*[@id="workItemList_OuterWrap_0"]/div/div[1]/div[1]/span[2]'));
   }

  valuepropositionIcon () {
    return element(by.css(".color-grey.fa.fa-gift"));
  }

  fundamentalIcon () {
    return element(by.css(".color-grey.fa.fa-bank")); 
  }

  experienceIcon () {
      return element(by.css(".color-grey.fa.fa-map"));
  }

  feautureIcon () {
      return element(by.css(".color-grey.fa.fa-mouse-pointer"));
  }

  bugIcon () {
      return element(by.css(".color-grey.fa.fa-bug"));
  }

  detailUserstroyIcon2 (classString) {
    return element(by.xpath("//*[@id='wi-detail-form'][.//*[contains(@class, '" + classString + "')]]"));
  }

  workItemTypeDropDownListString (typeString) {
    return element(by.xpath("//*[@id='wi-detail-form']//li[.//text()[contains(.,'" + typeString + "')]]"));
  }

/*UI elements for State WorkItems*/

  checkWorkItemStateDropDownList () {
    return element(by.xpath('.//*[@id="wi-detail-form"]/fieldset/div[2]/div[2]/div/ul/li['+typeString+']/a/span[2]')).getText();
  }

  clickWorkItemStateDropDownButton () {
    return element(by.id("wi-detail-state")).click();
  }

  WorkItemStateDropDownListCount () {
    return element.all(by.css(".dropdown-menu.dropdown-menu-right.dropdown-ul li a")).count();
  }

  WorkItemStateDropDownList (item) {
    return element.all(by.css(".dropdown-menu.dropdown-menu-right.dropdown-ul li a"));
  }

  newStateIcon () {
    return element(by.css(".color-grey.fa.fa-arrow-down")); 
  }

  openStateIcon () {
    return element(by.css(".color-grey.fa.fa-fire"));
  }

  inprogressStateIcon () {
    return element(by.css(".color-grey.pficon.pficon-resources-almost-full")); 
  }

  resolvedStateIcon () {
    return element(by.css(".color-grey.pficon.pficon-resources-full"));
  }

  closedStateIcon () {
    return element(by.css(".color-grey.fa.fa-remove"));
  }

  genericCssIcon (classString) {
    return element(by.xpath("//*[@id='workItemList_OuterWrap_0'][.//*[contains(@class, '" + classString + "')]]"));
  }

  /* The following UI elements support the assignment of a user to a work item */

  /* Icon for the user assigned to the workitem */
  workItemDetailAssigneeIcon () {
    return element(by.css(".user-assign-icon"));
  }
  workItemDetailUnAssigneeIcon () {
    return element(by.css(".pull-left.fa.fa-user-plus.user-assign-icon"));
  }
  clickworkItemDetailAssigneeIcon () {
    return this.workItemDetailAssigneeIcon.click();
  }

  /* The user assigned to the workitem */
  workItemDetailAssignee () {
    return element(by.xpath(".//*[contains(@class,'detail-assignee-name')]"));
  }
  workItemDetailAssigneeName () {
    return element(by.css(".pull-left.detail-assignee-name"));
  }
  workItemDetailAssigneeNameClickable () {
    return element(by.css(".placeholder.clickable"));
  }
  details_assigned_user () {
    return element(by.id("WI_details_assigned_user"));
  }
  get clickWorkItemDetailAssignee () {
    return this.workItemDetailAssignee.click();
  }

  /* Search string box for the user to assign to the workitem */
  get workItemDetailAssigneeSearch () {
    return element(by.id('userAssigneeSearchInput'));
  }
  checkworkItemDetailAssigneeSearch () {
    return element(by.id('userAssigneeSearchInput'));
  }
  setWorkItemDetailAssigneeSearch (newSearchString, append) {
    if (!append) { this.workItemDetailAssigneeSearch.clear(newSearchString) };
    return this.workItemDetailAssigneeSearch.sendKeys(newSearchString);
  }

  /* The list of users to whom work items can be assigned */
  get workItemDetailAssigneeList () {
    return element(by.css(".user-list"));
  }

  clickworkItemDetailAssigneeList () {
    return this.workItemDetailAssigneeList.click();
  }

  /* The first username in the list of users */
  get workItemDetailFirstUser () {
    return element(by.css(".item-li.first-item")); 
  }

  get clickworkItemDetailFirstUser () {
    return this.workItemDetailFirstUser.click();
  }

  /* Select the assigned user by name */
  assignedUserDropDownList (userName) {
    return element(by.xpath(".//*[@id='wi-detail-form']//li[.//text()[contains(.,'" + userName + "')]]"));
  }

  clickAssignedUserDropDownList (userName) {
    return this.assignedUserDropDownList(userName).click();
  }

  /* The Unassign button */
  get workItemDetailUnassignButton () {
    return element(by.xpath(".//*[contains(@class,'action-item') and contains(text(),'Unassign')]")); 
  }

  clickworkItemDetailUnassignButton () {
    return this.workItemDetailUnassignButton.click();
  }

  /* The Cancel button */
  get workItemDetailCancelButton () {
    return element(by.xpath(".//*[contains(@class,'action-item') and contains(text(),'Cancel')]"));
  }

  clickworkItemDetailCancelButton () {
    return this.workItemDetailCancelButton.click();
  }
/**UI elements for comments testSupport  */
  clickCommentsDiv (){
    return element(by.id("wi-comment-add-comment")).click();
  }
  commentDiv  (){
    return element(by.id("wi-comment-add-comment"));
  }
  writeComment  (comment){
    return element(by.id("wi-comment-add-comment")).sendKeys(comment);
  }
  commentsAvatar (index){
    return element(by.id("comment_avatar_"+index));
  }
  getNumberofComments (){
    return element.all(by.css('comments-wrap')).count();
  }
  getCommentTime  (index){
    return element(by.id('comment_time_'+index)).getText();
  }
  getCommentBody  (index){
 //   browser.wait(until.presenceOf(element(by.id('comment_body_'+index))), constants.WAIT, 'Failed to find element body');
    return element(by.id('comment_body_'+index)).getText();
  }
  getCommentUsername  (index){
    return element(by.id('comment_username_'+index)).getText();
  }
/**UI elements for created time WI */
  getCreatedtime  (){
    return element(by.id('created_at')).getText();
  }
  /**UI elements for creator*/
  getCreatorLabel (){
    return element(by.id('creator_label')).getText();
  }
  getCreatorDefaultIcon (){
    return element(by.id('user_creator_icon'));
  }
  clickCreatorDefaultIcon (){
    return element(by.id('user_creator_icon')).click();
  }
  getCreatorAvatar  (){
    return element(by.id('WI_details_reporter_img'));
  }
  clickCreatorAvatar  (){
    return element(by.id('WI_details_reporter_img')).click();
  }
  getCreatorUsername  (){
    return element(by.id('WI_details_reporter_user')).getText();
  }
}

module.exports = WorkItemDetailPage;
