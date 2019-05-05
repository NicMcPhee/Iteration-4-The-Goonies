import {Component, Input, OnInit} from "@angular/core";
import {} from 'googlemaps';
import {Marker} from "./marker";


@Component({
  selector: 'maps-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit{
  @Input() mapHeightVH: string = "30";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() zoom: number = 12;
  @Input() markers: Marker[] = [];

  ngOnInit() {
    document.getElementById("map").style.height = this.mapHeightVH + "vh";
  }


}
