// ==UserScript==
 // @name        MouseHunt AutoBot
 // @author      CWPRO
-// @version 1.18
+// @version 1.19
 // @namespace   http://www.ooiks.com/mini-projects/mousehunt-autobot
 // @description An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features.
 // @include		http://mousehunt.hi5.hitgrab.com/*
 // @include		http://mousehuntgame.com/*
 // @include		http://www.mousehuntgame.com/*
+// @include http://apps.facebook.com/mousehunt/*
+// @include http://hi5.com/friend/games/MouseHunt*
 // ==/UserScript==
 
 
@@ -18,11 +20,13 @@
 // // Reload MouseHunt page manually if edit this script while running it for immediate effect.
 
 // // Extra delay time before sounding the horn. (in seconds)
+// // Default: 5 - 180
 var hornTimeDelayMin = 5;
 var hornTimeDelayMax = 180;
 
 // // Ignore all safety measure such as check horn image visible before sounding it. (true/false)
-// // Highly recommanded to turn off because it increase the chances of getting caugh in botting.
+// // Note: Highly recommanded to turn off because it increase the chances of getting caugh in botting.
+// // Note: It may take a little bit extra of CPU processing power.
 var aggressiveMode = false;
 
 // // Enable trap check once an hour. (true/false)
@@ -67,22 +71,13 @@
 // // Note: You may not access some option like pause at invalid location if you turn this off.
 var showTimerInPage = true;
 
-// // Interval time between two King's Reward, use in King's Reward related calculation. (in seconds)
-var kingTimeIntervalMin = 7200;
-
-// // Pause the script before it encounter King's Reward (true/false)
-// // Pause before King's Reward might not totally prevent player from encounter King's Reward,
-// // if user modify the King's Reward interval time or run the script half way (played mousehunt before in other computer within few hour before)
-var pauseBeforeKing = false;
-
-// // Duration of pausing the script before resume the script when pause before King's Reward (in seconds)
-// // Note: It only take effect is pauseBeforeKing = true;
-var pauseBeforeKingTimeWaitMax = 18000;
-
-// // The script will pause if player at different location that hunt location set before (true/false)
-// // Make sure you set showTimerInPage to true in order to know what is happening.
+// // The script will pause if player at different location that hunt location set before. (true/false)
+// // Note: Make sure you set showTimerInPage to true in order to know what is happening.
 var pauseAtInvalidLocation = false;
 
+// // Display the last time the page did a refresh or reload. (true/false)
+var showLastPageLoadTime = true;
+
 // // Default time to reload the page when bot encounter error. (in seconds)
 var errorReloadTime = 60;
 
@@ -98,16 +93,16 @@
 // WARNING - Do not modify the code below unless you know how to read and write the script.
 
 // All global variable declaration and default value
-var scriptVersion = "1.18";
-var fbPlatform
+var scriptVersion = "1.19";
+var fbPlatform = false;
 var hiFivePlatform = false;
 var mhPlatform = false;
 var hornTime = 900;
 var hornTimeDelay = 0;
 var checkTimeDelay = 0;
 var isKingReward = false;
-var nextKingTime = kingTimeIntervalMin;
-var kingPauseTime = kingPauseTimeMax;
+var lastKingRewardSumTime;
+var kingPauseTime;
 var baitQuantity = -1;
 var huntLocation;
 var currentLocation;
@@ -122,6 +117,7 @@
 var nextHornTimeElement;
 var checkTimeElement;
 var kingTimeElement;
+var lastKingRewardSumTimeElement;
 var optionElement;
 var travelElement;
 
@@ -141,6 +137,35 @@
 		enableTrapCheck = false;
 	}
 	
