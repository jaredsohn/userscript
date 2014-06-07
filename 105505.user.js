// ==UserScript==
// @name       Ogame Reloader Full Activity
// @namespace  
// @version    0.1
// @description  Reload any page of Ogame with randoom time interval (between 4 and 14 minute)
// @include    http://*.ogame.*/game/index.php?page=*
// @copyright  BlackMesrines
// ==/UserScript==
//	var url=document.location.href;
//    document.location.href=url;

var timex=Math.floor( 240000 + Math.random()*600000);


setTimeout("document.getElementById('playerName').innerHTML='<span style=\"color:#FFF; background-color:#F00\">Reload...</span>';url=document.location.href;document.location.href=url;",timex);


