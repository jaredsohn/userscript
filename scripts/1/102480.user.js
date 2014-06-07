// ==UserScript==
// @name        Fish Wrangler AutoBot
// @author      Ooi Keng Siang
// @version    	1.07
// @namespace   http://ooiks.com/blog/fish-wrangler-autobot
// @description A simple user script to automate the process of catching fish in Fish Wrangler game and many other features.
// @include		http://apps.facebook.com/fishwrangler/*
// @include		https://apps.facebook.com/fishwrangler/*
// @include		https://fish-wrangler.com/fishwrangler_iframe/*
// @include		http://fish-wrangler.com/fishwrangler_iframe/*
// @include		http://fish-wrangler.com/*
// @include		https://fish-wrangler.com/*
// ==/UserScript==

// == Basic User Preference Setting (Begin) ==
// // The variable in this section contain basic option will normally edit by most user to suit their own preference
// // Reload Fish Wrangler page manually if edit this script while running it for immediate effect.

// // Extra delay time before fish (in seconds)
// // Default: 5 - 15
var castTimeDelayMin = 5;
var castTimeDelayMax = 15;

// // Play sound when found treasure chests (true/false)
var isTreasureChestsWarningSound = true;

// // Auto complete the quest if the quest is already 100%
var autoCompleteQuest = true;

// == Basic User Preference Setting (End) ==



// == Advance User Preference Setting (Begin) ==
// // The variable in this section contain some advance option that will change the script behavior.
// // Edit this variable only if you know what you are doing 
// // Reload Fish Wrangler page manually if edit this script while running it for immediate effect.

// // Display timer and message in page title. (true/false)
var showTimerInTitle = true;

// // Embed a timer in page to show next cast time, highly recommanded to turn on. (true/false)
var showTimerInPage = true;

// // Display the last time the page did a refresh or reload. (true/false)
var showLastPageLoadTime = true;

// // Time interval for script timer to update the time. May affact timer accuracy if set too high value. (in seconds)
var timerRefreshInterval = 1;

// == Advance User Preference Setting (End) ==





// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.07";
var nextCastTime = 900;
var castTimeDelay = 0;
var chumQuantity = 0;
var lastTreasureChestsTime;
var foundTreasureChests;
var retryCounter = 0;
var fbPlatform = false;
var fwPlatform = false;

var nextCastTimeElement = null;
var lastTreasureChestsElement = null;
var lastTreasureChestsSumTimeElement = null;
var actionTextElement = null;

// execute script
exeScript();

