package umm3601.ride;

import org.bson.Document;
import spark.Request;
import spark.Response;

import java.util.List;

public class RideRequestHandler {

  private final RideController rideController;

  public RideRequestHandler(RideController rideController) {
    this.rideController = rideController;
  }

  /**
   * Method called from Server when the 'api/rides/:id' endpoint is received.
   * Get a JSON response with a list of all the rides in the database.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return one ride in JSON formatted string and if it fails it will return text with a different HTTP status code
   */
  public String getRideJSON(Request req, Response res) {
    res.type("application/json");
    String id = req.params("id");
    String ride;
    try {
      ride = rideController.getRide(id);
    } catch (IllegalArgumentException e) {
      // This is thrown if the ID doesn't have the appropriate
      // form for a Mongo Object ID.
      // https://docs.mongodb.com/manual/reference/method/ObjectId/
      res.status(400);
      res.body("The requested ride id " + id + " wasn't a legal Mongo Object ID.\n" +
        "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
      return "";
    }
    if (ride != null) {
      return ride;
    } else {
      res.status(404);
      res.body("The requested ride with id " + id + " was not found");
      return "";
    }
  }


  /**
   * Method called from Server when the 'api/rides' endpoint is received.
   * This handles the request received and the response that will be sent back.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return an array of rides in JSON formatted String
   */
  public String getRides(Request req, Response res) {
    res.type("application/json");
    return rideController.getRides(req.queryMap().toMap());
  }

  /**
   * Method called from Server when the 'api/rides/new' endpoint is received.
   * Gets specified rides info from request and calls addNewRide helper method
   * to append that info to a document
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return a boolean as whether the ride was added successfully or not
   */
  public String addNewRide(Request req, Response res) {
    res.type("application/json");

    Document newRide = Document.parse(req.body());

    String user = newRide.getString("user");
    String userId = newRide.getString("userId");
    String notes = newRide.getString("notes");
    int seatsAvailable = newRide.getInteger("seatsAvailable");
    String origin = newRide.getString("origin");
    String destination = newRide.getString("destination");
    String departureDate = newRide.getString("departureDate");
    String departureTime = newRide.getString("departureTime");
    boolean isDriving = newRide.getBoolean("isDriving");
    boolean roundTrip = newRide.getBoolean("roundTrip");
    boolean nonSmoking = newRide.getBoolean("nonSmoking");

    return rideController.addNewRide(user, userId, notes, seatsAvailable, origin, destination,
      departureDate, departureTime, isDriving, roundTrip, nonSmoking);

  }

  public Boolean deleteRide(Request req, Response res){
    res.type("application/json");

    Document deleteRide = Document.parse(req.body());

    String id = deleteRide.getString("_id");
    System.err.println("Deleting ride id=" + id);
    return rideController.deleteRide(id);
  }

  public Boolean editRide(Request req, Response res) {

    System.err.println("Print something!");

    res.type("application/json");

    // Turn the request into a Document
    Document editRide = Document.parse(req.body());

    String id = editRide.getObjectId("_id").toHexString();
//    We don't include the following fields, because they shouldn't be edited.
//    String user = editRide.getString("user");
//    String userId = editRide.getString("userId");
    String notes = editRide.getString("notes");
    int seatsAvailable = editRide.getInteger("seatsAvailable");
    String origin = editRide.getString("origin");
    String destination = editRide.getString("destination");
    String departureDate = editRide.getString("departureDate");
    String departureTime = editRide.getString("departureTime");
    Boolean isDriving = editRide.getBoolean("isDriving");
    Boolean roundTrip = editRide.getBoolean("roundTrip");
    Boolean nonSmoking = editRide.getBoolean("nonSmoking");

    return rideController.editRide(id, notes, seatsAvailable, origin, destination,
      departureDate, departureTime, isDriving, roundTrip, nonSmoking);
  }

  public Boolean joinRide(Request req, Response res) {

    res.type("application/json");

    // Turn the request into a Document
    Document joinRide = Document.parse(req.body());

    System.out.println(joinRide);

    String rideId = joinRide.getObjectId("rideId").toHexString();
    System.out.println(rideId);
    String passengerId = joinRide.getString("passengerId");
    System.out.println(passengerId);
    String passengerName = joinRide.getString("passengerName");
    System.out.println(passengerName);

    return rideController.joinRide(rideId, passengerId, passengerName);
  }


}
