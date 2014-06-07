// kanjikoohiistoryclearrestore.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2006-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.5 2009.11.02  woelpad  Adapted to the new site look
// 0.4 2008.08.21  woelpad  Added Script Update Checker
// 0.3 2008.05.02  woelpad  Added a timeout to make sure that the textarea is
//                          properly cleared after canceling a Copy Story fragment.
// 0.2 2008.03.28  woelpad  Adapted to hide clear/restore once again
//                          when switching to the text area
// 0.1 2006.12.20  woelpad  First release
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
// select "Kanji.Koohii: Clear and restore story", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Clear and restore story
// @namespace      http://userscripts.org/scripts/show/6824
// @description    Adds buttons to the study page to clear and restore a canceled story.
// @include        http://test.koohii.com*/study/kanji/*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 6824; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1257206245297; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}

var form = xpathi('//form[@name="EditStory"]');
if (form == null) return;

var storyView = document.getElementById('storyview');
if (storyView == null) return;
var storyEdit = document.getElementById('storyedit');

var txtStory = xpathi('//textarea[@name="txtStory"]');
var originalStory = txtStory.value;
var canceledStory = '';

var newControls = document.createElement('div');
storyView.parentNode.insertBefore(newControls, storyView.nextSibling);
newControls.setAttribute('class', 'controls valign');
newControls.setAttribute('style', 'float:right;');

var restoreButton = document.createElement('input');
newControls.insertBefore(restoreButton, null);
with (restoreButton) {
	type = 'button';
	id = 'storyview_restore';
	value = 'Restore';
	name = 'restore';
	title = 'Restore story';
	style.display = 'none';
	addEventListener('click', function(e) {
		txtStory.value = canceledStory;
		unsafeWindow.StudyPage.editStoryComponent.editStory(txtStory.value);
	}, true);
}

if (originalStory != '') {
	var clearButton = document.createElement('input');
	var space = document.createTextNode('\u00a0');
	newControls.insertBefore(space, restoreButton);
	newControls.insertBefore(clearButton, space);
	with (clearButton) {
		type = 'button';
		id = 'storyview_clear';
		value = 'Clear';
		name = 'clear';
		title = 'Clear story';
		addEventListener('click', function(e) {
			txtStory.value = '';
			unsafeWindow.StudyPage.editStoryComponent.editStory(txtStory.value);
		}, true);
	}
}

var cancelButton = xpathi('//input[@name="cancel"]');
cancelButton.addEventListener('click', function(e) {
	storyEdit.setAttribute('style', 'display:none;');
	storyView.setAttribute('style', 'display:block;');
	
	newControls.setAttribute('style', 'float:right;');
	if (txtStory.value == originalStory) {
		canceledStory = '';
		restoreButton.setAttribute('style', 'display:none;');
	} else {
		canceledStory = txtStory.value;
		txtStory.value = originalStory;
		// To ensure that this value is not overwritten, we execute it once again after a timeout.
		setTimeout(function () {
			txtStory.value = originalStory;
		}, 0);
		if (canceledStory == '') {
			restoreButton.setAttribute('style', 'display:none;');
		} else {
			restoreButton.setAttribute('style', '');
		}
	}
}, true);

if (unsafeWindow.StudyPage) {
	setTimeout(function () {
		var that = unsafeWindow.StudyPage.editStoryComponent;
		if (!that || !that.editStory) return;
		var originalEditStory = that.editStory;
		that.editStory = function (story) {
			newControls.setAttribute('style', 'float:right;display:none;');
			originalEditStory.call(this, story);
		}
	}, 500);
}
