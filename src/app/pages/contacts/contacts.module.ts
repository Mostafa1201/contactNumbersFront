import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ContactsRoutingModule } from './contacts-routing.module';
import { MaterialModule } from './../../core/material/material.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// Material
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
} from "@angular/material";
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { environment } from 'src/environments/environment';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
	declarations: [
        ContactsListComponent,
        ContactAddComponent,
        ContactFormComponent,
        ContactEditComponent,
	],
	imports: [
		CommonModule,
        ReactiveFormsModule,
		ContactsRoutingModule,
		MaterialModule,
		FormsModule,
		PaginationModule.forRoot(),
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		AngularFireModule.initializeApp(environment.firebaseConfig, 'Contact Numbers Web App'),
		AngularFireDatabaseModule,
		AngularFirestoreModule,
		AngularFireStorageModule
	]
})
export class ContactsModule {}
