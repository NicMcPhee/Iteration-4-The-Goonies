package umm3601.chat;

//Code taken/inspired from Newton's Fig Iteration 3:
// https://github.com/UMM-CSci-3601-S19/iteration-3-newton-s-fig/blob/master/server/src/main/java/umm3601/chat/ChatController.java




//to get these imports to work you may have to run: "npm install getstream" and "npm install jsonwebtoken" in the intelij command line
//
//import
//


import org.bson.Document;
import spark.Request;
import spark.Response;


public class ChatRequestHandler {

  public final ChatController chatController;

  public ChatRequestHandler(ChatController chatController) {
    this.chatController = chatController;
  }

//  public String getChatJSON(Request req, Response res) {
//    res.type("application/json");
//    String chatID = req.params("id");
//    System.err.println("The chat chatId req params got is " + chatID);
//    String chat;
//    try {
//      chat = chatController.getChat(chatID);
//    } catch (IllegalArgumentException e) {
//      // This is thrown if the ID doesn't have the appropriate
//      // form for a Mongo Object ID.
//      // https://docs.mongodb.com/manual/reference/method/ObjectId/
//      res.status(400);
//      res.body("The requested user chatID " + chatID + " wasn't a legal Mongo Object ID.\n" +
//        "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
//      return "";
//    }
//    if (chat != null) {
//      return chat;
//    } else {
//      res.status(404);
//      res.body("The requested chat with RideID " + chatID + " was not found");
//      return "";
//    }
//  }

  public String getChats(Request req, Response res) {
    res.type("application/json");
    //the requests and responses should be empty, these print lines helped me figure that out
//    System.out.println("this is the request" + req.body());
//    System.out.println("this is the response" + res.body());
//    System.out.println(req.queryMap().toMap());
    return chatController.getMessages(req.queryMap().toMap());
  }

  public String addNewChat(Request req, Response res) {
    res.type("application/json");

    System.out.println("this is the body in addnewchat in request handler" + req.body());

    Document newChat = Document.parse(req.body());

    String rideID = newChat.getString("rideID");
    System.out.println("this is rideID currently" + rideID);
    Object chatArray = newChat.get("chatArray");

    return chatController.addNewChat(rideID, chatArray);

  }
}
