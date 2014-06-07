// ==UserScript==
// @name        Muffin's Horn Timer
// @author      Muffin
// @version    	1.31
// @namespace   http://www.mousehuntgame.com/index.php
// @description A horn timer.
// @include		http://mousehuntgame.com/*
// @include		https://mousehuntgame.com/*
// @include		mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// @include		https://www.mousehuntgame.com/*
// @include		http://apps.facebook.com/mousehunt/*
// ==/UserScript==






var hornTimeDelayMin = 0;
var hornTimeDelayMax = 0;

var aggressiveMode = true;

var enableTrapCheck = false;


var trapCheckTimeDiff = 45;


var checkTimeDelayMin = 15;
var checkTimeDelayMax = 120;

var isKingWarningSound = false;


var reloadKingReward = false;

var kingPauseTimeMax = 18000;


var showTimerInTitle = true;

var showTimerInPage = true;


var pauseAtInvalidLocation = false;

var showLastPageLoadTime = true;


var errorReloadTime = 60;


var timerRefreshInterval = 1;






// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.31	";
var fbPlatform = false;
var hiFivePlatform = false;
var mhPlatform = false;
var hornTime = 900;
var hornTimeDelay = 0;
var checkTimeDelay = 0;
var isKingReward = false;
var lastKingRewardSumTime;
var kingPauseTime;
var baitQuantity = -1;
var huntLocation;
var currentLocation;
var today = new Date();
var checkTime = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
today = null;
var hornRetryMax = 10;
var hornRetry = 0;

// element in page
var titleElement;
var nextHornTimeElement;
var checkTimeElement;
var kingTimeElement;
var lastKingRewardSumTimeElement;
var optionElement;
var travelElement;

// start executing script
exeScript();

function exeScript()
{
	// check the trap check setting first
	if (trapCheckTimeDiff == 60)
	{
		trapCheckTimeDiff = 00;
	}
	else if (trapCheckTimeDiff < 0 || trapCheckTimeDiff > 60)
	{
		// invalid value, just disable the trap check
		enableTrapCheck = false;
	}
	
	if (showTimerInTitle)
	{
		// check if they are running in iFrame
		if (window.location.href.indexOf("apps.facebook.com/mousehunt/") != -1)
		{
			var contentElement = document.getElementById('iframe_canvas');
			if (contentElement)
			{
				var breakFrameDivElement = document.createElement('div');
				breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
				breakFrameDivElement.innerHTML = "";
				contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
			}
			contentElement = null;
		}
		else if (window.location.href.indexOf("hi5.com/friend/games/MouseHunt") != -1)
		{
			var contentElement = document.getElementById('apps-canvas-body');
			if (contentElement)
			{
				var breakFrameDivElement = document.createElement('div');
				breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
				breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://mousehunt.hi5.hitgrab.com/'>run MouseHunt without iFrame (Hi5)</a> to enable timer on title page";
				contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
			}
			contentElement = null;
		}
	}
	
	// check user running this script from where
	if (window.location.href.indexOf("mousehuntgame.com/canvas/") != -1)
	{
		// from facebook
		fbPlatform = true;
	}
	else if (window.location.href.indexOf("mousehuntgame.com") != -1)
	{
		// from mousehunt game
		mhPlatform = true
	}
	else if (window.location.href.indexOf("mousehunt.hi5.hitgrab.com") != -1)
	{
		// from hi5
		hiFivePlatform = true;
	}
	
	if (fbPlatform)
	{
		if (window.location.href == "http://www.mousehuntgame.com/canvas/" ||
			window.location.href == "http://www.mousehuntgame.com/canvas/#" ||
			window.location.href == "http://www.mousehuntgame.com/canvas/travel.php" ||
			window.location.href == "http://www.mousehuntgame.com/canvas/adversaries.php" ||
                        window.location.href == "http://www.mousehuntgame.com/canvas/?hgref=hgbar&from=mh_live" ||
			window.location.href.indexOf("mousehuntgame.com/canvas/index.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?ref=ts") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?ref=bookmarks") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/inventory.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/shops.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/profile.php?snuid=") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/hunterprofile.php?snuid=") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?code=") != -1)
		{
			// page to execute the script!
		
			// this is the page to execute the script
			if (retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
					
				// start script action
				action();
			}
			else
			{
				// fail to retrieve data, display error msg and reload the page
				document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
				window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
			}
		}
		else
		{
			// not in huntcamp, just show the title of autobot version
			embedTimer(false);
		}
	}
	else if (mhPlatform)
	{
		if (window.location.href == "http://www.mousehuntgame.com/" ||
			window.location.href == "http://www.mousehuntgame.com/#" ||
			window.location.href == "https://www.mousehuntgame.com/" ||
			window.location.href == "http://www.mousehuntgame.com/travel.php" ||
			window.location.href == "http://www.mousehuntgame.com/adversaries.php" ||
                        window.location.href == "http://www.mousehuntgame.com/?hgref=hgbar&from=mh_live" ||
			window.location.href.indexOf("mousehuntgame.com/index.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/?ref=ts") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/?ref=bookmarks") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/inventory.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/shops.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/profile.php?snuid=") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/hunterprofile.php?snuid=") != -1)
		{
			// page to execute the script!
		
			// this is the page to execute the script
			if (retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
					
				// start script action
				action();
			}
			else
			{
				// fail to retrieve data, display error msg and reload the page
				document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
				window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
			}
		}
		else
		{
			// not in huntcamp, just show the title of autobot version
			embedTimer(false);
		}
	}
	else if (hiFivePlatform)
	{
		if (window.location.href == "http://mousehunt.hi5.hitgrab.com/#" ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/?") != -1 ||
			window.location.href == "http://mousehunt.hi5.hitgrab.com/" ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/turn.php") != -1 ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/index.php") != -1)
		{
			// page to execute the script!
		
			// this is the page to execute the script
			if (retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
					
				// start script action
				action();
			}
			else
			{
				// fail to retrieve data, display error msg and reload the page
				document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
				window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
			}
		}
		else
		{
			// not in huntcamp, just show the title of autobot version
			embedTimer(false);
		}
	}
}

