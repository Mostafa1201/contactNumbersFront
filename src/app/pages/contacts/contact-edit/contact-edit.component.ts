import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { GetContactService } from '../services/get-contact.service';
import { ContactEditService } from '../services/edit-contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  errorMessage = ""
  id : number = -1;
  data : object = {};
  @ViewChild(ContactFormComponent, {static: false}) ContactFormComponent : ContactFormComponent;
  contacts: AngularFireList<any[]>;
  constructor(
    private getContactService : GetContactService,
    private contactEditService : ContactEditService,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( async params => {
      this.id = parseInt(params.get("id"));
      this.db.object(`contacts/${this.id}`).update({ contactId: this.id,isLocked: true });
      this.getContactService.setParams({id : this.id});
      let result = await this.getContactService.makeRequest();
      this.data = result.contact;
      this.ContactFormComponent.form.patchValue(this.data);
      this.cdr.detectChanges();
    });
    
  }

  async editContact(event){
    this.contactEditService.setParams({...event , id : this.id});
    let res = await this.contactEditService.makeRequest();
    if(res.success){
      this.db.object(`contacts/${this.id}`).update({ contactId: this.id,isLocked: false });
      this.router.navigate(['']);
    }else{
      this.errorMessage = res.message;
    }
  }

}
