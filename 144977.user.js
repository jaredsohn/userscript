// ==UserScript==
// @name          Backwards compatible updater
// @namespace     http://userscripts.org/users/nascent
// @description   Test script: Template combining GM 1.0s script update functionality with PhasmaExMachina's Update Checker
// @include       *
// @match         *://*/*
// @version       1.00
//
// @icon          http://si0.twimg.com/profile_images/91026759/nascent_reasonably_small.PNG
// @updateURL     https://userscripts.org/scripts/source/144977.meta.js
// @downloadURL   https://userscripts.org/scripts/source/144977.meta.js
//
// @require       http://userscripts.org/scripts/source/111583.user.js
// @history	      1.00 Initial release
// ==/UserScript==

//Check for new versions
try
{
	ScriptUpdater.check(144977,/*currentVersion*/'1.00');
}
catch(err)
{
	GM_log("MrSkin Ratings In IMDB: " + err);
}

var upVer = (Math.round(1.0*100)/100) //Version with built in updates
var gmVer = (Math.round(GM_info.version*100)/100) //Current Greasemonkey Version
alert("Current GM version: " + gmVer);

if (gmVer < upVer) {
	alert("Old version of Greasemonkey");
}
else {
	alert("New version of Greasemonkey");
}
	