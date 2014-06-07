// ==UserScript==
// @name       Image thingy
// @namespace  Kirbles
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

var img = document.createElement('img');
img.src = 'http://i.imgur.com/g51rblg.png';
img.setAttribute( 'style', 'position: fixed; bottom: 0px; right: 0px; z-index:3;');
document.getElementsByTagName( 'body' )[ 0 ].appendChild( img );