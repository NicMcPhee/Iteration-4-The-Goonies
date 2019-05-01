import {Component, Input, OnInit} from "@angular/core";
import {AgmMap} from "@agm/core";
import LatLngBounds = google.maps.LatLngBounds
import {} from 'googlemaps';


@Component({
  selector: 'maps-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent {
  @Input() mapHeight: string = "30";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() zoom: number = 12;

}
