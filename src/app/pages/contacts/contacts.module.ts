import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ContactsRoutingModule } from './contacts-routing.module';
import { MaterialModule } from './../../core/material/material.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

@NgModule({
	declarations: [
        ContactsListComponent,
	],
	imports: [
		CommonModule,
        ReactiveFormsModule,
		ContactsRoutingModule,
		MaterialModule
	]
})
export class ContactsModule {}
