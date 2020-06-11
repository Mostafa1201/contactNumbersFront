import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContactAddService } from '../services/add-contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  backendError
  constructor(
    private contactAddService : ContactAddService,
    private router : Router,
    private cdr : ChangeDetectorRef,
  ) { }

  ngOnInit() {}

  async addContact(event){
    try {
      this.contactAddService.setParams(event);
      let res = await this.contactAddService.makeRequest();
      this.router.navigate([''])
    } catch (error) {
      this.backendError = error.faultyRequest.error;
      this.cdr.detectChanges()
    }
  }

}
