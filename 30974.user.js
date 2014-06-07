// ==UserScript==
// @name           chat box samed & tweety
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var container=document.getElementById('content')
var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?3f9dc206f9797734873ade3490217e6360bf708b' allowtransparency='true' frameborder='0' " + "scrolling='no' width='500' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a " + "href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a>" + "</iframe>"

var teamchat="<iframe src='http://www.planetminibox.com/box/chat/?9062fff5253a1ba062f46c4a755b7fdfcccdcb2f' allowtransparency='true' frameborder='0' scrolling='no' width='500' height='350' style='border: 0px solid #000000;'>Sorry, your browser does not support iframes required to view <a href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a></iframe>"


container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML

