// ==UserScript==
// @name      LAIC A BAWS...
// @namespace  
// @version    0.3
// @description  Reload galaxy view every 3 seconds
// @include    http://*.ogame.*/game/index.php?page=galaxy*
// @copyright  Sharky19
// ==/UserScript==
//    var url=document.location.href;
//    document.location.href=url;

var timex=Math.floor( 3000 );


setTimeout("document.getElementById('playerName').innerHTML='<span style=\"color:#FFF; background-color:#F00\">LAIC A BAWS...</span>';url=document.location.href;document.location.href=url;",timex);
