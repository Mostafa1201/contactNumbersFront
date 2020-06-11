import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
const routes: Routes = [
	{
		path: "",
		component: ContactsListComponent
	},
	{
		path: "contacts",
		children: [
			{
				path: "add",
				component: ContactAddComponent
			},
			{
				path: "edit/:id",
				component: ContactEditComponent
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactsRoutingModule {}