function exeScript()
{
	if (window.location.href.indexOf("apps.facebook.com/fishwrangler/") != -1)
	{
		// Facebook app, show the script is running in iframe
		/*
		var contentElement = document.getElementById("pagelet_canvas_content");
		if (!contentElement)
		{
			var breakFrameDivElement = document.createElement('div');
			breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
			breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://fish-wrangler.com/fishwrangler_iframe/my'>run Fish Wrangler without iFrame (Facebook)</a> to enable timer on title page";
			contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
		}
		contentElement = undefined;
		*/
		return;
	}
	else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/") != -1)
	{
		fbPlatform = true;
		
		// check if the script has execute successfully or not
		window.setTimeout(function () { checkScript(); }, 3000);
	}
	else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler") != -1)
	{
		fwPlatform = true;
		
		// check if the script has execute successfully or not
		window.setTimeout(function () { checkScript(); }, 3000);
	}

	if (fbPlatform)
	{
		//if ((window.location.href.indexOf("apps.facebook.com/fishwrangler/my") != -1 && window.location.href.indexOf("apps.facebook.com/fishwrangler/mystery-tackle-box") == -1) ||
		//	window.location.href.indexOf("apps.facebook.com/fishwrangler/fw") != -1 ||
		//	window.location.href.indexOf("apps.facebook.com/fishwrangler/start") != -1 ||
		//	window.location.href.indexOf("apps.facebook.com/fishwrangler/item-add") != -1 ||
		//	window.location.href.indexOf("apps.facebook.com/fishwrangler?") != -1)
		if ((window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/my") != -1 && window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/mystery-tackle-box") == -1) ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/fw") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/start") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/fish-now") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/item-add") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/fishwrangler?") != -1)
		{
			// embed a timer on page to show bot status
			embedTimer(true);
			
			// close popup if found any
			closePopup();
			
			// get all the data first
			retrieveData();
			
			// start action
			action();
		}
		else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/restaurant") != -1)
		{
			embedTimer(false);
			restaurantPageAction();
		}
		else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler_iframe/raffle?show-me-the-rlc") != -1)
		{
			// embed a timer on page to show bot status
			embedTimer(true);
			
			// display the message
			displayAction("Go back to home in 60 seconds", "Go back to home in 60 seconds", "-", null);
		
			window.setTimeout(function () { reloadWithMessage("Go back home..."); }, 60000);
		}
		else
		{
			embedTimer(false);
		}
	}
	else if (fwPlatform)
	{
		if ((window.location.href.indexOf("fish-wrangler.com/fishwrangler/my") != -1 && window.location.href.indexOf("fish-wrangler.com/fishwrangler/mystery-tackle-box") == -1) ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler/fw") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler/start") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler/fish-now") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler/item-add") != -1 ||
			window.location.href.indexOf("fish-wrangler.com/fishwrangler?") != -1)
		{
			// embed a timer on page to show bot status
			embedTimer(true);
			
			// close popup if found any
			closePopup();
			
			// get all the data first
			retrieveData();
			
			// start action
			action();
		}
		else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler/restaurant") != -1)
		{
			embedTimer(false);
			restaurantPageAction();
		}
		else if (window.location.href.indexOf("fish-wrangler.com/fishwrangler/raffle?show-me-the-rlc") != -1)
		{
			// embed a timer on page to show bot status
			embedTimer(true);
			
			// display the message
			displayAction("Go back to home in 60 seconds", "Go back to home in 60 seconds", "-", null);
		
			window.setTimeout(function () { reloadWithMessage("Go back home..."); }, 60000);
		}
		else
		{
			embedTimer(false);
		}
	}
}

function checkScript()
{
	// check and see if the script execute on the page
	var tempTitleDivElement = document.getElementById("titleElement");
	if (!tempTitleDivElement)
	{
		++retryCounter;
	
		if (retryCounter <= 5)
		{
			// check again 5 seconds later
			window.setTimeout(function () { checkScript(); }, 5000);
			
			// execute the script again
			exeScript();
		}
		else
		{
			// something is terrible wrong
			document.title = "Script fail to run. Reloading...";
			
			if (fbPlatform)
			{
				window.location.href = "http://fish-wrangler.com/fishwrangler_iframe/my";
			}
			else if (fwPlatform)
			{
				window.location.href = "http://fish-wrangler.com/fishwrangler/my";
			}
		}
	}
	else
	{
		retryCounter = 0;
	}
}

function closePopup()
{
	var jozekInviteDivElement = document.getElementById("app8138090269_jozekInviteOverlay");
	if (jozekInviteDivElement)
	{
		displayAction("Found popup, close it!", "Found popup, close it!", "-", null);
		
		var linkElementList = document.getElementsByTagName('script');
		if (linkElementList)
		{
			var i;
			for (i = 0; i < linkElementList.length; ++i)
			{
				if (linkElementList[i].getAttribute('title') == "Close this popup window?")
				{
					// close popup!
					fireEvent(linkElementList[i], 'click');
					
					break;
				}
			}
			
			linkElementList = null;
		}
		
		jozekInviteDivElement = null;
		
		// call again to close the skip button
		window.setTimeout(function () { closePopup(); }, 1000);
		
		return;
	}
	
	var inviteSkipDivElement = document.getElementById("fb_mfs_container");
	if (inviteSkipDivElement)
	{
		displayAction("Skipping invite friend...", "Skipping invite friend...", "-", null);
		
		// click the skip button
		fireEvent(inviteSkipDivElement.firstChild, 'click');
		
		inviteSkipDivElement = null;
		
		return;
	}
	
	var inputElementList = document.getElementsByTagName('input');
	if (inputElementList)
	{
		var i;
		for (i = 0; i < inputElementList.length; ++i)
		{
			if (inputElementList[i].getAttribute('value') == "Enter FREE Raffle!")
			{
				// Free Raffle
			
				// click the button
				fireEvent(inputElementList[i], 'click');
				inputElementList = null;
				return;
			}
			else if (inputElementList[i].getAttribute('value') == "Thanks!")
			{
				// login daily bonus
			
				// click the button
				fireEvent(inputElementList[i], 'click');
				inputElementList = null;
				return;
			}
		}
	}
}

