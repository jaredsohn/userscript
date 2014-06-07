// ==UserScript==
// @id             twitchtvshowdirectorychannelcount@phob.net
// @name           Twitch.TV Show Directory Channel Count
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Displays the number of channels for each game in the Twitch.TV game directory
// @include        http://*.twitch.tv/directory
// @include        http://*.twitch.tv/directory/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/160210.meta.js
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

var dirGame = document.getElementById("directory-game")
  , searchStr = "Viewers"
  , replaceStr = "<img src='/images/xarth/g/g18_person-00000020.png' title='Viewers'> | "
               + "{{#h.commatize}}{{channels}}{{/h.commatize}} <img src='/images/xarth/g/g18_camera-00000020.png' title='Channels'>"
  ;

// Has the template been removed yet?  If not, we can just modify it directly.
if (dirGame) {
  dirGame.innerHTML = dirGame.innerHTML.replace(searchStr, replaceStr);
}
// Otherwise we need to modify the loaded template and refresh the view.
else {
  ich.templates["directory-game"] = ich.templates["directory-game"].replace(searchStr, replaceStr);
  App.directory.activeGrid.trigger("refresh");
}

}); // end of call to contentEval
