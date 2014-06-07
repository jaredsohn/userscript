// ==UserScript==
// @name           Titan Chat
// @namespace      Phillip Hayes
// @description    team chat
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var container=document.getElementById('content')
var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?f055dd60f70f354845d662dfc7dc10bf84bbbd9e' allowtransparency='true' frameborder='0' " + "scrolling='no' width='425' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a " + 
"href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a>" +
"</iframe>"
var teamchat="<iframe src='http://www.planetminibox.com/box/chat/?6245661ea9246a9ae9949f04b0527c625d2b3ff9' allowtransparency='true' frameborder='0' " + "scrolling='no' width='425' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a " + 
"href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a>" +
"</iframe>"
container.innerHTML = container.innerHTML + '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>'