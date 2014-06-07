// ==UserScript==
// @name           Quake Live AutoInvite
// @namespace      http://userscripts.org
// @description    Automatically invite friends who send a message to you containing the word "invite".
// @include        http://*.quakelive.com/*
// ==/UserScript==

//var con = unsafeWindow.console; // Keep an unsafe copy of the console for logging purposes.
var quakelive = unsafeWindow.quakelive; // Keep an unsafe copy of the quakelive object.
var $ = unsafeWindow.jQuery; // Keep an unsafe copy of the jQuery object.
quakelive.AddHook("IM_OnMessage", OnMessage); // Register an event handler for received messages.

//
// Called whenever a message is received from a QuakeLive user,
//
function OnMessage(msgJSON) {
  var msg = quakelive.Eval(msgJSON);
  
  if (msg.what.indexOf("invite") != -1) { // See if the message contains "invite"
    //con.log("Invite requested via QuakeLive chat.");
    
    // Issue the invite
    var playerName = msg.who.split("@")[0];
    var serverId = quakelive.currentServerId;
    SendServerInvite(playerName, serverId);
	 
	 // Let the script user know that we are auto-inviting someone.
    InGamePrint("^7<AutoInvite> ^7Invite automatically sent to ^5" + playerName + "^7.");
  }

}

//
// Invite a player to your game.
//
function SendServerInvite(playerName, serverId) {
  //con.log("SendServerInvite called: playerName: " + playerName + " serverId: " + serverId);
  
  if(serverId < 1) // Make sure this is a valid server (not localhost).
    return;

  $.ajax({
    url: "/request/invite",
    type: "post",
    dataType: "json",
    data: {
      user: playerName,
      server_id: serverId
    }
  });

}

//
// Invite a player to your game.
//
function InGamePrint(msg) {
  //con.log("InGamePrint called: msg: " + msg);

  // Remove bad chars.
  msg = msg.replace("\n", " ");
  msg = msg.replace("\r", " ");
  msg = msg.replace("\t", " ");
  msg = msg.replace(";", " ");

  // Send the message.
  if (quakelive.IsGameRunning() /*&& typeof(qz_instance.SendGameCommand) == "function"*/) {
  
	 // TODO: SendGameCommand doesn't seem to exist unless this is exec'd. Needs investigation.
	 unsafeWindow.eval("qz_instance.SendGameCommand('echo " + msg + ";');"); //unsafeWindow.qz_instance.SendGameCommand('echo "' + msg + '";');
	 unsafeWindow.eval("qz_instance.SendGameCommand('print " + msg + ";');"); //unsafeWindow.qz_instance.SendGameCommand('echo "' + msg + '";');
	 unsafeWindow.eval("qz_instance.SendGameCommand('play /sound/misc/menu2;');"); // Play an alert sound.
  }
  
}