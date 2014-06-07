// ==UserScript==
// @name           Google Finance - External Links XP
// @namespace      http://userscripts.org/users/81393
// @description    Links to stock quotes and news on websites like Yahoo, MSN and others.
// @author         Chuckdaddy; credit to Kwame Jeffers aka LordSnooze for orignal script
// @version        1.1 : 27-Apr-09
// @include        http://finance.google.com/*
// @include        http://www.google.com/finance*
// ==/UserScript==
/*

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
1.0 : 20-Feb-2009 Initial release
============

Known Issues
-------------
(none)
============

*/

( function () {

var title = document.title
	if (title.indexOf(' - ') != -1) {
		var symbol = title.substring(0, title.indexOf(' - ')).toLowerCase()
	

  var customhtml = 

  "<a href=http://moneycentral.msn.com/investor/invsub/results/statemnt.aspx?Symbol=" + symbol + "&stmtView=Ann>msn</a> | " +

  "<a href=http://finance.yahoo.com/q/ks?s=" + symbol + ">yahoo</a> | " +

  "<a href=http://www.marketwatch.com/tools/quotes/news.asp?symb=" + symbol + "&doctype=2007>press releases</a> | " +

  "<a href=http://seekingalpha.com/symbol/" + symbol + "/transcripts>transcripts</a> | " +

  "<a href=http://www.dividendinvestor.com/?symbol=" + symbol + ">dividends</a> | " +

  "<a href=http://www.sec.gov/cgi-bin/browse-edgar?company=&match=&CIK=" + symbol + "&filenum=&State=&SIC=&owner=include&action=getcompany>sec</a> | " +

  "<a href=http://cxa.marketwatch.com/finra/BondCenter/SearchResult.aspx?q=" + symbol + ">finra</a> | " +

  "<a href=http://www.moodys.com/moodys/cust/qcksearch/qcksearch_search_result.asp?searchIdent=qcksearch&startkey=0&search=4&searchQuery=" + symbol + ">moody's</a> | " +

  "<a href=http://www.insidercow.com/history/company.jsp?company=" + symbol + ">insidercow</a> | " +

  "<a href=http://www.mffais.com/" + symbol + ".html>mffais</a> | " +

  "<a href=http://msncaps.fool.com/Ticker/" + symbol + ".aspx>fool</a> | " +

  "<a href=http://www.gurufocus.com/fair_value_dcf.php?symbol=" + symbol + ">dcf</a> | " +

  //no pipe after this one

  
  "";

  tds=document.getElementById('searchbox').wrappedJSObject.parentNode.parentNode;
  tds.innerHTML = tds.innerHTML.replace('Example: "CSCO" or "Google"',customhtml)
  }
  
})();