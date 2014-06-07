// ==UserScript==
// @name           Ghost Trappers - Simple Autohunt
// @author         GTDevsSuck
// @namespace      Original versions by Jaryl & iispyderii
// @version        1.22
// @description    Easy and simple autohunt script for the Ghost Trappers Facebook Game
// @include        http://www.ghost-trappers.com/fb/*
// @include        http://www.facebook.com/ghost-trappers/*
// @exclude        http://www.ghost-trappers.com/fb/live_feed*
// @history        1.22 ::: Fixed white page refresh error
// @history        1.21 ::: Stops when bait is less than 10
// @history        1.12 ::: Pointer to captcha box
// @history        1.10 ::: Included notif when Captcha
// @history        1.01 ::: Excluded livefeed page
// @history        1.00 ::: Edited from FB - Ghost Trappers Smart Autohunt V2 ::: Made Very Easy
// ==/UserScript==



// This is a simple and easy to use Ghost Trappers auto-hunting script for Chrome and Firefox browsers.
//
// Use this script adequately and you should be fine. SO do NOT be hunting 24 hours straight and DO take short "breaks".
// Keep one page open when using this script, many pages will try to hunt many times.
// Do not screenshot showing the tab title.
//
// Please rate and share, everyone needs to play GT like the top 100+ do. 
// Only share with ones you trust and never admit to using it if confronted.
//
// Changes made to the script: 
// 
// Added a Captcha notifier.
// Fixed the error with hover over icon dropdown menus on Chrome.
// Refreshes in 1 minute when maintenance message shows.
// Changed the title of tabs to more short "Hunting in ..." and "Captcha".
// Autocaptcha disabled (it was not working so you do not get caught).
// Removed useless/not working content: Monster assist, Daily Clicks, and Menu/Settings details at the top of every page.
// 
// Here is a really good script for auto livefeed assist: 
// http://userscripts.org/scripts/show/153781
// 
// And this is the best script for Mousehunt hunting: 
// http://userscripts.org/scripts/show/78731
// 
// This Script has been edited from the very popular autohunt script: 
// FB - Ghost Trappers Smart Autohunt V2 [by iispyderii & Jaryl].
//
// To install in Firefox or Chrome follow the instructions under the "Install" button.

/************ Hunting *************/

var TitleOver = ""
var drinkcount = document.getElementById('profile_whisky_quantity').textContent

if (document.body.innerHTML.match(/doing maintenance/))
{
window.setTimeout(function () {window.location.href = "http://www.ghost-trappers.com/fb/camp.php"}, 60000);
TitleOver = "Maintenance, Refreshing in 1 minute";
}
else
if(document.getElementsByName("captcha_id")[0])
{
	var key1 = document.getElementsByName('captcha_entered_text')[0]; 
    key1.focus();
    key1.select();
	TitleOver = "Captcha" ;
	/*document.getElementsByName("captcha_entered_text").focus();*/
	setTimeout(function() {alert("Captcha has arrived!")} , 8500);;
}
else
if (drinkcount < 10)
{
	alert("Fart. You are short on bait.");
	TitleOver = "REFILL! Low Potions" ;
}
else
{
	var link = document.getElementById('topHuntActive').firstElementChild.href
	
	if(link != -1)
	{ 	
		if (document.getElementById('topHuntSeconds') != null)
			{
				var minutesid = document.getElementById('topHuntMinutes').innerHTML
				var secondsid = document.getElementById('topHuntSeconds').innerHTML
			} 
			else if (document.getElementById('topHuntMinutes') == null)
			{
				var minutesid = '0'
				var secondsid = '0'
			}
			
			
			minutes = parseInt(minutesid, 10);
			seconds = parseInt(secondsid, 10);
			timeoutvalue = (minutes * 60 + seconds + 1) * 1000;
			//datefinished = new Date()
			//datefinished.setMilliseconds(datefinished.getMilliseconds() + timeoutvalue)
			
			if (minutes <= 0 && seconds <= 0)
			{
				document.location = link;
			}
			else
			{
				setTimeout(function() {document.location = link;} , timeoutvalue);
			}
	}
	else
	{
		TitleOver = "Something's up, Refreshing in 5 minutes";
		setTimeout(function() {document.location = 'http://www.ghost-trappers.com/fb/camp.php';}, 300000);
	}
	
}
UpdateTitle()



/************************* Titles *************************/

function UpdateTitle()
{
	if (TitleOver == ""){
		if (document.getElementById('topHuntMinutes') != null)
		{
			var minutesid = document.getElementById('topHuntMinutes').innerHTML
			var secondsid = document.getElementById('topHuntSeconds').innerHTML
		} 
		else if (document.getElementById('topHuntMinutes') == null)
		{
			var minutesid = '0'
			var secondsid = '0'
		}
		
		var mins = parseInt(minutesid, 10);
		var secs = parseInt(secondsid, 10);
		
		if (mins < 10)
		{mins = "0" + mins;}
		if (secs < 10)
		{secs = "0" + secs;}
		
		document.title = "Hunting in " + mins + ':' + secs;
	}
	else
	{
		document.title = TitleOver
	}
	setTimeout(UpdateTitle, 1000);
}


/******
//         http://www.ghost-trappers.com/fb/camp*
//         http://www.ghost-trappers.com/fb/hunt*
//        http://www.ghost-trappers.com/fb/captcha*
******/
