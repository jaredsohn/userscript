// --------------------------------------------------------------------
//
// This script changes a few things to the way I'd like it
// If you don't like it, don't use it.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          What.CD Expand Groups
// @namespace     http://www.chrisduffer.co.uk/greasemonkey/
// @description   Expands all the torrents in the search view
// @include       http://*what.cd/torrents.php*
// @exclude       http://*what.cd/torrents.php?id=*
// @version       1.0
// ==/UserScript==
//
// Changelog:
// 1.0 - Initial revision
//
// NOTES:
// This expands all the torrent groups on the torrents search page
// The script uses elements of Jarett's Script Update Checker (http://userscripts.org/scripts/show/20145)

var version_scriptNum = 25421;
var version_timestamp = 1208712492809;

function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 3600000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);


var allTorrentExpands, thisTorrentExpands;

// Find all this lovely little + signs
allTorrentExpands = document.evaluate(
    "//a[@class='show_torrents_link']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// then click them all
    for (var i = 0; i < allTorrentExpands.snapshotLength; i++) {
        thisTorrentExpands = allTorrentExpands.snapshotItem(i);
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, false);
        thisTorrentExpands.dispatchEvent(event);
    }
        