+ if (showTimerInTitle)
+ {
+ // check if they are running in iFrame
+ if (window.location.href.indexOf("apps.facebook.com/mousehunt/") != -1)
+ {
+ var contentElement = document.getElementById('iframe_canvas');
+ if (contentElement)
+ {
+ var breakFrameDivElement = document.createElement('div');
+ breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
+ breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://www.mousehuntgame.com/canvas/'>run MouseHunt without iFrame (Facebook)</a> to enable timer on title page";
+ contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
+ }
+ contentElement = null;
+ }
+ else if (window.location.href.indexOf("hi5.com/friend/games/MouseHunt") != -1)
+ {
+ var contentElement = document.getElementById('apps-canvas-body');
+ if (contentElement)
+ {
+ var breakFrameDivElement = document.createElement('div');
+ breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
+ breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://mousehunt.hi5.hitgrab.com/'>run MouseHunt without iFrame (Hi5)</a> to enable timer on title page";
+ contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
+ }
+ contentElement = null;
+ }
+ }
+
 	// check user running this script from where
 	if (window.location.href.indexOf("mousehuntgame.com/canvas/") != -1)
 	{
@@ -165,13 +190,11 @@
 			window.location.href.indexOf("mousehuntgame.com/canvas/index.php") != -1 ||
 			window.location.href.indexOf("mousehuntgame.com/canvas/turn.php") != -1 ||
 			window.location.href.indexOf("mousehuntgame.com/canvas/?ref=ts") != -1 ||
- window.location.href.indexOf("mousehuntgame.com/canvas/?ref=bookmarks") != -1)
+ window.location.href.indexOf("mousehuntgame.com/canvas/?ref=bookmarks") != -1 ||
+ window.location.href.indexOf("mousehuntgame.com/canvas/?code=") != -1)
 		{
 			// page to execute the script!
 		
- // check if the page don't have resume button, if got just click on it.
- if (!checkResumeButton())
- {
 				// this is the page to execute the script
 				if (retrieveDataFirst())
 				{
@@ -188,7 +211,6 @@
 					window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
 				}
 			}
- }
 		else
 		{
 			// not in huntcamp, just show the title of autobot version
@@ -204,9 +226,6 @@
 		{
 			// page to execute the script!
 		
- // check if the page don't have resume button, if got just click on it.
- if (!checkResumeButton())
- {
 				// this is the page to execute the script
 				if (retrieveDataFirst())
 				{
@@ -223,7 +242,6 @@
 					window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
 				}
 			}
- }
 		else
 		{
 			// not in huntcamp, just show the title of autobot version
@@ -240,9 +258,6 @@
 		{
 			// page to execute the script!
 		
- // check if the page don't have resume button, if got just click on it.
- if (!checkResumeButton())
- {
 				// this is the page to execute the script
 				if (retrieveDataFirst())
 				{
@@ -259,7 +274,6 @@
 					window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
 				}
 			}
- }
 		else
 		{
 			// not in huntcamp, just show the title of autobot version
@@ -297,22 +311,24 @@
 				
 				if (!aggressiveMode)
 				{
- var additionalDelayTime = Math.ceil(nextActiveTime * 0.02);
+ // calculation base on the js in Mousehunt
+ //var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
+ var additionalDelayTime = 0;
 				
 					// need to found out the mousehunt provided timer interval to determine the additional delay
 					var timerIntervalStartIndex = scriptString.indexOf("hud.timer_interval");
 					if (timerIntervalStartIndex >= 0)
 					{
- // same for both facebook and hi5
 						timerIntervalStartIndex += 21;
 						var timerIntervalEndIndex = scriptString.indexOf(";", timerIntervalStartIndex);
 						var timerIntervalString = scriptString.substring(timerIntervalStartIndex, timerIntervalEndIndex);
 						var timerInterval = parseInt(timerIntervalString);
 						
- if (timerInterval == 1)
- {
- additionalDelayTime = 2;
- }
+ // calculation base on the js in Mousehunt
+ //if (timerInterval == 1)
+ //{
+ // additionalDelayTime = 2;
+ //}
 						
 						timerIntervalStartIndex = null;
 						timerIntervalEndIndex = null;
@@ -404,31 +420,6 @@
 			today = null;
 		}
 	
- // get next king's reward time
- var nowDate = (new Date()).getTime();
- var lastKingRewardDate = getCookie("lastKingReward");
- if (lastKingRewardDate == " ")
- {
- setCookie("lastKingReward", nowDate, 1);
- nextKingTime = kingTimeIntervalMin;
- }
- else
- {
- var timeLeft = kingTimeIntervalMin - parseInt((nowDate - lastKingRewardDate) / 1000);
- if (timeLeft < 0)
- {
- setCookie("lastKingReward", nowDate, 1);
- nextKingTime = kingTimeIntervalMin;
- }
- else
- {
- nextKingTime = timeLeft;
- }
- timeLeft = null;
- }
- nowDate = null;
- lastKingRewardDate = null;
-
 		// get last location
 		var huntLocationCookie = getCookie("huntLocation");
 		if (huntLocationCookie == " ")
@@ -443,6 +434,19 @@
 		}
 		huntLocationCookie = null;
 		
+ // get last king reward time
+ var lastKingRewardDate = getCookie("lastKingRewardDate");
+ if (lastKingRewardDate == " ")
+ {
+ lastKingRewardSumTime = -1;
+ }
+ else
+ {
+ var lastDate = new Date(lastKingRewardDate);
+ lastKingRewardSumTime = parseInt((new Date() - lastDate) / 1000);
+ lastDate = null;
+ }
+
 		retrieveSuccess = true;
 	}
 	else
@@ -460,24 +464,6 @@
 
 function retrieveData()
 {
- // check if the tiny mouse is there
- var imgElementList = document.getElementsByTagName('img');
- if (imgElementList)
- {
- var i;
- for (i = 0; i < imgElementList.length; ++i)
- {
- // data timed out
- if (imgElementList[i].getAttribute('src') == 'http://mousehunt.facebook.hitgrab.com/images/ui/splash/tiny_230.jpg')
- {
- // the tiny mouse is there (data fetch fail), reload the page!
- window.setTimeout(function () { reloadWithMessage("Data timed out. Reloading...", false); }, 5000);
- }
- }
- i = null;
- }
- imgElementList = null;
-
 	// get next horn time
 	hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
 	var nextActiveTime;
@@ -534,11 +520,13 @@
 	
 		if (!aggressiveMode)
 		{
- var additionalDelayTime = Math.ceil(nextActiveTime * 0.02);
- if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1)
- {
- additionalDelayTime = 2;
- }
+ // calculation base on the js in Mousehunt
+ var additionalDelayTime = 0;
+ //var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
+ //if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1)
+ //{
+ // additionalDelayTime = 2;
+ //}
 			
 			// safety mode, include extra delay like time in horn image appear
 			hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
@@ -574,16 +562,31 @@
 	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
 	{
 		// update timer
- displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
- displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
+ displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
+
+ if (fbPlatform)
+ {
+ displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
+ }
+ else if (hiFivePlatform)
+ {
+ displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
+ }
+ else if (mhPlatform)
+ {
+ displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
+ }
+
+ displayKingRewardSumTime(null);
 		
 		// pause script
 	}
 	else if (baitQuantity == 0)
 	{
 		// update timer
- displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
+ displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
 		displayLocation(huntLocation);
+ displayKingRewardSumTime(null);
 		
 		// pause the script
 	}
@@ -627,10 +630,15 @@
 	if (isKingReward)
 	{
 		// update timer
- displayTimer("King's Reward!", "-", "-", "Now!");
+ displayTimer("King's Reward!", "King's Reward!", "King's Reward");
+ displayKingRewardSumTime("Now");
 		
- // record king's reward time
- setCookie("lastKingReward", "", -1);
+
+ // record last king's reward time
+ var nowDate = new Date();
+ setCookie("lastKingRewardDate", nowDate.toString(), 1);
+ nowDate = null;
+ lastKingRewardSumTime = 0;
 		
 		// reload the page so that the sound can be play
 		// simulate mouse click on the camp button
@@ -642,7 +650,7 @@
 	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
 	{
 		// update timer
- displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
+ displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
 		if (fbPlatform)
 		{
 			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
@@ -655,14 +663,16 @@
 		{
 			displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
 		}
+ displayKingRewardSumTime(null);
 		
 		// pause script
 	}
 	else if (baitQuantity == 0)
 	{
 		// update timer
- displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
+ displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
 		displayLocation(huntLocation);
+ displayKingRewardSumTime(null);
 		
 		// pause the script
 	}
@@ -673,13 +683,19 @@
 			// update time
 			hornTime -= timerRefreshInterval;
 			checkTime -= timerRefreshInterval;
- nextKingTime -= timerRefreshInterval;
+ if (lastKingRewardSumTime != -1)
+ {
+ lastKingRewardSumTime += timerRefreshInterval;
+ }
 		}
 		else
 		{
 			// update time
 			hornTime -= timerRefreshInterval;
- nextKingTime -= timerRefreshInterval;
+ if (lastKingRewardSumTime != -1)
+ {
+ lastKingRewardSumTime += timerRefreshInterval;
+ }
 		}
 	
 		if (hornTime <= 0)
@@ -692,11 +708,6 @@
 			// trap check!
 			trapCheck();
 		}
- else if (pauseBeforeKing && nextKingTime <= 0)
- {
- kingPauseTime = pauseBeforeKingTimeWaitMax;
- countdownPauseTimer();
- }
 		else
 		{
 			if (enableTrapCheck)
@@ -704,17 +715,15 @@
 				// update timer
 				if (!aggressiveMode)
 				{
- displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime),
+ displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime),
 						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
- timeformat(checkTime) + " <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>",
- timeformat(nextKingTime) + " <i>(approximately)</i>");
+ timeformat(checkTime) + " <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
 				}
 				else
 				{
- displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime),
+ displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime),
 						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
