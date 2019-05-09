// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RideListComponent} from "./rides/ride-list.component";
import {AddRideComponent} from "./rides/add-ride.component";
import {HomeComponent} from "./home/home.component";
import {AppAuthGuard} from "./app.authGuard";
import {EditRideComponent} from "./rides/edit-ride.component";
import {ProfileComponent} from "./users/profile.component";
import {ChatComponent} from "./chat/chat.component";
import {ClaimRideComponent} from "./rides/claim-ride.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rides', component: RideListComponent, canActivate: [AppAuthGuard]},
  {path: 'addride', component: AddRideComponent,canActivate: [AppAuthGuard]},
  {path: 'editride', component: EditRideComponent,canActivate: [AppAuthGuard]},
  {path: 'claimride', component: ClaimRideComponent,canActivate: [AppAuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AppAuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AppAuthGuard]}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
