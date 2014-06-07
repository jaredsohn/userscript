// ==UserScript==
// @name           Google Finance - External Links
// @namespace      http://userscripts.org/users/36992/scripts
// @description    Links to stock quotes and news on websites like Yahoo, MSN and others.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.04 : 04-May-2009
// @include        http://finance.google.com/*
// @include        http://www.google.com/finance*
// ==/UserScript==
/*
Credits
============
(none)
============

About
============
Links are added under the main inputbox
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.04 : 04-May-2009 Updated access to object to which we insert the links.
0.04 : 04-May-2009 Updated @include with www.google.com.
0.04 : 04-May-2009 Updated @namespace.
0.03 : 21-Sep-2008 Added MarketWatch
0.02 : 21-Sep-2008 Added a pipe after bigcharts
0.01 : 21-Sep-2008 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
-------------
I was trying to somehow use the Financial Gadgets within GreaseMonkey...but I gave up. Maybe someone can else figure it out...
http://code.google.com/apis/finance/docs/finance-gadgets.html
============


*/

( function () {

var title = document.title
	if (title.indexOf(' - ') != -1) {
		var symbol = title.substring(0, title.indexOf(' - ')).toLowerCase()
	

  var customhtml = 
  "<a href=http://bigcharts.marketwatch.com/quickchart/quickchart.asp?symb=" + symbol + "&sid=0&o_symb=ge&freq=1&time=8&x=47&y=14>bigcharts</a> | " +
  "<a href=http://www.insidercow.com/history/company.jsp?company=" + symbol + ">insidercow</a> | " +
  "<a href=http://www.marketwatch.com/quotes/" + symbol + ">marketwatch</a> | " +
  "<a href=http://www.mffais.com/" + symbol + ".html>mffais</a> | " +
  "<a href=http://moneycentral.msn.com/detail/stock_quote?Symbol=" + symbol + ">msn</a> | " +
  "<a href=http://msncaps.fool.com/Ticker/" + symbol + ".aspx>fool</a> | " +


  //no pipe after this one
  "<a href=http://finance.yahoo.com/q?s=" + symbol + ">yahoo</a>" +
  
  
  "";

  tds=document.getElementById('outer-wrapper')
  tds.innerHTML = customhtml + '<br>' + tds.innerHTML
  }
  
})();


