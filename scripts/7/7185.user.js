// ==UserScript==
// @name GCTS Library Books on Amazon
// @namespace http://www.gordonconwell.edu/library
// @description Displays Gordon-Conwell library holdings for a book listed on Amazon.
// @include *.amazon.*
// ==/UserScript==

// This script should work with any library system that 
// uses The Library Corporation's (TLC's)
// "Library.Solution" integrated library system.
// The script was written by Justin Duewel-Zahniser 
// (http://justindz.blogspot.com/)
// for Gordon-Conwell Theological Seminary Libraries.
// Feel free to modify the code for your own library.
// Questions? Contact the GCTS Library reference desk at:
// http://www.gordonconwell.edu/library/reference.php
// January 29, 2008

var url = 'http://onlinecatalog.gcts.edu/TLCScripts/interpac.dll?GetAvailability&Type=ISBN&IdList=';
var detail = 'http://onlinecatalog.gcts.edu/TLCScripts/interpac.dll?LabelDisplay&config=pac&recordnumber=';
var library = 'GCTS Libraries';
var isbn;

(function() {
try
{
//isbn = window.location.href.match(/\/(\d{7,9}[\d|X])/)[1];
isbn = document.getElementsByName("ASIN")[0].getAttribute("value");
}
catch (e)
{
isbn = document.getElementsByName("ASIN")[0].getAttribute("value");
GM_log(e);
return;
}

var title = document.evaluate("//div[@class='buying']/b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (!title)
{
return;
}

GM_xmlhttpRequest
({
method:'GET',
url: url + isbn,
onload:function(results)
{
var parser = new unsafeWindow.DOMParser;
var page = parser.parseFromString(results.responseText, "text/xml");
var available = 0;
var total = 0;
var t = page.getElementsByTagName("t");
var recordNumber = t[0].getAttribute("rn");

if (page.getElementsByTagName("lo").length > 0)
{
var lo = page.getElementsByTagName("lo");
for (i = 0; i < lo.length; i++)
{
available += parseInt(lo[i].getAttribute("ac"));
total += parseInt(lo[i].getAttribute("tc"));
}
var div = title.parentNode;
var br = document.createElement('br');
div.appendChild(br);
var link = document.createElement('a');
link.setAttribute('title', 'check availability');
link.setAttribute('href', detail + recordNumber);
var insert = document.createElement('span');
insert.setAttribute('class', 'alertgreen');
var summary = document.createTextNode(available + " of " + total + " available at " + library);
insert.appendChild(summary);
link.appendChild(insert);
div.appendChild(link);
div.appendChild(br);
}
}
});
})();