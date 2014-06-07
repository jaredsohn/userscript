
// Athletics Nation 3.0 Link Color Change
// Copyright (c) 2008, Ryan Thibodaux
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AN 3.0 Link Color Change
// @description   Changes AthleticsNation.com's link color to green to make it more visible.
// @include       http://*.athleticsnation.com*
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle(
'a:link {' + 
'	color: #347C2C ! important;' +
'     background-color: transparent ! important;' +
'	}' +
'a:visited { ' +
'	color: #347C2C ! important;' +
'     background-color: transparent ! important;' +
'	}' +
'a:hover { ' +
'	color: #347C2C ! important;' +
'	text-decoration: none ! important;' +
'     background-color: transparent ! important;' +
'	}' +
'a:active { ' +
'	color: #347C2C ! important;' +
'     background-color: transparent ! important;' +
'	}');