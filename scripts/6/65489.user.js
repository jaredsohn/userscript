// ==UserScript==
// @name           The-west "Close All Windows" Button Extension
// @description    This script replace original function for Close All Windows
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

var script = document.createElement( 'script' );

script.type='text/javascript';

script.innerHTML = 'AjaxWindow.closeAll = function()  { var windows = document.querySelectorAll( "div.window" ); for(i=0;i<windows.length;i++){if( windows[i].style.display != "none" ){ AjaxWindow.close( name = windows[ i ].id.substring(7, windows[ i ].id.length) );}}}';

document.body.appendChild( script );