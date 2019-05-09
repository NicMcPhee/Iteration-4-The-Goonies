import {Component, Input, OnInit} from "@angular/core";
import {} from 'googlemaps';
import {Marker} from "./marker";


@Component({
  selector: 'maps-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit{
  @Input() mapHeightVH: string = "100";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() zoom: number = 12;
  @Input() markers: Marker[] = [];

  filledMarkers(): Marker[] {
    return this.markers.filter(x => (x['longitude'] && x['latitude']));
  }
  //
  // setRideOrigin(placeResult: google.maps.places.PlaceResult) {
  //   console.log(placeResult);
  //   this.rideOrigin = placeResult;
  //   let m: Marker = {
  //     longitude: placeResult.geometry.location.lng(),
  //     latitude: placeResult.geometry.location.lat(),
  //     label: 'A'
  //   };
  //   this.markers[0] = m;
  //   this.markers = this.markers.slice();
  // }
  //
  // setRideDestination(placeResult: google.maps.places.PlaceResult) {
  //   this.rideDestination = placeResult;
  //   let m: Marker = {
  //     longitude: placeResult.geometry.location.lng(),
  //     latitude: placeResult.geometry.location.lat(),
  //     label: 'B'
  //   };
  //   this.markers[1] = m;
  //   this.markers = this.markers.slice();
  // }

  ngOnInit() {
    document.getElementById("map").style.height = this.mapHeightVH + "vh";
  }


}
