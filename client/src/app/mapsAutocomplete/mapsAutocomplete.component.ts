import {Component, Input, OnInit, ViewChild, Output, EventEmitter, ElementRef, NgZone} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";


@Component({
  selector: 'maps-autocomplete',
  templateUrl: './mapsAutocomplete.component.html',
  styleUrls: ['./mapsAutocomplete.component.css']
})

export class MapsAutocomplete implements OnInit{
  @Input() autocompletePlaceholder: string;
  formGroup: FormGroup;

  @Output() placeResult = new EventEmitter<google.maps.places.PlaceResult>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    //create search FormControl
    this.formGroup = this.fb.group({
      search: ['']
    });
  }

}
