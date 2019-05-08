//Code from most chat.component files, were copied/used as references from the ride.component files, including some of the chat controllers.

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {ValidatorService} from "../validator.service";
import {MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Observable} from 'rxjs/Observable';

import {Ride} from "../rides/ride";
import {RideListComponent} from "../rides/ride-list.component";

import {Message} from './message'
import {ChatList} from "./chatList";
import {ChatListService} from "./chat-list.service";
import {ArrayType} from "@angular/compiler/src/output/output_ast";

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

  private highlightedID: string = '';

  public currUserFullName = localStorage.getItem("userFullName");

  public rideIDpassed: string;
  public author: string;
  public content: string;
  public date: string;
  public chatArrayComponent;

  public newChatList: ChatList;
  public messageContent: string;

  public chats: ChatList[];
  public filteredChats;

  public test0 = document.getElementsByClassName("chat-class0")[0];


  constructor(public ChatListService: ChatListService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.ChatListService.refreshNeeded$
      .subscribe(() => {
        this.refreshChats();
      });
    this.loadService();
  }

  sendChat() {
    const rawContent = this.chatFormGroup.getRawValue();
    this.messageContent = rawContent.enteredMessage;

    if (this.messageContent != null) {
      //I have a double if statement here because I'm handling some basic form validators here, and I dont want to call "length" on a non-string and get an error
      if (this.messageContent.length != 0) {
        // let length;

        this.chatArrayComponent = [
        {
          author: this.currUserFullName,
            content: this.messageContent,
          date: "this is a date",
        }
        ];
        //the following method .push() needs to be used at some point, but for arrays the first data point specifically has to be
        //initialized with a =, instead of push so this is very complicated
      //   const tempvar0 =  {
      //     author: this.currUserFullName,
      //   content: messageContent,
      //   date: "this is a date",
      // };
      //   length = this.chatArrayComponent.push(tempvar0);
      //   console.log("length:" + length.toString());
        this.newChatList = {
          rideID: this.rideIDpassed,
          chatArray: this.chatArrayComponent
        };
        console.log("chatarray:"+this.chatArrayComponent);
        console.log(this.messageContent);
        console.log(this.currUserFullName);
        this.addChat();
      }else {
        console.log("your message was zero characters long")
      }
    }else {
      console.log("Your message was not alphanumeric")
    }
  }

  addChat(): void {
    console.log("COMPONENT: The new chat in newChatList() is " + JSON.stringify(this.newChatList));
    if (this.newChatList != null) {
      this.ChatListService.addNewChat(this.newChatList).subscribe(
        result => {
          console.log("here it is:" + result);
          this.highlightedID = result;
          console.log("COMPONENT: The RESULT in addChat() is " + JSON.stringify(result));
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the chat.');
          console.log('The newchat or dialogResult was ' + this.newChatList);
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

  loadService(): void {
    this.ChatListService.getChats().subscribe(
      chats0 => {
        this.chats = chats0;
      },
      err => {
        console.log(err);
      }
    );
  }

  public filterChat(): ChatList[] {
    this.filteredChats = this.chats;

    //This may not work correctly, beware of this
    // Filter by rideID so that the chat for the current ride is only displayed
    if (this.rideIDpassed != null) {
      this.filteredChats = this.filteredChats.filter(chatList => {
        return !this.rideIDpassed || chatList.rideID == this.rideIDpassed;
      });
    }

    return this.filteredChats;
  }
}
