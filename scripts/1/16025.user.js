// ==UserScript==
// @name           DOTA Random Attack
// @namespace      http://native02.blogspot.com
// @include        http://apps.facebook.com/dotaitems/attacking.php?random=true*
// @include        http://apps.facebook.com/dotaitems/viewbattle.php*
// ==/UserScript==

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
// select "DOTA Recursive Random Attack", and click Uninstall.
//
// --------------------------------------------------------------------


///////////////////////////////////////////////////////////////////
/////////////////	About the script	///////////////////
///////////////////////////////////////////////////////////////////
//This script automates the random attack function in DOTA.
//
//
// To use:
// - Go Battle Ladder and click "Random Matchup"
//
// What it does:
// 1) At the random matchup screen, click "Attack!"
// 2) At the subsequent View Battle page, go back to random matchup screen
//
// @author Frank Lee Weng Hong		frank.lee.wh@gmail.com
//
///////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////
/////////////////	Start of Codes	///////////////////////////
///////////////////////////////////////////////////////////////////
var href_current = window.location.href;
var href_RandomAttack = 'http://apps.facebook.com/dotaitems/attacking.php?random=true';
var href_ViewBattle = 'apps.facebook.com/dotaitems/viewbattle.php';

if (href_current.indexOf(href_ViewBattle) != -1) {
	setTimeout(function () {window.location.href = href_RandomAttack;}, 5000);
}
else {
	var divs = document.evaluate(
	"//input[contains(@value, 'Attack!')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (divs.snapshotLength > 0) {
		var div = divs.snapshotItem(0).click();
	} else {
		alert('No Attack! button found!');
	}
}