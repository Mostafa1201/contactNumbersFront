import { Injectable } from '@angular/core';
import { BasePostRequestService } from 'src/app/core/backend-services/base-post-request.service';
import URL from "src/app/core/constants/urls";
@Injectable({
  providedIn: 'root'
})
export class ContactAddService extends BasePostRequestService{

  _path = URL.contacts.add;


}