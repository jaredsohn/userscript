// ==UserScript==
// @name           WoWBugMeNot
// @namespace      http://forums.wow-europe.com
// @description    No more "Click here to Continue" in WoW Forums
// @include        http://forums.wow-europe.com/interceptor.html*
// ==/UserScript==

var wLinks = document.links;
for(var i = 0; i < wLinks.length; i++) {
  if(wLinks[i].className == 'redirect') {
    window.location = wLinks[i].href;
  }
}