- timeformat(checkTime) + " <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>",
- timeformat(nextKingTime) + " <i>(approximately)</i>");
+ timeformat(checkTime) + " <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
 				}
 			}
 			else
@@ -722,50 +731,46 @@
 				// update timer
 				if (!aggressiveMode)
 				{
- displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime),
+ displayTimer("Horn: " + timeformat(hornTime),
 						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
- "-",
- timeformat(nextKingTime) + " <i>(approximately)</i>");
+ "-");
+
+ //
+ //if (hornTime % timerRefreshInterval == 0)
+ //{
+ //
+ //}
 				}
 				else
 				{
- displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime),
+ displayTimer("Horn: " + timeformat(hornTime),
 						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
- "-",
- timeformat(nextKingTime) + " <i>(approximately)</i>");
- }
- }
- window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
- }
- }
-}
+ "-");
 
-function countdownPauseTimer()
-{
- if (pauseBeforeKing)
+ // agressive mode should sound the horn whenever it is possible to do so.
+ var headerElement = document.getElementById('header');
+ if (headerElement)
 	{
- kingPauseTime -= timerRefreshInterval;
-
- if (kingPauseTime <= 0)
+ // the horn image appear before the timer end
+ if (headerElement.getAttribute('class').indexOf("hornready") != -1)
 		{
- // update timer
- displayTimer("Pause before King's Reward - Resuming...", "-", "-", "Pause before King's Reward - Resuming...");
+ // who care, blow the horn first!
+ soundHorn();
 			
- // simulate mouse click on the camp button
- fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
+ headerElement = null;
 			
- // reload the page if click on the camp button fail
- window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
+ // skip all the code below
+ return;
 		}
- else
- {
- // update timer
- displayTimer("Pause before King's Reward - Resume in " + timeformat(kingPauseTime),
- "-",
- "-",
- "Resume in " + timeformat(kingPauseTime));
+ }
+ headerElement = null;
+ }
+ }
+
+ // set king reward sum time
+ displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));
 			
