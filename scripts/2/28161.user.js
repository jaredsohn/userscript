// ==UserScript==
// @name           GLB Chat Box V2.0
// @namespace      Branden Guess
// @description    Upgraded GLB chat box
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var container=document.getElementById('content')
var chatbox="<iframe src='http://www.planetminibox.com/box/chat/?f055dd60f70f354845d662dfc7dc10bf84bbbd9e' allowtransparency='true' frameborder='0' " + "scrolling='no' width='500' height='350' style='border: 2px solid #000000;'>Sorry, your browser does not support iframes required to view <a " + "href='http://www.planetminibox.com/' title='MiniBox - The Free, advanced AJAX Shoutbox'>MiniBox Advanced Tagboard with Tabbed Private Messaging</a>" + "</iframe>"
container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML