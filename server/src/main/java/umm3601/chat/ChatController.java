package umm3601.chat;

//Code taken/inspired from Newton's Fig Iteration 3:
// https://github.com/UMM-CSci-3601-S19/iteration-3-newton-s-fig/blob/master/server/src/main/java/umm3601/chat/ChatController.java


import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;

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

  public String getMessages(String id) {
    Document chat = Document.parse(getChat(id));
    return chat.get("messages").toString();
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