- window.setTimeout(function () { (countdownPauseTimer)() }, timerRefreshInterval * 1000);
+ window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
 		}
 	}
 }
@@ -808,66 +813,53 @@
 				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Loading...";
 				timerDivElement.appendChild(checkTimeElement);
 				
- kingTimeElement = document.createElement('div');
- kingTimeElement.setAttribute('id', 'kingTimeElement');
- kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Loading...";
- timerDivElement.appendChild(kingTimeElement);
-
- // get pause before king value
- var pauseBeforeKingCookie = getCookie("pauseBeforeKing");
- if (pauseBeforeKingCookie == " ")
- {
- setCookie("pauseBeforeKing", pauseBeforeKing, 90);
- }
- else
+ if (pauseAtInvalidLocation)
 				{
- pauseBeforeKing = (pauseBeforeKingCookie == 'true') ? true : false;
- setCookie("pauseBeforeKing", pauseBeforeKing, 90);
+ // location information only display when enable this feature
+ travelElement = document.createElement('div');
+ travelElement.setAttribute('id', 'travelElement');
+ travelElement.innerHTML = "<b>Target Hunt Location:</b> Loading...";
+ timerDivElement.appendChild(travelElement);
 				}
- pauseBeforeKingCookie = null;
 				
- // show option for pause before king's reward
- optionElement = document.createElement('div');
- optionElement.setAttribute('id', 'optionElement');
- if (pauseBeforeKing)
- {
- if (fbPlatform)
- {
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
- }
- else if (hiFivePlatform)
- {
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
- }
- else if (mhPlatform)
+ var lastKingRewardDate = getCookie("lastKingRewardDate");
+ var lastDateStr;
+ if (lastKingRewardDate == " ")
 					{
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://mousehuntgame.com/'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
- }
+ lastDateStr = "-";
 				}
 				else
 				{
- if (fbPlatform)
- {
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://www.mousehuntgame.com/canvas/'>Disable</a>]";
+ var lastDate = new Date(lastKingRewardDate);
+ lastDateStr = lastDate.toDateString() + " " + lastDate.toTimeString().substring(0, 8);
+ lastDate = null;
 					}
- else if (hiFivePlatform)
- {
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://mousehunt.hi5.hitgrab.com/'>Disable</a>]";
- }
- else if (mhPlatform)
- {
- optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://mousehuntgame.com/'>Disable</a>]";
- }
- }
- timerDivElement.appendChild(optionElement);
 				
