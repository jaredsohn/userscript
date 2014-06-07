// ==UserScript==
// @name           RvB Watchlist Alert
// @namespace      http://highclans.co.uk
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.roosterteeth.com/members/index.php",
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    }, 
  onload:function(details) {
var howdy=details.responseText;
var look=howdy.split("<td class='small'>You have no new alerts.</td>");
var watchalerts=look.length - 1;
if(watchalerts == 0) {
document.getElementById('alerts').innerHTML=document.getElementById('alerts').innerHTML.replace(/Karma/, "<span class='user'><a class='online' style='font-size:11px;' href='/members/'>Your watchlist has been violated</a></span> &middot; Karma");
}
  }
});