// ==UserScript==
// @name           GameKnot - Predict end of tournament round
// @namespace      maeki.org
// @description    Roughly predict when a tournament round will be 99% completed
// @include        http://gameknot.com/ttable.pl?*
// ==/UserScript==

var headingDiv = document.getElementsByClassName('hdr_section')[0];
var headingText = headingDiv.nextSibling.textContent;
var parsed = headingText.match(/(\d\d-\w\w\w-\d\d), (\d+)% complete/);
var startDateString = parsed[1];
var completePercent = parsed[2];
var parsedDate = startDateString.match(/(\d\d)-(\w\w\w)-(\d\d)/);
var startDate = new Date(parsedDate[2]+' '+parsedDate[1]+', 20'+parsedDate[3]);
var tourneyDuration;
var today = new Date();
var endDate, endDateString;
if (startDate.getFullYear()) {
  tourneyDuration = today - startDate;
  var fullDuration = tourneyDuration / (completePercent / 100);
  endDate = new Date(startDate.getTime()+fullDuration*.99);
  endDateString = endDate.toLocaleDateString();
 }

var completeTextNode = headingDiv.nextSibling.childNodes[4];
var newElem = document.createElement('span');
newElem.id = 'prediction_text';
newElem.textContent = ', predicted 99% completion: '+endDateString;
completeTextNode.parentNode.insertBefore(newElem, completeTextNode.nextSibling);