- if (pauseAtInvalidLocation)
+ kingTimeElement = document.createElement('div');
+ kingTimeElement.setAttribute('id', 'kingTimeElement');
+ kingTimeElement.innerHTML = "<b>Last King's Reward:</b> " + lastDateStr + " ";
+ timerDivElement.appendChild(kingTimeElement);
+
+ lastKingRewardSumTimeElement = document.createElement('font');
+ lastKingRewardSumTimeElement.setAttribute('id', 'lastKingRewardSumTimeElement');
+ lastKingRewardSumTimeElement.innerHTML = "(Loading...)";
+ kingTimeElement.appendChild(lastKingRewardSumTimeElement);
+
+ lastKingRewardDate = null;
+ lastDateStr = null;
+
+ if (showLastPageLoadTime)
 				{
- // location information only display when enable this feature
- travelElement = document.createElement('div');
- travelElement.setAttribute('id', 'travelElement');
- travelElement.innerHTML = "<b>Hunt Location:</b> Loading...";
- timerDivElement.appendChild(travelElement);
+ var nowDate = new Date();
+
+ // last page load time
+ var loadTimeElement = document.createElement('div');
+ loadTimeElement.setAttribute('id', 'loadTimeElement');
+ loadTimeElement.innerHTML = "<b>Last Page Load: </b>" + nowDate.toDateString() + " " + nowDate.toTimeString().substring(0, 8);
+ timerDivElement.appendChild(loadTimeElement);
+
+ loadTimeElement = null;
+ nowDate = null;
 				}
 			}
 			else
@@ -907,7 +899,7 @@
 	}
 }
 
-function displayTimer(title, nextHornTime, checkTime, kingTime)
+function displayTimer(title, nextHornTime, checkTime)
 {
 	if (showTimerInTitle)
 	{
@@ -918,13 +910,11 @@
 	{
 		nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + nextHornTime;
 		checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + checkTime;
- kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> " + kingTime;
 	}
 	
 	title = null;
 	nextHornTime = null;
 	checkTime = null;
- kingTime = null;
 }
 
 function displayLocation(locStr)
@@ -935,6 +925,18 @@
 	}
 }
 
+function displayKingRewardSumTime(timeStr)
+{
+ if (timeStr)
+ {
+ lastKingRewardSumTimeElement.innerHTML = "(" + timeStr + ")";
+ }
+ else
+ {
+ lastKingRewardSumTimeElement.innerHTML = "";
+ }
+}
+
 function timeformat(time)
 {
 	var timeString;
@@ -963,6 +965,42 @@
 	return (timeString);
 }
 
