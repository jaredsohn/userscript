// ==UserScript==
// @name			VZ  VisitorWatch 2.0
// @namespace		http://www.lukash.de
// @author 			Lukas Heblik 
// @description		Beschreibt die Veränderungen des Besucherzählers
// @include       	http://www.schuelervz.net/*
// @include      	http://www.studivz.net/*
// @include       	http://www.meinvz.net/*
// ==/UserScript==

// version 1.0 by http://agrafix.net

// @version 2.0
var vz = window.location.href.match(/http:\/\/www\.([a-z]+)vz\.net/)[1];

function init() {
	var visCountElm = document.getElementsByClassName("visitorsCounter")[0];
	var visitors = visCountElm.innerHTML.split(": ");
	var count = visitors[1].split(".")[0] + visitors[1].split(".")[1];
	
	
	// relative change
	var last = GM_getValue('LastVisitors', 0);
	var change = count-last;
	GM_setValue('LastVisitors', count);
	
	var style;
	if (change > 0) {
		style = "style='color:green;font-weight:bold;'";
	}
	visCountElm.innerHTML += " <span "+ style +">(+" + change + ")</span>";
	
	// daily chance
	var currentDate = new Date();
	var lastUpdateDay = GM_getValue('LastUpdateDay', currentDate.getDate());
	var dailyChange = GM_getValue('DailyChange', 0);
	
	if (lastUpdateDay == currentDate.getDate()) {
		dailyChange += change;
		GM_setValue('DailyChange', dailyChange);
		GM_setValue('LastUpdateDay', currentDate.getDate());
	}
	else {
		GM_setValue('LastUpdateDay', currentDate.getDate());
		GM_setValue('DailyChange', change);
		dailyChange = change;
	}
	
	var extraStyle = "";
	if (dailyChange > 0) {
		extraStyle = "style='color:green;font-style:italic;'";
	}
	
	visCountElm.innerHTML += " | Heute: <span " + extraStyle + ">"+dailyChange+"</span> ";
	visCountElm.parent.height = 40;
	
}

if ((location.href.indexOf(vz + "vz.net" + "/Home") > -1) || (location.href.indexOf(vz + "vz.net" + "/Start/tid/101") > -1)) {
	init();
}