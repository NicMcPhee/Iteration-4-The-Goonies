import {Component, OnInit} from '@angular/core';
import {Ride} from './ride';
import {RideListService} from "./ride-list.service";
import {Observable} from "rxjs/Observable";
import {ValidatorService} from "../validator.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Marker} from "../maps/marker";

@Component({
  selector: 'add-ride.component',
  templateUrl: 'add-ride.component.html',
  styleUrls: ['./add-ride.component.scss'],
})

export class AddRideComponent implements OnInit {
  minDate = new Date();

  public rides: Ride[];

  private highlightedID: string = '';

  // public rideUser: string;
  public rideUser = localStorage.getItem("userFullName");
  public rideUserId = localStorage.getItem("userId");
  public rideNotes: string;
  public rideSeats: number;
  public rideOrigin: google.maps.places.PlaceResult;
  public rideDestination: google.maps.places.PlaceResult;
  public rideDepartureDate: string;
  public rideDepartureTime: string;
  public markers: Marker [] = [];


  // Please leave as true for now, it's important.
  public rideDriving: boolean = true;
  public rideRoundTrip: boolean = false;
  public rideNonSmoking: boolean = false;
  public rideEco: boolean = false;
  public ridePetFriendly: boolean = false;


  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService,
              public validatorService: ValidatorService,
              public snackBar: MatSnackBar) {
  }

  addRide(): void {
    const newRide: Ride = {
      _id: '',
      user: this.rideUser,
      userId: this.rideUserId,
      notes: this.rideNotes,
      seatsAvailable: this.rideSeats,
      seatsTotal: this.rideSeats,
      origin: this.rideOrigin,
      destination: this.rideDestination,
      departureDate: this.rideDepartureDate,
      departureTime: this.rideDepartureTime,
      roundTrip: this.rideRoundTrip,
      isDriving: this.rideDriving,
      nonSmoking: this.rideNonSmoking,
      eco: this.rideEco,
      petFriendly: this.ridePetFriendly
    };

    console.log("COMPONENT: The new Ride in addRide() is " + JSON.stringify(newRide));
    console.log(newRide);

    if (newRide != null) {
      console.log("Is the subscribe the problem??");
      this.rideListService.addNewRide(newRide).subscribe(
        result => {
          console.log("here it is:" + result);
          this.highlightedID = result;
          console.log("COMPONENT: The RESULT in addRide() is " + JSON.stringify(result));
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the ride.');
          console.log('The newRide or dialogResult was ' + newRide);
          console.log('The error was ' + JSON.stringify(err));
        });

      this.snackBar.open("Successfully Added A Ride",'' , <MatSnackBarConfig>{duration: 5000,});

      this.refreshRides();
    }
  };

  refreshRides(): Observable<Ride[]> {
    // Get Rides returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)
    const rides: Observable<Ride[]> = this.rideListService.getRides();
    rides.subscribe(
      rides => {
        this.rides = rides;
        console.log(" These are the rides getRides got back after addRide called Refresh Ride " + JSON.stringify(this.rides));
      },
      err => {
        console.log(err);
      });
    return rides;
  }

  // IMPORTANT! This function gets called whenever the user selects 'looking for a ride'.
  //   This is so that form validator doesn't get mad for having an invalid 'rideSeats' value.
  //   Before adding the ride to the DB, the value gets set to 0 (by the ride controller).
  //   Also, ride-list component HTML won't display this number unless it is indeed a User that is driving.
  setRideSeats() {
    this.rideSeats = 1;
  }

  setRideOrigin(placeResult: google.maps.places.PlaceResult) {
    console.log(placeResult);
    this.rideOrigin = placeResult;
    let m: Marker = {
      longitude: placeResult.geometry.location.lng(),
      latitude: placeResult.geometry.location.lat(),
      label: 'A'
    };
    this.markers[0] = m;
    this.markers = this.markers.slice();
  }

  setRideDestination(placeResult: google.maps.places.PlaceResult) {
    this.rideDestination = placeResult;
    let m: Marker = {
      longitude: placeResult.geometry.location.lng(),
      latitude: placeResult.geometry.location.lat(),
      label: 'B'
    };
    this.markers[1] = m;
    this.markers = this.markers.slice();
  }

  ngOnInit() {
    this.validatorService.createForm();
    console.log(this.rideDestination);
  }


}



