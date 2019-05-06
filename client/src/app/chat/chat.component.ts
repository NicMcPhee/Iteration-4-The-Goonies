//Code from most chat.component files, were copied/used as references from the ride.component files, including some of the chat controllers.

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {Message} from './message'
import {ChatList} from "./chatList";
import {ChatListService} from "./chat-list.service";

import {ValidatorService} from "../validator.service";
import {MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";

import {Observable} from 'rxjs/Observable';

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

  public chats: ChatList[];

  private highlightedID: string = '';

  public currUserFullName = localStorage.getItem("userFullName");

  public rideID: string;
  public author: string;
  public content: string;
  public date: string;
  public chatArray: Message[];

  constructor(public ChatListService: ChatListService,
              public snackBar: MatSnackBar) {
  }

  sendChat() {
    const tempvar0 = this.chatFormGroup.getRawValue();
    console.log(tempvar0);
    this.rideID = "temporary string";
    // const tempvar = document.getElementById("chat-message-entry");
    // console.log(tempvar);
    //this.regForm.get('textEntry3').value
    console.log(this.currUserFullName);
    this.addChat();
  }

  addChat(): void {
    const newChatList: ChatList = {
      rideID: this.rideID,
      chatArray: this.chatArray
    };

    console.log("COMPONENT: The new chat in newChatList() is " + JSON.stringify(newChatList));

    if (newChatList != null) {
      console.log("Is the subscribe the problem??");
      this.ChatListService.addNewChat(newChatList).subscribe(
        result => {
          console.log("here it is:" + result);
          this.highlightedID = result;
          console.log("COMPONENT: The RESULT in addRide() is " + JSON.stringify(result));
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the ride.');
          console.log('The newchat or dialogResult was ' + newChatList);
          console.log('The error was ' + JSON.stringify(err));
        });

      this.snackBar.open("Successfully Added A chat",'' , <MatSnackBarConfig>{duration: 5000,});

      this.refreshChats();
    }
  };

  refreshChats(): Observable<ChatList[]> {
    // Get chats returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)
    const chats: Observable<ChatList[]> = this.ChatListService.getChats();
    chats.subscribe(
      chats => {
        this.chats = chats;
        console.log(" These are the chats getChats got back after addChat called Refresh chat " + JSON.stringify(this.chats));
      },
      err => {
        console.log(err);
      });
    return chats;
  }

  ngOnInit(){

  }

}
