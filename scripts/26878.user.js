// Thanks very much to Mikado and sizzlemctwizzle for helping me
// get this thing working, as it appears my Javascript skills are
// somewhat lacking, at least in the XML department.
// 
// ==UserScript==
// @name           Fanficauthors.net Fic Listing
// @namespace      FFA
// @description    Replaces the left-hand panel of authors with the last 12 fics uploaded to the site.
// @include        http://fanficauthors.net/*
// @include        http://www.fanficauthors.net/*
// ==/UserScript==

var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

GM_xmlhttpRequest({
 method: 'GET',
 url: 'http://www.fanficauthors.net/rss.php',
 onload: function(responseDetails) {
  parser = new DOMParser(),
  dom    = parser.parseFromString(responseDetails.responseText,"text/xml"),
  items  = dom.getElementsByTagName('item');

  menuString = "";

  for (var i=0; i<6; i++) {
   itemLink   = items[i].getElementsByTagName('link')[0].textContent;
   itemName   = items[i].getElementsByTagName('title')[0].textContent.split(" - ");
   itemAuthor = itemName[0];
   itemName   = itemName[1];
   itemDate   = items[i].getElementsByTagName('pubDate')[0].textContent.split(" ");
   itemDate   = getMonthNum(itemDate[2]) +  " " + itemDate[1];

   menuString += itemDate + " ~ " + itemAuthor + " ~ " + itemName + " ~ " + itemLink;

   if (i != 5) {menuString += " | ";}
  }

  GM_setValue("ffaNormal",menuString);
 }
});

GM_xmlhttpRequest({
 method: 'GET',
 url: 'http://www.fanficauthors.net/nsns_rss.php',
 onload: function(responseDetails) {
  parser = new DOMParser(),
  dom    = parser.parseFromString(responseDetails.responseText,"text/xml"),
  items  = dom.getElementsByTagName('item');

  menuString = "";

  for (var i=0; i<6; i++) {
   itemLink   = items[i].getElementsByTagName('link')[0].textContent;
   itemName   = items[i].getElementsByTagName('title')[0].textContent.split(" - ");
   itemAuthor = itemName[0];
   itemName   = itemName[1];
   itemDate   = items[i].getElementsByTagName('pubDate')[0].textContent.split(" ");
   itemDate   = getMonthNum(itemDate[2]) + " " + itemDate[1];

   menuString += itemDate + " ~ " + itemAuthor + " ~ " + itemName + " ~ " + itemLink + " | ";
  }

  GM_setValue("ffaNSNS",menuString);
 }
});

function changePanel() {
 ficsNormal = GM_getValue("ffaNormal").split(" | ");
 ficsNSNS   = GM_getValue("ffaNSNS").split(" | ");
 fics       = ficsNormal.concat(ficsNSNS);
 fics.sort(sortNumber);

 ficsText = "<u><b>Updated Fics:</b></u><p>";

 for (var i=0; i<12; i++) {
  fic       = fics[i].split(" ~ ");
  ficDate   = fic[0].split(" ");
  ficDate   = months[parseInt(ficDate[0])] + " " + ficDate[1];
  ficsText += "<b>" + fic[1] + "</b> (" + ficDate + ")<br><a href=\"" + fic[3] + "\" title=\"" + fic[2] + "\">" + fic[2] + "</a><p>";
 }

 document.getElementById('quicklinks').innerHTML = ficsText;
}

function sortNumber(a,b) {
 return b-a;
}

function getMonthNum(monthName) {
 for (var i=0; i<12; i++) {
  if (monthName == months[i]) {
   number = i;
   number = number.toString();

   if (number.length == 1) {number = "0" + number;}

   return number;
  }
 }
}

window.setTimeout(changePanel,1000);