+function timeFormatLong(time)
+{
+ var timeString;
+
+ if (time != -1)
+ {
+ var day = Math.floor(time / 86400);
+ var hr = Math.floor((time % 86400) / 3600);
+ var min = Math.floor((time % 3600) / 60);
+
+ if (day > 0)
+ {
+ timeString = day.toString() + " day " + hr.toString() + " hr " + min.toString() + " min ago";
+ }
+ else if (hr > 0)
+ {
+ timeString = hr.toString() + " hr " + min.toString() + " min ago";
+ }
+ else if (min > 0)
+ {
+ timeString = min.toString() + " min ago";
+ }
+
+ time = null;
+ day = null;
+ hr = null;
+ min = null;
+ }
+ else
+ {
+ timeString = null;
+ }
+
+ return (timeString);
+}
+
 function setCookie(c_name, value, expiredays)
 {
 	var exdate = new Date();
@@ -1047,7 +1085,7 @@
 		for (i = 0; i < linkElementList.length; ++i)
 		{
 			// check if it is a resume button
- if (linkElementList[i].getAttribute('src') == "http://www.mousehuntgame.com/images/ui/buttons/resume_hunting_blue.gif")
+ if (linkElementList[i].getAttribute('src').indexOf("resume_hunting_blue.gif") != -1)
 			{
 				// found resume button
 				
@@ -1075,7 +1113,7 @@
 function kingRewardAction()
 {
 	// update timer
- displayTimer("King's Reward!", "-", "-", "Now!");
+ displayTimer("King's Reward!", "King's Reward", "King's Reward!");
 	displayLocation("-");
 		
 	// play music if needed
@@ -1096,16 +1134,32 @@
 	}
 		
 	// focus on the answer input
- var answerElement;
- document.getElementById('puzzle_answer');
- if (answerElement)
+ var inputElementList = document.getElementsByTagName('input');
+ if (inputElementList)
+ {
+ var i;
+ for (i = 0; i < inputElementList.length; ++i)
+ {
+ // check if it is a resume button
+ if (inputElementList[i].getAttribute('name') == "puzzle_answer")
 	{
- answerElement.focus();
+ inputElementList[i].focus();
+ break;
+ }
+ }
+ i = null;
 	}
- answerElement = null;
+ inputElementList = null;
+
+ // record last king's reward time
+ var nowDate = new Date();
+ setCookie("lastKingRewardDate", nowDate.toString(), 1);
+ nowDate = null;
 		
- // remove king's reward time
- setCookie("lastKingReward", "", -1);
+ if (kingPauseTimeMax <= 0)
+ {
+ kingPauseTimeMax = 1;
+ }
 
 	kingPauseTime = kingPauseTimeMax;
 	kingRewardCountdownTimer();
@@ -1113,12 +1167,20 @@
 
 function kingRewardCountdownTimer()
 {
+ if (reloadKingReward)
+ {
 	kingPauseTime -= timerRefreshInterval;
+ }
+
+ if (lastKingRewardSumTime != -1)
+ {
+ lastKingRewardSumTime += timerRefreshInterval;
+ }
 	
 	if (kingPauseTime <= 0)
 	{
 		// update timer
- displayTimer("King's Reward - Reloading...", "-", "-", "King's Reward - Reloading...");
+ displayTimer("King's Reward - Reloading...", "Reloading...", "Reloading...");
 		
 		// simulate mouse click on the camp button
 		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
@@ -1128,20 +1190,28 @@
 	}
 	else
 	{
+ if (reloadKingReward)
+ {
 		// update timer
 		displayTimer("King's Reward - Reload in " + timeformat(kingPauseTime), 
- "-",
- "-",
- "Reload in " + timeformat(kingPauseTime));
+ "Reloading in " + timeformat(kingPauseTime),
+ "Reloading in " + timeformat(kingPauseTime));
+ }
+
+ // set king reward sum time
+ displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));
 			
+ if (!checkResumeButton())
+ {
 		window.setTimeout(function () { (kingRewardCountdownTimer)() }, timerRefreshInterval * 1000);
 	}	
 }
+}
 
 function trapCheck()
 {
 	// update timer
- displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...", "Checking trap now...");
+ displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...");
 	
 	// simulate mouse click on the camp button
 	fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
@@ -1153,7 +1223,7 @@
 function soundHorn()
 {
 	// update timer
- displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
+ displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
 	
 	if (!aggressiveMode)
 	{
@@ -1170,7 +1240,7 @@
 				// found the horn image, let's sound the horn!
 				
 				// update timer
- displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");
+ displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");
 				
 				// simulate mouse click on the horn
 				fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
@@ -1183,7 +1253,7 @@
 				// some one just sound the horn...
 				
 				// update timer
- displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
+ displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
 				
 				// load the new data
 				window.setTimeout(function () { afterSoundingHorn() }, 5000);
@@ -1193,7 +1263,7 @@
 				// no horn appear!?!
 				
 				// update timer
- displayTimer("Synchronizing Data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...");
+ displayTimer("Synchronizing Data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...");
 				
 				// sync the time again, maybe user already click the horn
 				retrieveData();
@@ -1237,7 +1307,7 @@
 			// seen like the horn is not functioning well
 			
 			// update timer
- displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");
+ displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");
 			
 			// simulate mouse click on the horn
 			fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
@@ -1263,7 +1333,7 @@
 			// the horn is already sound, but the network seen to slow on fetching the data
 			
 			// update timer
- displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");
+ displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");
 			
 			// increase the horn retry counter and check if the script is caugh in loop
 			++hornRetry;
@@ -1286,7 +1356,7 @@
 			// everything look ok
 			
 			// update timer
- displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");
+ displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");
 			
 			// reload data
 			retrieveData();