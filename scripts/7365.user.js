// A rough and ready script that adds links to stock symbols displayed on a variety of
// useful pages on the RTTNews web site.
// author: Chris Paulse
//
// ==UserScript==
// @name           Extend RTTNews
// @namespace      http://mywebsite.com/myscripts
// @description    add links for tickers on RTTNews Page
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=upgrades
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=dngrades
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=coverage
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=reiterate
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=calendar
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=stocks
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=dividends
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=psurprise
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=nsurprise
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=posearn
// @include        http://www.rttnews.com/marketinfo/g_minfo.asp?page=negearn
// ==/UserScript==

var tempElement = null;
var allFonts = document.getElementsByTagName("FONT");
var searchTerm = null;
var column = null;

var strURL = document.URL;

var re1 = /(surprise|dividends)/;
var re2 = /(page=stocks|posearn|negearn)/;
var re3 = /(coverage|reiterate|grades)/;
var re4 = /page=calendar/;

var result1 = re1.test(strURL);
var result2 = re2.test(strURL);
var result3 = re3.test(strURL);
var result4 = re4.test(strURL);

if (result1)
{
	searchTerm = "Symbol";
	column = 2;
}
else if (result2 || result3 || result4)
{
	
	searchTerm = "Chart";
	if (result2)
	{
		column = 1;
	}
	else if (result3)
	{
		column = 2;
	}
	else if (result4)
	{
		column = 3;
	}
}

for (var i = 0; i < allFonts.length; i++)
{
	if (allFonts[i].innerHTML == searchTerm)
	{
		tempElement = allFonts[i];
		break;
	}
}

var theTable = tempElement.parentNode.parentNode.parentNode.parentNode;

var currentRow = null;
var symbol = null;

var linkText = null;

for (i = 1; i < theTable.rows.length; i++)
{
	currentRow = theTable.rows[i];
	symbol = currentRow.cells[column].childNodes[0].innerHTML;
	linkText = "<a href=\"http://finance.yahoo.com/q?s=" + symbol + "&x=0&y=0\"  target=\"_new\" >" + symbol + "</a>";
	currentRow.cells[column].childNodes[0].innerHTML = linkText;
}