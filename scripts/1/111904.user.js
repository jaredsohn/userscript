// Aim Star's One-Code-One-World Window Title Fix
// version 0.1.20110901.1214
// 2011-09-01
// Copyright (c) 2011, Sakda Preudtiwatdhana (Bronze Star as of June 2011)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on install.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Aim Star's One-Code-One World Window Title Fix
// @namespace      http://diveintogreasemonkey.org/download
// @description    Fix incorrect Window Title for One-Code-One-World website
// @include        http://onecodeoneworld.aimstarnetwork.com/*
// ==/UserScript==


(function() {
	var urlArray = new Array(7);

	urlArray[0] = new Array(2);
	urlArray[0][0] = "http://onecodeoneworld.aimstarnetwork.com/frmShowTree.aspx";
	urlArray[0][1] = "Organization Tree";

	urlArray[1] = new Array(2);
	urlArray[1][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnBECNotClear.aspx";
	urlArray[1][1] = "Remaining BEC";

	urlArray[2] = new Array(2);
	urlArray[2][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnMB_BECClearingByProduct.aspx";
	urlArray[2][1] = "BEC Clearing Report";

	urlArray[3] = new Array(2);
	urlArray[3][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnMemberBusinessStatus.aspx";
	urlArray[3][1] = "My Bonus";

	urlArray[4] = new Array(2);
	urlArray[4][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnMemberBusinessStatusLvl1.aspx";
	urlArray[4][1] = "Level 1's Volume";

	urlArray[5] = new Array(2);
	urlArray[5][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnMemberBusinessStatusLvl2.aspx";
	urlArray[5][1] = "Level 2's Volume";

	urlArray[6] = new Array(2);
	urlArray[6][0] = "http://onecodeoneworld.aimstarnetwork.com/PrintReport/PrnMemberBusinessStatusLvl2.aspx";
	urlArray[6][1] = "Level 2's Volume";

	for(iCount in urlArray){
		if(location.href == urlArray[iCount][0]){
			document.title = urlArray[iCount][1];
			break;
		}
	}
})();