function retrieveDataFirst()
{
	var gotHornTime = false;
	var gotPuzzle = false;
	var gotBaitQuantity = false;
	var retrieveSuccess = false;
	
	var scriptElementList = document.getElementsByTagName('script');
	if (scriptElementList)
	{
		var i;
		for (i = 0; i < scriptElementList.length; ++i)
		{
			var scriptString = scriptElementList[i].innerHTML;
			
			// get next horn time
			var hornTimeStartIndex = scriptString.indexOf("next_activeturn_seconds");
			if (hornTimeStartIndex >= 0)
			{
				var nextActiveTime = 900;
				hornTimeStartIndex += 25;
				var hornTimeEndIndex = scriptString.indexOf(",", hornTimeStartIndex);
				var hornTimerString = scriptString.substring(hornTimeStartIndex, hornTimeEndIndex);
				nextActiveTime = parseInt(hornTimerString);
				
				hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
				
				if (!aggressiveMode)
				{
					// calculation base on the js in Mousehunt
					//var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
					var additionalDelayTime = 0;
				
					// need to found out the mousehunt provided timer interval to determine the additional delay
					var timerIntervalStartIndex = scriptString.indexOf("hud.timer_interval");
					if (timerIntervalStartIndex >= 0)
					{
						timerIntervalStartIndex += 21;
						var timerIntervalEndIndex = scriptString.indexOf(";", timerIntervalStartIndex);
						var timerIntervalString = scriptString.substring(timerIntervalStartIndex, timerIntervalEndIndex);
						var timerInterval = parseInt(timerIntervalString);
						
						// calculation base on the js in Mousehunt
						//if (timerInterval == 1)
						//{
						//	additionalDelayTime = 2;
						//}
						
						timerIntervalStartIndex = null;
						timerIntervalEndIndex = null;
						timerIntervalString = null;
						timerInterval = null;
					}
					
					// safety mode, include extra delay like time in horn image appear
					hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
					
					additionalDelayTime = null;
				}
				else
				{
					// aggressive mode, no extra delay like time in horn image appear
					hornTime = nextActiveTime + hornTimeDelay;
				}
				
				gotHornTime = true;
				
				hornTimeStartIndex = null;
				hornTimeEndIndex = null;
				hornTimerString = null;
				nextActiveTime = null;
			}
			
			// get is king's reward or not
			var hasPuzzleStartIndex = scriptString.indexOf("has_puzzle");
			if (hasPuzzleStartIndex >= 0)
			{
				hasPuzzleStartIndex += 12;
				var hasPuzzleEndIndex = scriptString.indexOf(",", hasPuzzleStartIndex);
				var hasPuzzleString = scriptString.substring(hasPuzzleStartIndex, hasPuzzleEndIndex);
				isKingReward = (hasPuzzleString == 'false') ? false : true;
				
				gotPuzzle = true;
				
				hasPuzzleStartIndex = null;
				hasPuzzleEndIndex = null;
				hasPuzzleString = null;
			}
			
			// get cheese quantity
			var baitQuantityStartIndex = scriptString.indexOf("bait_quantity");
			if (baitQuantityStartIndex >= 0)
			{
				baitQuantityStartIndex += 15;
				var baitQuantityEndIndex = scriptString.indexOf(",", baitQuantityStartIndex);
				var baitQuantityString = scriptString.substring(baitQuantityStartIndex, baitQuantityEndIndex);
				baitQuantity = parseInt(baitQuantityString);
				
				gotBaitQuantity = true;
				
				baitQuantityStartIndex = null;
				baitQuantityEndIndex = null;
				baitQuantityString = null;
			}
			
			var locationStartIndex;
			var locationEndIndex;
			locationStartIndex = scriptString.indexOf("location\":\"");
			if (locationStartIndex >= 0)
			{
				locationStartIndex += 11;
				locationEndIndex = scriptString.indexOf("\"", locationStartIndex);
				var locationString = scriptString.substring(locationStartIndex, locationEndIndex);
				currentLocation = locationString;
				
				locationStartIndex = null;
				locationEndIndex = null;
				locationString = null;
			}
			
			scriptString = null;
		}
		i = null;
	}
	scriptElementList = null;
	
	if (gotHornTime && gotPuzzle && gotBaitQuantity)
	{
		// get trap check time
		if (enableTrapCheck)
		{
			var today = new Date();
			checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
			checkTime = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
			checkTime += checkTimeDelay;
			today = null;
		}
		
		// get last location
		var huntLocationCookie = getCookie("huntLocation");
		if (huntLocationCookie == " ")
		{
			huntLocation = currentLocation;
			setCookie("huntLocation", currentLocation, 90);
		}
		else
		{
			huntLocation = huntLocationCookie;
			setCookie("huntLocation", huntLocation, 90);
		}
		huntLocationCookie = null;
		
		// get last king reward time
		var lastKingRewardDate = getCookie("lastKingRewardDate");
		if (lastKingRewardDate == " ")
		{
			lastKingRewardSumTime = -1;
		}
		else
		{
			var lastDate = new Date(lastKingRewardDate);
			lastKingRewardSumTime = parseInt((new Date() - lastDate) / 1000);
			lastDate = null;
		}
		
		retrieveSuccess = true;
	}
	else
	{
		retrieveSuccess = false;
	}
	
	// clean up
	gotHornTime = null;
	gotPuzzle = null;
	gotBaitQuantity = null;
	
	return (retrieveSuccess);
}

