// ==UserScript==
// @name          Stop RaboDirect.co.nz Autocomplete
// @namespace     https://secure1.rabodirect.co.nz/exp/authenticationDGPEN.jsp
// @description	  Stop the fields on the RaboDirect login form autocompleting to improve security
// @include       https://secure1.rabodirect.co.nz/exp/authenticationDGPEN.jsp
// ==/UserScript==

for(var i = 0, l = document.getElementsByTagName('input').length; i < l; i++) {
		document.getElementsByTagName('input').item(i).setAttribute('autocomplete', 'off');
};