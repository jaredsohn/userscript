// ==UserScript==
// @name           Mod History
// @namespace      http://rvb.roosterteeth.com/members/profile.php?uid=344435
// @description Add's a link for RedvsBlue.com To mod History(sponsor's only)
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method:"GET",
  url:"http://rvb.roosterteeth.com/members/modHistory.php",
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
word="Mod";
} else {
word="Mod";
}

document.getElementById('navCol').innerHTML=document.getElementById('navCol').innerHTML.replace("Settings</a></div></td></tr>", "Settings</a></div></td></tr><tr><td class='nav'><div class='navLink'><a href='/members/modHistory.php'>"+word+" History</a></div></td></tr>");

  }
});
