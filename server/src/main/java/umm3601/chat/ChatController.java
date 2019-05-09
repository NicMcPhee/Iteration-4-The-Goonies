package umm3601.chat;

//Code taken/inspired from Newton's Fig Iteration 3:
// https://github.com/UMM-CSci-3601-S19/iteration-3-newton-s-fig/blob/master/server/src/main/java/umm3601/chat/ChatController.java



import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import umm3601.DatabaseHelper;

import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

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
    //there is no need to filter chats yet, so filterdoc is commented out
    //Document filterDoc = new Document();

    //calling .find() with no parameters in between the parentheses, returns all the data in the collection - helpful tip to anyone wondering what's going on here
    FindIterable<Document> matchingChats = chatCollection.find();
    //System.out.println("databasehelper line" + DatabaseHelper.serializeIterable(matchingChats));

    return DatabaseHelper.serializeIterable(matchingChats);
  }

  public String addNewChat(String rideID, Object chatArray) {

    Document newChat = new Document();
    newChat.append("rideID", rideID);
    newChat.append("chatArray", chatArray.toString());
    //System.out.println("newchat after appends " + newChat.getString("chatArray"));

    try {
      chatCollection.insertOne(newChat);
      ObjectId id = newChat.getObjectId("_id");
      System.out.println(" ");
      return id.toHexString();
    }
    catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }


}
