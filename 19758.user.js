// kanjikoohiigentlyexpire.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2008, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.4 2008.08.21  woelpad  Added Script Update Checker
// 0.3 2008.05.06  woelpad  Adapted to Firefox 3beta5
// 0.2 2008.01.17  woelpad  Shaved off a whole minute to be on the safe side
// 0.1 2008.01.11  woelpad  First release
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
// select "Kanji.Koohii: Gently expire", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Gently expire
// @namespace      http://userscripts.org/scripts/show/19758
// @description    Redirect to the review summary page before the review session expires.
// @include        http://kanji.koohii.com/review/review.php*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 19758; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1239351640672; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

// Review page

if (!unsafeWindow.Review.fFlip || !unsafeWindow.Review.fSubmit) return;

var sessionTimeout = 23.5 * 60 * 1000;
var timeout;

function resetTimeout() {
	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(function () {
		window.location = '/review/reviewsummary.php';
	}, sessionTimeout);
}

resetTimeout();

// Taken from http://kanji.koohii.com/js/toolbox.js
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

var originalFFlip = unsafeWindow.Review.fFlip;
unsafeWindow.Review.fFlip = function (faceup) {
	resetTimeout();
	return originalFFlip.call(this, faceup);
}
var originalFSubmit = unsafeWindow.Review.fSubmit;
unsafeWindow.Review.fSubmit = function (answer) {
	resetTimeout();
	return originalFSubmit.call(this, answer);
}