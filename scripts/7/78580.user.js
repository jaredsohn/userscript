// ==UserScript==
// @name           backupflow direct download links
// @namespace      http://www.backupflow.com
// @description  This script  redirects backupflow play page to download URLs
// @include        http://*.backupflow.com/g.htm*
// @include        https://*.backupflow.com/g.htm*
// @author    Farhad egza
// ==/UserScript==
/*
 * Version 1.0
 * Author  - Farhad egza
 * Web Blog : http://egza.wordpress.com 
 */
if (window.location.host.match("backupflow.com")) {
	var myPath = "http://farhaad.eu5.org/backupflow/backupflow.php?url=";
	myPath = myPath + escape(window.location);
	window.document.location = myPath;
}