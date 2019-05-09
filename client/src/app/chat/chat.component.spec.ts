// import {ComponentFixture, TestBed, async} from '@angular/core/testing';
// import {ChatList} from './chatList';
// import {ChatListService} from "chat-list.service";
// import {Observable} from 'rxjs/Observable';
// import {FormsModule} from '@angular/forms';
// import {CustomModule} from '../custom.module';
// import {RouterLinkDirectiveStub} from "/rides/router-link-directive-stub";
//
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import {By} from "@angular/platform-browser";
// import {Subject} from "rxjs/Subject";
// import {ChatComponent} from "./chat.component";
// import {ChatListService} from "./chat-list.service";
//
// describe('Ride list', () => {
//
//   let chatThing: ChatComponent;
//   let fixture: ComponentFixture<ChatComponent>;
//
//   let chatComponentServiceStub: {
//     getTheChats: () => Observable<ChatList[]>,
//     refreshNeeded$: Subject<void>
//   };
//
//   let linkDes;
//   let routerLinks;
//
//   beforeEach(() => {
//     // stub RideService for test purposes
//     chatComponentServiceStub = {
//       getTheChats: () => Observable.of([
//         {
//           _id: "5cd39b9433b7c944721d8f54"
//           rideID: "5c832bec201270bd881ace78"
//           chatArray: "[Document{{author=Mitchell Drummer, content=hi mitch, date=2019-5-8 22:11:30}}]"
//         }
//       ]),
//       refreshNeeded$: new Subject<void>()
//     };
//
//     TestBed.configureTestingModule({
//       imports: [CustomModule],
//       declarations: [ChatComponent, RouterLinkDirectiveStub],
//       providers: [{provide: ChatComponent, useValue: chatComponentServiceStub}]
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ChatComponent);
//       chatThing = fixture.componentInstance;
//       fixture.detectChanges();
//
//       // find DebugElements with an attached RouterLinkStubDirective
//       linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
//
//       // get attached link directive instances
//       // using each DebugElement's injector
//       routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
//
//     });
//   }));
//
//   //TIME AND DATE PARSING
//   //Time parsing from 24 hour format to 12 hour AM/PM
//
//
//   //Affirmative containings: has the following items
//   it('contains all the rides', () => {
//     expect(chatThing.rides.length).toBe(3);
//   });
//
//
//
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// describe('Misbehaving Ride List', () => {
//   let chatThing: RideListComponent;
//   let fixture: ComponentFixture<RideListComponent>;
//
//   let chatThingServiceStub: {
//     getRides: () => Observable<Ride[]>
//     refreshNeeded$: Subject<void>
//   };
//
//   let linkDes;
//   let routerLinks;
//
//   beforeEach(() => {
//     // stub RideService for test purposes
//     chatThingServiceStub = {
//       getRides: () => Observable.create(observer => {
//         observer.error('Error-prone observable');
//       }),
//       refreshNeeded$: new Subject<void>()
//     };
//
//     TestBed.configureTestingModule({
//       imports: [FormsModule, CustomModule],
//       declarations: [ChatComponent,RouterLinkDirectiveStub],
//       providers: [{provide: ChatComponent, useValue: chatThingServiceStub}]
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ChatComponent);
//       chatThing = fixture.componentInstance;
//       fixture.detectChanges();
//
//       // find DebugElements with an attached RouterLinkStubDirective
//       linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
//
//       // get attached link directive instances
//       // using each DebugElement's injector
//       routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
//     });
//   }));
//
//   it('generates an error if we don\'t set up a RideListService', () => {
//     // Since the observer throws an error, we don't expect rides to be defined.
//     expect(chatThing.).toBeUndefined();
//   });
// });
//
