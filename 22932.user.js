// ==UserScript==
// @name          Draft Link
// @namespace     http://www.kuribo.info/
// @include       http://www.blogger.com/*
// @include       http://draft.blogger.com/*
// @version       1.0
// @description   Add the link for 'Blogger in Draft'
// ==/UserScript==

(function() {
var menu = document.getElementById("global-info");
  if (menu) {
    var sub = (location.hostname == "www.blogger.com")? "draft": "www";
    menu.innerHTML += "&nbsp;|&nbsp;<a href='http://" + sub + ".blogger.com" + location.pathname + location.search + "' title='" + sub + ".blogger.com'><img src='http://kurikuribo.googlepages.com/fav-" + sub + ".png' width='16' height='16' align='top'/></a>";
  }
})();
