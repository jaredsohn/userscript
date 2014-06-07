// Neobux Manager
// version 1
// 2010-08-09
// Copyright (c) 2010, DTWPT
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
// select "OnBux Manager", and click Uninstall.
// ==UserScript==
// @name           Administrador de neobux
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/45988.user.js
// @namespace      www.neobux.com
// @description    Gestor de informacion en onbux
// @include        http://www.neobux.com/rented*
// @include        http://www.neobux.com/direct*
// ==/UserScript==
var MSPD = 86400000;
var Today = new Date();
var Yesterday = new Date()
Yesterday.setDate(Today.getDate() - 1);

function NumDaysSince (tmp) {
	var tmpDate = tmp.split(' ');
	if(tmpDate.length>1) {
		var tt = tmpDate[2].split(":");
	} else {
		var tt = new Array(2);
		tt[0] = "00";
		tt[1] = "00";
	}
	if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {
		var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
	} else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {
		var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
	} else {
		var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[2] : ""));
	}
	
	var numDays = Math.floor((Today - Since) / MSPD);

	return numDays;
}



var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
			  	document,
			    	null,
			   	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			   	null).snapshotItem(0);


var rows = mainTable.getElementsByTagName('tr');


var english = true;
if(rows[0].childNodes[1].innerHTML.match('Referido')) english = false;

var directRefs = true;
if(window.location.href.match('ss3=2')) directRefs = false;

if(directRefs) {
	var col_AVG = 6;
	var col_CLICKS = 5;
	var col_LAST = 4;	
	var col_SINCE = 3;
} else {
	var col_AVG = 6;
	var col_CLICKS = 5;	
	var col_LAST = 4;
	var col_SINCE = 2;	
}


for(var i=1; i<rows.length; i++) {
	
	if(rows[i].childNodes.length < 7) {
		// trash	
		continue;	
	}
	
	var tmpDate = rows[i].childNodes[col_SINCE].innerHTML.replace('&nbsp;','');
	var numDays = Math.max(1,NumDaysSince(tmpDate));
	rows[i].childNodes[col_SINCE].innerHTML = "" + tmpDate + "<br><font style='font-size:9px;color:#777777'>" + numDays + " dias de antiguedad</i></font>";

	
	var tmpDateLastClick = rows[i].childNodes[col_LAST].innerHTML.replace('&nbsp;','');
	
	if(tmpDateLastClick.match('No clicks') || tmpDateLastClick.match('Sem cliques')) {
		var inactiveDays = numDays;
	} else {
		var inactiveDays = NumDaysSince(tmpDateLastClick);
	}
	rows[i].childNodes[col_LAST].innerHTML = "" + tmpDateLastClick + "<br><font style='font-size:9px;color:#777777'>" + inactiveDays + " dias sin click</i></font>";


	var clicks = rows[i].childNodes[col_CLICKS].innerHTML.replace('&nbsp;','');
	var my_avgClicks = new Number(clicks / numDays);
	var avgClicks = new Number(rows[i].childNodes[col_AVG].innerHTML.replace('&nbsp;',''));

	


	
}
