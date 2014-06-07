// ==UserScript==
// @name           Refresh LogMeIn
// @namespace      http://userscripts.org/users/11277
// @version        0.3
// @description    makes log me in stop logging you out
// @include        https://secure.logmein.com/computers.asp
// @include        https://secure.logmein.com/Computers/ComputersWrapper.asp
// ==/UserScript==

(function(){
	
	// set seconds until refresh here (int)
	var timeout = 120;
	
	setTimeout('document.location.reload();', timeout * 1000);
	
})();
