import { Component, OnInit, Input, AfterViewInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthenticationService } from './../../auth/authentication.service';
import { Broadcaster } from './../../shared/broadcaster.service';
import { Logger } from '../../shared/logger.service';

import { Dialog } from '../../shared-component/dialog/dialog';
import { DropdownOption }    from './../../shared-component/dropdown/dropdown-option';

import { WorkItem } from '../work-item';
import { WorkItemType } from '../work-item-type';
import { WorkItemService } from '../work-item.service';

@Component({
  selector: 'alm-work-item-detail',
  templateUrl: './work-item-detail.component.html',
  styleUrls: ['./work-item-detail.component.scss']
})

export class WorkItemDetailComponent implements OnInit, AfterViewInit{  
  
  @Input() workItem: WorkItem;

  workItemTypes: WorkItemType[];
  // TODO: These should be read from the WorkitemType of the given Workitem
  workItemStates: DropdownOption[];

  dialog: Dialog = {
    'title' : 'Changes have been made',
    'message' : 'Do you want to discard your changes?',
    'actionButtons': [
        {'title': ' Discard', 'value': 1},
        {'title': 'Cancel', 'value': 0}]
  };
  showDialog: boolean = false;
  
  submitted = false;
  active = true;
  loggedIn: Boolean = false;

  headerEditable: Boolean = false;
  descEditable: Boolean = false;
    
  constructor(
    private auth: AuthenticationService,    
    private broadcasterLogout: Broadcaster,
    private broadcasterDetailReady: Broadcaster,
    private broadcasterCloseDetail: Broadcaster,    
    private workItemService: WorkItemService,
    private route: ActivatedRoute,
    private location: Location,
    private logger: Logger
  ) {}

  ngOnInit(): void{     
    this.listenToEvents();
    this.getWorkItemTypes();
    this.getWorkItemStates();    
    this.loggedIn = this.auth.isLoggedIn();
  }
  
  ngAfterViewInit() {
    window.setTimeout(() => {      
      this.broadcasterDetailReady.broadcast('detailReady', true);
    }, 100);
  }

  isValid(checkTitle: String): Boolean {
    return (checkTitle.trim() != '');
  }

  toggleHeader(): void{    
    this.headerEditable = !this.headerEditable;
  }

  toggleDescription(): void{        
    this.descEditable = !this.descEditable;
  }

  getWorkItemTypes(): void {
    this.workItemService.getWorkItemTypes()
      .then((types) => {
        this.workItemTypes = types;
      });
  }

  getWorkItemStates(): void {
    this.workItemService.getStatusOptions()
      .then((options) => {
        this.workItemStates = options;
      });
  }

  save(): void {
    console.log('work item');
    console.log(this.workItem);
    this.workItemService
      .update(this.workItem)
      .then((workItem) => {
        this.workItem = workItem; 
        if (this.headerEditable){
          this.toggleHeader();
        }
        if (this.descEditable){
          this.toggleDescription();
        }          
    });
     
  }

  closeDetails(): void {
    if (this.headerEditable){
      this.showDialog = true;
    }else{
      this.broadcasterCloseDetail.broadcast('closeDetail', false);
    }    
  }

  onButtonClick(val: number): void{
    if (val == 1){
      this.closeDetails();
    }else{
      this.showDialog = false;
    }
  }

  listenToEvents() {
    this.broadcasterLogout.on<string>('logout')
      .subscribe(message => {
        this.loggedIn = false;
    });
  }
  
  keyMaps(event: KeyboardEvent) {                
    if (this.headerEditable || this.descEditable){           
      this.save();
      if (this.headerEditable) this.toggleHeader(); 
      if (this.descEditable) this.toggleDescription();      
    }
  }
}