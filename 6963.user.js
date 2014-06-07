// ==UserScript==
// @name            Reload Owa
// @namespace       http://onemorebug.com/greasemonkey/reloadowa.user.js
// @description     Periodically reload OWA except when not composing.
// @include         https://remote.condenast.com/*
// ==/UserScript==

// When viewing an Outlook Web Access page, check for new messages, and keep the connection alive, by reloading each frame on the page every n minutes  unless we are currently composing a message.  
// based on tip 41 from "Greasemonkey Hacks"
//http://blog.monstuff.com/archives/cat_greasemonkey.html

//Only the "compose" page has a textarea.  So don't reload if we've got a textarea.
var numberOfMinutesBetweenRefreshes = 1;
GM_log(document.location);
if (document.getElementsByTagName('textarea').length != 0) {
  //GM_log('textarea found');
} else if (location.search == '') {
  var mailHost = document.location.host.match(/\.(.*)/)[1];
  document.title = mailHost.charAt(0).toUpperCase() +  mailHost.substr(1) + ' : ' + document.title;
  //GM_log('top-level document found');
} else {
  var myDoc = document;
  window.setTimeout((function(){
    myDoc.location.reload();
      }), numberOfMinutesBetweenRefreshes * 60000);
}
