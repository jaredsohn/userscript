// ==UserScript==
// @name           Salesforce Network Access
// @namespace      salesforce.network-access
// @description    Auto-populate current IP range
// @include        https://*.salesforce.com/05G/e*
// ==/UserScript==
//
// Copyright (c) 2010, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

document.getElementById('IpStartAddress').value = 'Getting IP...';
	
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://whatismyipaddress.com/',
    onload: function(responseDetails) {
        var ip = responseDetails.responseText.match(/\d+\.\d+\.\d+\./);
		document.getElementById('IpStartAddress').value = ip + "1";
		document.getElementById('IpEndAddress').value = ip + "255";
    }
});
