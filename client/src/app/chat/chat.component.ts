import {Component, OnInit} from '@angular/core';
import {Message} from './message'

import {FormControl, FormGroup} from "@angular/forms";

import {Observable} from 'rxjs/Observable';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: []
})

export class ChatComponent implements OnInit {

  public currUserFullName = localStorage.getItem("userFullName");

  public rideID: string;
  public author: string;
  public content: string;
  public date: string;

  constructor() {

  }

  sendChat() {
    //const tempvar = document.getElementById("textEntry");
    //console.log(tempvar);
    console.log(this.currUserFullName);
  }

  ngOnInit(){

  }

}
