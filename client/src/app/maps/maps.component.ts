import {Component, Input, OnInit} from "@angular/core";
import {AgmMap} from "@agm/core";
import LatLngBounds = google.maps.LatLngBounds
import {} from 'googlemaps';
import {Marker} from "./marker";


@Component({
  selector: 'maps-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit{
  @Input() mapHeight: string = "30";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() zoom: number = 12;
  @Input() markers: Marker[] = [];

  ngOnInit() {
    document.getElementById("maps").style.height = this.mapHeight + "vh";
  }

  filledMarkers(): Marker[] {
    return this.markers.filter(x => (x['longitude'] && (x['latitude'])));
  }

}
