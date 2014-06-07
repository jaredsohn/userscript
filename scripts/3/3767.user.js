// ==UserScript==
// @name           LN My Stats Link
// @namespace      Karlhockey
// @description Add's a link for Longhornnation.com To The " My Stats"(sponsor's only)
// @include        http://www.longhornnation.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.longhornnation.com/members/stats/myStats.php",
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    }, 
  onload:function(details) {
var howdy=details.responseText;

var friendOnline=howdy.split("<span class='online'>ONLINE</span>");
var friendOnlineCount=friendOnline.length -1 ;


if(friendOnlineCount > 0) {
friendOnlineCount="";
}

if(friendOnlineCount == 0) {
word="My";
} else {
word="My";
}

document.getElementById('navCol').innerHTML=document.getElementById('navCol').innerHTML.replace("Settings</a></div></td></tr>", "Settings</a></div></td></tr><tr><td class='nav'><div class='navLink'><a href='/members/stats/myStats.php'>"+word+" Stats</a></div></td></tr>");

  }
});