function retrieveData()
{
	// get next horn time
	hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
	var nextActiveTime;
	var timerInterval;
	try
	{
		// for firefox + greasmonkey
		nextActiveTime = unsafeWindow.user.next_activeturn_seconds;
		timerInterval = unsafeWindow.hud.timer_interval;
		isKingReward = unsafeWindow.user.has_puzzle;
		baitQuantity = unsafeWindow.user.bait_quantity;
		currentLocation = unsafeWindow.user.location;
	}
	catch(e)
	{
		try
		{
			// for opera
			nextActiveTime = user.next_activeturn_seconds;
			timerInterval = hud.timer_interval;
			isKingReward = user.has_puzzle;
			baitQuantity = user.bait_quantity;
			currentLocation = user.location;
		}
		catch(e)
		{
			try
			{
				// chrome
				nextActiveTime = parseInt(getPageVariableForChrome("user.next_activeturn_seconds"));
				timerInterval = parseInt(getPageVariableForChrome("hud.timer_interval"));
				isKingReward = (getPageVariableForChrome("user.has_puzzle").toString() == "false") ? false : true;
				baitQuantity = parseInt(getPageVariableForChrome("user.bait_quantity"));
				currentLocation = getPageVariableForChrome("user.location");
			}
			catch(e)
			{
				// if everything fail... refresh the page...
				window.setTimeout(function () { reloadWithMessage("Fail to retrieve data. Reloading...", false); }, 5000);
			}
		}
	}
	
	if (nextActiveTime == "" || isNaN(nextActiveTime))
	{
		// fail to retrieve data, might be due to slow network
		
		// reload the page to see it fix the problem
		window.setTimeout(function () { reloadWithMessage("Fail to retrieve data. Reloading...", false); }, 5000);
	}
	else
	{
		// got the timer right!
	
		if (!aggressiveMode)
		{
			// calculation base on the js in Mousehunt
			var additionalDelayTime = 0;
			//var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
			//if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1)
			//{
			//	additionalDelayTime = 2;
			//}
			
			// safety mode, include extra delay like time in horn image appear
			hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
			
			additionalDelayTime = null;
		}
		else
		{
			// aggressive mode, no extra delay like time in horn image appear
			hornTime = nextActiveTime + hornTimeDelay;
		}
	}
	nextActiveTime = null;
	timerInterval = null;
	
	// get trap check time
	if (enableTrapCheck)
	{
		var today = new Date();
		checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
		checkTime = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
		checkTime += checkTimeDelay;
		today = null;
	}
}

function action()
{
	if (isKingReward)
	{
		kingRewardAction();
	}
	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
	{
		// update timer
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
		
		if (fbPlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		else if (hiFivePlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		else if (mhPlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		
		displayKingRewardSumTime(null);
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
		displayLocation(huntLocation);
		displayKingRewardSumTime(null);
		
		// pause the script
	}
	else
	{
		// update location
		displayLocation(huntLocation);
	
		var isHornSounding = false;
	
		// check if the horn image is visible
		var headerElement;
		headerElement = document.getElementById('header');
		if (headerElement)
		{
			var headerStatus = headerElement.getAttribute('class');
			if (headerStatus.indexOf("hornready") != -1)
			{
				// if the horn image is visible, why do we need to wait any more, sound the horn!
				soundHorn();
				
				// make sure the timer don't run twice!
				isHornSounding = true;
			}
			headerStatus = null;
		}
		headerElement = null;
	
		if (isHornSounding == false)
		{
			// start timer
			window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
		}
		
		isHornSounding = null;
	}
}

function countdownTimer()
{
	if (isKingReward)
	{
		// update timer
		displayTimer("King's Reward!", "King's Reward!", "King's Reward");
		displayKingRewardSumTime("Now");
		
		
		// record last king's reward time
		var nowDate = new Date();
		setCookie("lastKingRewardDate", nowDate.toString(), 1);
		nowDate = null;
		lastKingRewardSumTime = 0;
		
		// reload the page so that the sound can be play
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
		// reload the page if click on camp button fail
		window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
	}
	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
	{
		// update timer
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
		if (fbPlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		else if (hiFivePlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		else if (mhPlatform)
		{
			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		}
		displayKingRewardSumTime(null);
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
		displayLocation(huntLocation);
		displayKingRewardSumTime(null);
		
		// pause the script
	}
	else
	{
		if (enableTrapCheck)
		{
			// update time
			hornTime -= timerRefreshInterval;
			checkTime -= timerRefreshInterval;
			if (lastKingRewardSumTime != -1)
			{
				lastKingRewardSumTime += timerRefreshInterval;
			}
		}
		else
		{
			// update time
			hornTime -= timerRefreshInterval;
			if (lastKingRewardSumTime != -1)
			{
				lastKingRewardSumTime += timerRefreshInterval;
			}
		}
	
		if (hornTime <= 0)
		{
			// blow the horn!
			soundHorn();
		}
		else if (enableTrapCheck && checkTime <= 0)
		{
			// trap check!
			trapCheck();
		}
		else
		{
			if (enableTrapCheck)
			{
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime), 
						timeformat(hornTime) + "  <i></i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
				}
			}
			else
			{
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						"-");
						
					// 
					//if (hornTime % timerRefreshInterval == 0)
					//{
					//	
					//}
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime), 
						timeformat(hornTime) + "  <i></i>", 
						"-");
						
					// agressive mode should sound the horn whenever it is possible to do so.
					var headerElement = document.getElementById('header');
					if (headerElement)
					{
						// the horn image appear before the timer end
						if (headerElement.getAttribute('class').indexOf("hornready") != -1)
						{
							// who care, blow the horn first!
							soundHorn();
							
							headerElement = null;
							
							// skip all the code below
							return;
						}
					}
					headerElement = null;
				}
			}
			
			// set king reward sum time
			displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));
			
			window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
		}
	}
}

