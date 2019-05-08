export interface Ride {
  _id: string;
  user: string;
  userId: string;
  notes: string;
  seatsAvailable: number;
  seatsTotal: number;
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  departureDate: string;
  departureTime: string;
  isDriving: boolean;
  roundTrip?: boolean;
  nonSmoking: boolean;
  passengerIds?: string[];
  passengerNames?: string[];
  eco: boolean;
  petFriendly: boolean;
}
