import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {ChatList} from './chatList';
import {Message} from "./message";
import {environment} from '../../environments/environment';
// import {joinRideObject} from "./joinRideObject";
import {Subject} from "rxjs/Subject";
import {tap} from "rxjs/operators";
import {ChatComponent} from "./chat.component";



@Injectable()
export class ChatListService {
  readonly baseUrl: string = environment.API_URL + 'chat';
  private chatUrl: string = this.baseUrl;
  public singleChat: ChatList;

  constructor(private http: HttpClient) {
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getChats(): Observable<ChatList[]> {
    return this.http.get<ChatList[]>(this.chatUrl);
  }

  addNewChat(newChat: ChatList): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        // We're sending JSON
        'Content-Type': 'application/json'
      }),
      // But we're getting a simple (text) string in response
      // The server sends the hex version of the new ride back
      // so we know how to find/access that user again later.
      responseType: 'text' as 'json'
    };

    // Send post request to add a new user with the user data as the body with specified headers.
    return this.http.post<string>(this.chatUrl + '/new', newChat, httpOptions)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
