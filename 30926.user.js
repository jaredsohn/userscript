// ==UserScript==
// @name           Samed team chat
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var container=document.getElementById('content')

var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?9062fff5253a1ba062f46c4a755b7fdfcccdcb2f' allowtransparency='true' frameborder='0' scrolling='no' width='500' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a></iframe>"

container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML