// ==UserScript==
// @name        MouseHuntLongtail TimerAutoHorn
// @author      Jonaz Alino
// @version    	1.0
// @namespace   http://www.facebook.com/jonazalino
// @description The script includes a countdown timer and auto horn.
// @include     http://apps.facebook.com/mousehunt/*
// @include     http://www.facebook.com/common/error.html
// ==/UserScript==

// ==UserPreferenceSetting==
// The variable in this section contain option that enable user to modify to suit personal preference.
// Reload MouseHunt page manually if edit this script while running it for immediate effect.

// Embed a timer in page to show next hunter horn timer (true/false)
var showTimerInPage = true;

// Extra delay time to sound the horn (in seconds)
var hornTimeDelayMin = 0;
var hornTimeDelayMax = 2;

// Enable trap check once an hour (true/false)
var enableTrapCheck = true;

// Extra delay time to trap check (in seconds)
var checkTimeDelayMin = 0;
var checkTimeDelayMax = 5;

// Interval time between two King's Reward, use in King's Reward related calculation (in seconds)
var kingTimeIntervalMin = 9000;

// Play sound when encounter king's reward (true/false)
var isKingWarningSound = true;

// Default setting
var errorReloadTime = 60;

// ==/UserPreferenceSetting==

// ==UserPreferenceSetting(Experiment)==
// The variable in this section contain features that are still under experiement state.
// By default it should not cause any problem to normal execution script.
// Edit the variable here if you want to try out the experiemental features.

// Pause the script before it encounter King's Reward (true/false)
var pauseBeforeKing = false;

// Duration of pausing the script before King's Reward before resume it again. (in seconds)
var scriptPauseTimeMax = 14400;

// ==/UserPreferenceSetting(Experiment)==


// Warning - Do not modify the code below unless you know what you are doing.

// All global variable declaration and default value
var hornTime = 900;
var hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
var checkTime;
var checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
var isKingReward = false;
var nextKingTime = kingTimeIntervalMin;
var baitQuantity = -1;
var today = new Date();
var checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds());
today = null;

// element in page
var nextHornTimeElement;
var checkTimeElement;
var kingTimeElement;

// embed a place where timer show
embedTimer();

// retrieve data from the page loaded
retrieveDataFirst();

// bot action start
action();

function retrieveDataFirst()
{
	var scriptElementList = document.getElementsByTagName('script');

	if (scriptElementList)
	{
		for (var i = 0; i < scriptElementList.length; ++i)
		{
			var scriptString = scriptElementList[i].innerHTML;
			
			// get next horn time
			var hornTimeStartIndex = scriptString.indexOf("next_activeturn_seconds");
			if (hornTimeStartIndex >= 0)
			{
				hornTimeStartIndex += 26;
				var hornTimeEndIndex = scriptString.indexOf(",", hornTimeStartIndex);
				var hornTimerString = scriptString.substring(hornTimeStartIndex, hornTimeEndIndex);
				hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
				hornTime = parseInt(hornTimerString) + hornTimeDelay;
				
				hornTimeStartIndex = null;
				hornTimeEndIndex = null;
				hornTimerString = null;
			}
			
			// get is king's reward or not
			var hasPuzzleStartIndex = scriptString.indexOf("has_puzzle");
			if (hasPuzzleStartIndex >= 0)
			{
				hasPuzzleStartIndex += 13;
				var hasPuzzleEndIndex = scriptString.indexOf(",", hasPuzzleStartIndex);
				var hasPuzzleString = scriptString.substring(hasPuzzleStartIndex, hasPuzzleEndIndex);
				isKingReward = (hasPuzzleString == 'false') ? false : true;
				
				hasPuzzleStartIndex = null;
				hasPuzzleEndIndex = null;
				hasPuzzleString = null;
			}
			
			// get cheese quantity
			var baitQuantityStartIndex = scriptString.indexOf("bait_quantity");
			if (baitQuantityStartIndex >= 0)
			{
				baitQuantityStartIndex += 16;
				var baitQuantityEndIndex = scriptString.indexOf(",", baitQuantityStartIndex);
				var baitQuantityString = scriptString.substring(baitQuantityStartIndex, baitQuantityEndIndex);
				baitQuantity = parseInt(baitQuantityString);
				
				baitQuantityStartIndex = null;
				baitQuantityEndIndex = null;
				baitQuantityString = null;
			}
		}
	}
	scriptElementList = null;
	
	// get trap check time
	if (enableTrapCheck)
	{
		var today = new Date();
		checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
		checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds()) + checkTimeDelay;
		today = null;
	}
	
	// get next king's reward time
	var nowDate = (new Date()).getTime();
	var lastKingRewardDate = getCookie("lastKingReward");
	if (lastKingRewardDate == " ")
	{
		setCookie("lastKingReward", nowDate);
		nextKingTime = kingTimeIntervalMin;
	}
	else
	{
		var timeLeft = kingTimeIntervalMin - parseInt((nowDate - lastKingRewardDate) / 1000);
		if (timeLeft < 0)
		{
			setCookie("lastKingReward", nowDate);
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
}

function retrieveData()
{
	// get next horn time
	hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
	try
	{
		// for firefox + greasmonkey
		hornTime = unsafeWindow.a10337532241_user.next_activeturn_seconds + hornTimeDelay;
		isKingReward = unsafeWindow.a10337532241_user.has_puzzle;
		baitQuantity = unsafeWindow.a10337532241_user.bait_quantity;
	}
	catch(e)
	{
		try
		{
			// for opera
			hornTime = a10337532241_user.next_activeturn_seconds + hornTimeDelay;
			isKingReward = a10337532241_user.has_puzzle;
			baitQuantity = a10337532241_user.bait_quantity;
		}
		catch(e)
		{
			try
			{
				// chrome
				hornTime = parseInt(getPageVariableForChrome("a10337532241_user.next_activeturn_seconds")) + hornTimeDelay;
				isKingReward = (getPageVariableForChrome("a10337532241_user.has_puzzle").toString() == "false") ? false : true;
				baitQuantity = parseInt(getPageVariableForChrome("a10337532241_user.bait_quantity"));
			}
			catch(e)
			{
				// if everything fail... refresh the page...
				window.location.href = "http://apps.facebook.com/mousehunt/";
			}
		}
	}
	
	// get trap check time
	if (enableTrapCheck)
	{
		var today = new Date();
		checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
		checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds()) + checkTimeDelay;
		today = null;
	}
}

