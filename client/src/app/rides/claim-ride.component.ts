import {Component, OnInit} from '@angular/core';
import {Ride} from './ride';
import {RideListService} from "./ride-list.service";
import {Observable} from "rxjs/Observable";
import {ValidatorService} from "../validator.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'claim-ride.component',
  templateUrl: 'claim-ride.component.html',
})

export class ClaimRideComponent implements OnInit {
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


  // Please leave as true for now, it's important.
  public rideDriving: boolean = true;
  public rideRoundTrip: boolean = false;
  public rideNonSmoking: boolean = false;
  public rideEco: boolean = false;
  public ridePetFriendly = false;


  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService,
              public validatorService: ValidatorService,
              public snackBar: MatSnackBar) {
  }

  claimRide(): void {
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
      petFriendly: this.ridePetFriendly,

    };

    console.log("COMPONENT: The new Ride in addRide() is " + JSON.stringify(newRide));

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

  setRideFields() {
    this.rideOrigin = this.rideListService.singleRide.origin;
    this.rideDestination = this.rideListService.singleRide.destination;
    this.rideDepartureDate = this.rideListService.singleRide.departureDate;
    this.rideDepartureTime = this.rideListService.singleRide.departureTime;
    this.rideNonSmoking = this.rideListService.singleRide.nonSmoking;
    this.rideRoundTrip = this.rideListService.singleRide.roundTrip;
    this.rideEco = this.rideListService.singleRide.eco;
    this.ridePetFriendly = this.rideListService.singleRide.petFriendly;


    this.rideNotes = "This ride created for " + this.rideListService.singleRide.user + ".";
  }




  ngOnInit() {
    this.validatorService.createForm();
    this.setRideFields();

  }


}



