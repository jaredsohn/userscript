// kanjikoohiireviewadduptoframenr.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2006-2008, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.2 2008.08.21  woelpad  Added Script Update Checker
// 1.1 2007.12.21  woelpad  Check whether "Add flashcards" exists
// 1.0 2007.05.30  woelpad  Rewired to enable adding or removing a number of cards
// 0.3 2007.03.02  woelpad  Adapted to cope with session id
// 0.2 2007.01.22  woelpad  Adapted to cope with the new tabbed views
// 0.1 2006.12.19  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Add/remove number of flashcards", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Add/remove number of flashcards
// @namespace      http://userscripts.org/scripts/show/6804
// @description    Add or remove flashcards by entering the number of cards.
// @include        http://kanji.koohii.com/main.php*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 6804; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1239351727799; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

function xpatho(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathf(query) {
	return xpatho(query).snapshotItem(0);
}

var viewFrameNr = xpathf('//div[@class="tabbedview"]/b');
if (viewFrameNr) {
	var curNrOfFrames = parseInt(viewFrameNr.innerHTML);
	if (!isNaN(curNrOfFrames)) {
		var addCards = document.getElementById('addcards');
		if (addCards) {
			addCards.innerHTML = addCards.innerHTML.replace(/Add /, 'Add '
				+ '<input type="text" class="textfield" id="nadd" size="4" name="addnr" maxlength="4" />'
				+ ' flashcards or add ');
			var ktAdd = document.getElementById('kadd');
			var nrAdd = document.getElementById('nadd');
			nrAdd.addEventListener('change', function(e) {
				var nrToAdd = parseInt(nrAdd.value);
				if (!isNaN(nrToAdd) && (nrToAdd > 0)) {
					ktAdd.value = curNrOfFrames + nrToAdd;
				}
			}, true);
		}

		var removeCards = document.getElementById('remcards');
		if (removeCards) {
			removeCards.innerHTML = removeCards.innerHTML.replace(/Remove /, 'Remove '
				+ '<input type="text" class="textfield" id="nrem" size="4" name="remnr" maxlength="4" />'
				+ ' flashcards or remove ');
			var ktRem = document.getElementById('krem');
			var nrRem = document.getElementById('nrem');
			nrRem.addEventListener('change', function(e) {
				var nrToRemove = parseInt(nrRem.value);
				if (!isNaN(nrToRemove) && (nrToRemove > 0)) {
					if (nrToRemove > curNrOfFrames) {
						ktRem.value = 0;
					} else {
						ktRem.value = curNrOfFrames - nrToRemove;
					}
				}
			}, true);
		}
	}
}