function action()
{
	if (isKingReward)
	{
		document.title = "King's Reward!";
		if (showTimerInPage)
		{
			nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> -";
			checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> -";
			kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Now!";
		}
		
		// play music if needed
		if (isKingWarningSound)
		{
			var kingSound = document.createElement("div");
			kingSound.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			document.getElementById("content").appendChild(kingSound);
		}
		
		// record king's reward time
		setCookie("lastKingReward", (new Date()).getTime().toString());
	}
	else if (baitQuantity == 0)
	{
		document.title = "No more cheese!";
		if (showTimerInPage)
		{
			nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Cannot hunt without the cheese...";
			checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Cannot hunt without the cheese...";
			kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> -";
		}
	}
	else
	{
		if (window.location.href == "http://www.facebook.com/common/error.html")
		{
			document.title = "Autoreload in " + errorReloadTime.toString() + " seconds";
			window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/" }, errorReloadTime * 1000);
		}
		else if (window.location.href == "http://apps.facebook.com/mousehunt/" ||
			window.location.href.indexOf(".facebook.com/mousehunt/?ref=bookmarks") != -1 || 
			window.location.href.indexOf(".facebook.com/mousehunt/?ref=canvas_bkmk_top") != -1 || 
			window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 || 
			window.location.href.indexOf(".facebook.com/mousehunt/mousehunt/index.php") !=  -1 ||
			window.location.href.indexOf(".facebook.com/mousehunt/turn.php") != -1)
		{
		   window.setTimeout(function () { countDownTimer() }, 1000);
		}
	}
}

