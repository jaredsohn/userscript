// ==UserScript==
// @name        SoundCloud Continuous Play Disable/Enable Switch 
// @namespace   http://www.technowise.in
// @author      Technowise
// @description Adds switch to Disable or Enable Continuous Play in SoundCloud.
// @include     http://www.soundcloud.com/*
// @include     https://www.soundcloud.com/*
// @include     http://soundcloud.com/*
// @include     https://soundcloud.com/*
// @grant    	GM_getValue
// @grant    	GM_setValue
// @grant       GM_addStyle
// @version     0.41
// ==/UserScript==
//-------------------------------------------------------------------------------------------
var sc_cp = {};
sc_cp.JQ = null;
sc_cp.lastTitle = null;
sc_cp.userSwitchedPlay = false;
sc_cp.status =  GM_getValue("continuous_play", 'on');
if( typeof sc_cp.status == 'undefined')
{
	sc_cp.status = 'on';//keep continous play on by default.
	GM_setValue("continuous_play", 'on');
}

sc_cp.checkTitleInterval = null;
GM_wait();
function myMain()
{	
	sc_cp.lastTitle = sc_cp.JQ("a.playbackTitle:first").attr("title");
		
	if( sc_cp.status == 'off' )
	{
		sc_cp.checkTitleInterval = setInterval(checkTitle, 900);
	}

	sc_cp.JQ(".sc-button-play, .skipControl, .sound__waveform").live("click", function()
	{
		sc_cp.userSwitchedPlay = true;
		sc_cp.lastTitle = sc_cp.JQ("a.playbackTitle:first").attr("title");
	});
	setTimeout(generateSwitch, 2000);//Setup the switch after 2 seconds from page load.
}

function checkTitle()
{	
	titleNow = sc_cp.JQ(".playbackTitle a:first").text();
	if( typeof sc_cp.lastTitle != 'undefined' && titleNow != sc_cp.lastTitle  && sc_cp.userSwitchedPlay != true )
	{
		sc_cp.lastTitle = titleNow;
		sc_cp.JQ(".playControl.playing").click();//Pause the track. (Do not autoplay next track you smart nut SoundCloud!).
	}
	else
	if( sc_cp.userSwitchedPlay )//silently change the sc_cp.lastTitle.
	{
	   sc_cp.lastTitle = titleNow;
	}
	sc_cp.userSwitchedPlay = false;
}

function GM_wait() 
{	
    if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait, 200);
	}
    else 
    { 
		sc_cp.JQ = unsafeWindow.jQuery;
        myMain();
	}
}

function generateSwitch()
{
    var switch_html = '<button id="cp_onoffswitch"></button>';
	if( sc_cp.JQ("#cp_onoffswitch").length == 0 )
	{
		sc_cp.JQ(".header__playbackControl.header__playbackControls").append( switch_html );
	}
	//Add styles to our little switch.
	GM_addStyle("#cp_onoffswitch{ background-image: url(https://lh3.googleusercontent.com/-2FoUAfVvMIQ/UvDDELiWZjI/AAAAAAAAB2s/ikY1xmkXlK0/h120/cpi.png);\
	background-position: 0 -64px;\
	background-color: transparent;\
	margin-top:7px;\
	vertical-align:top;\
	width:32px;\
	height:32px;\
	border:none; border-radius:50%;}");
	GM_addStyle("#cp_onoffswitch.selected{background-position: 0 -32px;}");	
	GM_addStyle(".header__farRight{width: 375px;}");//make space for the button on header.
	GM_addStyle("#cp_onoffswitch{transition: background-color 0.3s;}");
	GM_addStyle("#cp_onoffswitch:hover{background-color: #222;}");

	if( sc_cp.status == 'on' )
	{
		sc_cp.JQ("#cp_onoffswitch").addClass("selected");
	}
	else
	{
		sc_cp.checkTitleInterval = setInterval(checkTitle, 900);
	}
	sc_cp.JQ("#cp_onoffswitch").click( toggleContinuousPlay );
	sc_cp.JQ("#cp_onoffswitch.selected").attr("title", "Click to turn Off Continuous play");
	sc_cp.JQ("#cp_onoffswitch").not(".selected").attr("title", "Click to turn On Continuous play");	
};

function toggleContinuousPlay(event)
{
	setTimeout(toggleSwitchState, 10);//Timeout Required for GM_setValue and GM_getValue functions to work.	
	return true;
}

function toggleSwitchState()
{
	
	if( sc_cp.status == 'on')//Switch off continous play now
	{
		sc_cp.status = 'off';
		sc_cp.checkTitleInterval = setInterval(checkTitle, 900);
	}
	else//Switch on continous play now.
	{
		sc_cp.status = 'on';
		clearInterval(sc_cp.checkTitleInterval);			
	}

	GM_setValue("continuous_play", sc_cp.status);
	sc_cp.JQ("#cp_onoffswitch").toggleClass("selected");
	sc_cp.JQ("#cp_onoffswitch.selected").attr("title", "Click to turn Off Continuous play");
	sc_cp.JQ("#cp_onoffswitch").not(".selected").attr("title", "Click to turn On Continuous play");
}
