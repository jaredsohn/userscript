// ==UserScript==
// @name           ebay.es 2 gCal 
// @description    "Add to Google Calendar" buttons on ebay.es article pages
// @include        http://cgi.ebay.*
// ==/UserScript==

// Based in Keith Hopkins script (http://userscripts.org/scripts/show/38170)
// which is based in Tilman Vogel's script (http://userscripts.org/scripts/show/12587)
//
// A bit of code added to manage the spanish version of eBay (ebay.es)

function LeadingZeroes(n,l) {
  n = String(n);
  while(n.length < l)
    n = "0"+n;
  return n;
}

function getXP(q) {
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var timezones = new Array();
timezones["MESZ"] = "GMT+0200";
timezones["MEZ"] = "GMT+0100";
timezones["CEST"] = "GMT+0200";
timezones["CET"] = "GMT+0100";
timezones["BST"] = "GMT+0100";
timezones["SGT"] = "GMT+0800";
// update me on DST change: (ebay doesn't supply CEST/CET)
timezones["Paris"] = "GMT+0100";
// by Solo for ebay.es
// code moved to the months case. the DST error is reduced to a few days only
// until I find a better way to manage it
// timezones["H.Esp"] = "GMT+0100";
// timezones["H."] = "GMT+0100";
// timezones["H"] = "GMT+0100";


function setModeTitleLink() {
  GM_setValue("mode","title_link");
  alert("Please reload page for the change to take effect!");
}

function setModeDetailsPlainURL() {
  GM_setValue("mode","details_plain_url");
  alert("Please reload page for the change to take effect!");
}

// main()

var title = getXP("//H1[@class='itemTitle']");
title = title.snapshotItem(1);

GM_log("title: "+title.textContent);
GM_log("url: "+document.location);

var details;


   title = title.textContent;
   details = document.location;

title = encodeURIComponent(title);
details = encodeURIComponent(details);


var endtime;

endtime = getXP("//SPAN[@id='DetailsTimeLeft']");

endtime = endtime.snapshotItem(0);

GM_log("endtime: " + endtime.textContent);

var parseddate;
parseddate = endtime.textContent.match(/(\d+).(\d+).(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);

if(!parseddate) {
  parseddate = endtime.textContent.match(/(\d+)-([a-zA-Z]+)-(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
// by Solo: parsing for spanish months
  switch(parseddate[2]) {
	case "ene":
	  parseddate[2]="jan";
		timezones["H.Esp"] = "GMT+0100";
		timezones["H."] = "GMT+0100";
		timezones["H"] = "GMT+0100";
	  break;
	case "feb":
	  parseddate[2]="feb";
		timezones["H.Esp"] = "GMT+0100";
		timezones["H."] = "GMT+0100";
		timezones["H"] = "GMT+0100";
	  break;
	case "mar":
	  parseddate[2]="mar";
		timezones["H.Esp"] = "GMT+0100";
		timezones["H."] = "GMT+0100";
		timezones["H"] = "GMT+0100";
	  break;
	case "abr":
	  parseddate[2]="apr";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "may":
	  parseddate[2]="may";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "jun":
	  parseddate[2]="jun";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "jul":
	  parseddate[2]="jul";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "ago":
	  parseddate[2]="aug";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "sep":
	  parseddate[2]="sep";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "oct":
	  parseddate[2]="oct";
		timezones["H.Esp"] = "GMT+0200";
		timezones["H."] = "GMT+0200";
		timezones["H"] = "GMT+0200";
	  break;
	case "nov":
	  parseddate[2]="nov";
		timezones["H.Esp"] = "GMT+0100";
		timezones["H."] = "GMT+0100";
		timezones["H"] = "GMT+0100";
	  break;
	case "dic":
	  parseddate[2]="dec";
		timezones["H.Esp"] = "GMT+0100";
		timezones["H."] = "GMT+0100";
		timezones["H"] = "GMT+0100";
	  break;
    default:
      break;
    }
}

if(!parseddate) {
  if(parseddate = endtime.textContent.match(/([a-zA-Z]+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/)) {
    month = parseddate[1];
    parseddate[1]=parseddate[2];
    parseddate[2]=month;
  }
 }

if(!parseddate) {
  if(parseddate = endtime.textContent.match(/([a-zA-Z]+)\s+(\d+),\s+(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/)) {
    month = parseddate[1];
    parseddate[1]=parseddate[2];
    parseddate[2]=month;
  }
 }

if(!parseddate) {
  var message = document.createElement("DIV");
  message.innerHTML = "<b style=\"color:red\">userscript: could not parse end date</b>";
  endtime.parentNode.insertBefore(message,endtime.nextSibling);
  return;
 }

if(Number(parseddate[3]) < 100)
  parseddate[3] = 2000 + Number(parseddate[3]);

if(typeof(timezones[parseddate[7]]) != 'undefined')
  parseddate[7] = timezones[parseddate[7]];

var datestring = parseddate[3]+"/"+parseddate[2]+"/"+parseddate[1]
  +" "
  +parseddate[4]+":"+parseddate[5]+":"+parseddate[6]
  +" "
  +parseddate[7];

GM_log("datestring: " + datestring);

var date = new Date(datestring);

if(! date.valueOf()) {
  var message = document.createElement("DIV");
  message.innerHTML = "<b style=\"color:red\">userscript: could not parse datestring</b>";
  endtime.parentNode.insertBefore(message,endtime.nextSibling);
  return;
 }

GM_log("UTC date: " + date.toUTCString());

var googledate = String(date.getUTCFullYear())
  + LeadingZeroes(date.getUTCMonth()+1,2) 
  + LeadingZeroes(date.getUTCDate(),2)
  + "T"
  + LeadingZeroes(date.getUTCHours(),2)
  + LeadingZeroes(date.getUTCMinutes(),2)
  + LeadingZeroes(date.getUTCSeconds(),2)
  + "Z";

var newButton = document.createElement("DIV");
newButton.innerHTML 
= '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text='
  + title
  + '&dates='
  + googledate
  + "/"
  + googledate
  + '&details='
  + details
  + '&location=&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button1.gif" border=0></a>';

endtime.parentNode.insertBefore(newButton, endtime.nextSibling);