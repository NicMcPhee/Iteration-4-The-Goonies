import {AfterContentInit, Component, DoCheck, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ride} from './ride';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {RideListService} from "./ride-list.service";
import {Observable} from "rxjs/Observable";
import {ValidatorService} from "../validator.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Marker} from "../maps/marker";

@Component({
  selector: 'edit-ride.component',
  templateUrl: 'edit-ride.component.html',
})


export class EditRideComponent implements OnInit {
  minDate = new Date();
  public rides: Ride[];
  private highlightedID: string = '';

  public rideId: string;
  public rideUser = localStorage.getItem("userFullName");
  public rideUserId = localStorage.getItem("userId");
  public rideNotes: string;
  public rideSeats: number;
  public rideSeatsAvailable: number;
  public rideOrigin: any;
  public rideDestination: any;
  public rideDepartureDate: string;
  public rideDepartureTime: string;
  public markers: Marker [] = [];

  public tempBool: boolean = false;

  // Please leave as true for now, it's important.
  public rideIsDriving: boolean = true;
  public rideRoundTrip: boolean = false;
  public rideNonSmoking: boolean = false;
  public rideEco: boolean = false;
  public ridePetFriendly: boolean = false;

  constructor(
    public rideListService : RideListService, private fb: FormBuilder,
    public validatorService : ValidatorService, public snackBar: MatSnackBar) {
  }

  editRide(): void {

    const editedRide: Ride = {
      _id: this.rideId,
      user: this.rideUser,
      userId: this.rideUserId,
      notes: this.rideNotes,
      seatsAvailable: this.rideSeatsAvailable,
      seatsTotal: this.rideSeats,
      origin: this.rideOrigin,
      destination: this.rideDestination,
      departureDate: this.rideDepartureDate,
      departureTime: this.rideDepartureTime,
      isDriving: this.rideIsDriving,
      roundTrip: this.rideRoundTrip,
      nonSmoking: this.rideNonSmoking,
      eco: this.rideEco,
      petFriendly: this.ridePetFriendly,
    };

    console.log(" The edited Ride in editRide() is " + JSON.stringify(editedRide));

    if (editedRide != null) {
      this.rideListService.editRide(editedRide).subscribe(
        result => {
          console.log("here it is:" + result);
          this.highlightedID = result;
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the ride.');
          console.log('The newRide or dialogResult was ' + editedRide);
          console.log('The error was ' + JSON.stringify(err));
        });
      seatsTotal: this.rideSeats,

      this.snackBar.open("Successfully Edited A Ride",'' , <MatSnackBarConfig>{duration: 5000,});

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
      },
      err => {
        console.log(err);
      });
    return rides;
  }

  setRideFields() {
    this.rideId = this.rideListService.singleRide._id;
    this.rideUser = this.rideListService.singleRide.user;
    this.rideUserId = this.rideListService.singleRide.userId;
    this.rideNotes = this.rideListService.singleRide.notes;
    this.rideSeatsAvailable = this.rideListService.singleRide.seatsAvailable;
    this.rideOrigin = this.rideListService.singleRide.origin;
    this.rideDestination = this.rideListService.singleRide.destination;
    this.rideDepartureDate = this.rideListService.singleRide.departureDate;
    this.rideDepartureTime = this.rideListService.singleRide.departureTime;
    this.rideIsDriving = this.rideListService.singleRide.isDriving;
    this.rideRoundTrip = this.rideListService.singleRide.roundTrip;
    this.rideNonSmoking = this.rideListService.singleRide.nonSmoking;
    this.rideEco = this.rideListService.singleRide.eco;
    this.ridePetFriendly = this.rideListService.singleRide.petFriendly;
    console.log(this.rideListService.singleRide);
  }

  // IMPORTANT! This function gets called whenever the user selects 'looking for a ride'.
  //   This is so that form validator doesn't get mad for having an invalid 'rideSeats' value.
  //   Before adding the ride to the DB, the value gets set to 0 (by the ride controller).
  //   Also, ride-list component HTML won't display this number unless it is indeed a User that is driving.
  setRideSeats() {
    this.rideSeatsAvailable = 1;
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
    this.setRideSeats();
    this.setRideFields();
    this.validatorService.createForm();
    if (this.rideIsDriving === false) {
      this.validatorService.rideForm.removeControl("driving");
      this.validatorService.rideForm.removeControl("seatsAvailable");
    }
  }


}
