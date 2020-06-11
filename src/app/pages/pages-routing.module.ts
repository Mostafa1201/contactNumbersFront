// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "../core/base/base.component";

const routes: Routes = [
	{
		path: "",
		component: BaseComponent,
		children: [
			{
				path: "",
				loadChildren: "./contacts/contacts.module#ContactsModule"
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}
