// Travian Color MarketPlace Script
// version 0.1 BETA!
// 2007-08-29
// Copyright (c) 2007, Aleh Krutsikau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// fixed by kirilloid
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Travian MarketPlace", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Travian Color MarketPlace
// @namespace     http://http://krolser.wordpress.com/projects/greasemonkey/
// @description   script for Travian marketplace
// @include       http://s*.travian.*/build.php?id=*&t=1*
// @include       http://s*.travian.*/build.php?gid=17&t=1*
// ==/UserScript==


	var allDivs, thisDiv;
		allDivs = document.evaluate(
		"//table[@class='tbg']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	i = allDivs.snapshotLength-1;
	thisTable = allDivs.snapshotItem(i);
	// do something with thisDiv
	trs = thisTable.rows;
	for (j=2;j<trs.length;j++) {
          current_row = trs[j];
          sell_buy = Math.log(trs[j].cells[1].innerHTML / trs[j].cells[3].innerHTML)*Math.LOG2E;
          sell_buy = 2 * Math.max(-0.5, sell_buy);
          sell_buy = 2 * Math.min(sell_buy, +0.5);
          red = Math.round(0xFF - Math.pow(Math.max(0, sell_buy), 0.5) * 0x22);
          green = Math.round(0xFF - Math.pow(-Math.min(sell_buy, 0), 0.5) * 0x22);
          blue = Math.round(0xBB + Math.pow(Math.abs(sell_buy), 0.5) * 0x22);

          trs[j].style.backgroundColor="#"+red.toString(16)+green.toString(16)+blue.toString(16);
	}