// ==UserScript==
// @name        DD Chat Enhanced
// @namespace   tag:diaperpony@yahoo.com,2011-06-19:DDChatEnhanced
// @description Increases the size of the DailyDiapers chat and user windows, reformats chat messages to display on a single line, and removes page clutter.
// @copyright   2013 (name withheld) <diaperpony@yahoo.com>
// @license     GPLv3
// @include     http://www.dailydiapers.com/board/index.php?*app=ipchat
// @updateURL   http://userscripts.org/scripts/source/168744.user.js
// @downloadURL http://userscripts.org/scripts/source/168744.user.js
// @version     1.9
// ==/UserScript==

// sizes
var CHAT_HEIGHT = "800px";       // original: 350px
var USERLIST_HEIGHT = "525px";   // original: 200px
var AVATAR_SIZE = "1.3em";       // original: 30px
var COLOR_SCHEME = 1;

// colors
switch (COLOR_SCHEME) {
case 0:
  // IP.Chat default colors
  var ACTION_BGCOLOR = "#e2f3e2";
  var MESSAGE_BGCOLOR = "#fff";
  var MODERATION_BGCOLOR = "#f2e4e7";
  var MY_BGCOLOR = "#e2f3e2";
  var NOTICE_BGCOLOR = "#fafad2";
  var TIMESTAMP_BGCOLOR = "inherit";
  break;
case 1:
  // DiaperPony
  var ACTION_BGCOLOR = "#e6e6ff";
  var MESSAGE_BGCOLOR = "#ffffff";
  var MODERATION_BGCOLOR = "#ffe6e6";
  var MY_BGCOLOR = "#e6e6e6";
  var NOTICE_BGCOLOR = "#ffe6ff";
  var TIMESTAMP_BGCOLOR = "#e6ffff";
  break;
}

// remove "Chat" title (for additional vertical space)
document.getElementById("secondary_navigation").style.height = "0px";
document.getElementsByClassName("ipsType_pagetitle")[0].style.fontSize = "0";

// make chat and users windows taller
document.getElementById("messages-display").style.height = CHAT_HEIGHT;
document.getElementById("chatters-online-wrap").style.maxHeight = USERLIST_HEIGHT;

// reposition labels to the left of chat messages, shrink user avatars, and change colors
document.styleSheets[0].insertRule("#messages-display label { display: inline-block; margin-left: 0.5em; width: 14em; text-align: right; }", 0);
document.styleSheets[0].insertRule("#messages-display div { display: inline; margin-left: 0.5em; }", 0);
document.styleSheets[0].insertRule("#messages-display div.hider { display: inline-block; float: none; position: static; margin-left: " + AVATAR_SIZE + "; width: 16.1em; }", 0);
document.styleSheets[0].insertRule("#messages-display img.ipsUserPhoto { width: " + AVATAR_SIZE + "; height: " + AVATAR_SIZE + "; margin: 0px; border: 0px; padding: 0px; }", 0);
document.styleSheets[0].insertRule("#messages-display li.chat-me { background-color: " + ACTION_BGCOLOR + "; }", 0);
document.styleSheets[0].insertRule("#messages-display li.chat-message { background-color: " + MESSAGE_BGCOLOR + "; }", 0);
document.styleSheets[0].insertRule("#messages-display li.chat-moderator { background-color: " + MODERATION_BGCOLOR + "; }", 0);
document.styleSheets[0].insertRule("#scrollbar_container #messages-display li.chat-myown { background-color: " + MY_BGCOLOR + "; }", 0);
document.styleSheets[0].insertRule("#messages-display li.chat-notice { background-color: " + NOTICE_BGCOLOR + "; }", 0);
document.styleSheets[0].insertRule("#messages-display li.chat-time { background-color: " + TIMESTAMP_BGCOLOR + "; }", 0);

// remove unneeded footers (for additional vertical space), but retain banner ad
document.getElementById("footer_utilities").style.display = "none";
document.getElementById("ipsDebug_footer").style.display = "none";

// turn off sounds
ipb.chat.soundEnabled = 0;

// tab completion
document.getElementById("message_textarea").addEventListener("keydown", function(e) {
  if (e.keyCode == 9) {
    this.value = tab_completion(this.value, this.selectionStart);
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }
}, false);

function tab_completion(text, offset) {
  if (text.length == 0 || offset != text.length || text.charAt(offset) == ' ') {
    return text;
  }

  // find username
  var start = offset;
  for (; start >= 0; --start) {
    if (text.charAt(start) == " ") {
      break;
    }
  }
  ++start;
  var hint = text.substr(start).toLowerCase().replace(";", " ").replace(",", " ").replace("\\", " ");

  // search list of usernames for matches
  var found = null;
  var conflict = false;
  var usernames = document.getElementById("chatters-online").children;
  for (var i = 0; i < usernames.length; ++i) {
    var username = usernames[i].getElementsByTagName("span")[1].attributes[0].value;
    // if username is shorter than hint, skip it
    if (username.length < hint.length) {
      continue;
    }

    // found a match
    if (username.substr(0, hint.length).toLowerCase() == hint) {
      if (found == null) {
        // first match
        found = username;
      } else {
        // conflict, reduce result to common substring
        conflict = true;
        var found_lc = found.toLowerCase();
        var username_lc = username.toLowerCase();
        for (var j = 0; j < found.length; ++j) {
          if (found_lc.charAt(j) != username_lc.charAt(j)) {
            found = found.substr(0, j);
            break;
          }
        }
      }
    }
  }

  // compose results
  if (found != null) {
    text = text.substring(0, start);
    if (conflict) {
      text += found.toLowerCase();
    } else {
      text += found;
      if (start == 0) {
        text += ": ";
      } else {
        text += " ";
      }
    }
  }
  return text;
}

