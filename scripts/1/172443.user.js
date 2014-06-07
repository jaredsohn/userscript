// ==UserScript==
// @name        TheOldReader Compressed Menu
// @namespace   http://userscripts.org/users/89142
// @description Condensed version of the menu
// @include     http://*theoldreader.com/*
// @grant       none
// @version     1.0

// ==/UserScript==

// Version History:
// 1.0 - initial release

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/* Changes the style elements for the tags */
addGlobalStyle(

	'div#sidebar div.hidden_ ul li.nav-header{margin:0;padding:0;}' +
	'div#sidebar div.hidden_ ul#following{padding-left:25px;}' +
	
	'div#sidebar div.folders-list ul li.nav-header{margin:0;padding:0;}' +
	'div#sidebar div.folders-list ul li.nav-header a{padding:0; margin:0;line-height:normal;}' +
	
	'div#sidebar div.sort-item{line-height:normal;}' + 
	'div#sidebar div.sort-item ul.feeds-list{padding-left:25px;}' +
	''

);