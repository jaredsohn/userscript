// ==UserScript==

// @name           Google Reader - Block comments from undesired users
// @description    This script hides all comments from undesired users, based on the ID asigned to them by Google Reader.
// @version	   1.2

// @namespace      http://pendiente.blogspot.com/

// @include        http://www.google.com/reader*

// @include        https://www.google.com/reader*
// @include        http://www.google.com.mx/reader*
// @include        https://www.google.com.mx/reader*

// ==/UserScript==



var fail  = [];


// add the ID of the unpleasent users (one per line):
fail.push("00177134348076900006"); // Cristhian
fail.push("11441926637685966051"); // Regato



// do NOT edit!


function addGlobalStyle(css) {

    var head, style;

    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }

    style = document.createElement('style');

    style.type = 'text/css';

    style.innerHTML = css;

    head.appendChild(style);

}


var lulz = [];

for(i in fail){
	lulz.push('a[href*="'+fail[i]+'"], a[href*="'+fail[i]+'"] ~ *');
}


addGlobalStyle(lulz.join(",") + '{display:none;}');