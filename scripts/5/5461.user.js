// ==UserScript==
// @name          Telus Call Forward Totals
// @namespace     http://lastbyte.ca
// @description   Modify mytelusmobility.com ebill
// @include       https://secure.telusmobility.com/ebill/*
// @exclude       
// ==/UserScript==

function leadingZero(num, iWidth, c) {
	c = (c == null ? '0' : c);
	
	num = '' + num;
	var len = num.length;
	if (len < iWidth) {
		for (var i = 0; i < len; ++i) {
			num = c + num;
		}
	}
	return(num);
}

function makeMin(secs) {
	return('' + (Math.floor(secs / 60)) + ':' + leadingZero(secs % 60, 2));
}

// Removes leading whitespaces
function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}

// var dt = new Date();
// GM_log(dt.toString() + ' =============================================');

// get HEAD element
var hd = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var el = document.createTextNode(
	'.zero {color: #999999;}'
);
style.appendChild(el);
hd.appendChild(style);

// find text "Select Criteria to display"
var txt = document.getElementsByTagName('span');

for (i = 0; i < txt.length; ++i) {
	if (txt[i].innerHTML.toLowerCase() == "select criteria to display") {
		break;
	}
}
var txtSelect = txt[i];

// move up 10 parents to a row which precedes the table with the ebill
txt = txtSelect;
for (i = 0; i < 10; ++i) {
	txt = txt.parentNode;
}

// get row containing major ebill table
txt = txt.nextSibling.nextSibling;

	var datatbl = txt.childNodes[1].childNodes[1];
	// datatbl.style.backgroundColor = '#55FFFF';
	
	var rows = datatbl.getElementsByTagName('tr');
	// GM_log("Number of rows: " + rows.length);
	var aTypes = ['IN', 'OG', 'CF', '*6'];
	var arr = new Array();
	var ARR_CNT = 0;
	var ARR_SUM = 1;
	var ARR_MIN = 2;
	for (i = 0; i < aTypes.length; ++i) {
		arr[aTypes[i]] = [0, 0, ''];
	}
	var zcols = [11, 13, 16, 19, 21];
	var cntRows = 0;	// count number of rows
	
	// start on 3rd row
	for (i = 2; i < rows.length - 1; ++i) {
		var tds = rows[i].getElementsByTagName('td');
		if (typeof tds[6] == 'undefined') {
			continue;
		}
		++cntRows;
		var callType = tds[6].getElementsByTagName('span')[0].innerHTML;
		var numCalled = tds[7].getElementsByTagName('span')[0].innerHTML;
		numCalled = numCalled.substring(0, numCalled.length - 1);
		var callMin = tds[10].getElementsByTagName('span')[0].innerHTML;		// mm:ss
		var colpos = callMin.indexOf(':');
		var callsecs = (0 + callMin.substring(0, colpos)) * 60 + (callMin.substr(colpos + 1) - 0);
		/* GM_log('' + cntRows + ". type " + callType + " number " + numCalled 
			+ " min " + callMin + "  " 
			+ callMin.substring(0, colpos) + '~' + callMin.substr(colpos + 1)
			+ " secs " + callsecs); */
		if (callType == 'OG' && numCalled == '*611') {
			callType = '*6';
		}
		++arr[callType][ARR_CNT];
		arr[callType][ARR_SUM] += callsecs;
		
		// grey out zero values
		for (var j = 0; j < zcols.length; ++j) {
			var val = tds[zcols[j]].getElementsByTagName('span')[0];
			if (trim(val.innerHTML) == '0.00') {
				val.setAttribute('class', val.getAttribute('class') + ' zero');
			}
		}
	}
	// GM_log("Totals: IN - " + arr['IN'][ARR_CNT] + " OG - " + arr['OG'][ARR_CNT] + " CF - " + arr['CF'][ARR_CNT] + " *6 - " + arr['*6'][ARR_CNT]);
	// GM_log("Seconds: IN - " + arr['IN'][ARR_SUM] + " OG - " + arr['OG'][ARR_SUM] + " CF - " + arr['CF'][ARR_SUM] + " *6 - " + arr['*6'][ARR_SUM]);
	for (i = 0; i < aTypes.length; ++i) {
		var typ = aTypes[i];
		arr[typ][ARR_MIN] = makeMin(arr[typ][ARR_SUM]);
	}

function makeRow() {
	newrow.setAttribute("class", 'bgtbllgreen');
	var aNew = new Array();
	for (i = 0; i < 18; i++) {
		var newEl = document.createElement('td');
		newEl.setAttribute('class', 'tabletitle3');
		newrow.appendChild(newEl);
		aNew[i] = newEl;
	}
	return(aNew);
}

	var newrow = document.createElement('tr');
	aNew = makeRow();
	aNew[1].setAttribute('colspan', '5');
	aNew[1].setAttribute('align', 'left');
	aNew[1].appendChild(document.createTextNode('Total IN(' + arr['IN'][ARR_CNT] + ') + OG(' + arr['OG'][ARR_CNT] + ')'));
	aNew[6].setAttribute('align', 'right');
	aNew[6].appendChild(document.createTextNode(makeMin(arr['IN'][ARR_SUM] + arr['OG'][ARR_SUM])));
	
	var lastrow = rows[rows.length - 1];
	lastrow.parentNode.insertBefore(newrow, lastrow);

	var newrow = document.createElement('tr');
	aNew = makeRow();
	aNew[1].setAttribute('colspan', '5');
	aNew[1].setAttribute('align', 'left');
	aNew[1].appendChild(document.createTextNode('Total CF(' + arr['CF'][ARR_CNT] + ') of 3000 minutes'));
	aNew[6].setAttribute('align', 'right');
	aNew[6].appendChild(document.createTextNode(makeMin(arr['CF'][ARR_SUM])));
	
	lastrow.parentNode.insertBefore(newrow, lastrow);

	var newrow = document.createElement('tr');
	aNew = makeRow();
	aNew[1].setAttribute('colspan', '5');
	aNew[1].setAttribute('align', 'left');
	aNew[1].appendChild(document.createTextNode('Total *611(' + arr['*6'][ARR_CNT] + ') - Free'));
	aNew[6].setAttribute('align', 'right');
	aNew[6].appendChild(document.createTextNode(makeMin(arr['*6'][ARR_SUM])));
	
	lastrow.parentNode.insertBefore(newrow, lastrow);
	