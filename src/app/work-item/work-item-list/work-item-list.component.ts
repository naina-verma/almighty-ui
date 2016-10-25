import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService } from './../../auth/authentication.service';
import { Broadcaster } from './../../shared/broadcaster.service';
import { Logger } from '../../shared/logger.service';

import { WorkItem }                   from '../work-item';
import { WorkItemListEntryComponent } from './work-item-list-entry/work-item-list-entry.component';
import { WorkItemService }            from '../work-item.service';

@Component({
  selector: 'alm-work-item-list',
  templateUrl: './work-item-list.component.html',
  styleUrls: ['./work-item-list.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ]),
  ]
})
export class WorkItemListComponent implements OnInit {

  workItems: WorkItem[];
  selectedWorkItemEntryComponent: WorkItemListEntryComponent;
  workItemDetail: WorkItem;
  addingWorkItem = false;
  showOverlay : Boolean ;
  loggedIn: Boolean = false;
  showWorkItemDetails: boolean = false;
  panelState: String = 'out';

  constructor(
    private auth: AuthenticationService,
    private broadcaster: Broadcaster,
    private router: Router,
    private workItemService: WorkItemService,
    private logger: Logger) {
  }

  ngOnInit(): void {
    this.listenToEvents();
    this.reloadWorkItems();
    this.loggedIn = this.auth.isLoggedIn();
  }

  // model handlers

  reloadWorkItems(): void {
    this.workItemService
      .getWorkItems()
      .then((wItems) => {
        return wItems.reverse();
      })
      .then((wItems) => {
        this.workItemService
        .getStatusOptions()
        .then((options) => {
          this.workItems = wItems.map((item) => {
            item.selectedState = this.workItemService.getSelectedState(item, options);
            return item;
          });
        });
      });      
  }

  addWorkItem(): void {
    this.addingWorkItem = true;
    this.selectedWorkItemEntryComponent = null;
  }

  close(savedWorkItem: WorkItem) {
    this.addingWorkItem = false;
    if (savedWorkItem) { this.reloadWorkItems(); }
  }

  // event handlers
  
  onSelect(entryComponent: WorkItemListEntryComponent): void {
    let workItem: WorkItem = entryComponent.getWorkItem();
    // de-select prior selected element (if any)
    if (this.selectedWorkItemEntryComponent && this.selectedWorkItemEntryComponent != entryComponent)
      this.selectedWorkItemEntryComponent.deselect();
    // select new component
    entryComponent.select();
    this.selectedWorkItemEntryComponent = entryComponent;    
  }

  onDetail(entryComponent: WorkItemListEntryComponent): void {    
    this.workItemDetail = entryComponent.getWorkItem();    
    this.onSelect(entryComponent);
    this.showWorkItemDetails = true; 
  }

  onDelete(entryComponent: WorkItemListEntryComponent): void {
    this.reloadWorkItems();
  }

  listenToEvents() {
    this.broadcaster.on<string>('logout')
      .subscribe(message => {
        this.loggedIn = false;
    });
    this.broadcaster.on<string>('closeDetail')
      .subscribe(message => {        
        this.panelState = 'out';
        this.reloadWorkItems(); 
        console.log(this.panelState);
        window.setTimeout(() =>{
          this.showWorkItemDetails = false;
        }, 600);            
    });
    this.broadcaster.on<string>('detailReady')
      .subscribe(message => {        
        this.panelState = 'in';               
    });
  }
}
