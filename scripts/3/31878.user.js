// ==UserScript==
// @name           13th Ceti Chatbox
// @namespace      
// @description    
// @include        http://ceti.astroempires.com/*
// ==/UserScript==


var container=document.getElementById('content')

var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?ddfc3001159dd4b8d1f9e8345ba02239cc023c3b' allowtransparency='true' frameborder='0' scrolling='no' width='500' height='350' style='border: 0px solid #000000;'>Sorry, your browser does not support iframes required to view <a href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a></iframe>"

container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML