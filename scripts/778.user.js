// ==UserScript==
// @name           Google Date Range
// @author         Michael Kennan
// @namespace      http://mushika.blogspot.com/
// @description    Adds GUI interface to 'daterange:' search option
// @include        http://google.com/
// @include        http://www.google.com/
// @exclude        *google.com/reviews*
// @exclude        *google.com/search*
// ==/UserScript==

/** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 **		Michael Kennan
 **		http://mushika.blogspot.com
 **
 ** This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

var gdr_startD;
var gdr_startM;
var gdr_startY;
var gdr_endD;
var gdr_endM;
var gdr_endY;

function gdr_injectMenu() {
	var d = document;

	// insert menu item
	var menuList = document.getElementsByTagName("table")[1].getElementsByTagName("td")[2].getElementsByTagName("font")[0];
	menuList.innerHTML = "&nbsp;&nbsp;<a href='javascript:gdr_showCals()'>Date Range Search</a><br/>" + menuList.innerHTML;

	// insert target div using DOM
	menuList=d.getElementsByTagName("table")[1].getElementsByTagName("tbody")[0];
	var newr=d.createElement("tr");
	var newtd=d.createElement('td');
	var newd=d.createElement('td');
	newd.id="drCals";
	newd.setAttribute("colspan","2");
	newd.style.display="none";
	menuList.appendChild(newr);
	newr.appendChild(newtd);
	newr.appendChild(newd);
}

function gdr_injectCals() {
	gdr_loadCal("start", gdr_startD, gdr_startM, gdr_startY);
	gdr_loadCal("end",   gdr_endD, gdr_endM, gdr_endY);
	if (document.getElementById("drCals").style.display != "none") gdr_loadForm();
}

function gdr_loadCal(cal, sD, sM, sY) {
	sS	= (new Date(sY, sM, 1).getDay() + 2) % 7;
	sM      = sM + 1;
	var calText = "";
	calText += '<table id="' + cal + 'Cal"><thead>';
	calText += '<tr><td class="hdr1" colspan="7">';
	if (cal == "start") { calText += "From:"; } else { calText += "To:"; }
	calText += '</td></tr>';
	calText += '<tr id="' + cal + 'Nav"><td onclick="gdr_setPrevYear(this); return false;">&lt;&lt;</a></td><td onclick="gdr_setPrevMonth(this); return false;">&lt;</a></td><td id="calDate" colspan="3">';
	calText += gdr_getMonth(sM) + ' ' + gdr_getYear(sY);
	calText += '</td><td onclick="gdr_setNextMonth(this); return false;">&gt;</a></td><td onclick="gdr_setNextYear(this); return false;">&gt;&gt;</a></td></tr>';
	calText += '<tr class="weekDays"><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr>';
	calText += '</thead><tbody><tr>';
	for (var count = 0; count < 42; count++) {
		calText += '<td';
		if (count - sS == sD - 1) {
			calText += ' class="hilight"';
		}
		calText += ' onclick="gdr_setDay(this)">';
		if ((count >= sS) && (count - sS < gdr_getNumDays(sM,sY))) {
			calText += count - sS + 1;
		}
		else {
			calText += "&nbsp;";
		}
		calText += '</td>';
		if (count % 7 == 6) {
			calText += '</tr>';
		}
	}
	calText += '</tr></tbody></table>';
	if (cal == "start") {
		document.getElementById("drCals").innerHTML = calText;
	}
	else {
		document.getElementById("drCals").innerHTML += calText;
	}
}

function gdr_loadForm() {
	var loadString;
	var d = " daterange:";
	var j1 = gdr_getJulian(gdr_startD, gdr_startM, gdr_startY);
	var j2 = gdr_getJulian(gdr_endD, gdr_endM, gdr_endY);
	loadString = (j2 > j1) ? d + j1 + "-" + j2 + " " : d + j2 + "-" + j1 + " ";
	var f = document.forms;
	if (f.length && f[0].q) {
		f[0].q.value = f[0].q.value.replace(new RegExp(d+'\\d+-\\d+'),'');
		f[0].q.value = f[0].q.value.replace('  ',' ');
		f[0].q.value += loadString;
	}
}

function gdr_showCals() {
	s = document.getElementById("drCals").style;

	if (s.display == "none") {
		s.display = "block";
		gdr_injectCals();
	}
	else {
		s.display = "none";
	}
}

function gdr_setDay(ele) {
	if (ele.innerHTML != "" && ele.innerHTML != null && ele.innerHTML != "undefined") {
		if (gdr_isStart(ele)) {
			gdr_startD = ele.innerHTML;
		}
		else {
			gdr_endD = ele.innerHTML;
		}
		gdr_injectCals();
	}
}

function gdr_getJulian(day, month, year) {
	var day   = gdr_toLong(day);
	var month = gdr_toLong(month + 1);
	var year  = gdr_toLong(gdr_getYear(year));

	sign = (((100 * year) + month - 190002.5) >= 0) ? 1 : -1;
	with (Math) {
		return round((367 * year) - floor((7 * (year + floor((month + 9) / 12))) / 4) + day + floor((275 * month) / 9) + 1721013.5 - (0.5 * sign) + 0.5);
	}
}

function gdr_toLong(val) {
  if (val >= 0) {return Math.floor(val);}
  else {return Math.ceil(val);}
}


function gdr_setPrevYear(ele) {
	if (gdr_isStart(ele)) {
		gdr_startY--;
	}
	else {
		gdr_endY--;
	}
	gdr_injectCals();
}

function gdr_setPrevMonth(ele) {
	if (gdr_isStart(ele)) {
		if (gdr_startM == 0) {
			gdr_startM = 11;
			gdr_startY--;
		}
		else {
			gdr_startM--;
		}
	}
	else {
		if (gdr_endM == 0) {
			gdr_endM = 11;
			gdr_endY--;
		}
		else {
			gdr_endM--;
		}
	}
	gdr_injectCals();
}

function gdr_setNextMonth(ele) {
	if (gdr_isStart(ele)) {
		if (gdr_startM == 11) {
			gdr_startM = 0;
			gdr_startY++;
		}
		else {
			gdr_startM++;
		}
	}
	else {
		if (gdr_endM == 11) {
			gdr_endM = 0;
			gdr_endY++;
		}
		else {
			gdr_endM++;
		}
	}
	gdr_injectCals();
}

function gdr_setNextYear(ele) {
	if (gdr_isStart(ele)) {
		gdr_startY++;
	}
	else {
		gdr_endY++;
	}
	gdr_injectCals();
}

function gdr_getYear(num) {
	if (num < 2000) {
		num = num + 1900;
	}
	return num;
}

function gdr_getMonth(num) {
	switch (num - 1) {
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "Jun";
		case 6:
			return "Jul";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
	}
}

function gdr_getNumDays(sM, sY) {
	var numDays;
	if (sM==1 || sM==3 || sM==5 || sM==7 || sM==8 || sM==10 || sM==12) numDays=31;
	else if (sM==4 || sM==6 || sM==9 || sM==11) numDays=30;
	else if (sM==2) {
		if (gdr_isLeapYear(sY)) { numDays=29; }
		else { numDays=28; }
	}
	return (numDays);
}

function gdr_isLeapYear(myYear) {
	if (((myYear % 4)==0) && ((myYear % 100)!=0) || ((myYear % 400)==0)) {
		return (true);
	}
	else {
		return (false);
	}
}

function gdr_isStart(ele) {
	return (ele.parentNode.parentNode.parentNode.id == "startCal")
}

function gdr_addCSS(css) {
	style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

gdr_injectMenu();
var myDate = new Date();

gdr_startD = myDate.getDate();
gdr_startM = myDate.getMonth();
gdr_startY = myDate.getYear() - 1;
gdr_endD   = myDate.getDate();
gdr_endM   = myDate.getMonth();
gdr_endY   = myDate.getYear();

gdr_addCSS("#drCals #startCal { float: left; margin: 10px 0px; }");
gdr_addCSS("#drCals #endCal { float: right; margin: 10px 0px; }");
gdr_addCSS("#drCals td { border: 1px solid #ccf; text-align: center; font-size: 0.8em; cursor: default; }");
gdr_addCSS("#drCals .hdr1 { background: #33c; border: 1px solid #33c; color: white; cursor: default; }");
gdr_addCSS("#drCals tbody td:hover { background: #ccf; }");
gdr_addCSS("#drCals .hilight { background: #33c; color: white; }");
gdr_addCSS("#drCals tr#startNav, #drCals tr#endNav, .weekDays { background: #ccf; }");



gdr_injectCals();