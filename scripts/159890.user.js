// ==UserScript==
// @id             twitchtvbetterstreamtitle@phob.net
// @name           Twitch.TV Better Stream Title
// @version        0.34
// @namespace      phob.net
// @author         wn
// @description    Show the stream title in the window's title
// @include        http://*.twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/159890.meta.js
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

  jQuery(document).ready(function() {
    var INITIAL_TITLE = document.title
      , $desc = jQuery("meta[property='og:description']")
      ;

    if (0 === $desc.length) {
      return;
    }

    document.title = INITIAL_TITLE + " - " + $desc.first().attr("content");

    // Use the new features if available (new layout)
    try {
      App.vent.on("channel:updateStatus", function(aStatus) {
        document.title = INITIAL_TITLE + " - " + aStatus;
      });
    }
    // Otherwise fall back to polling (old layout)
    catch(e) {
      setInterval(function() {
        Twitch.api.get("streams/" + PP.channel).done(function(j) {
          document.title = INITIAL_TITLE + " - " + j.stream.channel.status;
        });
      }, 6E5); // 10 minutes
    }
  });

}); // end of call to contentEval