function retrieveData()
{
	var nextCastSecond = null;
	
	displayAction("Retriving data...", "Retriving data...", "-", null);
	
	var timerElement;
	if (fbPlatform)
	{
		//timerElement = document.getElementById("app8138090269_timer_hidden");
		timerElement = document.getElementById("timer_hidden");
	}
	else if (fwPlatform)
	{
		timerElement = document.getElementById("timer_hidden");
	}
	if (timerElement)
	{
		nextCastSecond = parseInt(timerElement.getAttribute("value"));
		if (nextCastSecond > 0)
		{
			// calculate random delay time
			castTimeDelay = castTimeDelayMin + Math.round(Math.random() * (castTimeDelayMax - castTimeDelayMin));
			
			// total time before next cast
			nextCastTime = nextCastSecond + castTimeDelay;
		}
		else
		{
			nextCastTime = 0;
		}
		timerElement = null;
	}
	
	try
	{
		// this might happen when user can direct sound the horn
		if (nextCastSecond == null)
		{
			// check if the now text is there
			var linkElementList = document.getElementsByTagName('a');
			if (linkElementList)
			{
				var i;
				for (i = 0; i < linkElementList.length; ++i)
				{
					if (linkElementList[i].getAttribute('href').indexOf("/fishwrangler/fish-now") != -1 && linkElementList[i].innerHTML.toString() == "NOW!")
					{
						nextCastSecond = 0;
						castTimeDelay = 0;
						nextCastTime = 0;
						break;
					}
				}
				linkElementList = null;
			}
		}
	}
	catch (e)
	{
		nextCastSecond = 0;
		castTimeDelay = 0;
		nextCastTime = 0;
	}
	
	// get number of chum left
	var chumHeaderElement;
	if (fbPlatform)
	{
		//chumHeaderElement = document.getElementById("app8138090269_header_chum");
		chumHeaderElement = document.getElementById("header_chum");
	}
	else if (fwPlatform)
	{
		chumHeaderElement = document.getElementById("header_chum");
	}
	if (chumHeaderElement)
	{
		var chumQuantityString = chumHeaderElement.childNodes[4].innerHTML.toString();
		
		if (chumQuantityString == "Get Chum")
		{
			chumQuantity = 0;
		}
		else
		{
			chumQuantity = parseInt(chumQuantityString);
			
			// dunno why it can be less than 0
			if (chumQuantity < 0)
			{
				chumQuantity = 0;
			}
		}
		
		chumQuantityString = null;
		chumHeaderElement = null;
	}
	
	// check for treasure
	foundTreasureChests = false;
	var formElementList = document.getElementsByTagName('form');
	if (formElementList)
	{
		var i;
		for (i = 0; i < formElementList.length; ++i)
		{
			if (formElementList[i].getAttribute('action').indexOf("/fishwrangler/my?treasure") != -1)
			{
				foundTreasureChests = true;
				break;
			}
		}
	
		formElementList = null;
	}
	
	if (foundTreasureChests)
	{
		// record last treasure cheasts time
		var nowDate = new Date();
		setStorage("lastTreasureChestsDate", nowDate.toString());
		nowDate = null;
		lastTreasureChestsTime = 0;
	}
	else
	{
		// get last treasure cheasts time
		var lastTreasureChestsDate = getStorage("lastTreasureChestsDate");
		if (lastTreasureChestsDate == null)
		{
			lastTreasureChestsTime = -1;
		}
		else
		{
			var lastDate = new Date(lastTreasureChestsDate);
			lastTreasureChestsTime = parseInt((new Date() - lastDate) / 1000);
			lastDate = null;
		}
	}
}

function action()
{
	displayAction("Taking action...", "Taking action...", "-", null);

	if (foundTreasureChests)
	{
		TreasureChestsAction();
	}
	else if (chumQuantity <= 0)
	{
		displayAction("Out of Chum!", "Out of Chum!", null, null);
	}
	else if (nextCastTime <= 0)
	{
		window.setTimeout(function () { castRod(false); }, 3000);
	}
	else
	{
		countdownTimer();
	}
}

// ################################################################################################
//   Timer Function - Start
// ################################################################################################

function embedTimer(targetPage)
{
	var headerElement = document.getElementsByClassName('thumb h3 center ')[0];
	if (!headerElement)
	{
		headerElement = document.getElementsByClassName('clear_both')[0];
	}
	
	if (headerElement)
	{
		var timerDivElement = document.createElement('div');
		
		var hr1Element = document.createElement('hr');
		timerDivElement.appendChild(hr1Element);
		
		// show bot title and version
		var titleElement = document.createElement('div');
		titleElement.setAttribute('id', 'titleElement');
		titleElement.innerHTML = "<a href=\"http://ooiks.com/blog/category/fish-wrangler-autobot\"><b>Fish Wrangler AutoBot (version " + scriptVersion + ")</b></a>";
		timerDivElement.appendChild(titleElement);
		
		if (targetPage)
		{
			actionTextElement = document.createElement('div');
			actionTextElement.setAttribute('id', 'actionTextElement');
			actionTextElement.innerHTML = "<b>Action:</b> None";
			timerDivElement.appendChild(actionTextElement);
		
			nextCastTimeElement = document.createElement('div');
			nextCastTimeElement.setAttribute('id', 'nextCastTimeElement');
			nextCastTimeElement.innerHTML = "<b>Next Cast Time:</b> Loading...";
			timerDivElement.appendChild(nextCastTimeElement);
			
			var lastTreasureChestsDate = getStorage("lastTreasureChestsDate");
			var lastDateStr;
			if (lastTreasureChestsDate == null)
			{
				lastDateStr = "-";
			}
			else
			{
				var lastDate = new Date(lastTreasureChestsDate);
				lastDateStr = lastDate.toDateString() + " " + lastDate.toTimeString().substring(0, 8);
				lastDate = null;
			}
				
			lastTreasureChestsElement = document.createElement('div');
			lastTreasureChestsElement.setAttribute('id', 'lastTreasureChestsElement');
			lastTreasureChestsElement.innerHTML = "<b>Last Treasure Chest:</b> " + lastDateStr + " ";
			timerDivElement.appendChild(lastTreasureChestsElement);
				
			lastTreasureChestsSumTimeElement = document.createElement('font');
			lastTreasureChestsSumTimeElement.setAttribute('id', 'lastTreasureChestsSumTimeElement');
			lastTreasureChestsSumTimeElement.innerHTML = "";
			lastTreasureChestsElement.appendChild(lastTreasureChestsSumTimeElement);
				
			lastTreasureChestsDate = null;
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
			actionTextElement = document.createElement('div');
			actionTextElement.setAttribute('id', 'actionTextElement');
			actionTextElement.innerHTML = "<b>Action:</b> None";
			timerDivElement.appendChild(actionTextElement);
		
			// player currently navigating other page instead of home
			var helpTextElement = document.createElement('div');
			helpTextElement.setAttribute('id', 'helpTextElement');
			if (fbPlatform)
			{
				//helpTextElement.innerHTML = "<b>Note:</b> Fish Wrangler AutoBot will only run at <a href='http://apps.facebook.com/fishwrangler/my'>Home</a>. This is to prevent the bot from interfering user's activity.";
				helpTextElement.innerHTML = "<b>Note:</b> Fish Wrangler AutoBot will only run at <a href='http://fish-wrangler.com/fishwrangler_iframe/my'>Home</a>. This is to prevent the bot from interfering user's activity.";
			}
			else if (fwPlatform)
			{
				helpTextElement.innerHTML = "<b>Note:</b> Fish Wrangler AutoBot will only run at <a href='http://fish-wrangler.com/fishwrangler/my'>Home</a>. This is to prevent the bot from interfering user's activity.";
			}
			timerDivElement.appendChild(helpTextElement);
			helpTextElement = null;
		}
		
		var hr2Element = document.createElement('hr');
		timerDivElement.appendChild(hr2Element);
		
		// embed all msg to the page
		headerElement.parentNode.insertBefore(timerDivElement, headerElement);
		headerElement = null;
	}
	else
	{
		// something go wrong
		document.title = "Fail to find headerElement!";
	}
}

