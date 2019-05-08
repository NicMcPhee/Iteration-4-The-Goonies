import {Component, Input, OnInit, ViewChild, Output, EventEmitter, ElementRef, NgZone} from "@angular/core";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";


@Component({
  selector: 'maps-autocomplete',
  templateUrl: './mapsAutocomplete.component.html',
  styleUrls: ['./mapsAutocomplete.component.css']
})

export class MapsAutocomplete implements OnInit{

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number;

  //@Input() autocompletePlaceholder: string;
  formGroup: FormGroup;

  @Output() placeResult = new EventEmitter<google.maps.places.PlaceResult>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder){}

  ngOnInit(){

    //set google maps defaults
    // this.latitude = 45.5919;
    // this.longitude = -95.9189;

    //create search FormControl
    this.formGroup = this.fb.group({
      search: ['']
    });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.placeResult.emit(autocomplete.getPlace());
        });
      });
    });
  }

}

