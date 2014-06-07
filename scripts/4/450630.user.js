// TribalWars Navigation Toolbar v0.1
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TribalWars Toolbar English v1
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes navigating TribalWars easier
// @include       http://ae*.tribalwars.ae/game.php*
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
navbar.innerHTML = '<br><center><div style="position:relative;width:830px;padding: 30px; margin-left: 50px; margin-bottom: -50px;text-align: center;background-color:#F7EED3;border:1px solid #000">'+ 
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=main"><img src="'+baseURL+'/graphic/buildings/main.png" border="0">Main</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=barracks"><img src="'+baseURL+'/graphic/buildings/barracks.png" border="0">Barracks</a>&nbsp;|&nbsp;'+ 
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=stable"><img src="'+baseURL+'/graphic/buildings/stable.png" border="0">Stable</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=garage"><img src="'+baseURL+'/graphic/buildings/garage.png" border="0">Garage</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=snob"><img src="'+baseURL+'/graphic/buildings/snob.png" border="0">Snob</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=smith"><img src="'+baseURL+'/graphic/buildings/smith.png" border="0">Smith</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=place"><img src="'+baseURL+'/graphic/buildings/place.png" border="0">Place</a>&nbsp;|&nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=market"><img src="'+baseURL+'/graphic/buildings/market.png" border="0">Market</a>&nbsp;| &nbsp;'+
'<a href="'+baseURL+'/game.php?village='+vID+'&screen=ally&mode=forum"><img src="'+baseURL+'/graphic/ally_forum.png" border="0">Forum</a>'+
'</div></center>';
document.body.insertBefore(navbar, document.body.childNodes[4]);

