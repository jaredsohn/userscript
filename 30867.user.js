// ==UserScript==
// @name           ABAC team chat
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var container=document.getElementById('content')
//var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?f055dd60f70f354845d662dfc7dc10bf84bbbd9e' allowtransparency='true' frameborder='0' " + "scrolling='no' width='500' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a " + "href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a>" + "</iframe>"
var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?a19b31a5ef9f3969021a62159adfe6e6b4eb534d' allowtransparency='true' frameborder='0' scrolling='no' width='500' height='350' style='border: 0px solid #000000;'>Sorry, your browser does not support iframes required to view <a href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a></iframe>"

container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML