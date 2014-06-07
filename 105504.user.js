// ==UserScript==
// @name       Ogame Galaxy Reloarder
// @namespace  
// @version    0.1
// @description  Reload galaxy view evry second
// @include    http://*.ogame.*/game/index.php?page=galaxy*
// @copyright  BlackMesrines
// ==/UserScript==
//    var url=document.location.href;
//    document.location.href=url;

var timex=Math.floor( 1000 );


setTimeout("document.getElementById('playerName').innerHTML='<span style=\"color:#FFF; background-color:#F00\">Reload...</span>';url=document.location.href;document.location.href=url;",timex);

