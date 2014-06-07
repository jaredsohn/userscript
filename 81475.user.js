// ==UserScript==
// @name           TotProdLC
// @namespace      DeNada
// @description	   Jim's attempt at making a script based on Endy's original
// @include        http://ww*.erepublik.com/*/company/employees/*
// ==/UserScript==

var crap = "0";

var mon = "0";
var tues = "0";
var wed = "0";
var thu = "0";
var fri = "0";
var sat = "0";
var sun = "0";
var day = "0";

var prod = document.getElementsByClassName('e_productivity');

// var i reps employees and starts from 1 counting up.
// var d reps day of week and starts from 0 counting up.

for(var i=1; i < prod.length; i++) {

	for(var d=0; d < 7; d++) {

		day = prod[i].getElementsByTagName("li")[d].getElementsByTagName("p")[0].innerHTML;

day = day.replace(/\s*/,"");
day = day.replace(/\s*$/,"");	

if (day.length > 6){
day = "0";
}
if (day == "n/a") {
day = "0";
}

if (d == "0"){
day = day * 1;
mon = mon * 1;
mon = mon + day;

}

if (d == "1"){
day = day * 1;
tues = tues * 1;
tues = tues + day;
}

if (d == "2"){
day = day * 1;
wed = wed * 1;
wed = wed + day;
}

if (d == "3"){
day = day * 1;
thu = thu * 1;
thu = thu + day;
}

if (d == "4"){
day = day * 1;
fri = fri * 1;
fri = fri + day;
}

if (d == "5"){
day = day * 1;
sat = sat * 1;
sat = sat + day;
}

if (d == "6"){
day = day * 1;
sun = sun * 1;
sun = sun + day;
}

	}

}


crap = mon * 100;
crap = crap + ".";
crap = crap.split('\.');
mon = crap[0]/100;

crap = tues * 100;
crap = crap + ".";
crap = crap.split('\.');
tues = crap[0]/100;


crap = wed * 100;
crap = crap + ".";
crap = crap.split('\.');
wed = crap[0]/100;

crap = thu * 100;
crap = crap + ".";
crap = crap.split('\.');
thu = crap[0]/100;

crap = fri * 100;
crap = crap + ".";
crap = crap.split('\.');
fri = crap[0]/100;

crap = sat * 100;
crap = crap + ".";
crap = crap.split('\.');
sat = crap[0]/100;

crap = sun * 100;
crap = crap + ".";
crap = crap.split('\.');
sun = crap[0]/100;

var junk = document.getElementById("employee_form");

    	var newElement = document.createElement('div');

newElement.innerHTML = '<div><b>Totals</b><table><tr><th style="font-weight:bold;color: gray;">Mo</th><th style="font-weight:bold;color: gray;">Tu</th><th style="font-weight:bold;color: gray;">Wed</th><th style="font-weight:bold;color: gray;">Th</th><th style="font-weight:bold;color: gray;">Fr</th><th style="font-weight:bold;color: gray;">Sa</th><th style="font-weight:bold;color: gray;">Su</th></tr><tr><td style="font-weight:bold;color: green;"> '+mon+' </td><td style="font-weight:bold;color: green;"> '+tues+' </td><td style="font-weight:bold;color: green;"> '+wed+' </td><td style="font-weight:bold;color: green;"> '+thu+' </td><td style="font-weight:bold;color: green;"> '+fri+' </td><td style="font-weight:bold;color: green;"> '+sat+' </td><td style="font-weight:bold;color: green;"> '+sun+' </td></tr></table></div>';

    	junk.parentNode.insertBefore(newElement, junk.nextSibling);