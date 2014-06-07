// ==UserScript==
// @name           Plug.dj test
// @description    Plug.dj bot test
// @version 0.2
// ==/UserScript==

@@ -82,8 +82,6 @@ function initAPIListeners()
	
   API.addEventListener(API.USER_JOIN, function(user) {

     if (userList)
	
       populateUserlist();
  	
-    if (isBoris())
	  	
-      API.sendChat("\/me Welcome to " + $("#current-room-value").text() + ", " + user.username + "!");
	
   });
	
 
	
   /**

@@ -327,7 +325,7 @@ function appendUser(username, vote)

    * If they're the current DJ, apply some more special

    * changes.
	
    */
	  	
 if (API.getDJs()[0].username == username) {
 		
+  if (API.getDJs().length > 0 && API.getDJs()[0].username == username) {
	
     currentDj = true;

     colour = "42A5DC";
	
     if (moderator)

@@ -354,17 +352,6 @@ function appendUser(username, vote)

 }
	
 
	  	
/**
	  	
 * If you are Boris, you are awesome.
	  	
 * 
	  	
 * (The greeting bot) 
	  	
 */
	  	
function isBoris() 
	  	
{ 
  return API.getSelf().username == "Vεηgεℓғε"; 
}


 ///////////////////////////////////////////////////////////
 ////////// EVERYTHING FROM HERE ON OUT IS INIT ////////////
 ///////////////////////////////////////////////////////////
	
@@ -373,7 +360,6 @@ function isBoris()
	 360	
  * Clear the old code so we can properly update everything.
	 361	
  */
	 362	
 $('#plugbot-css').remove();
	  	
$('#plugbot-js').remove();
	 363	
 
	 364	
 /*
	 365	
  * Write the CSS rules that are used for components of the 
	
@@ -399,29 +385,3 @@ initAPIListeners();
	 385	
 populateUserlist();
	 386	
 displayUI();
	 387	
 initUIListeners();
	  	

	  	
/*
	  	
 * If this is Boris bot, then start the timed rules notice.
	  	
 */
	
if (isBoris())
	  	
{
	  	
  var messages = new Array(
	  	
    "Wolf Pack Bitches",
	  	
    "If you want to join the Wolf Pack, then visit https://steamcommunity.com/groups/theofficialwp",
    "Play Minecraft? Join the server: mcriotcraft.com"

	 
	  	
  );
	  	
  var lastMessage = "";
	  	

	  	
  window.setInterval(function() {
	  	
  var nextMessage = messages[Math.floor(Math.random() * messages.length)];
	  	

	  	
    if (nextMessage == lastMessage) {	  	
while ((nextMessage = messages[Math.floor(Math.random() * messages.length)]) == lastMessage) ;
}
  	
lastMessage = nextMessage;	  	
API.sendChat("\/me " + lastMessage);
}, (1000 * 60 * 20));
}
 	  	
\ No newline at end of file