function embedTimer(targetPage)
{
	if (showTimerInPage)
	{
		var headerElement;
		headerElement = document.getElementById('noscript');
		if (headerElement)
		{
			var timerDivElement = document.createElement('div');
			
			var hr1Element = document.createElement('hr');
			timerDivElement.appendChild(hr1Element);
			
			// show bot title and version
			titleElement = document.createElement('div');
			titleElement.setAttribute('id', 'titleElement');
			if (targetPage && aggressiveMode)
			{

			}
			else
			{

			}
			timerDivElement.appendChild(titleElement);
			
			if (targetPage)
			{
				nextHornTimeElement = document.createElement('div');
				nextHornTimeElement.setAttribute('id', 'nextHornTimeElement');
				nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Loading...";
				timerDivElement.appendChild(nextHornTimeElement);
				
				checkTimeElement = document.createElement('div');
				checkTimeElement.setAttribute('id', 'checkTimeElement');
				
				if (pauseAtInvalidLocation)
				{
					// location information only display when enable this feature
					travelElement = document.createElement('div');
					travelElement.setAttribute('id', 'travelElement');
					travelElement.innerHTML = "<b>Target Hunt Location:</b> Loading...";
					timerDivElement.appendChild(travelElement);
				}
				
				var lastKingRewardDate = getCookie("lastKingRewardDate");
				var lastDateStr;
				if (lastKingRewardDate == " ")
				{
					lastDateStr = "-";
				}
				else
				{
					var lastDate = new Date(lastKingRewardDate);
					lastDateStr = lastDate.toDateString() + " " + lastDate.toTimeString().substring(0, 8);
					lastDate = null;
				}
				
				kingTimeElement = document.createElement('div');
				kingTimeElement.setAttribute('id', 'kingTimeElement');

				
				lastKingRewardSumTimeElement = document.createElement('font');
				lastKingRewardSumTimeElement.setAttribute('id', 'lastKingRewardSumTimeElement');
				lastKingRewardSumTimeElement.innerHTML = "(Loading...)";
				kingTimeElement.appendChild(lastKingRewardSumTimeElement);
				
				lastKingRewardDate = null;
				lastDateStr = null;
				
				if (showLastPageLoadTime)
				{
					var nowDate = new Date();
				
					// last page load time
					var loadTimeElement = document.createElement('div');
					loadTimeElement.setAttribute('id', 'loadTimeElement');

					
					loadTimeElement = null;
					nowDate = null;
				}
			}
			else
			{
				// player currently navigating other page instead of hunter camp
				var helpTextElement = document.createElement('div');
				helpTextElement.setAttribute('id', 'helpTextElement');
				if (fbPlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt Horn Timer will only run at <a href='http://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the timer from interfering user's activity.";
				}
				else if (hiFivePlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt Horn Timer will only run at <a href='http://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the timer from interfering user's activity.";
				}
				else if (mhPlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt Horn Timer will only run at <a href='http://mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the timer from interfering user's activity.";
				}
				timerDivElement.appendChild(helpTextElement);
				
				helpTextElement = null;
			}
			
			var hr2Element = document.createElement('hr');
			timerDivElement.appendChild(hr2Element);
			
			// embed all msg to the page
			headerElement.parentNode.insertBefore(timerDivElement, headerElement);
			
			timerDivElement = null;
			hr1Element = null;
			titleElement = null;
			hr2Element = null;
		}
		headerElement = null;
	}
}

