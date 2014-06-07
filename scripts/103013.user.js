// ==UserScript==
// @name           Ask.com Tamer
// @namespace      http://abmyers.com/userscripts
// @description    Makes links on ask.com open in the same tab
// @include        http://www.ask.com/web?*
// @include        http://us.ask.com/web?*
// ==/UserScript==


var links = document.getElementsByTagName( 'a' );
var element;

for ( var i = 0; i < links.length; i++ ) {

    element = links[ i ];

    if ( element.target) {
		element.target="_top";
    }
}

var adsDiv = document.getElementById('spl_img_top');

adsDiv.style.border = '2px solid purple';