function countdownTimer()
{
	// reduce by 1
	nextCastTime -= timerRefreshInterval;
	if (lastTreasureChestsTime != -1)
	{
		lastTreasureChestsTime += timerRefreshInterval;
	}

	if (nextCastTime > 0)
	{
		displayAction("Cast: " + timeformat(nextCastTime), 
			"Waiting for next cast...", 
			timeformat(nextCastTime) + "  <i>(included extra " + timeformat(castTimeDelay) + " delay)</i>", 
			timeFormatLong(lastTreasureChestsTime));
		
		// call this again after that
		window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
	}
	else
	{
		displayAction("Preparing to cast rod...", 
			"Preparing to cast rod...", 
			timeformat(nextCastTime) + "  <i>(included extra " + timeformat(castTimeDelay) + " delay)</i>", 
			timeFormatLong(lastTreasureChestsTime));
		
		// cast the rod and see what we got!
		castRod(false);
	}
}

function displayAction(title, action, castTime, treasureChestsSumTime)
{
	if (showTimerInPage)
	{
		actionTextElement.innerHTML = "<b>Action:</b> " + action;
	
		if (castTime != null && nextCastTimeElement != null)
		{
			nextCastTimeElement.innerHTML = "<b>Next Cast Time:</b> " + castTime;
		}
		
		if (treasureChestsSumTime != null)
		{
			if (lastTreasureChestsSumTimeElement != null)
			{
				lastTreasureChestsSumTimeElement.innerHTML = "(" + treasureChestsSumTime + ")";
			}
			else
			{
				lastTreasureChestsSumTimeElement.innerHTML = "";
			}
		}
	}
	
	if (showTimerInTitle)
	{
		if (title)
		{
			document.title = title;
		}
	}
}

function displayTimer(title, nextCastTime)
{
	if (showTimerInTitle)
	{
		document.title = title;
	}
	
	if (showTimerInPage)
	{
		nextCastTimeElement.innerHTML = "<b>Next Cast Time:</b> " + nextCastTime;
	}
	
	title = null;
	checkTime = null;
}

function displayTreasureChestsSumTime(timeStr)
{
	if (timeStr)
	{
		lastTreasureChestsSumTimeElement.innerHTML = "(" + timeStr + ")";
	}
	else
	{
		lastTreasureChestsSumTimeElement.innerHTML = "";
	}
}

// ################################################################################################
//   Timer Function - End
// ################################################################################################



// ################################################################################################
//   Treasure Chests Function - Start
// ################################################################################################

function TreasureChestsAction()
{
	displayAction("Treasure chests found!", "Treasure chests found!", "-", null);

	// record last treasure cheasts time
	var nowDate = new Date();
	setStorage("lastTreasureChestsDate", nowDate.toString());
	nowDate = null;
	lastTreasureChestsTime = 0;
	
	// play music if needed
	if (isTreasureChestsWarningSound)
	{
		var browser = browserDetection();
		
		if (browser == "chrome")
		{
			var soundElement = document.createElement("div");
			soundElement.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			document.body.appendChild(soundElement);
			soundElement = null;
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
			window.setTimeout(function () { TreasureChestsAction() }, 214000);
		}
		
		browser = null;
	}
	
	// random select a treasure chests for player
	var selection = 1 + Math.round(Math.random() * 2);
	var tcInpuElementList = document.getElementsByTagName('input');
	if (tcInpuElementList)
	{
		var i;
		for (i = 0; i < tcInpuElementList.length; ++i)
		{
			if (tcInpuElementList[i].getAttribute('name') == "treasure" && 
				tcInpuElementList[i].getAttribute('type') == "radio" && 
				tcInpuElementList[i].getAttribute('value') == selection)
			{
				checkRadioInput(tcInpuElementList[i]);
				break;
			}
		}
		i = null;
		tcInpuElementList = null;
	}
	selection = null;
	
	// focus on the captch text box
	var captchInpuElementList = document.getElementsByTagName('input');
	if (captchInpuElementList)
	{
		var i;
		for (i = 0; i < captchInpuElementList.length; ++i)
		{
			if (captchInpuElementList[i].getAttribute('name') == "text" && 
				captchInpuElementList[i].getAttribute('type') == "text" && 
				captchInpuElementList[i].getAttribute('class') == "huge inputtext")
			{
				captchInpuElementList[i].focus();
				break;
			}
		}
		i = null;
		captchInpuElementList = null;
	}
}