function countDownTimer()
{
	if (isKingReward)
	{
		document.title = "King's Reward!";
		if (showTimerInPage)
		{
			nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> -";
			checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> -";
			kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Now!";
		}
		
		// record king's reward time
		setCookie("lastKingReward", (new Date()).getTime().toString());
		
		// reload the page so that the sound can be play
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 10000);
	}
	else if (baitQuantity == 0)
	{
		document.title = "No more cheese!";
		if (showTimerInPage)
		{
			nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Cannot hunt without the cheese...";
			checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Cannot hunt without the cheese...";
			kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> -";
		}
	}
	else
	{
		if (hornTime <= 0)
		{
			document.title = "Ready to Blow The Horn...";
			if (showTimerInPage)
			{
				nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Ready to blow the horn...";
				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Ready to blow the horn...";
				kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Ready to blow the horn...";
			}
			
			var headerElement = document.getElementById('app10337532241_header');
			if (headerElement)
			{
				// need to make sure that the horn image is ready before we can click on it
				var headerStatus = headerElement.getAttribute('class');
				if (headerStatus.indexOf("hornready") != -1)
				{
					// found the horn image, let's sound the horn!
					document.title = "Blowing The Horn...";
					if (showTimerInPage)
					{
						nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Blowing hunter horn...";
						checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Blowing hunter horn...";
						kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Blowing hunter horn...";
					}
				
					// simulate mouse click on the horn
					fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
					
					// load the new data
					hornTime = 900;
					hornTimeDelay = 0;
					window.setTimeout(function () { countDownTimer() }, 1000);
					window.setTimeout(function () { retrieveData() }, 10000);
				}
				else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1)
				{
					// some one just sound the horn...
					document.title = "Synchronizing Data...";
					if (showTimerInPage)
					{
						nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Someone had just sound the horn. Synchronizing data...";
						checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Someone had just sound the horn. Synchronizing data...";
						kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Someone had just sound the horn. Synchronizing data...";
					}
					
					// load the new data
					hornTime = 900;
					hornTimeDelay = 0;
					window.setTimeout(function () { countDownTimer() }, 1000);
					window.setTimeout(function () { retrieveData() }, 10000);
				}
				else
				{
					// some how the horn image is not there...
					document.title = "Synchronizing Data...";
					if (showTimerInPage)
					{
						nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Hunter horn not found. Synchronizing data...";
						checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Hunter horn not found. Synchronizing data...";
						kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Hunter horn not found. Synchronizing data...";
					}
					
					// sync the time again, maybe user already click the horn
					retrieveData();
					
					// loop again
					window.setTimeout(function () { countDownTimer() }, 1000);
				}
				headerStatus = null;
			}
			else
			{
				// something wrong, can't even found the header...
				
				// reload the page see if thing get fixed
				window.location.href = "http://apps.facebook.com/mousehunt/";
			}
			headerElement = null;
		}
		else if (enableTrapCheck && checkTime <= 0)
		{
			document.title = "Checking The Trap...";
			if (showTimerInPage)
			{
				nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Checking trap now...";
				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Checking trap now...";
				kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Checking trap now...";
			}
			
			// simulate mouse click on the camp button
			fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
			window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 10000);
		}
		else if (pauseBeforeKing && nextKingTime <= 0)
		{
			document.title = "Pause before King's Reward - Resume after " + timeformat(scriptPauseTimeMax);
			if (showTimerInPage)
			{
				nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> -";
				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> -";
				kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Resume after " + timeformat(scriptPauseTimeMax);
			}
			
			window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, scriptPauseTimeMax * 1000);
		}
		else
		{
			if (enableTrapCheck)
			{
				--hornTime;
				--checkTime;
				--nextKingTime;
				document.title = "Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime);
				if (showTimerInPage)
				{
					nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay)</i>";
					checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>";
					kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> " + timeformat(nextKingTime) + "  <i>(approximately)</i>";
				}
			}
			else
			{
				--hornTime;
				--nextKingTime;
				document.title = "Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime);
				if (showTimerInPage)
				{
					nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay)</i>";
					checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> -";
					kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> " + timeformat(nextKingTime) + "  <i>(approximately)</i>";
				}
			}
			window.setTimeout(function () { (countDownTimer)() }, 1000);
		}
	}
}

function embedTimer()
{
	if (showTimerInPage)
	{
		var headerElement = document.getElementById('app10337532241_noscript');
		if (headerElement)
		{
			var timerDivElement = document.createElement('div');
			
			var hr1Element = document.createElement('hr');
			timerDivElement.appendChild(hr1Element);
			
			var titleElement = document.createElement('div');
			titleElement.setAttribute('id', 'titleElement');
			titleElement.innerHTML = "<b>MouseHunt AutoBot (version 1.9)";
			timerDivElement.appendChild(titleElement);
			
			nextHornTimeElement = document.createElement('div');
			nextHornTimeElement.setAttribute('id', 'nextHornTimeElement');
			nextHornTimeElement.innerHTML = "";
			timerDivElement.appendChild(nextHornTimeElement);
			
			checkTimeElement = document.createElement('div');
			checkTimeElement.setAttribute('id', 'checkTimeElement');
			checkTimeElement.innerHTML = "";
			timerDivElement.appendChild(checkTimeElement);
			
			kingTimeElement = document.createElement('div');
			kingTimeElement.setAttribute('id', 'kingTimeElement');
			kingTimeElement.innerHTML = "";
			timerDivElement.appendChild(kingTimeElement);
			
			var hr2Element = document.createElement('hr');
			timerDivElement.appendChild(hr2Element);
			
			headerElement.parentNode.insertBefore(timerDivElement, headerElement);
		}
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
	
	hr = null;
	min = null;
	sec = null;
	
	return (timeString);
}

function setCookie(c_name, value)
{
	var exdate = new Date();
	var expiredays = 1;
	exdate.setDate(exdate.getDate() + expiredays);
	
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
	
	var exdate = null;
	var expiredays = null;
}

function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return " ";
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
	// chrome
	var div = document.createElement("div");
	div.style.cssText = "width:0 ; height:0 ; position:absolute ; overflow:hidden";
	div.innerHTML = "<input onfocus='this.value=" + variableName + ";' />";
	var input = div.firstChild;
	document.body.appendChild(div);
	input.focus();
	var value = input.value;
	document.body.removeChild(div);
	scrollTo(0,0);
	return value;
}