// ==UserScript==
// @name        globalconstexcl
// @namespace   globalconstexcl
// @description test with global vars 
// @include     http://www.greasespot.net/*
// @version     1
// @grant		GM_log
// @require http://userscripts.org/scripts/source/142494.user.js
// ==/UserScript==

/*
 * define global
 */
var vglobal1=1;			// global var
const cglobalconst1=10;	// global const


/*
 * start after page loading finished
 */
window.addEventListener("load", function(e) {
	alert("startgMyClass.show()");	
	gMyClass.show();
	alert("result in console.log")
},false);
