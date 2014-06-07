// ==UserScript==
// @name        Bitstamp TickThis
// @namespace   bitcoin
// @description Takes the plain text Ticker API of Bitstamp, and places the current BTC Price as the Title for easier reading while on other tabs. Auto Reloads at 10 second intervals.
// @include     https://www.bitstamp.net/api/ticker/
// @version     1
// ==/UserScript==

//alert(document.body.innerHTML); // -> <pre>{"high": "129.00", "last": "118.38", "bid": "118.38", "volume": "17199.67818287", "low": "101.00", "ask": "118.81"}</pre>

	var timer = 10500;
	//The function that is called when the timer has reached 0
	var timeoutFunc = function()  { 
		location.reload(true);
	};
	//start the timer
	timeout = setTimeout(timeoutFunc, timer);
	
	if (document.body.innerHTML.indexOf('"last"') > -1)
	{
		var thePLoc = document.body.innerHTML.indexOf('"last"')+9;
		var thePLen = (document.body.innerHTML.indexOf('", "bid"') - thePLoc);
		var thePrice = document.body.innerHTML.substr(thePLoc, thePLen);
		document.title = "BTC Price: " + thePrice;

		var theHLoc = document.body.innerHTML.indexOf('"high"')+9;
		var theHLen = (document.body.innerHTML.indexOf('", "last"') - theHLoc);
		var theHigh = document.body.innerHTML.substr(theHLoc, theHLen);
	
		var theLLoc = document.body.innerHTML.indexOf('"low"')+9;
		var theLLen = (document.body.innerHTML.indexOf('", "ask"') - theLLoc);
		var theLow = document.body.innerHTML.substr(theLLoc, theLLen);
	}