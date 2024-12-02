import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';

import { UsersComponent } from './users/users.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { TextoComponent } from './texto/texto.component';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion'
import { SelectButtonModule } from 'primeng/selectbutton'
import { MessagesModule } from 'primeng/messages';


@NgModule({
  imports: [
    ButtonModule,
    ToastModule,
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DropdownModule,
    ColorPickerModule,
    InputTextareaModule, 
    FullCalendarModule,
    DividerModule,
    DialogModule,
    DropdownModule,
    AccordionModule,
    SelectButtonModule,
    MessagesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    UsersComponent,
    TextoComponent,
  ]
})
export class ComponentsModule { }
