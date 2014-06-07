// ==UserScript==
// @name           last.fm event to Google Calendar
// @namespace      tag:tilman.vogel@web.de,2007:userscripts
// @description    Adds Google Calendar buttons to last.fm events
// @include        http://www.lastfm.*/event/*
// @include        http://www.last.fm/event/*
// ==/UserScript==


function getXP(q) {
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function complain(s) {
   var message = document.createElement("DIV");
   message.innerHTML = "<b style=\"color:red\">userscript: "+s+"</b>";
   inject(message);
   return -1;
}

function inject(e) {
  e.style.marginBottom='3px';
  insertspot.appendChild(e);
}

function try_to_find(p, m) {
  var res = getXP(p);
  if(res.snapshotLength)
    return res.snapshotItem(0).textContent;
  return "";
}

function foundC(p, c) {
  var res = getXP(p);
  if(!res.snapshotLength) {
    complain(c+" not found");
    return undefined;
  }
  return res.snapshotItem(0);
}

function found(p) {
  var res = getXP(p);
  if(!res.snapshotLength)
    return undefined;
  return res.snapshotItem(0);
}

function stripWS(s) {
  s = s.replace(/^\s+/,"");
  return s.replace(/\s+$/,"");
}

function LeadingZeroes(n,l) {
  n = String(n);
  while(n.length < l)
    n = "0"+n;
  return n;
}


// main()

var insertspot = getXP("//DIV[@id='eventTopBox']");
if(!insertspot.snapshotLength) {
  GM_log("insert spot not found");
  return;
}

insertspot = insertspot.snapshotItem(0);

var eventtime = foundC("//ABBR[@class='dtstart']", "event time");
if(eventtime === undefined)
  return;

GM_log("eventtime: " + eventtime);

var title = foundC("//H3[@class='summary']","title");

if(title === undefined)
  return;

GM_log("title: "+title.textContent);
GM_log("url: "+document.location);

var link = encodeURIComponent(title.textContent+' &lt;a href="'+document.location+'"&gt;link&lt;/a&gt;');

GM_log("link: "+link);

var description = title.textContent;
var companion = found("//H5[@class='subhead']");

if( companion !== undefined ) {
  companion = stripWS(companion.textContent);
  companion = companion[0].toLowerCase() + companion.slice(1);
  description += " " + companion;
}

var lineup = found("//DIV[@id='lineup']/P");
if( lineup !== undefined ) {
  lineup = stripWS(lineup.textContent);
  description = lineup;
}


var venue = try_to_find("//A[@class='fn org url']");
var street = try_to_find("//SPAN[@class='street-address']");
var postal_code = try_to_find("//SPAN[@class='postal-code']");
var city = try_to_find("//A[@class='locality']");
var country = try_to_find("//A[@class='country-name']");

var place = "";

if(venue)
  place += venue;
if(street)
  place += ", " + street;
if(city) {
  place += ", ";
  if(postal_code)
    place += postal_code + " ";
  place += city;
 }
if(country)
  place += ", " + country;


var parseddate = eventtime.title.match(/(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)Z/);

if(!parseddate) 
  return complain("could not parse date");

var datestring = parseddate[1]+"/"+parseddate[2]+"/"+parseddate[3]
   +" "
   +parseddate[4]+":"+parseddate[5]+":00";

GM_log("datestring: " + datestring);

var date = new Date(datestring);

if(! date.valueOf()) {
  complain("could not parse datestring");
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

// assume 3 hour duration
date.setTime(date.getTime()+ 180*60*1000);

var googledate2 = String(date.getUTCFullYear())
  + LeadingZeroes(date.getUTCMonth()+1,2) 
  + LeadingZeroes(date.getUTCDate(),2)
  + "T"
  + LeadingZeroes(date.getUTCHours(),2)
  + LeadingZeroes(date.getUTCMinutes(),2)
  + LeadingZeroes(date.getUTCSeconds(),2)
  + "Z";

GM_log("googledate: "+googledate+"/"+googledate2);


var newButton = document.createElement("DIV");
newButton.innerHTML 
= '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text='
  + link
  + '&dates='
  + googledate
  + "/"
  + googledate2
  + '&details='
  + description
  +'&location='
  + place
  +'&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button1.gif" border=0></a>';

inject(newButton);

