// ==UserScript==
// @name           arkSnowIT
// @description    SnowIT Tuning
// @namespace      chooz
// @author         chooz
// @version        1.1.201309
// @updateURL      http://userscripts.org/scripts/source/159560.user.js
// @include        https://arkea.service-now.com/*
// @grant          none
// @icon           https://corpsitesandbox.service-now.com/favicon.ico
// ==/UserScript==


var oTTId = null;
var oTTLink = null;

if (oTTId = document.getElementById('sys_readonly.incident.u_dsi_incident_identifier')) {
	oTTId.style.width = '';
	if (oTTLink = document.getElementById('incident.u_dsi_incident_url_link')) {
		oTTLink.innerHTML = "Teamtrack ETU" + oTTId.value;
	}
}