// ################################################################################################
//   Treasure Chests - Start
// ################################################################################################



// ################################################################################################
//   Quest Function - Start
// ################################################################################################

function completeQuest()
{
	if (autoCompleteQuest)
	{
		var questDivElement = document.getElementsByClassName('pad m c lh onh')[0];
		if (questDivElement)
		{
			/*
			var questNameDivElement = questDivElement.childNodes[3];
			if (questNameDivElement)
			{
				var QuestProgressDivElement = questNameDivElement.childNodes[1];
				if (QuestProgressDivElement)
				{
					// QuestProgressDivElement.innerHTML.toString() == " (100%)"
				}
			}
			*/
			
			var questCompleteDivElement = questDivElement.childNodes[6];
			if (questCompleteDivElement)
			{
				var questCompleteLinkElement = questCompleteDivElement.childNodes[1];
				if (questCompleteLinkElement)
				{
					if (questCompleteLinkElement.innerHTML.toString() == "Drop off catches to complete!")
					{
						displayAction("Completing the quest", "Completing the quest", null, null);
			
						setBotAction("Completing Quest");
			
						clickLink(questCompleteLinkElement);
					}
				}
			}
		}
	}
}

function restaurantPageAction()
{
	if (autoCompleteQuest && getBotAction() == "Completing Quest")
	{
		setBotAction("Home");
		backToHome();
	}
}

// ################################################################################################
//   Quest Function - End
// ################################################################################################



// ################################################################################################
//   Daily FLC Raffle Function - Start
// ################################################################################################

function checkDailyFLCRaffle()
{
	var nextRaffleDateStr = getStorage("nextRaffleTimeDate");
	if (nextRaffleDateStr == null)
	{
		
	}
	else
	{
		var nextRaffleDate = new Date(nextRaffleDateStr);
	}
}

function pickNumberInFLCRaffle()
{
	var linkElementList = document.getElementsByTagName('a');
	if (linkElementList)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			if (linkElementList[i].getAttribute('href') == "?show-me-the-rlc#rafflina-bumbalina-gimme-da-goods")
			{
				displayAction("Let's pick a number!", "Let's pick a number!", "-", null);
				clickLink(linkElementList[i]);
				break;
			}
		}
	}
}

// ################################################################################################
//   Daily FLC Raffle Function - End
// ################################################################################################



// ################################################################################################
//   Common Function - Start
// ################################################################################################

var botAction = null;

function getBotAction()
{
	if (botAction == null)
	{
		botAction = getStorage("botAction");
		if (botAction == null)
		{
			botAction = "Home";
			setStorage("botAction", action);
		}
	}
	
	return (botAction);
}

function setBotAction(action)
{
	botAction = action;
	setStorage("botAction", action);
}

function backToHome()
{
	var linkElementList = document.getElementsByTagName('a');
	if (linkElementList)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			if (linkElementList[i].getAttribute('tooltip') == "Home" && linkElementList[i].getAttribute('title') == "My Setup")
			{
				displayAction("Going back to home", "Going back to home", "-", null);
			
				clickLink(linkElementList[i]);
				break;
			}
		}
		i = null;
		linkElementList = null;
	}
}

function reloadWithMessage(msg)
{
	// display the message
	displayAction(msg, msg, null, null);
	
	if (fbPlatform)
	{
		//window.location.href = "http://apps.facebook.com/fishwrangler/my";
		window.location.href = "http://fish-wrangler.com/fishwrangler_iframe/my";
	}
	else if (fwPlatform)
	{
		window.location.href = "http://fish-wrangler.com/fishwrangler/my";
	}
}

