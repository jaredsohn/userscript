// ==UserScript==

// @name           Forum UnArchiver

// @namespace      http://userscripts.org/users/14536

// @description    Automatically redirects from archived forum pages to full versions.
// @include        *forum*/archive/index.php/f-*html
// @include        *forum*/archive/index.php/t-*html
// @include        *forum*/archive/index.php/
// @include        *forum*/lofiversion/index.php/f*html
// @include        *forum*/lofiversion/index.php/t*html
// @include        *forum*/lofiversion/index.php/
// @author         Vaughan Chandler

// ==/UserScript==

// Last updated on 2008-04-26


// vBulletin
// Coded by Vaughan Chandler - http://userscripts.org/users/14536
var loc = location.href;

var site = loc.substring(0,loc.indexOf('/archive') + 1);
if (m = loc.match(/index\.php\/([ft])-(\d+)\.html/)) {
	var page;
	if (m[1] == 't') { page = 'showthread'; }
	else if (m[1] == 'f') { page = 'forumdisplay'; }
	location.replace(site + page + '.php?' + m[1] + '=' + m[2]);
} else if (loc.charAt(loc.length-1) == '/') {
	location.replace(site);
}


// IPB
// Coded by Len Rodman - http://userscripts.org/users/41847
// (slightly modified by Vaughan Chandler)
var site2 = loc.substring(0,loc.indexOf('/lofiversion') + 1);
if (m = loc.match(/index\.php\/([ft])(\d+)\.html/)) {
	var page2;
	if (m[1] == 't') { page2 = 'showtopic'; }
	else if (m[1] == 'f') { page2 = 'showforum'; }
	location.replace(site2 + 'index.php?' + page2 + '=' + m[2]);
}else if (loc.charAt(loc.length-1) == '/') {
	location.replace(site2);
}


// Check for updates
// Coded by Jarett - http://userscripts.org/users/38602
if (true) {
	var version_scriptNum = 21375;
	var version_timestamp = 1209220849566;
	function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}}
	updateCheck(false);
}
