// ==UserScript==
// @name                DiamondMindLiveCSSCorrections
// @version             0.1
// @author              varanasib
// @namespace           http://userscripts.org/scripts/show/64950
// @description	        Corrections for Imagine Sports Baseball Diamond Mind Live Baseball
// @include		http://*imaginesports.com/bball/h2h/play_game/*
// ==/UserScript==

// get rid of all hard-coded heights
var snapResults = document.evaluate("//div[@style]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
	elm.style.height="auto";
}

// reset heights where they matter
//   first "column"
document.getElementById("parkview").style.height="400px";
document.getElementById("parkimg").style.height="400px";
//   second "column"
document.getElementById("pbp").style.height="210px";
document.getElementById("pbp").parentNode.style.height="210px";
document.getElementById("chat_display").style.height="110px";

// uncover tactics menus
document.getElementById("parkview").style.top="100px";

// unsmoosh second column
document.getElementById("pbp_frame").style.top="100px";
document.getElementById("chat_frame").style.top="330px";

// move bullpen lineup to right of window
document.getElementById("teams").style.position="static";
document.getElementById("lineup_tabs").style.position="absolute";
document.getElementById("lineup_tabs").style.top="-8px";
document.getElementById("lineup_tabs").style.left="675px";

document.getElementById("bullpen_tabs").style.position="absolute";
document.getElementById("bullpen_tabs").style.top="-8px";
document.getElementById("bullpen_tabs").style.left="815px";

// change window title to help distinguish game window from others

document.title = "Game";






