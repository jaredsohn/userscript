// TribalWars Navigation Toolbar v0.1
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TribalWars Navigation Toolbar v0.1
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes navigating TribalWars easier
// @include       http://tw*.tribalwars.net/game.php*
// @include       http://s*.tribalwars.es/game.php*
// ==/UserScript==

function getParam( name ) {
  if (name == 'GETURL') {
    var regexS = "(.*)/(.*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  } else {
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  }
  if( results == null )
    return "";
  else
    return results[1];
}



var baseURL = getParam('GETURL');
var vID = getParam('village');
var navbar = document.createElement("div");
navbar.innerHTML = '<br><center><div style="position:relative;width:780px;padding: 6px; margin-left: 22px; margin-bottom: 5px;text-align: center;background-color:#F1EBDD;border:1px solid #000">'+ 
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=main"><img src="'+baseURL+'/graphic/buildings/main.png" border="0">&nbsp;Edi. Principal</a>&nbsp;&nbsp;|&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=barracks"><img src="'+baseURL+'/graphic/buildings/barracks.png" border="0">&nbsp;Cuartel</a>&nbsp;&nbsp;|&nbsp; '+ 
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=stable"><img src="'+baseURL+'/graphic/buildings/stable.png" border="0">&nbsp;Cuadra</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=garage"><img src="'+baseURL+'/graphic/buildings/garage.png" border="0">&nbsp;Taller</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=snob"><img src="'+baseURL+'/graphic/buildings/snob.png" border="0">&nbsp;Corte arist.</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=smith"><img src="'+baseURL+'/graphic/buildings/smith.png" border="0">&nbsp;Herrer&iacute;a</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=place"><img src="'+baseURL+'/graphic/buildings/place.png" border="0">&nbsp;Plaza</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=market"><img src="'+baseURL+'/graphic/buildings/market.png" border="0">&nbsp;Mercado</a>&nbsp;&nbsp;&nbsp; '+
'</div></center>';
document.body.insertBefore(navbar, document.body.childNodes[4]);


var direccion = new Array(5);
direccion[0]="javascript:popup_scroll('http://www.guscreations.com/item.php?key=buscador_tribalwars', 1024, 400)";
direccion[1]="javascript:popup_scroll('http://www.freewebs.com/bydarkmen/calcu2.html', 340, 400)";
direccion[2]="javascript:popup_scroll('http://www.freewebs.com/bydarkmen/calcuup.html', 340, 400)";
direccion[3]="javascript:popup_scroll('http://www.freewebs.com/bydarkmen/perdida.html', 340, 400)";
direccion[4]="javascript:popup_scroll('http://www.compactador.com.ar/TW/index.php', 580, 540)";


var navbar = document.createElement("div");
navbar.innerHTML = '<center><div>'+ 
'<a href="'+direccion[0]+'">Buscador aldeas</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
'<a href="'+direccion[1]+'">Calculador de tropas</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
'<a href="'+direccion[2]+'">Calculador de bot&iacute;n</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
'<a href="'+direccion[3]+'">Calculador de recuperaci&oacute;n</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
'<a href="'+direccion[4]+'">Compactador</a>'
'</div></center><br>';
document.body.insertBefore(navbar, document.body.childNodes[4]);
