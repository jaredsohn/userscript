// ==UserScript==
// @name           Refresh LogMeIn (New)
// @version        1.1
// @description    makes log me in stop logging you out
// @include        https://secure.logmein.com/central/Central.aspx
// @include        https://secure.logmein.com/IN/central/Central.aspx
// @include        https://secure.logmein.com/US/central/Central.aspx
// ==/UserScript==

(function(){
	
	// set seconds until refresh here (int)
	var timeout = 600;
	
	setTimeout('document.location.reload();', timeout * 1000);
	
})();
