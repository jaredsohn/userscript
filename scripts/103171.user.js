// ==UserScript==
// @name        MouseHunt Auto
// @namespace   
// @description Perform ____ automatically.
// @include     http://www.mousehuntgame.com/*
// ==/UserScript==

// config
var alert_user = true;		// pop up upon king reward
var reload_enabled = true;  // option enabling page reload
var reload_alert = true;	// alert when reloading
var check_second = 17*60;	// time interval to check if got horn
var reload_timeout = 10;	// time interval to reload upon encountering page load timeout
var max_wait_minute = 20;	// refresh page if horn doesn't appear

// refresh link
var refresh_link = "http://www.mousehuntgame.com/";



// search for elements defined by 'query'
function xpath(query) 
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


// click respective link or button
function click(element)
{
	event = 'click';
	if (document.createEventObject)
	{
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on' + event, evt)
	}
	else
	{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
}


// read the string representation of number (5,000 -> 5000)
function parseNumber(string)
{
	string = string.replace(/,/g, "");
	return parseInt(string);
}


function reloadPage()
{
	if(reload_enabled)
	{
		if(reload_alert) { alert("reloading in " + reload_timeout + " seconds!"); }
		window.setTimeout(function() 
		{ 
			window.location.href = refresh_link
		}, reload_timeout * 1000);
	}
}


// run 
function run(count) 
{
	if(count > (max_wait_minute * 60 / check_second)) { reloadPage(); }
	
		// check king reward
		var tabbarContent2 = document.getElementById('tabbarContent2_0');;
		if(tabbarContent2)
		{
			var kingRewardText = (tabbarContent2.textContent).substr(0,18) ; //"Claim Your Reward!"
			if(kingRewardText == "Claim Your Reward!")
			{
				// king reward present
				GM_log("Please claim your King Reward before continue.");
				if(alert_user) { alert("Please claim your King Reward before continue."); }
				return;
			}
		}
		

	// sound the horn if it appears
	var hornImage = document.getElementById('hornArea').childNodes[1].childNodes[0].childNodes[0];
	if((hornImage.clientHeight == 58) && (hornImage.clientWidth == 400))
	{
		 click(hornImage);
	}
	
	count++;
	window.setTimeout(function() { run() }, check_second * 1000);
}


// script is inactive when King Reward is present


// start after page load
window.addEventListener(
'load',
function() { run(0); },
true);




