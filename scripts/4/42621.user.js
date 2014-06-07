// ==UserScript==
// @name           GameKnot player local time
// @namespace      maeki.org
// @description    If player has time zone set, show local time for player
// @include        http://gameknot.com/stats.pl?*
// ==/UserScript==

var allDivs;
allDivs = document.evaluate( "//div[@style='width: 120px; text-align: right; float: left;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var timeZoneDiv = allDivs.snapshotItem(3);
var playerTZ;
var timezones = {
  "United Kingdom ": "0",
  "Italy " : "+1",
  "Sweden " : "+1",
  "Netherlands " : "+1",
  "Germany " : "+1",
  "France " : "+1",
  "Portugal " : "0",
  "Belgium " : "+1",
  "Spain " : "+1",
  "India " : "+5",
  "Ireland " : "0",
  "Romania " : "+2",
  "Israel " : "+2",
  "Bulgaria " : "+2",
  "Brazil " : "-3",
  "South Africa " : "+2",
  "Philippines " : "+8",
  "Finland " : "+2",
  "New Zealand " : "+12",
  "Australia " : "+9",
  "Mexico " : "-7",
  "Croatia " : "+1",
  "Poland " : "+1",
  "Greece " : "+2",
  "Slovenia " : "+1",
  "Switzerland " : "+1",
  "Argentina " : "-3",
  "Turkey " : "+2",
  "Norway " : "+1",
  "Denmark " : "+1",
  "Iceland " : "0",
  "Hungary " : "+1",
  "Malaysia " : "+8",
  "Czech Republic " : "+1",
  "Austria " : "+1",
  "Egypt " : "+2",
  "Ukraine " : "+2",
  "Chile " : "-4",
  "Indonesia " : "+8",
  "Slovakia " : "+1",
  "Latvia" : "+2",
  "Lithuania " : "+2",
  "Estonia " : "+2",
  "Singapore " : "+8",
  "Colombia " : "-5",
  "Japan " : "+9",
  "Zimbabwe " : "+2",
};


// Test if GMT
if (timeZoneDiv.nextSibling.textContent.length == 4)
  playerTZ = '0';
 else if (timeZoneDiv.nextSibling.textContent.length == 1) {
   // Time zone is not set, try to guess from country
   var countrystring = allDivs.snapshotItem(2).nextSibling.textContent.match(/[a-zA-Z ]+/).toString();
   playerTZ = timezones[countrystring];
 } 
 else
  playerTZ = timeZoneDiv.nextSibling.textContent.match(/GMT([+-][0-9][0-9]?)/)[1];
if (playerTZ) {
  var kello = new Date();
  var time = kello.getTime();
  time = time+(kello.getTimezoneOffset()*60000);
  time = time + parseInt(playerTZ)*3600000;
  kello = new Date(time);
  var timestring = kello.toLocaleTimeString();
  timeZoneDiv.textContent = 'Local time: ';
  timeZoneDiv.nextSibling.textContent = '';

  var newElement = document.createElement('div');
  newElement.innerHTML = '&nbsp;' + timestring;
  timeZoneDiv.parentNode.insertBefore(newElement, timeZoneDiv.nextSibling);
 }
