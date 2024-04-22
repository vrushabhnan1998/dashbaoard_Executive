import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-range-date-picker',
  standalone: true,
  imports: [FormsModule,NgbDropdownModule],
  templateUrl: './range-date-picker.component.html',
  styleUrl: './range-date-picker.component.scss'
})
export class RangeDatePickerComponent {
  selectedOption: string | undefined; // Stores the selected option
  @Input() id?:string;
  @Input() isRequired:boolean | undefined;
  @Input() dropdownLabel:string | undefined;
  @Input() dropdownValue:number | string | undefined;
  @Input () optionDisable:number | undefined;
  @Input() options:any[] | undefined;
  @Output() dropdownValueEmit:EventEmitter<string> = new EventEmitter();
  selectedId: any;
  @Input() labelName:string | undefined;


  selectOption(option:any){
      this.selectedOption = option.name;
      this.dropdownValueEmit.emit(option.id);
      this.selectedId = option.id
  }
}
