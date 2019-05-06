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

  public chatFormGroup = new FormGroup({
    enteredMessage: new FormControl()
  });

  public currUserFullName = localStorage.getItem("userFullName");

  public rideID: string;
  public author: string;
  public content: string;
  public date: string;

  constructor() {

  }

  testMethod(){
    console.log("test messagee")
}

  sendChat() {
    const tempvar0 = this.chatFormGroup.getRawValue();
    console.log(tempvar0);
    // const tempvar = document.getElementById("chat-message-entry");
    // console.log(tempvar);
    //this.regForm.get('textEntry3').value
    console.log(this.currUserFullName);
  }

  ngOnInit(){

  }

}
