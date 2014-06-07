// ==UserScript==
// @name           Neobux 2
// @namespace      Made by uriburu626 and translated by jm2t
// @description    Calculates the age of referrals and days without click.
// @include        http://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c&s*
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
	rows[i].childNodes[col_SINCE].innerHTML = "" + tmpDate + "<font style='font-size:8.5px;color:#000000'> {" + numDays + "}</i></font>";

	
	var tmpDateLastClick = rows[i].childNodes[col_LAST].innerHTML.replace('&nbsp;','');
	
	if(tmpDateLastClick.match('No clicks') || tmpDateLastClick.match('Sem cliques')) {
		var inactiveDays = numDays;
	} else {
		var inactiveDays = NumDaysSince(tmpDateLastClick);
	}
	rows[i].childNodes[col_LAST].innerHTML = "" + tmpDateLastClick + "<font style='font-size:8.5px;color:#000000'> [" + inactiveDays + "]</i></font>";


	
}