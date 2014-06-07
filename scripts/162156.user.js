// ==UserScript==
// @id             twitchtvviewerlistcount@phob.net
// @name           Twitch.TV Viewer List Count
// @version        0.16
// @namespace      phob.net
// @author         wn
// @description    Shows the number of viewers in each Viewer List category of chat
// @include        http://*.twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/162156.meta.js
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

  var oldRender = CurrentChat.Chatters.render
    , els = {}
    ;

  // Get the headers and save their original content
  ["staff", "admins", "moderators", "viewers"].forEach(function(aType) {
    els[aType] = jQuery("#viewers div.js-" + aType + " h4");
    els[aType].data("orig", els[aType].text() + " ({{Count}})");
  });

  CurrentChat.Chatters.render = function(aMsg) {
    // If we have a good response, update the viewer counts
    if (200 === aMsg.status) {
      for (var vt in els) {
        els[vt].html(els[vt].data("orig").replace("{{Count}}", aMsg.data.chatters[vt].length));
      }
    }
    oldRender.call(CurrentChat.Chatters, aMsg);
  }

}); // end of call to contentEval
