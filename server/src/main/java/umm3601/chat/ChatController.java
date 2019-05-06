package umm3601.chat;

//Code taken/inspired from Newton's Fig Iteration 3:
// https://github.com/UMM-CSci-3601-S19/iteration-3-newton-s-fig/blob/master/server/src/main/java/umm3601/chat/ChatController.java


import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import umm3601.DatabaseHelper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.TimeZone;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Filters.or;
import static com.mongodb.client.model.Sorts.ascending;
import static com.mongodb.client.model.Sorts.orderBy;

public class ChatController {

  private final MongoCollection<Document> chatCollection;

  public ChatController(MongoDatabase database) {
    chatCollection = database.getCollection("chats");
  }

  public String getChat(String id) {
    FindIterable<Document> jsonChats
      = chatCollection
      .find(eq("rideID", new ObjectId(id)));

    Iterator<Document> iterator = jsonChats.iterator();
    if (iterator.hasNext()) {
      Document chat = iterator.next();
      return chat.toJson();
    } else {
      return null;
    }
  }

  public String getMessages(Map<String, String[]> queryParams) {

    // server-side filtering will happen here if we sell that in future stories.
    // Right now, this method simply returns all existing rides.
    Document filterDoc = new Document();

    //https://stackoverflow.com/a/3914498 @ Joachim Sauer (Oct 12 2010) & L S (Jun 29 2016)
    //Creates a date in ISO format
    TimeZone tz = TimeZone.getTimeZone("America/Chicago");
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
    df.setTimeZone(tz);
    String nowAsISO = df.format(new Date());

    //siddhartha jain, Feb 24, 17
    // @ https://stackoverflow.com/questions/42438887/how-to-sort-the-documents-we-got-from-find-command-in-mongodb
    Bson sortDate = ascending("departureDate");
    Bson sortTime = ascending("departureTime");

    //filters out dates that aren't greater than or equal to today's date
    Bson pastDate = gte("departureDate", nowAsISO.substring(0,10)+"T05:00:00.000Z");
    //filters out times that aren't greater than or equal to the current time
    Bson pastTime = gte("departureTime", nowAsISO.substring(11,16));
    //filters out anything past the current date and time
    Bson sameDayPastTime = and(pastDate, pastTime);
    //filters out anything today or later
    Bson tomorrowOrLater = gt("departureDate",nowAsISO.substring(0,10)+"T05:00:00.000Z");
    //Only shows dates that are either (today ^ (today ^ laterThanNow)) or dates after today
    Bson oldRides= or(sameDayPastTime, tomorrowOrLater);

    Bson order = orderBy(sortDate, sortTime);

    FindIterable<Document> matchingRides = chatCollection.find(oldRides).filter(oldRides).sort(order);

    return DatabaseHelper.serializeIterable(matchingRides);
  }

  public String addNewChat(String rideID) {

    Document newChat = new Document();
    newChat.append("rideID", rideID);
    //newChat.append("chatArray", arrayofmessage);

    try {
      chatCollection.insertOne(newChat);
      ObjectId id = newChat.getObjectId("rideID");
      return id.toHexString();
    }
    catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }


}