function castRod(urlCast)
{
	displayAction("Looking for fishing rod...", "Looking for fishing rod...", "-", null);

	// check if the time is ready
	var timeDivElement;
	if (fbPlatform)
	{
		//timeDivElement = document.getElementById("app8138090269_timer_div");
		timeDivElement = document.getElementById("timer_div");
	}
	else if (fwPlatform)
	{
		timeDivElement = document.getElementById("timer_div");
	}
	if (timeDivElement)
	{
		var innerElement = timeDivElement.firstChild;
		if (innerElement.innerHTML.indexOf("<a") != -1)
		{
			displayAction("Cast the rod!", "Cast the rod!", "-", null);
			
			clickLink(innerElement.firstChild);
		}
		else
		{
			// time not ready yet
			displayAction("Some one steal our fishing rod!", "Some one steal our fishing rod!", "-", null);
		}
		innerElement = null;
		timeDivElement = null;
	}
	else
	{
		// in some case the app8138090269_timer_div might not included, we check for NOW! keyword then
		var linkElementList = document.getElementsByTagName('a');
		if (linkElementList)
		{
			var i;
			for (i = 0; i < linkElementList.length; ++i)
			{
				// found the link with NOW! keyword
				if (linkElementList[i].innerHTML.toString() == "NOW!" && linkElementList[i].getAttribute('href').indexOf("/fishwrangler/fish-now") != -1)
				{
					displayAction("Cast the rod!", "Cast the rod!", "-", null);
					
					clickLink(linkElementList[i]);
					
					break;
				}
			}
			linkElementList = null;
		}
	}
}

// ################################################################################################
//   Common Function - End
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

function clickLink(linkElement)
{
	if (linkElement)
	{
		/*
		if (document.createEventObject)
		{
			// dispatch for IE
			var evt = document.createEventObject();
			linkElement.fireEvent('onclick', evt)
		}
		else
		{
			// dispatch for firefox + others
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("click", true, true );
			linkElement.dispatchEvent(evt);
		}
		*/
		
		var cancelled = false;
		if (document.createEvent) 
		{
			var event = document.createEvent("MouseEvents");
			event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			cancelled = !linkElement.dispatchEvent(event);
		}
		else if (linkElement.fireEvent) 
		{
			cancelled = !linkElement.fireEvent("onclick");
		}

		if (!cancelled) 
		{
			// automaticall use url cast rod after 3 seconds just in case the rod was not casted properly
			var urlAddress = linkElement.getAttribute('href').toString();
			var target = linkElement.getAttribute('target').toString();
			if (urlAddress.indexOf("http") == -1)
			{
				if (fbPlatform)
				{
					if (window.location.href.indexOf("https://") != -1)
					{
						urlAddress = "https://fish-wrangler.com" + urlAddress;
					}
					else
					{
						urlAddress = "https://fish-wrangler.com" + urlAddress;
					}
				}
				else if (fwPlatform)
				{
					if (window.location.href.indexOf("https://") != -1)
					{
						urlAddress = "https://fish-wrangler.com" + urlAddress;
					}
					else
					{
						urlAddress = "http://fish-wrangler.com" + urlAddress;
					}
				}
			}
			
			if (target.toString() == "_parent")
			{
				window.setTimeout(function () { parent.change_parent_url(urlAddress); }, 3000);
			}
			else
			{
				window.setTimeout(function () { window.location.href = urlAddress; }, 3000);
			}
		}
	}
}

function embedScript()
{
    // create a javascript to to enable iframe child to control parent page location
    var scriptNode = document.createElement('script');
	scriptNode.setAttribute('id', 'scriptNode');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.innerHTML = '														\
		function change_parent_url(url)												\
		{																			\
			window.location.href = url;												\
		}																			\
		';
	
	var headerElement = document.getElementsByTagName("head")[0];
	if (headerElement)
	{
		headerElement.appendChild(scriptNode);
		scriptNode = null;
		headerElement = null;
		
		document.title = "Bot: Embed script!";
	}
	else
	{
		document.title = "Bot: Fail to embed script!";
	}
}

function checkRadioInput(element)
{
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !element.dispatchEvent(evt);
}

function setStorage(name, value)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		window.localStorage.setItem(name, value);
	}
}

function removeStorage(name)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		window.localStorage.removeItem(name);
	}
}

function getStorage(name)
{
	// check if the web browser support HTML5 storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		return (window.localStorage.getItem(name));
	}
}

// ################################################################################################
//   General Function - End
// ################################################################################################
