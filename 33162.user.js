// Punch
// Punch an annoying mobster for up to 36 hours.
// Copyright (c) 2008, Escritore Rebelde
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Se voce quiser comunicar comigo: Escritore Rebelde em gmail ponto com
// 
// ==UserScript==
// @name           Punch
// @namespace      http://userscripts.org/users/65268
// @description    Punch a given user for up to 36 hours
// @include        http://apps.facebook.com/mobwars/profile/*
// ==/UserScript==

// TO DO:
// Add punch list

// Version string
var version = 'V1.0'

// Keep the traffic down - only need to check 2 - 3 times an hour
var secondsBetweenUpdates = 20 * 60;

var mobsterId = '000000000000';
var mobsterName = 'Tom Servo';

//-----------------------------------------------------------------------------
// Jarett's Script Update Checker
// http://userscripts.org/scripts/show/20145
//
var version_scriptNum = 33162;
var version_timestamp = 1223315606095;
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);


//-----------------------------------------------------------------------------
var Utility = new Object();

Utility.SetMaximumPunchTime = function ( maximumPunchTime )
{
	return GM_setValue ( 'Punch' + mobsterId + 'maximumPunchTime', maximumPunchTime );
}

Utility.GetMaximumPunchTime = function()
{
	return GM_getValue ( 'Punch' + mobsterId + 'maximumPunchTime', 36 );
}

Utility.ClearPunchStartTime = function()
{
	return GM_setValue ( 'Punch' + mobsterId + 'StartTime', 0 );
}

Utility.SetPunchStartTime = function()
{
	return GM_setValue ( 'Punch' + mobsterId + 'StartTime', this.now() );
}

Utility.GetPunchTimeLeft = function()
{
	var timeLeft = 0;
	var startTime = GM_getValue ( 'Punch' + mobsterId + 'StartTime', 0 );
	if ( startTime > 0 )
	{
		timeLeft = ( this.GetMaximumPunchTime() * 60 * 60 ) - (this.now() - startTime);
	}
	return timeLeft;
}

Utility.now = function()
{
	return Math.floor(new Date().getTime() / 1000);
}


//-----------------------------------------------------------------------------
var Page = new Object();

Page.init = function() 
{
	// URL will be something like
	// http://apps.facebook.com/mobwars/profile/?user_id=1234567890
	var url = location.href;

	// Get the mobster's user id
	var parts = location.href.split('/');
	if ( parts[4] == 'profile' )
	{
		parts = parts[5].split('=');
		if ( parts[0].substr(0,1) == '?' )
		{
			mobsterId = parts[1];
		}
	}
	
	// Then the mobster's name
	var div = document.getElementById ( 'app8743457343_content' );
	if ( div )
	{
		var h1Name = div.getElementsByTagName('h1')[0];
		if ( h1Name )
		{
			parts = h1Name.innerHTML.split('"');
			if ( parts[1] )
			{
				mobsterName = parts[1];
			}
		}
	}
}


Page.GetPunchLink = function()
{
	var div = document.getElementById ( 'app8743457343_content' );
	if ( div )
	{
		var punchLinks = div.getElementsByTagName ( 'a' );
		for ( var ii = 0; ii < punchLinks.length; ii++ )
		{
			var aLink = punchLinks[ii];
			if ( aLink.text == 'punch in face' )
			{
				Menu.update ( 'Punching!', 0 );
				return aLink.href;
			}
		}
	}
	
	return null;
}


Page.PrepareToPunch = function()
{
	if ( Utility.GetPunchTimeLeft() > 0 )
	{
		var punchHref = Page.GetPunchLink();
		if ( punchHref != null )
		{
			// Start by trying to punch
			Timer.nextAction = 'punch';
			Timer.start ( 10 );
		}
		else
		{			
			// No punch - just wait around to reload
			Timer.nextAction = 'reload';
			setTimeout ( Timer.start, 1000, secondsBetweenUpdates );
		}
	}
	else
	{
		Menu.update ( 'Done Punching.', 0 );
	}
}


//-----------------------------------------------------------------------------
var Menu = new Object();

