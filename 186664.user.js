// ==UserScript==
// @name           Quake Live Auto Invite (QLHM Edition)
// @namespace      beham.biz
// @description    Your friends will be able to write the word "invite" to you, and automatically get a real invite to the server you're on.
// @author         PredatH0r
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

/*
This script is a modified version of flugsio's "Quake Live Pro Auto Invite"
(http://userscripts.org/scripts/show/107333).
It is now compatible with QLHM and the Quake Live standalone client.
*/

(function (win) { // scope
  var quakelive = win.quakelive;
  var inHook = false;
  function installHook() {
    try {
      quakelive.AddHook('IM_OnMessage', function(json) {
        try {
          if (inHook || !quakelive.IsIngameClient()) {
            return;
          }
          inHook = true;
          var msg = quakelive.Eval(json);
          var friend = quakelive.modules.friends.roster.GetIndexByName(msg.who);
          var roster = quakelive.modules.friends.roster.fullRoster[friend];

          if (msg.what == 'invite') {
            roster.FriendsContextMenuHandler('invite', roster.node);
            qz_instance.SendGameCommand("echo <AUTO-INVITE> for " + msg.who);
          }
        } 
        catch(ex) {
        } 
        finally {
          inHook = false;
        }
      });

      win.console.log("<AUTO-INVITE> installed");
    }
    catch(e) {}
  };

  installHook();
})(window); 