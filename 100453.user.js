// ==UserScript==
// @name        MouseHunt AutoBot trapcheck 45min
// @author      Ooi Keng Siang
// @version    	1.18
// @namespace   http://www.ooiks.com/mini-projects/mousehunt-autobot
// @description An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features.
// @include		http://mousehunt.hi5.hitgrab.com/*
// @include		http://mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// ==/UserScript==





// == Basic User Preference Setting (Begin) ==
// // The variable in this section contain basic option will normally edit by most user to suit their own preference
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Extra delay time before sounding the horn. (in seconds)
var hornTimeDelayMin = 5;
var hornTimeDelayMax = 20;

// // Ignore all safety measure such as check horn image visible before sounding it. (true/false)
// // Highly recommanded to turn off because it increase the chances of getting caugh in botting.
var aggressiveMode = false;

// // Enable trap check once an hour. (true/false)
var enableTrapCheck = true;

// // Trap check time different value (00 minutes - 45 minutes)
// // Note: Every player had different trap check time, set your trap check time here. It only take effect if enableTrapCheck = true;
// // Example: If you have XX:00 trap check time then set 00. If you have XX:45 trap check time, then set 45.
var trapCheckTimeDiff = 45;

// // Extra delay time to trap check. (in seconds)
// // Note: It only take effect if enableTrapCheck = true;
var checkTimeDelayMin = 15;
var checkTimeDelayMax = 30;

// // Play sound when encounter king's reward (true/false)
var isKingWarningSound = false;

// // Reload the the page according to kingPauseTimeMax when encount King Reward. (true/false)
// // Note: No matter how many time you refresh, the King's Reward won't go away unless you resolve it manually.
var reloadKingReward = false;

// // Duration of pausing the script before reload the King's Reward page (in seconds)
// // Note: It only take effect if reloadKingReward = true;
var kingPauseTimeMax = 18000;

// == Basic User Preference Setting (End) ==





// == Advance User Preference Setting (Begin) ==
// // The variable in this section contain some advance option that will change the script behavior.
// // Edit this variable only if you know what you are doing 
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Display timer and message in page title. (true/false)
var showTimerInTitle = true;

// // Embed a timer in page to show next hunter horn timer, highly recommanded to turn on. (true/false)
// // Note: You may not access some option like pause at invalid location if you turn this off.
var showTimerInPage = true;

// // Interval time between two King's Reward, use in King's Reward related calculation. (in seconds)
var kingTimeIntervalMin = 7200;

// // Pause the script before it encounter King's Reward (true/false)
// // Pause before King's Reward might not totally prevent player from encounter King's Reward, 
// //   if user modify the King's Reward interval time or run the script half way (played mousehunt before in other computer within few hour before)
var pauseBeforeKing = false;

// // Duration of pausing the script before resume the script when pause before King's Reward (in seconds)
// // Note: It only take effect is pauseBeforeKing = true;
var pauseBeforeKingTimeWaitMax = 18000;

// // The script will pause if player at different location that hunt location set before (true/false)
// // Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

// // Default time to reload the page when bot encounter error. (in seconds)
var errorReloadTime = 60;

// // Time interval for script timer to update the time. May affact timer accuracy if set too high value. (in seconds)
var timerRefreshInterval = 1;

// == Advance User Preference Setting (End) ==





// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.18";
var fbPlatform
var hiFivePlatform = false;
var mhPlatform = false;
var hornTime = 900;
var hornTimeDelay = 0;
var checkTimeDelay = 0;
var isKingReward = false;
var nextKingTime = kingTimeIntervalMin;
var kingPauseTime = kingPauseTimeMax;
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
			window.location.href.indexOf("mousehuntgame.com/canvas/index.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?ref=ts") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?ref=bookmarks") != -1)
		{
			// page to execute the script!
		
			// check if the page don't have resume button, if got just click on it.
			if (!checkResumeButton())
			{
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
			window.location.href.indexOf("mousehuntgame.com/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/index.php") != -1)
		{
			// page to execute the script!
		
			// check if the page don't have resume button, if got just click on it.
			if (!checkResumeButton())
			{
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
		
			// check if the page don't have resume button, if got just click on it.
			if (!checkResumeButton())
			{
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
					var additionalDelayTime = Math.ceil(nextActiveTime * 0.02);
				
					// need to found out the mousehunt provided timer interval to determine the additional delay
					var timerIntervalStartIndex = scriptString.indexOf("hud.timer_interval");
					if (timerIntervalStartIndex >= 0)
					{
						// same for both facebook and hi5
						timerIntervalStartIndex += 21;
						var timerIntervalEndIndex = scriptString.indexOf(";", timerIntervalStartIndex);
						var timerIntervalString = scriptString.substring(timerIntervalStartIndex, timerIntervalEndIndex);
						var timerInterval = parseInt(timerIntervalString);
						
						if (timerInterval == 1)
						{
							additionalDelayTime = 2;
						}
						
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
	
		// get next king's reward time
		var nowDate = (new Date()).getTime();
		var lastKingRewardDate = getCookie("lastKingReward");
		if (lastKingRewardDate == " ")
		{
			setCookie("lastKingReward", nowDate, 1);
			nextKingTime = kingTimeIntervalMin;
		}
		else
		{
			var timeLeft = kingTimeIntervalMin - parseInt((nowDate - lastKingRewardDate) / 1000);
			if (timeLeft < 0)
			{
				setCookie("lastKingReward", nowDate, 1);
				nextKingTime = kingTimeIntervalMin;
			}
			else
			{
				nextKingTime = timeLeft;
			}
			timeLeft = null;
		}
		nowDate = null;
		lastKingRewardDate = null;
		
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
	// check if the tiny mouse is there
	var imgElementList = document.getElementsByTagName('img');
	if (imgElementList)
	{
		var i;
		for (i = 0; i < imgElementList.length; ++i)
		{
			// data timed out
			if (imgElementList[i].getAttribute('src') == 'http://mousehunt.facebook.hitgrab.com/images/ui/splash/tiny_230.jpg')
			{
				// the tiny mouse is there (data fetch fail), reload the page!
				window.setTimeout(function () { reloadWithMessage("Data timed out. Reloading...", false); }, 5000);
			}
		}
		i = null;
	}
	imgElementList = null;
	
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
			var additionalDelayTime = Math.ceil(nextActiveTime * 0.02);
			if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1)
			{
				additionalDelayTime = 2;
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
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
		displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
		displayLocation(huntLocation);
		
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
		displayTimer("King's Reward!", "-", "-", "Now!");
		
		// record king's reward time
		setCookie("lastKingReward", "", -1);
		
		// reload the page so that the sound can be play
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
		// reload the page if click on camp button fail
		window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
	}
	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
	{
		// update timer
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
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
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
		displayLocation(huntLocation);
		
		// pause the script
	}
	else
	{
		if (enableTrapCheck)
		{
			// update time
			hornTime -= timerRefreshInterval;
			checkTime -= timerRefreshInterval;
			nextKingTime -= timerRefreshInterval;
		}
		else
		{
			// update time
			hornTime -= timerRefreshInterval;
			nextKingTime -= timerRefreshInterval;
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
		else if (pauseBeforeKing && nextKingTime <= 0)
		{
			kingPauseTime = pauseBeforeKingTimeWaitMax;
			countdownPauseTimer();
		}
		else
		{
			if (enableTrapCheck)
			{
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
			}
			else
			{
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						"-", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
						"-", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
			}
			window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
		}
	}
}

function countdownPauseTimer()
{
	if (pauseBeforeKing)
	{
		kingPauseTime -= timerRefreshInterval;
	
		if (kingPauseTime <= 0)
		{
			// update timer
			displayTimer("Pause before King's Reward - Resuming...", "-", "-", "Pause before King's Reward - Resuming...");
			
			// simulate mouse click on the camp button
			fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
			
			// reload the page if click on the camp button fail
			window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
		}
		else
		{
			// update timer
			displayTimer("Pause before King's Reward - Resume in " + timeformat(kingPauseTime), 
				"-", 
				"-", 
				"Resume in " + timeformat(kingPauseTime));
			
			window.setTimeout(function () { (countdownPauseTimer)() }, timerRefreshInterval * 1000);
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
				titleElement.innerHTML = "<b>MouseHunt AutoBot (version " + scriptVersion + ")</b> - <font color='red'>Aggressive Mode</font>";
			}
			else
			{
				titleElement.innerHTML = "<b>MouseHunt AutoBot (version " + scriptVersion + ")</b>";
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
				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Loading...";
				timerDivElement.appendChild(checkTimeElement);
				
				kingTimeElement = document.createElement('div');
				kingTimeElement.setAttribute('id', 'kingTimeElement');
				kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Loading...";
				timerDivElement.appendChild(kingTimeElement);
				
				// get pause before king value
				var pauseBeforeKingCookie = getCookie("pauseBeforeKing");
				if (pauseBeforeKingCookie == " ")
				{
					setCookie("pauseBeforeKing", pauseBeforeKing, 90);
				}
				else
				{
					pauseBeforeKing = (pauseBeforeKingCookie == 'true') ? true : false;
					setCookie("pauseBeforeKing", pauseBeforeKing, 90);
				}
				pauseBeforeKingCookie = null;
				
				// show option for pause before king's reward
				optionElement = document.createElement('div');
				optionElement.setAttribute('id', 'optionElement');
				if (pauseBeforeKing)
				{
					if (fbPlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
					}
					else if (hiFivePlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
					}
					else if (mhPlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://mousehuntgame.com/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
					}
				}
				else
				{
					if (fbPlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/'>Disable</a>]";
					}
					else if (hiFivePlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/'>Disable</a>]";
					}
					else if (mhPlatform)
					{
						optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://mousehuntgame.com/'>Disable</a>]";
					}
				}
				timerDivElement.appendChild(optionElement);
				
				if (pauseAtInvalidLocation)
				{
					// location information only display when enable this feature
					travelElement = document.createElement('div');
					travelElement.setAttribute('id', 'travelElement');
					travelElement.innerHTML = "<b>Hunt Location:</b> Loading...";
					timerDivElement.appendChild(travelElement);
				}
			}
			else
			{
				// player currently navigating other page instead of hunter camp
				var helpTextElement = document.createElement('div');
				helpTextElement.setAttribute('id', 'helpTextElement');
				if (fbPlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
				}
				else if (hiFivePlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
				}
				else if (mhPlatform)
				{
					helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
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

function displayTimer(title, nextHornTime, checkTime, kingTime)
{
	if (showTimerInTitle)
	{
		document.title = title;
	}
	
	if (showTimerInPage)
	{
		nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + nextHornTime;
		checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + checkTime;
		kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> " + kingTime;
	}
	
	title = null;
	nextHornTime = null;
	checkTime = null;
	kingTime = null;
}

function displayLocation(locStr)
{
	if (showTimerInPage && pauseAtInvalidLocation)
	{
		travelElement.innerHTML = "<b>Hunt Location:</b> " + locStr;
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
			if (linkElementList[i].getAttribute('src') == "http://www.mousehuntgame.com/images/ui/buttons/resume_hunting_blue.gif")
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
	displayTimer("King's Reward!", "-", "-", "Now!");
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
	var answerElement;
	document.getElementById('puzzle_answer');
	if (answerElement)
	{
		answerElement.focus();
	}
	answerElement = null;
		
	// remove king's reward time
	setCookie("lastKingReward", "", -1);

	kingPauseTime = kingPauseTimeMax;
	kingRewardCountdownTimer();
}

function kingRewardCountdownTimer()
{
	kingPauseTime -= timerRefreshInterval;
	
	if (kingPauseTime <= 0)
	{
		// update timer
		displayTimer("King's Reward - Reloading...", "-", "-", "King's Reward - Reloading...");
		
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
		// reload the page if click on the camp button fail
		window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
	}
	else
	{
		// update timer
		displayTimer("King's Reward - Reload in " + timeformat(kingPauseTime), 
			"-", 
			"-", 
			"Reload in " + timeformat(kingPauseTime));
			
		window.setTimeout(function () { (kingRewardCountdownTimer)() }, timerRefreshInterval * 1000);
	}	
}

function trapCheck()
{
	// update timer
	displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...", "Checking trap now...");
	
	// simulate mouse click on the camp button
	fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		
	// reload the page if click on camp button fail
	window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
}

function soundHorn()
{
	// update timer
	displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
	
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
				displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");
				
				// simulate mouse click on the horn
				fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
				
				// double check if the horn was already sounded
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1)
			{
				// some one just sound the horn...
				
				// update timer
				displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
				
				// load the new data
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else
			{
				// no horn appear!?!
				
				// update timer
				displayTimer("Synchronizing Data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...");
				
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
		fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
		
		// double check if the horn was already sounded
		window.setTimeout(function () { afterSoundingHorn() }, 3000);
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
			displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");
			
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
			displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");
			
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
			displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");
			
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
			window.location.href = "http://www.mousehuntgame.com/canvas/turn.php";
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
			window.location.href = "http://mousehuntgame.com/turn.php";
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
