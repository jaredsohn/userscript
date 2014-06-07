// ==UserScript==
// @name           13th Ceti Chatbox2
// @namespace      
// @description    
// @include        http://ceti.astroempires.com/*
// ==/UserScript==


var container=document.getElementById('content')

var chatbox="<script language=JavaScript type="text/javascript" src="http://www.planetminibox.com/mybox/?EddieHaskel"></script>"

container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML