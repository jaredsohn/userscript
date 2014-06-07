// ==UserScript==
// @name           Google Calendar ebay reminder
// @description    "Add to Google Calendar" buttons on ebay article pages, use at own risk!
// @namespace      tag:tilman.vogel@web.de,2008:userscripts
// @include        http://cgi.ebay.*
// ==/UserScript==

// Dear user,
//
// if the ebay site of your interest uses month names (not numbers)
// which are different from the English ones, you'll need to put in
// some code to translate those
//
// also many timezones are still missing but easily put into the table
// below
//
// Have fun!


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



function setModeTitleLink() {
  GM_setValue("mode","title_link");
  alert("Please reload page for the change to take effect!");
}

function setModeDetailsPlainURL() {
  GM_setValue("mode","details_plain_url");
  alert("Please reload page for the change to take effect!");
}

// main()

GM_registerMenuCommand( "Include link in title (default)", setModeTitleLink );
GM_registerMenuCommand( "Put plain URL into details",  setModeDetailsPlainURL );


var title = getXP("//H1[@class='itemTitle']");
title = title.snapshotItem(1);

GM_log("title: "+title.textContent);
GM_log("url: "+document.location);

var details;

switch(GM_getValue("mode","title_link")) {
 case "title_link":
   title = '&lt;a href="'+document.location+'"&gt;'+title.textContent+'&lt;/a&gt;';
   details = '';
   break;
 case "details_plain_url":
   title = title.textContent;
   details = document.location;
   break;
}

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
