import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-model',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-model.component.html',
  styleUrl: './add-model.component.css'
})
export class AddModelComponent {
name="";
  dateOfCreating: any;
}
