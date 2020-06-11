import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactsListService } from '../services/get-all-contacts.service';
import Swal from 'sweetalert2';
import { DeleteContactService } from '../services/delete-contact.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  constructor(
    private contactsListService: ContactsListService,
    private deleteContactService: DeleteContactService,
    private cdr: ChangeDetectorRef,
    private db: AngularFireDatabase,
  ) { }
  totalItems: number;
	properties = ["name","phone","address","notes"];
  requestObject = {
		date :  null ,
		search : "" , 
		pageSize : 5,
		pageNumber : 1 , 
		sort: "createdAt" , 
		sortType : "ASC" ,  
		columns : this.properties,
  };
  contacts: any;
  async ngOnInit() {
    await this.updateContactList();
    this.getContactsStatuses();
  }

  getContactsStatuses(){
    return this.db.object(`contacts`).valueChanges().subscribe((value : any[]) => {
      for (let contact of this.contacts) {
        if(value){
          let contactData = value.filter(contactData => contactData.contactId == contact.id)[0];
          if(contactData){
            contact.isLocked = contactData.isLocked;
          }
        }
      }
    });
  }

  async updateContactList(){
    this.contactsListService.setParams({
      ...this.requestObject
    });
    let responseData = await this.contactsListService.makeRequest();
    this.totalItems = responseData.count;
    this.contacts = responseData.contacts;

    this.cdr.detectChanges()
  }

  onPageChanged(pageChange : any){
    this.requestObject.pageNumber = pageChange.page;
    this.requestObject.pageSize = pageChange.itemsPerPage;    
    this.updateContactList();
  }

  async searchContacts(searchQuery){
    await this.updateContactList()
  }

  async deleteContact(id : number){
    Swal.fire({
      title: 'Are you sure you want to delete this contact?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      }).then(async result =>{
      if(result.value){
        this.deleteContactService.setParams({id});
        let responseData = await this.deleteContactService.makeRequest();
        if(responseData.success){
          await this.updateContactList()
        }
      }
    });
    }

}