function displayTimer(title, nextHornTime, checkTime)
{
	if (showTimerInTitle)
	{
		document.title = title;
	}
	
	if (showTimerInPage)
	{
		nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + nextHornTime;
		checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + checkTime;
	}
	
	title = null;
	nextHornTime = null;
	checkTime = null;
}

function displayLocation(locStr)
{
	if (showTimerInPage && pauseAtInvalidLocation)
	{
		travelElement.innerHTML = "<b>Hunt Location:</b> " + locStr;
	}
}

function displayKingRewardSumTime(timeStr)
{
	if (timeStr)
	{
		lastKingRewardSumTimeElement.innerHTML = "(" + timeStr + ")";
	}
	else
	{
		lastKingRewardSumTimeElement.innerHTML = "";
	}
}

function timeformat(time)
{
	var timeString;
	var hr = Math.floor(time / 3600);
	var min = Math.floor((time % 3600) / 60);
	var sec = (time % 3600 % 60) % 60;
	
	if (hr > 0)
	{
		timeString = hr.toString() + " hr " + min.toString() + " min " + sec.toString() + " sec";
	}
	else if (min > 0)
	{
		timeString = min.toString() + " min " + sec.toString() + " sec";
	}
	else
	{
		timeString = sec.toString() + " sec";
	}
	
	time = null;
	hr = null;
	min = null;
	sec = null;
	
	return (timeString);
}

function timeFormatLong(time)
{
	var timeString;
	
	if (time != -1)
	{
		var day = Math.floor(time / 86400);
		var hr = Math.floor((time % 86400) / 3600);
		var min = Math.floor((time % 3600) / 60);
		
		if (day > 0)
		{
			timeString = day.toString() + " day " + hr.toString() + " hr " + min.toString() + " min ago";
		}
		else if (hr > 0)
		{
			timeString = hr.toString() + " hr " + min.toString() + " min ago";
		}
		else if (min > 0)
		{
			timeString = min.toString() + " min ago";
		}
		
		time = null;
		day = null;
		hr = null;
		min = null;
	}
	else
	{
		timeString = null;
	}
	
	return (timeString);
}

function setCookie(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	
	// create cookie
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
	
	c_name = null;
	value = null;
	expiredays = null;
	exdate = null;
}

function getCookie(c_name)
{
	var value = " ";

	if (document.cookie.length > 0)
	{
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
			{
				c_end = document.cookie.length;
			}
			value = unescape(document.cookie.substring(c_start, c_end));
			c_end = null;
		}
		c_start = null;
	}
	
	c_name = null;
	
	return value;
}

function fireEvent(element, event)
{
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

function getPageVariableForChrome(variableName)
{
	// google chrome only
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute('id', "scriptElement");
	scriptElement.setAttribute('type', "text/javascript");
	scriptElement.innerHTML = "document.getElementById('scriptElement').innerText=" + variableName + ";";
	document.body.appendChild(scriptElement);
	
	var value = scriptElement.innerHTML;
	document.body.removeChild(scriptElement);
	scriptElement = null;
	
	return value;
}

function checkResumeButton()
{
	var found = false;
	
	var linkElementList = document.getElementsByTagName('img');
	if (linkElementList)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			// check if it is a resume button
			if (linkElementList[i].getAttribute('src').indexOf("resume_hunting_blue.gif") != -1)
			{
				// found resume button
				
				// simulate mouse click on the horn
				fireEvent(linkElementList[i].parentNode, 'click');
					
				// reload url if click fail
				window.setTimeout(function () { reloadWithMessage("Fail to click on resume button. Reloading...", false); }, 6000);
					
				// recheck if the resume button is click because some time even the url reload also fail
				window.setTimeout(function () { checkResumeButton(); }, 10000);
				
				found = true;
				break;
			}
		}
		i = null;
	}
	
	linkElementList = null;
	
	return (found);
}

