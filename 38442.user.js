// ==UserScript==
// @name           Digital Clock & Date
// @namespace      http://userscripts.org/users/23652
// @description    Adds a digital clock and optional date to the bottom right of the screen
// @include        http://*
// @include        https://*
// @include        file://*
// @exclude        http*://cpt.neobux.com/*
// @copyright      JoeSimmons
// @version        1.0.6
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://usocheckup.dune.net/38442.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==





// OPTIONS SECTION ///////////////////////////////////////////////////////
var AM_PM = false; // "true" TO MAKE TIME AM/PM 12am-12pm.
                  // "false" FOR MILITARY TIME 00:00-24:00

var use_date = true; // "true" to add date to page, "false" to not

var date_arrangement = "weekday month day year"; // Order of date objects from left to right
												 // Objects you can use: weekday
												 //                      month
												 //                      day
												 //                      year
//////////////////////////////////////////////////////////////////////////





// Make sure the page is not in a frame
if(window.self !== window.top) {
	throw "";
}

if(document.getElementById("digital_clock") !== null) throw "";

var time_box = document.createElement("div");
time_box.setAttribute("id", "digital_clock");
time_box.setAttribute("style", "position: fixed; bottom: 1px; right: 1px; padding: 5px; color: #000000; text-shadow: 0 0 10px #000000; background: #FFFFFF; border: 1px solid #C7C7C7; border-radius: 6px; font-size: 12px; font-family: sans-serif, arial, verdana; z-index:99999;");
document.body.insertBefore(time_box, document.body.firstChild);

date_arrangement = date_arrangement.toLowerCase().split(" ");

function setTime() {
	var period = "",
		DateArr = new Array(),
		fulldate = "",
		date = new Date();

		DateArr["hours"] = date.getHours(),
		DateArr["minutes"] = date.getMinutes().toString(),
		DateArr["seconds"] = date.getSeconds().toString();

	// Make it am/pm if setting is on
	if(AM_PM) {
		if(DateArr["hours"]>12) {DateArr["hours"]-=12; period=" pm";} else period=" am";
		if(DateArr["hours"]==0) DateArr["hours"]=12;
	}
	DateArr["hours"] = DateArr["hours"].toString();

	if(DateArr["hours"].length==1 && !AM_PM) DateArr["hours"]="0"+DateArr["hours"]; // Correct the 1 digit glitch
	if(DateArr["minutes"].length==1) DateArr["minutes"]="0"+DateArr["minutes"]; // Correct the 1 digit glitch
	if(DateArr["seconds"].length==1) DateArr["seconds"]="0"+DateArr["seconds"]; // Correct the 1 digit glitch

	// Handle date arrangement
	if(use_date === true) {
		var Regexs = {
				weekday : /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/,
				month : /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
				day : /(\d+) 20\d{2}/,
				year : /20\d{2}/
			},
			date = Date();

		for(var i=0, l = date_arrangement.length; i < l; i++) {
			switch(date_arrangement[i]) {
				case "weekday":
				fulldate += date.match(Regexs["weekday"])[0] + ", "; break;
				case "month":
				fulldate += date.match(Regexs["month"])[0] + " "; break;
				case "day":
				fulldate += date.match(Regexs["day"])[1] + " "; break;
				case "year":
				fulldate += date.match(Regexs["year"])[0] + " "; break;
			}
		}
		if(fulldate === "") fulldate = date;
	}

	time_box.textContent = DateArr["hours"]+":"+DateArr["minutes"]+":"+DateArr["seconds"]+period+
		(use_date?(" - "+fulldate):""); // Add date if enabled
	
	window.setTimeout(setTime, 1000);
}

window.setTimeout(setTime, 0);