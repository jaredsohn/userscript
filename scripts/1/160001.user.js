// ==UserScript==
// @name           eBayAblauf2QRandGCalender
// @description    "Add to Google Calendar" buttons on ebay article pages, use at own risk!
// @namespace      tag:info@lifesuche.de,2013:userscripts
// @include        http://www.ebay.*
// @version        1.04
// ==/UserScript==

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

//just add more ebay sites to the regex
EbaySiteLocation = document.URL.match(/(www\.ebay\.(?:fr|de|com|it|co\.uk|com\.au))/);
var myEbaySite = EbaySiteLocation[1];

function setModeTitleLink() {
  GM_setValue("mode","title_link");
  alert("Please reload page for the change to take effect!");
}

function setModeDetailsPlainURL() {
  GM_setValue("mode","details_plain_url");
  alert("Please reload page for the change to take effect!");
}

function setToggleQR() {
  if(GM_getValue("QRmode"))
  {
	  GM_setValue("QRmode",false);
	  alert("QR is off");
  }
  else
  {
	  GM_setValue("QRmode",true);
	  alert("QR is on");
  }
}

// main()

GM_registerMenuCommand( "Include link in title (default)", setModeTitleLink );
GM_registerMenuCommand( "Put plain URL into details",  setModeDetailsPlainURL );
GM_registerMenuCommand( "Toggle QR show",  setToggleQR );

var myMonths = new Array();

GM_log("myEbaySite:" + myEbaySite)
if (!myEbaySite) {
	alert("Don't forget to set your ebay site!!!\nIf you don't find your ebay site you can easily add it into the script code");
	return;
} else {
	switch (myEbaySite) {
		// you can correct if necessary this abbreviated monthes names based on ebay translations
		case "www.ebay.it":
			myMonths["gen"] = "01";
			myMonths["feb"] = "02";
			myMonths["mar"] = "03";
			myMonths["apr"] = "04";
			myMonths["mag"] = "05";
			myMonths["giu"] = "06";
			myMonths["lug"] = "07";
			myMonths["ago"] = "08";
			myMonths["set"] = "09";
			myMonths["ott"] = "10";
			myMonths["nov"] = "11";
			myMonths["dic"] = "12";
			break;
		case "www.ebay.fr":
			myMonths["janv"] = "01";
			myMonths["fevr"] = "02";
			myMonths["mars"] = "03";
			myMonths["avril"] = "04";
			myMonths["mai"] = "05";
			myMonths["juin"] = "06";
			myMonths["juil"] = "07";
			myMonths["aout"] = "08";
			myMonths["sept"] = "09";
			myMonths["oct"] = "10";
			myMonths["nov"] = "11";
			myMonths["d\u00e9c"] = "12";
			break;
		case "www.ebay.com":
		case "www.ebay.com.au":
		case "www.ebay.co.uk":
			myMonths["jan"] = "01";
			myMonths["feb"] = "02";
			myMonths["mar"] = "03";
			myMonths["apr"] = "04";
			myMonths["may"] = "05";
			myMonths["jun"] = "06";
			myMonths["jul"] = "07";
			myMonths["aug"] = "08";
			myMonths["sep"] = "09";
			myMonths["oct"] = "10";
			myMonths["nov"] = "11";
			myMonths["dec"] = "12";
			break;
		case "www.ebay.de":
			myMonths["jan"] = "01";
			myMonths["feb"] = "02";
			myMonths["m\u00e4r"] = "03";
			myMonths["mrz"] = "03";
			myMonths["apr"] = "04";
			myMonths["may"] = "05";
			myMonths["jun"] = "06";
			myMonths["jul"] = "07";
			myMonths["aug"] = "08";
			myMonths["sep"] = "09";
			myMonths["okt"] = "10";
			myMonths["nov"] = "11";
			myMonths["dez"] = "12";
			break;
	}
}

var Elem=document.getElementById('vi-lkhdr-itmTitl');
var title = Elem.innerHTML;
title=title.replace(/<([^>]*)>/g, "");


GM_log("title: "+title);
GM_log("url: "+document.location);

var details;

switch(GM_getValue("mode","title_link")) {
 case "title_link":
   title = '&lt;a href="'+document.location+'"&gt;'+title+'&lt;/a&gt;';
   details = '';
   break;
 case "details_plain_url":
   title = title;
   details = document.location;
   break;
}

title = encodeURIComponent(title);
details = encodeURIComponent(details);


var endtime;

//Endtime = getXP("//SPAN[@id='DetailsTimeLeft']");
endtime = getXP("//SPAN[@class=\"vi-tm-left\"]");
endtime = endtime.snapshotItem(0);

var now = new Date();
var thisYear = 1900 + now.getYear()
var prevYear = 1900 + now.getYear() -1
var nextYear = 1900 + now.getYear() +1

endtime.textContent = endtime.textContent.replace(thisYear, thisYear + ' ')
endtime.textContent = endtime.textContent.replace(prevYear, prevYear + ' ')
endtime.textContent = endtime.textContent.replace(nextYear, nextYear + ' ')

GM_log("endtime: " + endtime.textContent);

var parseddate;
parseddate = endtime.textContent.match(/(\d+).(\d+).(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);

if(!parseddate) {
  parseddate = endtime.textContent.match(/(\d+)-([a-zA-Z]+)-(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
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

// www.ebay.co.uk
if(!parseddate) {
  parseddate = endtime.textContent.match(/(\d+)\s([a-zA-Z]+),\s+(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
 }

// www.ebay.it 
if(!parseddate) {
  parseddate = endtime.textContent.match(/(\d+)\s([a-zA-Z]+)\s(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
}

// www.ebay.fr
if(!parseddate) {
	//alert(endtime.textContent);
  parseddate = endtime.textContent.match(/(\d+)\s([a-z\u00e9A-Z]+)[.]?\s(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
}

// www.ebay.de
if(!parseddate) {
  parseddate = endtime.textContent.match(/(\d+)[.]?\s([a-z\u00fc\u00f6\u00e4A-Z]+)[.]?\s(\d+)\s+(\d+):(\d+):(\d+)\s+(\w+)/);
}

if(!parseddate) {
//	alert("no parsdate");
//  var message = document.createElement("DIV");
//  message.innerHTML = "<b style=\"color:red\">userscript: could not parse end date</b>";
//  endtime.parentNode.insertBefore(message,endtime.nextSibling);
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

if (location.hostName = myEbaySite)
	datestring = parseddate[3]+"/"+myMonths[parseddate[2].toLowerCase()]+"/"+parseddate[1]
  +" "
  +parseddate[4]+":"+parseddate[5]+":"+parseddate[6]
  +" "
  +parseddate[7];


GM_log("datestring: " + datestring);

var date = new Date(datestring);

if(! date.valueOf()) {
//  var message = document.createElement("DIV");
//  message.innerHTML = "<b style=\"color:red\">userscript: could not parse datestring</b>";
//  endtime.parentNode.insertBefore(message,endtime.nextSibling);
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

if(GM_getValue("QRmode"))
{
 	newButton.innerHTML=newButton.innerHTML+' <img src="http://qrl8.de/qr.php/?s=3&op=0&d=BEGIN%3AVEVENT%0ASUMMARY%3AeBay%0ADTSTART%3A'
 	+googledate
 	+'%0ADESCRIPTION%3A'
 	+title
 	+'%0AEND%3AVEVENT%0A">';
}

endtime.parentNode.insertBefore(newButton, endtime.nextSibling);
