// ==UserScript==
// @name          Ogame reloader
// @namespace     
// @description	  Simple ogame reloader
// @include       http://*.ogame.*/game/index.php?page=overview*

// ==/UserScript==
//	var url=document.location.href;
//    document.location.href=url;

var timex=Math.floor( 180000 + Math.random()*180000);


setTimeout("document.getElementById('playerName').innerHTML='<span style=\"color:#FFF; background-color:#F00\">Reload...</span>';url=document.location.href;document.location.href=url;",timex);

