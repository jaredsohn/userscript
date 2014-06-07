// ==UserScript==
// @name           13th Ceti Chatbox Java
// @namespace      
// @description    
// @include        http://ceti.astroempires.com/*
// ==/UserScript==


var container=document.getElementById('content')

var chatbox="<script language=JavaScript type="text/javascript" src="http://www.planetminibox.com/box/chat/js-snippet.php?client=ddfc3001159dd4b8d1f9e8345ba02239cc023c3b"></script>"

container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML