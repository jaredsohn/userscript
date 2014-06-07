// ==UserScript==
// @name           PureTNA popup
// @namespace      http://www.userscripts.org
// @description    Prevent ad popup on PureTNA site
// @include        *puretna.com*
// @include        *empornium.us*
// ==/UserScript==

(function (){
	var expiryDate = new Date();
	
	expiryDate.setTime(expiryDate.getTime() + 365*24*60*60*1000); // add 365 days
	
	document.cookie = 'popundr=1; expires=' + expiryDate.toGMTString(); // set cookie
})();