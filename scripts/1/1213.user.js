// ==UserScript==
// @name          sportwereld
// @namespace     http://users.pandora.be/divvy/userscript
// @description   vergroot live verslagen
// @include       http://www.sportwereld.be/Live/LiveReport*
// ==/UserScript==

// file: 	sportwereld.user.js
// date:	do jun 30 20:50:28 CEST 2005
// author:	divvy - dyveshinftra@gmail.com
// license:	This file is in the public domain and comes with no warranty.
// history:	0.1	July, 2005	vergroot Tour Verslag
// version:	$Id: sportwereld.user.js,v 1.1 2005/07/08 20:05:57 divvy Exp $

var i;

var tables = document.getElementsByTagName('TABLE');
for (i = 0; i < tables.length; ++i) {
        var table = tables[i];

        if (table.getAttribute('width')) {
                table.setAttribute('width', '100%');
        }
}

var divs = document.getElementsByTagName('DIV');
for (i = 0; i < divs.length; ++i) {
        var div = divs[i];

        if (div.getAttribute('style')) {
                div.setAttribute('style', 'undefined');
        }
}

document.title += " " + (document.getElementsByTagName('TR').length - 3)/4;