function kingRewardAction()
{
	// update timer
	displayTimer("King's Reward!", "King's Reward", "King's Reward!");
	displayLocation("-");
		
	// play music if needed
	if (isKingWarningSound)
	{
		if (fbPlatform || mhPlatform)
		{
			var kingSound = document.createElement("div");
			kingSound.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			document.getElementById("fb-root").appendChild(kingSound);
		}
		else if (hiFivePlatform)
		{
			var kingSound = document.createElement("div");
			kingSound.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			document.getElementById("hgAppContainer").appendChild(kingSound);
		}
	}
		
	// focus on the answer input
	var inputElementList = document.getElementsByTagName('input');
	if (inputElementList)
	{
		var i;
		for (i = 0; i < inputElementList.length; ++i)
		{
			// check if it is a resume button
			if (inputElementList[i].getAttribute('name') == "puzzle_answer")
			{
				inputElementList[i].focus();
				break;
			}
		}
		i = null;
	}
	inputElementList = null;
	
	// record last king's reward time
	var nowDate = new Date();
	setCookie("lastKingRewardDate", nowDate.toString(), 1);
	nowDate = null;

	if (kingPauseTimeMax <= 0)
	{
		kingPauseTimeMax = 1;
	}
	
	kingPauseTime = kingPauseTimeMax;
	kingRewardCountdownTimer();
}

function kingRewardCountdownTimer()
{
	if (reloadKingReward)
	{
		kingPauseTime -= timerRefreshInterval;
	}
	
	if (lastKingRewardSumTime != -1)
	{
		lastKingRewardSumTime += timerRefreshInterval;
	}
	
	if (kingPauseTime <= 0)
	{
		// update timer
		displayTimer("King's Reward - Reloading...", "Reloading...", "Reloading...");
		
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
		// reload the page if click on the camp button fail
		window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
	}
	else
	{
		if (reloadKingReward)
		{
			// update timer
			displayTimer("King's Reward - Reload in " + timeformat(kingPauseTime), 
				"Reloading in " + timeformat(kingPauseTime), 
				"Reloading in " + timeformat(kingPauseTime));
		}
			
		// set king reward sum time
		displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));
		
		if (!checkResumeButton())
		{
			window.setTimeout(function () { (kingRewardCountdownTimer)() }, timerRefreshInterval * 1000);
		}
	}	
}

function trapCheck()
{
	// update timer
	displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...");
	
	// simulate mouse click on the camp button
	fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
	// reload the page if click on camp button fail
	window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
}

