// ==UserScript==
// @name           RvB Friends Journal  Link
// @namespace      http://rvb.roosterteeth.com/members/profile.php?uid=344435
// @description Add's a link for RedvsBlue.com To Friends Journal(sponsor's only)
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method:"GET",
  url:"http://rvb.roosterteeth.com/members/journal/friendsJournals.php",
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
word="Friends'";
} else {
word="Friends'";
}

document.getElementById('navCol').innerHTML=document.getElementById('navCol').innerHTML.replace("Settings</a></div></td></tr>", "Settings</a></div></td></tr><tr><td class='nav'><div class='navLink'><a href='/members/journal/friendsJournals.php'>"+word+" Journals</a></div></td></tr>");

  }
});
