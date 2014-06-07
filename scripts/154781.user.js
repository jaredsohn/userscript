// ==UserScript==
// @id             twitchtvmessagehistory@phob.net
// @name           Twitch.TV Message History
// @version        0.18
// @namespace      phob.net
// @author         wn
// @description    Use the Up and Down arrows to move through your Twitch.TV chat messages
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/154781.meta.js
// ==/UserScript==


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {

// Only run on the main window
if (self !== top) {
  return;
}

var $ = jQuery
  , myMessages = []
  , last = -1
  , curr = -1
  ;

var oldOnKeyPress = CurrentChat.onkeypress;
CurrentChat.onkeypress = function(e) {
  switch (e.keyCode) {
    // Enter
    case 13:
      last = myMessages.unshift($("#chat_text_input").val()) - 1;
      curr = -1;
      break;

    // Up Arrow
    case 38:
      if (curr < last) {
        setTimeout(function() {
          $("#chat_text_input").val(myMessages[++curr]);
        }, 0);
      }
      break;

    // Down Arrow
    case 40:
      if (curr > 0) {
        $("#chat_text_input").val(myMessages[--curr]);
      }
      else {
        $("#chat_text_input").val("");
        curr = -1;
      }
      break;
  }

  return oldOnKeyPress.call(CurrentChat, e);
}
}); // end of call to contentEval