function soundHorn()
{
	// update timer
	displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
	
	if (!aggressiveMode)
	{
		// safety mode, check the horn image is there or not before sound the horn
	
		var headerElement;
		headerElement = document.getElementById('header');
		if (headerElement)
		{
			// need to make sure that the horn image is ready before we can click on it
			var headerStatus = headerElement.getAttribute('class');
			if (headerStatus.indexOf("hornready") != -1)
			{
				// found the horn image, let's sound the horn!
				
				// update timer
				displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");
				
				// simulate mouse click on the horn
				fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
				
				// double check if the horn was already sounded
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1)
			{
				// some one just sound the horn...
				
				// update timer
				displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
				
				// load the new data
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else
			{
				// no horn appear!?!
				
				// update timer
				displayTimer("Synchronizing Data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...");
				
				// sync the time again, maybe user already click the horn
				retrieveData();
				
				// loop again
				window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
			}
			headerStatus = null;
		}
		else
		{
			// something wrong, can't even found the header...
			
			// reload the page see if thing get fixed
			reloadWithMessage("Fail to find the horn header. Reloading...", false);
		}
		headerElement = null;
	}
	else
	{
		// aggressive mode, ignore whatever horn image is there or not, just sound the horn!
		
		// simulate mouse click on the horn
					if(confirm("It's time to sound the horn!\nDo you want to sound it now?\n\nNOTE: By clicking OK, the horn will be sounded on this tab, so please click cancel if you are in the middle of completing a form."))
			window.location.href = "http://www.mousehuntgame.com/turn.php";
		
		// double check if the horn was already sounded
	}
}

function afterSoundingHorn()
{
	var headerElement;
	headerElement = document.getElementById('header');
	if (headerElement)
	{
		// double check if the horn image is still visible after the script already sound it
		var headerStatus = headerElement.getAttribute('class');
		if (headerStatus.indexOf("hornready") != -1)
		{
			// seen like the horn is not functioning well
			
			// update timer
			displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");
			
			// simulate mouse click on the horn
			fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
			
			// increase the horn retry counter and check if the script is caugh in loop
			++hornRetry;
			if (hornRetry > hornRetryMax)
			{
				// reload the page see if thing get fixed
				reloadWithMessage("Detected script caught in loop. Reloading...", true);
				
				// reset the horn retry counter
				hornRetry = 0;
			}
			else
			{
				// check again later
				window.setTimeout(function () { afterSoundingHorn() }, 1000);
			}
		}
		else if (headerStatus.indexOf("hornsounding") != -1)
		{
			// the horn is already sound, but the network seen to slow on fetching the data
			
			// update timer
			displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");
			
			// increase the horn retry counter and check if the script is caugh in loop
			++hornRetry;
			if (hornRetry > hornRetryMax)
			{
				// reload the page see if thing get fixed
				reloadWithMessage("Detected script caught in loop. Reloading...", true);
				
				// reset the horn retry counter
				hornRetry = 0;
			}
			else
			{
				// check again later
				window.setTimeout(function () { afterSoundingHorn() }, 3000);
			}
		}
		else
		{
			// everything look ok
			
			// update timer
			displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");
			
			// reload data
			retrieveData();
			
			// script continue as normal
			window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
			
			// reset the horn retry counter
			hornRetry = 0;
		}
		headerStatus = null;
	}
	headerElement = null;
}

function reloadPage(soundHorn)
{
	// reload the page
	if (fbPlatform)
	{
		if (soundHorn)
		{
			if(confirm("It's time to sound the horn!\nDo you want to sound it now?\n\nNOTE: By clicking OK, the horn will be sounded on this tab, so please click cancel if you are in the middle of completing a form."))
			window.location.href = "http://www.mousehuntgame.com/turn.php";
		}
		else
		{
			window.location.href = "http://www.mousehuntgame.com/canvas/";
		}
	}
	else if (hiFivePlatform)
	{
		// for Hi5 only
		if (soundHorn)
		{
			if(confirm("It's time to sound the horn!\nDo you want to sound it now?\n\nNOTE: By clicking OK, the horn will be sounded on this tab, so please click cancel if you are in the middle of completing a form."))
			window.location.href = "http://mousehunt.hi5.hitgrab.com/turn.php";
		}
		else
		{
			window.location.href = "http://mousehunt.hi5.hitgrab.com/";
		}
	}
	else if (mhPlatform)
	{
		// for mousehunt game only
		if (soundHorn)
		{
			if(confirm("It's time to sound the horn!\nDo you want to sound it now?\n\nNOTE: By clicking OK, the horn will be sounded on this tab, so please click cancel if you are in the middle of completing a form."))
			window.location.href = "http://www.mousehuntgame.com/turn.php";
		}
		else
		{
			window.location.href = "http://mousehuntgame.com/";
		}
	}
}

function reloadWithMessage(msg, soundHorn)
{
	// display the message
	displayTimer(msg, msg, msg, msg);
	
	// reload the page
	reloadPage(soundHorn);
}
