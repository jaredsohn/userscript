// ==UserScript==
// @name           Pipermail Navigation Links
// @namespace      http://ashsong.net/userscripts
// @description    Add forward and backward by-month links to pipermail archives.
// @include        *pipermail*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function deref(snapshot) {
  if (snapshot.snapshotLength != 1)
  {
     error("Derefing invalid snapshot!");
  } else {
    return snapshot.snapshotItem(0);
  }
}

function xpath_deref(query) {
  return deref(xpath(query));
}

var h1 = xpath_deref('//body/h1');
var data = h1.innerHTML.split(' ');
var month = data[0];
var year = parseInt(data[1]);

prevMonths = {
  "January" : "December",
  "February" : "January",
  "March" : "February",
  "April" : "March", 
  "May" : "April",
  "June" : "May",
  "July" : "June",
  "August" : "July",
  "September" : "August",
  "October" : "September",
  "November" : "October",
  "December" : "November"
};

nextMonths = {
  "January" : "February",
  "February" : "March",
  "March" : "April",
  "April" : "May", 
  "May" : "June",
  "June" : "July",
  "July" : "August",
  "August" : "September",
  "September" : "October",
  "October" : "November",
  "November" : "December",
  "December" : "January"
};

var nextMonth = nextMonths[month];
var prevMonth = prevMonths[month];
var prevYear = year;
var nextYear = year;

if(month == "December")
{
  nextYear = year + 1;
}

if(month == "January")
{
  prevYear = year - 1;
}

var baseLink = window.location.href;

var nextHref = baseLink.replace(year + "-" + month, nextYear + "-" + nextMonth);
var prevHref = baseLink.replace(year + "-" + month, prevYear + "-" + prevMonth);

var dates = xpath("//a[@href='date.html#start']");
for(i = 0; i < dates.snapshotLength; i++)
{
  var d = dates.snapshotItem(i);
  var prevLink = document.createElement('a');
  prevLink.href = prevHref;
  prevLink.innerHTML = '[ prev month ]';

  var nextLink = document.createElement('a');
  nextLink.href = nextHref;
  nextLink.innerHTML = '[ next month ]';
  
  d.parentNode.insertBefore(nextLink, d.nextSibling);
  d.parentNode.insertBefore(prevLink, d.nextSibling);
  d.parentNode.insertBefore(document.createTextNode(' '), prevLink);
  d.parentNode.insertBefore(document.createTextNode(' '), nextLink);
}
