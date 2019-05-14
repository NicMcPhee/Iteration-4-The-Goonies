## Generating credentials for the Authorization Features

To deploy Google Login (sometimes known as OAuth2) to your website, you will need to generate keys from 
the Google API developers console. 
- Go to the API Console. [Api Console](https://console.developers.google.com/)
- From the projects list, create a new one.
- If the APIs & services page isn't already open, open the console left side menu and select APIs & services.
- On the left, click Credentials.
- Click New Credentials, then select OAuth client ID.
- As Moride is a Web Application, choose "Web Application"
- Select the appropriate application type for your project and enter any additional information required. Application types are described in more detail in the following sections.
- Click Create client ID
This Client ID needs to go into:
Index.html, in the quotes within "google-signin-client_id" content.
credentials.json, which is a file that you can download from your new Google API developers project. On the same page that you see your client ID, you should also see "DOWNLOAD JSON"
Included in this readme's folder is a credentialsEXAMPLE.md file. It shows you what you should replace your credentials.json file fields with.
Place your credentials file into this directory: server/src/main/java/umm3601

To hide your API_KEYS, use a gitignored export config in the relevant file directory with your keys.
In the config file, enter your API keys in an object like so (naming them whatever you like, and putting the keys in 
as strings). You don't need any other code in this file:

var config = {
  API_KEY : '123456',
  SECRET_KEY : '56789',
  KEY_2 : '101010'
} 

Import these keys to any relevant TS file. 
In your javascript/jquery file (probably script.js), declare variables that point to your API keys in the config file 
like so. Note that the 'config' here refers to the object called 'config', NOT to the file config.js:

var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

### Importing api key as a variable
If you would like to use the key in a file like your app.module.ts, you have to import this file. To do this you import it with the line "import * as 'any variable you'd like to use' from 'file path'". In our example we did "import * as Config from 'file path'". In the maps branch we do this in app.module.ts file, and our config.json file looks like this.

{
  API_KEY : '123456',
  SECRET_KEY : '56789',
  KEY_2 : '101010'
} 

Then you would reference to it with the variable you chose, and in our example we called it like this: 

"var 'any variable' = Config.API_KEY".

Then you can use the variable any place you'd like.
