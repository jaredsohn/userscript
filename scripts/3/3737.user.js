// ==UserScript==
// @name           RvB Friends Online Counter
// @namespace      http://highclans.co.uk
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.roosterteeth.com/members/friends.php?page=1",
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    }, 
  onload:function(details) {
var howdy=details.responseText;

var friendOnline=howdy.split("<span class='online'>ONLINE</span>");
var friendOnlineCount=friendOnline.length - 1;

if(friendOnlineCount > 50) {
friendOnlineCount="50+";
}

if(friendOnlineCount == 1) {
word="Idiot( I mean friend)";
} else {
word="Idiots( I mean friends)";
}

document.getElementById('navCol').innerHTML=document.getElementById('navCol').innerHTML.replace("Users Online</a></div></td></tr>", "Users Online</a></div></td></tr><tr><td class='nav'><div class='navLink'><a href='/members/friends.php' style='font-weight:normal;'>"+friendOnlineCount+" "+word+" Online</a></div></td></tr>");

  }
});