// --------------------------------------------------------------------
//
// This script changes a few things to the way I'd like it
// If you don't like it, don't use it.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          What.CD Add Genres
// @namespace     http://www.chrisduffer.co.uk/greasemonkey/
// @description   Adds some genres back into the What.cd search
// @include       http://*what.cd/torrents.php*
// @exclude       http://*what.cd/torrents.php?id=*
// @version       1.3
// ==/UserScript==
//
// Changelog:
// 1.0 - Added a proper, ordered lost of genre's
// 1.1 - Using list of tags from upload page
//       Fixed torrent details bug
// 1.2 - Made it work on ww.what.cd
// 1.3 - Works better with advanced search
//
// NOTES:
// This adds some links to the Gazelle serach page of what.cd to emulate the old genre search
// If you don't know what what.cd or Gazelle is then you don't need this.
// To add/remove genres use the var genres bit below.
// The script uses elements of Jarett's Script Update Checker (http://userscripts.org/scripts/show/20145)


// Change this bit if you like

var genres = [
"60s",
"70s",
"80s",
"90s",
"alternative",
"ambient",
"apps.mac",
"apps.sound",
"apps.windows",
"audio.books",
"bluegrass",
"blues",
"breaks",
"classical",
"comedy",
"comics",
"country",
"dance",
"drum.and.bass",
"ebooks.fiction",
"ebooks.non.fiction",
"elearning.videos",
"electronic",
"emo",
"experimental",
"folk",
"funk",
"garage",
"grunge",
"hardcore",
"hardcore.dance",
"hiphop",
"house",
"idm",
"indie",
"industrial",
"jazz",
"jpop",
"metal",
"new.age",
"ost",
"pop",
"postrock",
"progressive.rock",
"psychedelic",
"psytrance",
"punk",
"rb.",
"rnb",
"reggae",
"rock",
"ska",
"soul",
"techno",
"trance",
"triphop",
"uk.garage",
"world.music",
];

// but nothing below here!!!


var tables, newRow, newCell; 
var maxCellsPerRow = 7;
var numRows = 1 ;
var searchRootUrl = "http://what.cd/torrents.php?searchtags=";

var version_scriptNum = 25362;
var version_timestamp = 1208717577547;

function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 3600000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

if (window.location.href.match(/action=advanced/)){
    var searchRootUrl = "http://what.cd/torrents.php?action=advanced&searchtags=";
}

tables = document.getElementsByTagName('table')
newRow = tables[1].insertRow(numRows++)

for (var j in genres) {
    if (j % maxCellsPerRow == 0){
        newRow = tables[1].insertRow(numRows++);
    }

    newCell = newRow.insertCell(j % maxCellsPerRow);
    newCell.innerHTML = "<a href='"+searchRootUrl+genres[j]+"'>"+genres[j]+"</a>";
}
