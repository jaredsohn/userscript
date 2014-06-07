// ==UserScript==
// @name           Hotmail AutoCheck
// @namespace      znerp
// @description    checks for new messages at a specified time. Popup to alert when there are new ones.
// @include        http://*.hotmail.msn.com/cgi-bin/HoTMaiL*
// ==/UserScript==

if (GM_getValue("refresh time"))
  setTimeout("window.location.replace(document.location.href)",GM_getValue("refresh time"))
else {
  GM_setValue("refresh time", 1000*60*5);
  setTimeout("window.location.replace(document.location.href)",GM_getValue("refresh time"));
}
var count = 0;
var link;
function setTime() {
  var refresh=prompt("Enter time interval to check for new messages in minutes:",GM_getValue("refresh time")/(1000*60));
  if (refresh!=null && refresh!="") {
    GM_setValue("refresh time", parseInt(refresh)*60*1000);
    clearTimeout();
    setTimeout("window.location.replace(document.location.href)",GM_getValue("refresh time"));
  }
}
GM_registerMenuCommand("Set time interval to check for Hotmail messages...", setTime);
clearTimeout();
setTimeout("window.location.replace(document.location.href)",GM_getValue("refresh time"));
var messages = document.getElementById('MsgTable').getElementsByTagName('tr');
for (i = messages.length - 1; i >= 0; i--)
  if (messages[i].getAttribute('bgcolor') && (messages[i].getAttribute('bgcolor') == '#fff7e5')) {
    count++;
    link = messages[i].getElementsByTagName('td')[5].getElementsByTagName('a')[0];
  }
if (count > 1)
  var woot = alert(count + " new messages!");
if (count == 1) {
  var woot = confirm(count + " new message!\nGo to this message?");
  if (woot)
    window.location.replace(link);
}