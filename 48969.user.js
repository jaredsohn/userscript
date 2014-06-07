// ==UserScript==
// @name           DCPL Finder
// @namespace      DCPL
// @description    Finds Books in the DC Public Library
// @include        http://www.amazon.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$("table.buyingDetailsGrid tr:first").insertBefore("<tr><td>hello world</td></tr>");

var isbn = extractAmazonISBN();

var availability = getAvailability(isbn);

showAvailability(availability);

function extractAmazonISBN() {
  var isbn10;
  var isbn13;
  
  $('td.bucket div.content ul li').each(function() { // need a better selector for product info
  	var txt = $(this).text();
  	if (txt.substring(0,7) == "ISBN-10") { isbn10 = txt.substring(9); return; }
  	if (txt.substring(0,7) == "ISBN-13") { isbn13 = txt.substring(9); return; }
  });
  
  if (isbn13) 
  	return isbn13;
  else if (isbn10)
  	return isbn10;  
}

function showAvailability(availabilityData) {
}

function getAvailability(isbn) {
	/*
	$.get("http://citycat.dclibrary.org/MyAccount/apisvc.php", { service: "search", query: isbn }, function(data) {
		alert(data);
	});
	*/
	return null;
}