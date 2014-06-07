// ==UserScript==
// @name			Domain Dossier
// @namespace		Domain_Dossier
// @include			*
// @include			about:blank
// @datecreated		2013-02-22
// @lastupdated		2013-02-23
// @version			1.2
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		Investigate domains and IP addresses using CentralOps.net Domain Dossier
// @run-at 			document-start
// ==/UserScript==

if (typeof GM_openInTab == "undefined") {
	GM_openInTab = window.open;
}

GM_registerMenuCommand("Domain Dossier (CentralOps.net)", function(){
	var current_hostname = encodeURIComponent(window.location.hostname);
	var my_url = "http://centralops.net/co/DomainDossier.aspx?dom_whois=true&dom_dns=true&traceroute=true&net_whois=true&svc_scan=true&addr="+current_hostname;
	//alert(my_url); //for debugging
	GM_openInTab(my_url);
});
