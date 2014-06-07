// ==UserScript==
// @name           blip.tv Video Download
// @namespace      http://darkfox.dk/
// @version        0.1
// @author         DarkFox
// @include        http://blip.tv/file/*
// ==/UserScript==

(function(){
  var dlButton = document.createElement("a");
  dlButton.setAttribute("id", "watch-action-download-link");
  dlButton.setAttribute("class", "watch-action-link");
  dlButton.setAttribute("href", player.primary_media_url);
  dlButton.innerHTML = "Download";

  var watchTabs = document.getElementById("EP_and_Format_Bar");
  watchTabs.appendChild(dlButton, watchTabs);
})();