// ==UserScript==
// @name          Facebook - Levynlight
// @namespace     http://apps.facebook.com/levynlight/
// @description   testing
// @include       http://apps.facebook.com/levynlight/*
// @include       http://apps.new.facebook.com/levinlight/*
// @include       http://www.facebook.com/common/error.html
// ==/UserScript==

//Random delay of blowing after the actual horn blowing time
var mhDelay_min = 3;                      // minimum delay in seconds
var mhDelay_max = 33;                     // maximum delay in seconds

//Random delay of checking after the actual trap checking time
var tcDelay_min = 5;                      // minimum delay in seconds
var tcDelay_max = 15;                     // maximum delay in seconds

//Random delay between King's reward captcha checking
var krDelay_min = 30;                     // minimum delay in minutes
var krDelay_max = 60;                     // maximum delay in minutes

//Random delay between profile page refreshing
var poDelay_min = 60;                     // minimum delay in minutes
var poDelay_max = 90;                    // maximum delay in minutes

//Sound warning when player get king reward
var SoundWarning = false;   // change this to FALSE if player dont want
//   to be warned with sound.



mhDelay_max = mhDelay_max - mhDelay_min;
tcDelay_max = Math.round( (tcDelay_max - tcDelay_min) / 3);
tcDelay_min = Math.round(tcDelay_min / 3);

var myHTML = document.body.innerHTML;
var outOfBait = false;
var kingsReward = false;
var today= new Date();
var CurrentMinute  = today.getMinutes();
var CurrentSecond = today.getSeconds();
var CurrentTime = CurrentMinute * 60 + CurrentSecond;
var timeTillTrapCheck = 3600 - CurrentTime + (Math.round(Math.random() * tcDelay_max) + tcDelay_min) * 3;
var waitMinimum = 90;
var mhTitle = document.title;
var lastHorn //= -1;
var mhCounter = 0;
//GM_setValue("counter", mhCounter);
const pathname = "/mousehunt/index.php"

function gatherInfo() {
	// horn time
	var hornTime = document.body.innerHTML.indexOf("next_activeturn_seconds");
	timeTillHorn = parseInt(document.body.innerHTML.substring(hornTime+26,hornTime+29));
	lastHorn = timeTillHorn;
	
	// current location
	if (mhCounter == 0) {
		if (document.getElementById('app10337532241_hud_location') != null)
			curlocation = document.getElementById('app10337532241_hud_location').innerHTML;
	}
	else {
		//alert(unsafeWindow.a10337532241_user.location)
		curlocation = unsafeWindow.a10337532241_user?unsafeWindow.a10337532241_user.location:-1;
	}
	
	
}

function gatherTime()
{	
	mhCounter++;
	//GM_setValue("counter", mhCounter);
	
	timeTillHorn = unsafeWindow.a10337532241_user?unsafeWindow.a10337532241_user.next_activeturn_seconds:-1;
	if (timeTillHorn >= 0 && timeTillHorn != lastHorn)
	{			
		lastHorn=timeTillHorn;
		mainFunc();
	}
	else{

		setTimeout(function(){gatherTime();}, 3000);
   }
	
}


function HornWhenNeeded ()
{
	if (timeTillHorn > 0 && timeTillTrapCheck > 0)
	{	
		document.title = FormatCountDown(timeTillHorn--) + " -Horn- " 
		+ FormatCountDown(timeTillTrapCheck--) + " -Check Trap- "
		+ "      | " + mhTitle;
		window.setTimeout(function () { (HornWhenNeeded)() }, 1000);
	}
	else if (timeTillHorn <= 0)
	{
		document.title = "Blowing The Horn ...    | " + mhTitle;
		var play = document.getElementsByClassName('hornbutton')[0].firstChild;
		var evt = play.ownerDocument.createEvent('MouseEvents');
		evt.initMouseEvent('click',true,true,play.ownerDocument.defaultView, 1,
						   0, 0, 0, 0, false, false, false,false, 0, null);
		play.dispatchEvent(evt);
		setTimeout(function() { (gatherTime)(); } , 5000)
	}
	else
	{
		document.title = "Checking The Trap ...    | " + mhTitle;
		window.location.href = "http://apps.facebook.com/levynlight/";
	}
}

function tillRefresh()
{	
	if (timeTillRefresh > 0 )
	{
		document.title = "Blew Horn... Refreshing in " +
		FormatCountDown(timeTillRefresh--) + "       | " + mhTitle;
		window.setTimeout(function() { (tillRefresh)() }, 1000);
	}
	else if (timeTillRefresh == 0)
	{ 
		setTimeout(function() { window.location.href = "http://apps.facebook.com/levynlight/" }, 1000) 
	}
}

function FormatCountDown (time)
{
	if (!time) return false;
	if (isNaN(parseInt(time))) return time;
	
	var	hour = parseInt(time / 3600);
	var	remaining_time = time % 3600;
	var	min = parseInt(remaining_time / 60);
	var	sec = remaining_time % 60;
	var   appearance = "";
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;
	if (sec <= 0)
	{
		if (min <= 0)
		{
			if (hour > 0) appearance = hour + "h";
		}
		else if (hour > 0) appearance = hour + "h " + min + "m";
		else appearance = min + "m";      
	}
	else
	{
		if (hour <= 0)
		{
			if (min > 0) appearance = min + "m " + sec + "s";
			else appearance = sec + " s";
		}
		else appearance = hour + "h " + min + "m " + sec + "s";
	}
	remaining_time=null;hour=null;min=null;sec=null;
	return appearance;
	
}


gatherInfo();
mainFunc();