import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBase } from '../../../core/Forms/FormBase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends FormBase implements OnInit {

  contactForm : FormGroup;
  loading = false;
  contactForm$: Observable<boolean>;
  private unsubscribe: Subject<any>;
  @Output() onFormSubmit: EventEmitter<object> = new EventEmitter();
  @Input() title: string;
  @Input() data : object = {};
  constructor(
    private fb : FormBuilder,
  ) {
    super();
    this.unsubscribe = new Subject();
  }

  ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
  }
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
		this.form = this.fb.group({
      name: ['', [Validators.required]],
      phone : ['', Validators.required],
      address: [''],
      notes: ['']
    });
  }

  get allIsFormsValid(){
    let isFormValid = true ;
    Object.keys(this.form.controls).forEach(key =>{
      if(this.form.get(key).value){
        isFormValid = false;
      }
    })
    return !this.isFormValid || isFormValid
  }

  sendFormData(){
    let data = this.form.value;
    this.onFormSubmit.emit(data);
  }

}
