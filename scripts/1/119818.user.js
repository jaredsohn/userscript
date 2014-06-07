// ==UserScript==
// @name          TP-Link Router Traffic Statistics Correction
// @namespace     http://slohr.de/
// @version       1.1
// @description   change traffic statistics for tp-link routers. Displays the Transferrate in KBytes/s and the Received and Sent in Gigabytes (in the Global-Status and Statistics)
// @include       http://10.0.0.1/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright     2011+, Stefan Lohr
// ==/UserScript==

var tableBody = $("td[id='tag_trff_stat']").parent().next().find("tbody");
		
var tableLines = $(tableBody).children();
		
$(tableBody).children().eq(0).children().eq(1).text("Rate (KByte/s)");
$(tableBody).children().eq(0).children().eq(2).text("Received (GBytes)");
$(tableBody).children().eq(0).children().eq(3).text("Sent (GBytes)");
		
		
for(var i=1; i<tableLines.length; i++) {
  var tableLine = $(tableLines).eq(i);

  var contentElement = $(tableLine).children().eq(1); 
  contentElement.text($(contentElement).text()/8);
			
  contentElement = $(tableLine).children().eq(2);
  contentElement.text(($(contentElement).text()/1024/1024).toFixed(4));
			
  contentElement = $(tableLine).children().eq(3);
  contentElement.text(($(contentElement).text()/1024/1024).toFixed(4));
}

var tableBody = $("td[id='tag_srt_rul']").parent().next().find("tbody");
		
var tableLines = $(tableBody).children();

$(tableBody).children().eq(1).children().eq(2).text("GBytes");
$(tableBody).children().eq(1).children().eq(4).text("KBytes");

		
for(var i=2; i<tableLines.length; i++) {
  var tableLine = $(tableLines).eq(i);

  var contentElement = $(tableLine).children().eq(2);
  contentElement.text(($(contentElement).text()/1024/1024/1024).toFixed(4));
			
  contentElement = $(tableLine).children().eq(4);
  contentElement.text(($(contentElement).text()/1024).toFixed(4));
}