// Better Stansco NetChess Greasemonkey script
// version 0.1 BETA!
// 2008-05-15
// Copyright (c) 2008, Alex Zuroff
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Better Stansco NetChess", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           Better Stansco NetChess
// @namespace      BetterStansco
// @description    Greasemonkey improvements to the Stansco NetChess control panel
// @include        http://www.stansco.com/cgi-bin/nc_scp_ag.cgi?*
// ==/UserScript==

// This script highlights games in the control panel that are close to forfeit to make them easier
// to pick out of a long list of games.

// The following variables control what games get highlighted
var criticalDTF = 2;            // The days-to-forfeit for critical games
var criticalColor = "red";      // The color to use to highlight critical games
var warningDTF = 4;             // The days-to-forfeit for games that are close to critical
var warningColor = "skyblue";   // The color to highlight "close to critical" games

games = document.evaluate("//tr[@valign]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < games.snapshotLength; i++) {
    currentgame = games.snapshotItem(i);
    dtf = /\d+/.exec(currentgame.childNodes.item(6).firstChild.innerHTML);
    isMyTurn = /YES|no/.exec(currentgame.childNodes.item(3).innerHTML);

    if (isMyTurn == "YES") {
        if (dtf <= criticalDTF) {
            currentgame.bgColor = criticalColor;
        } else if (dtf <= warningDTF) {
            currentgame.bgColor = warningColor;
        }
    }
}
