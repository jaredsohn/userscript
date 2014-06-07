// --------------------------------------------------------------------
// ==UserScript==
// @name          GM Script for Yahoo Finance
// @namespace     http://nanlionline.com/greasemonkey/fn
// @description   AJAX Yahoo Finance. Show real time stock price on Yahoo Finance quote page. Try 'http://finance.yahoo.com/q?s=GOOG' to see the effect.
// @include       http://finance.yahoo.com/q?s=* 
// ==/UserScript==

/*
Copyright (C) 2005 Nan Li

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/

function getGrid()
{

	//table->tbody(1)->tr->td->table(3)->->tbody->tr->td(1)->table->tbody->tr
    //->td->table->tbody(1)->tr->td(3)->big->b
	var beforeGrid = document.getElementById('yfncsumtab')
			.childNodes[1]
			.childNodes[0]
			.childNodes[0]
			.childNodes[3]
	;
		;
	//the following if-else is a hack to accommodate the layout change happening after hours
	if ( beforeGrid.childNodes.length == 2 ) {
		beforeGrid = beforeGrid.childNodes[1].childNodes[2];
	} else {
		beforeGrid = beforeGrid.childNodes[0].childNodes[0];
	}	

	var grid = beforeGrid
			.childNodes[1]
			.childNodes[0]
			.childNodes[0]
			.childNodes[0]
			.childNodes[0]
			.childNodes[0]
	;
	return grid;
}

function constChange()
{
	var grid = getGrid();
	var priceHeader= grid 
		.childNodes[1]
		.childNodes[0]
		.childNodes[1]
	;

	priceHeader.innerHTML = priceHeader.innerHTML + "(RT)";

	var timeHeader= grid 
		.childNodes[1]
		.childNodes[2]
		.childNodes[1]
	;

	timeHeader.innerHTML = timeHeader.innerHTML + "(RT)";

}

function getPriceVal()
{
	var priceVal= getGrid()
		.childNodes[1]
		.childNodes[0]
		.childNodes[3]
		.childNodes[0]
		.childNodes[0]
	;
	return priceVal;
}

function getTimeVal()
{
	var timeVal= getGrid()
		.childNodes[1]
		.childNodes[2]
		.childNodes[3]
	;
	return timeVal;

}

function initChange()
{
	getPriceVal().innerHTML = "TBD";
	getTimeVal().innerHTML = "TBD";
}

function makeAjaxCallback( requestURL, priceVal, timeVal )
{  
   return function( xmlHttpResponse )
   {
		var msg = xmlHttpResponse.responseText;

		var priceStart = msg.lastIndexOf( "<b>" ) + 3;
		var priceEnd = msg.lastIndexOf( "</b>" );
		var price = msg.substring( priceStart, priceEnd );
		priceVal.innerHTML = price;
	
		var timeStart = 1;
		var timeEnd = msg.lastIndexOf( "-" );
		var time = msg.substring( timeStart, timeEnd );
		timeVal.innerHTML = time;

		GM_xmlhttpRequest( { method:'GET', url: requestURL, onload:makeAjaxCallback(requestURL, priceVal, timeVal ) } );
  };
}

function makeRequestURL()
{
	var url= new String( window.location );
	var symbol = url.substring( url.lastIndexOf("?s=") + 3, url.length );
	var requestURL = 'http://finance.yahoo.com/d/quotes.csv?s=' + symbol + '&f=k1&e=.csv';
	return requestURL;
}


function main()
{
	constChange();
	initChange();
	
	var priceVal = getPriceVal();
	var timeVal = getTimeVal();
	var requestURL = makeRequestURL();
	GM_xmlhttpRequest( { method:'GET', url:requestURL, onload:makeAjaxCallback(requestURL, priceVal, timeVal) });

}

main();