Menu.init = function() 
{
	var menuCode = new Array();
	menuCode.push('<div class="punchMenuHeader">*** Punch! ' + version + ' ***</div>');
	menuCode.push('<br />');
	menuCode.push('<div class="punchMenuStatus">');
	menuCode.push('<span id="msMobsterName"></span><br />');
	menuCode.push('<span id="msMobsterId"></span><br />');
	menuCode.push('<span id="msPunchTimeLeft"></span><br />');
	menuCode.push('<span id="msState"></span><br />');
	menuCode.push('<span id="msTimer"></span><br />');
	menuCode.push('</div>');
	menuCode.push('<br />');
	menuCode.push('<div class="punchMenuParameters">');
	menuCode.push('<label for="msMaxTime">Max Time: ');
	menuCode.push('<input id="msMaxTime" type="text" maxlength="2" size="2"');
	menuCode.push('value="' + Utility.GetMaximumPunchTime() + '"/>');
	menuCode.push('Hours</label><br />');
	menuCode.push('</div>');
	menuCode.push('<br />');
	menuCode.push('<div class="punchMenuButtons">');
	menuCode.push('<button type="button" id="msPunchButton">Start Punching!</button>');
	menuCode.push('<br />');
	menuCode.push('<button type="button" id="msStopButton">STOP!</button>');
	menuCode.push('</div>');
	
	var menu = document.createElement('div');
	menu.id = 'punchMenu';
	menu.innerHTML = menuCode.join ( '\n' );
	menuCode.length = 0;

	menuCode.push('#punchMenu { z-index: 10; position:fixed; bottom:27px; ');
	menuCode.push('right:2px; ');
	menuCode.push('border:2px solid #E08080; background-color:#F8F8F8; color:#0000FF; padding:2px; font-weight:bold; }');
	menuCode.push('#punchMenu div.punchMenuHeader { text-align:center; background: #E08080; color: #FFFFFF; }');
	menuCode.push('#punchMenu div.punchMenuStatus { color:#0000FF; border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid;}');
	menuCode.push('#punchMenu div.punchMenuButtons { text-align:center; }');

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = menuCode.join ( '' );

	try { document.getElementsByTagName('head')[0].appendChild(style); }
	catch(e) {}
	document.body.insertBefore ( menu, document.body.lastChild );

	// Add listeners to the buttons
	var aButton = document.getElementById ( 'msPunchButton' );
	aButton.addEventListener ( 'click', this.StartPunching, true );
	aButton = document.getElementById ( 'msStopButton' );
	aButton.addEventListener ( 'click', this.StopPunching, true );
}

Menu.update = function ( punchState, secondsLeft ) 
{
	var span = document.getElementById ( 'msMobsterName' );
	span.innerHTML = mobsterName;

	span = document.getElementById ( 'msMobsterId' );
	span.innerHTML = mobsterId;

	var punchTimeLeft = Utility.GetPunchTimeLeft();
	span = document.getElementById ( 'msPunchTimeLeft' );
	span.innerHTML = 'Time Left: ' + this.SecToStr ( punchTimeLeft );

	// Set the state message
	span = document.getElementById ( 'msState' );
	span.innerHTML = punchState;

	// Set the timer field
	span = document.getElementById ( 'msTimer' );
	span.innerHTML = 'in: ' + this.SecToStr ( secondsLeft );
	
	// Disable msMaxTime if active
	var textBox = document.getElementById ( 'msMaxTime' );
	textBox.value = Utility.GetMaximumPunchTime();
	if ( punchTimeLeft > 0 )
	{
		textBox.disabled = true;
		var aButton = document.getElementById ( 'msPunchButton' );
		aButton.disabled = true;
		var aButton = document.getElementById ( 'msStopButton' );
		aButton.disabled = false;
	}
	else
	{
		textBox.disabled = false;
		var aButton = document.getElementById ( 'msPunchButton' );
		aButton.disabled = false;
		var aButton = document.getElementById ( 'msStopButton' );
		aButton.disabled = true;
	}
}

Menu.StartPunching = function()
{
	var textBox = document.getElementById ( 'msMaxTime' );
	if ( textBox.value > 0 && textBox.value <= 36 )
	{
		Utility.SetMaximumPunchTime ( textBox.value );
		Utility.SetPunchStartTime();
		Page.PrepareToPunch();
	}
	else
	{
		alert ( 'Punch time must be more than 0 and less than or equal to 36 hours!' );
	}
}

Menu.StopPunching = function()
{
	Utility.ClearPunchStartTime();
	Menu.update ( 'Stopped!', 0 );
}

Menu.SecToStr = function ( seconds )
{
	// Convert seconds to string '00:00:00'
	var sec = seconds;
	var str = '0' + (sec % 60);
	str = str.substr(str.length-2,2);
	
	sec = Math.floor(sec / 60);
	str = '0' + (sec % 60) + ':' + str;
	str = str.substr(str.length-5,5);

	sec = Math.floor(sec / 60);
	str = '0' + sec + ':' + str;
	str = str.substr(str.length-8,8);
	
	return str;
}


//-----------------------------------------------------------------------------
Timer            = new Object();
Timer.nextAction = 'nothing';

Timer.start = function ( secondsLeft ) 
{
	// Did we time out?
	if ( secondsLeft <= 0 )
	{
		// Punch or reload
		if ( Timer.nextAction == 'punch' )
		{
			var punchHref = Page.GetPunchLink();
			if ( punchHref != null )
			{
				location.href = punchHref;
			}
			else
			{			
				// No punch - just wait around to reload
				Timer.nextAction = 'reload';
				setTimeout ( Timer.start, 1000, secondsBetweenUpdates );
			}
		}
		else
		{
			// If we got here, it means we didn't find the button.
			window.location.reload();
		}
	}
	else if ( Utility.GetPunchTimeLeft() > 0 )
	{
		// No - sleep for another second
		secondsLeft--;
		Menu.update ( 'Waiting to ' + Timer.nextAction + '...', secondsLeft );
		setTimeout ( Timer.start, 1000, secondsLeft );
	}
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

// Initialize variables
Page.init();

// Init the menu
Menu.init();

// Prepare to punch!
Page.PrepareToPunch();

