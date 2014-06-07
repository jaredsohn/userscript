// script_timestamp_updater.user.js! user script for Firefox's GreaseMonkey extension
// Copyright (c) 2008, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.2 2008.08.28  woelpad  Update script number
// 0.1 2008.08.20  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Script Timestamp Updater", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Script Timestamp Updater
// @namespace      http://userscripts.org/scripts/show/32137
// @description    Updates the timestamp and script number used by Jarett's Script Update Checker whenever you alter and save a script.
// @include        http://userscripts.org/scripts/edit_src/*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 32137; // Will be automatically set to the number given to the script by userscripts.org whenever you alter the script and release it on userscripts.org.
var version_timestamp = 1239351848061; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

var saveButton = document.evaluate('//input[@name="commit"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!saveButton) return;
saveButton.addEventListener('click', function (e) {
	var srcTextarea = document.getElementById('script_src');
	if (!srcTextarea) return;
	srcTextarea.value = srcTextarea.value
		.replace(/(version_timestamp\s*=\s*)[0-9]+/, '$1' + new Date().getTime());
	srcTextarea.value = srcTextarea.value
		.replace(/(version_scriptNum\s*=\s*)[0-9]+/, '$1' + /\d+/.exec(window.location)[0]);
}, true);