// ==UserScript==
// @name           Add Gmaps Button To Trimet
// @namespace      http://axisofevil.net/~xtina
// @description    Adds a link to the trimet.org trip page to Google Maps.
// @include        http://trimet.org/go/cgi-bin/itin.pl
// ==/UserScript==

var tripOpts = document.getElementById("TripOptions").childNodes[1];
var tripFromOld = tripOpts.childNodes[1].nodeValue;
var tripToOld = tripOpts.childNodes[5].nodeValue;

var tripFrom = tripFromOld.substr(1, tripFromOld.indexOf(" in ") - 1) + ",";
tripFrom += tripFromOld.substr(tripFromOld.indexOf(" in ") + 3);
tripFrom = tripFrom.substr(0, tripFrom.length - 1) + ', OR';
tripFrom = "&saddr=" + tripFrom.replace(/ /g, "+");

var tripTo = tripToOld.substr(1, tripToOld.indexOf(" in ") - 1) + ",";
tripTo += tripToOld.substr(tripToOld.indexOf(" in ") + 3);
tripTo = tripTo.substr(0, tripTo.length - 1) + ', OR';
tripTo = "&daddr=" + tripTo.replace(/ /g, "+");

var tripOpt = tripOpts.childNodes[9].nodeValue;
tripOpt = tripOpt.split(" ");

var tripDir = "&ttype=" + tripOpt[2].substr(0, 3).toLowerCase();
var tripTime = "&time=" + tripOpt[4] + tripOpt[5];

var allMonths = new Array(
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
);

for (var x = 0; x < 12; x++) {
	if (tripOpt[7] == allMonths[x]) {
		var tripDate = "&date=" + (x + 1);
		break;
	}
}

tripDate += "%2F" + tripOpt[8].substr(0, tripOpt[8].length - 1);
tripDate += "%2F" + tripOpt[9].substr(-2);

// Construct Glink.
var glink = "http://maps.google.com/maps?f=d&source=s_d" + tripFrom + tripTo;
glink += "&mra=ls&dirflg=r" + tripDate + tripTime + tripDir;
glink += "&noexp=0&noal=0&ie=UTF8&z=13&start=0";

var gbutton = document.createElement("input");
gbutton.setAttribute("type", "button");
gbutton.value = "Google Maps Version";
gbutton.setAttribute("onclick", "window.open('" + glink + "')");

document.getElementById("TripOptions").parentNode.insertBefore(gbutton, document.getElementById("TripOptions"));
