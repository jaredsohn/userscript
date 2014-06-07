// ==UserScript==
// @name           appy appy
// @namespace      pardus.at
// @author         Hitchhiker
// @version        0.1
// @description    appy appy
// @include        http://*.pardus.at/main.php*
//
// ==/UserScript==


function calculateApsIn() {

var apleft = document.getElementById('apsleft').title;
var datenow = new Date();
var days = 0;
var hrs = datenow.getHours();
var mins = datenow.getMinutes();
var newtext;



mins = mins + Number(getPart(apleft, "min"));
if (mins > 59) {
	hrs = hrs + 1;
	mins = mins - 60;
}

hrs = hrs + Number(getPart(apleft, "h"));
if (hrs > 23) {
	days = days + 1;
	hrs = hrs - 24;
}
days = days + Number(getPart(apleft, "d"));

newtext = "Maximum APs ";
if (days == 1) newtext = newtext + "tomorrow ";
if (days > 1) newtext = newtext + "in " + days + " days ";

newtext = newtext + "at " + hrs + ":";
if (mins < 10) newtext = newtext + "0";
newtext = newtext + mins;


document.getElementById("apsleft").title = newtext;
//document.getElementById("apsleft").title = days + " " + hrs + " " + mins + " " + getPart(apleft, "d") + " " + Number(getPart(apleft, "d"));
}

function getPart(apsleft, type) {
	var parts = apsleft.split(' ');
	var part;
	if (type == "d") part = "2";
	if (type == "h") part = "3";
	if (type == "min") part = "4";
	return parts[part].replace(type,"");
}


calculateApsIn();
