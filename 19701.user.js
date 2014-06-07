// Video Focus v1.1.4
// Released July 15th 2008
// Copyright (c) 2008, Eric Grossinger
// E-mail : psycadelik@yahoo.com
// Source : http://userscripts.org/scripts/show/19701
// Status Page : http://docs.google.com/View?docID=df8kjzj6_7gtkb2hdp&revision=_latest&hgd=1
// Stats Page : http://videofocus.webhop.net/
// My Blog : http://psycad007.live.spaces.com
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// Requirements : Firefox 2.0 or better and Greasemonkey
//
// To install this script, you need Greasemonkey : 
// http://greasemonkey.mozdev.org/
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Video Focus", and click Uninstall.
//-----------------------------------------------------------------------
// Updates History :
//-----------------------------------------------------------------------
// v1.1.4 (07/15/2008) :
//  - Added Atom.com
//  - Added Dalealplay.com
//  - Added MediaBum.com
//  - Fixed AOL
//  - Fixed BrightCove
//  - Fixed Crackle.com
//  - Fixed Ding.tv
//  - Fixed Flurl.com
//  - Fixed FunnyJunk.com
//  - Fixed Hulu.com partially
//  - Fixed MySpace.com
//  - Fixed Veoh.com
//  - Fixed Vidiac.com
//
// v1.1.3 (06/17/2008) :
//  - Created Status table (see script page on userscripts.org)
//  - Fixed most of the broken sites (see Status table)
//  - Added Video.AOL.com
//  - Added GameSpot.com
//  - Added Jokeroo.com
//
// v1.1.2 (06/09/2008) :
//  - Fixed YouTube scaling
//  - Fixed TinyPic (not focusing images anymore)
//  - Added CrunchyRoll.com
//
// v1.1.1 (04/25/2008) :
//  - Improved layout, centering the video whenever the browser is resized, no more white parts
//  - Fixed YouTube (removed small line above the video when scaled)
//  - Fixed 404(s) (download, search..  server IP has changed, switched to dyndns.org to resolve the issue)
//  - Fixed Video.Yahoo.com
//  - Fixed AvatarChapters.org
//  - Fixed DailyMotion.com
//  - Fixed Metacafe.com
//  - Fixed Spike.com/iFilm
//  - Fixed Crackle.com
//  - Added 56.com
//  - Added Bofunk.com (scalable)
//  - Added ClipFish.de (scalable)
//  - Added ClipLife.jp (scalable)
//  - Added ClipJunkie.com (scalable)
//  - Added DingTV.com (scalable)
//  - Added DoubleAgent.com (sometimes scalable)
//  - Added eSnips.com (scalable)
//  - Added Flurl.com (scalable)
//  - Added FunnyJunk.com (scalable)
//  - Added HallPass.com (scalable)
//  - Added HowCast.com (scalable)
//  - Added IndiaFM.com (scalable)
//  - Added iShare.RedIff.com
//  - Added Tubearoo.com
//  - Added Ku6.com
//  - Added Izlesene.com
//  - Added LiveVideo.com

// v1.1.0 (04/10/2008) :
//  - Added Autoplay on/off (GM Menu, YouTube only, more sites later)
//  - Added Search Box (upper right corner, can be toggled on/off)
//  - Download Videos from the GM Menu (YouTube, MySpace, Veoh, Metacafe, iFilm, Blip.tv, Break, LiveLeak, Jumpcut)
//  - Fixed YouTube (stopped working)

// v1.0.9 (03/20/2008) :
//  - Added BrightCove.com (scalable)
//  - Added Flixya.com (scalable)
//  - Added LuLu.tv (scalable)
//  - Added StupidVideos.com (scalable)
//  - Added Vidiac.com (scalable)
//  - Added ZippyVideos.com (scalable)
//  - Shoutbox removed
//
// v1.0.8 (02/27/2008) :
//  - Added 5min.com (scalable)
//  - Added AniBoom.com
//  - Added ClipShack.com (scalable)
//  - Added Current.com (scalable)
//  - Added Dave.TV (scalable)
//  - Added ExpertVillage.com
//  - Added FunnyOrDie.com (scalable)
//  - Added GoFish.com (scalable)
//  - Added Kewego.fr
//  - Added Revver.com (scalable)
//  - Added a Shoutbox (can be toggled on/off)
//
// v1.0.7 (02/14/2008) :
//  - Added TinyPic.com
//  - Added PhotoBucket.com
//  - Added Guba.com
//  - Added GameTrailers.com (scalable)
//  - Added Megavideo.com
//  - Added Clipmoon.com
//  - Added Snotr.com (scalable)
//
// v1.0.6 (02/13/2008) :
//  - Added Fancast.com
//  - Added Hulu.com (scalable)
//
// v1.0.5 (02/11/2008) :
//  - Fixed YouTube (country specific address)
//  - Fixed Auto-Update (when undefined version is found)
//
// v1.0.4 (02/05/2008) :
//  - Updated Veoh (video scale)
//  - Added weekly auto-update check, or manual (external Auto-Update script (2296) not required anymore.)
//  - Moved the links (Text ad, Download) away from the video screen
//  - Fixed Metacafe (centered, video scale)
//
// v1.0.3 (01/21/2008) :
//	- Added Auto-Update (self auto-update in 1.0.4)
//  - Added Video Scale setting (from the menu)
//  - Added deviantART.com
//  - Updated YouTube (video scale)
//  - Updated MySpace (video scale)
//  - Updated Glumbert (video scale, comments)
//
// v1.0.2 (01/11/2008) :
//	- Fixed Stage6 (white screen)
//
// v1.0.1 (01/09/2008) :
// 	- Added options (resize, bgcolor, comments, related videos)
//
// --------------------------------------------------------------------
// ==UserScript==
// @name			Video Focus
// @namespace		VideoFocus
// @description		Watch online videos without any distractions like ads, chats, comments, etc.. Available options : Auto browser resize, custom background color, comments on/off, related videos on/off. Compatible Sites : More than 80 video sharing sites.
// @exclude			http://96.20.168.206:8080/*
// @exclude			http://psycadelik.dyndns.org:8080/*
// @include			*56.com/*
// @include			*5min.com/*
// @include			*aniboom.com/*
// @include			*atom.com/*
// @include			*avatarchapters.*
// @include			*blip.tv/*
// @include			*bofunk.com/*
// @include			*break.com/*
// @include			*brightCove.com/*
// @include			*brightcove.tv/*
// @include			*buzznet.com/*
// @include			*clipfish.*
// @include			*clipjunkie.com/*
// @include			*cliplife.*
// @include			*clipmoon.com/*
// @include			*clipshack.com/*
// @include			*collegehumor.com/*
// @include			*crackle.com/*
// @include			*crunchyroll.com/*
// @include			*current.com/*
// @include			*dailymotion.com/*
// @include			*dalealplay.com/*
// @include			*dave.tv/*
// @include			*deviantart.com/*
// @include			*dingtv.com/*
// @include			*doubleagent.com/*
// @include			*esnips.com/*
// @include			*expertvillage.com/*
// @include			*eyespot.com/*
// @include			*fancast.com/*
// @include			*flixya.com/*
// @include			*flurl.com/*
// @include			*funnyjunk.com/*
// @include			*funnyordie.com/*
// @include			*gamespot.com/*
// @include			*gametrailers.com/*
// @include			*glumbert.com/*
// @include			*gofish.com/*
// @include			*guba.com/*
// @include			*hallpass.com/*
// @include			*howcast.com/*
// @include			*hulu.com/*
// @include			*ifilm.com/*
// @include			*imeem.com/*
// @include			*indiafm.com/*
// @include			*ishare.rediff.com/*
// @include			*izlesene.com/*
// @include			*jokeroo.com/*
// @include			*jumpcut.com/*
// @include			*kewego.*
// @include			*liveleak.com/*
// @include			*livevideo.com/*
// @include			*lulu.tv/*
// @include			*mediabum.com/*
// @include			*megavideo.com/*
// @include			*metacafe.com/*
// @include			*myspace.*
// @include			*narutomagic.com/*
// @include			*photobucket.com/*
// @include			*pornotube.com/*
// @include			*putfile.com/*
// @include			*qubetv.tv/*
// @include			*revver.com/*
// @include			*snotr.com/*
// @include			*spankwire.com/*
// @include			*spike.com/* 
// @include			*stupidvideos.com/*
// @include			*tinypic.com/*
// @include			*tubearoo.com/*
// @include			*veoh.com/*
// @include			*video.aol.com/*
// @include			*video.google.*
// @include			*video.yahoo.*
// @include			*vidiac.com/*
// @include			*vimeo.com/*
// @include			*vmix.com/*
// @include			*youare.tv/*
// @include			*youporn.com/*
// @include			*youtube.com/*
// @include			*zippyvideos.com/*

// ==/UserScript==

function ShowAbout() { alert("Thank you for using VideoFocus!\r\nGM Script written by PsyCadelik\r\ne-mail: psycadelik@yahoo.com"); }

GM_registerMenuCommand("About VideoFocus..", ShowAbout);
GM_registerMenuCommand("Configure VideoFocus", Config);
GM_registerMenuCommand("Search Videos..", SearchVideos);
GM_registerMenuCommand("VF->Toggle Resize On/Off", ToggleResize);
GM_registerMenuCommand("VF->Toggle Comments On/Off", ToggleComments);
GM_registerMenuCommand("VF->Toggle Related Videos On/Off", ToggleRelatedVideos);
GM_registerMenuCommand("VF->Toggle Autoplay On/Off", ToggleAutoplay);
GM_registerMenuCommand("VF->Toggle SearchBox On/Off", ToggleSearchBox);
GM_registerMenuCommand("VF->Set Background Color", SetBackgroundColor);
GM_registerMenuCommand("VF->Set Video Scale", SetVideoScale);
//GM_registerMenuCommand("VF->Report Problem", "mailto:psycadelik@yahoo.com");

if(window.innerWidth < screen.width - 100)
{
	window.moveTo(0, 0);
	window.resizeTo(screen.width, screen.height - 30);
}

var winW = window.innerWidth;
var winH = window.innerHeight;

var bShrinkWindow = 		GM_getValue("bShrinkWindow", false);
var bShowRelatedVideos = 	GM_getValue("bShowRelatedVideos", false);
var bShowComments = 		GM_getValue("bShowComments", false);
var bgColor = 				GM_getValue("bgColor", "");
var scale = 				parseFloat(GM_getValue("scale", "1.0"));
var bAutoplay = 			GM_getValue("bAutoplay", true);
var bShowSearchBox = 		GM_getValue("bShowSearchBox", true);

var playerCode = "";
var commentsCode = "";
var relatedVidsCode = "";

var bRecordStats = true;
var cHost = "";


//===============================================================================
//						- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Video Focus"
var source_location = "http://userscripts.org/scripts/source/19701.user.js";
var current_version = "1.1.4";
var latest_version = " ";
var gm_updateparam = "videofocus_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/RawDocContents?docID=df8kjzj6_0fxs3wsfp&justBody=false&revision=_latest&timestamp=1202175933804&editMode=true&strip=true";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("VF->Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() { window.location = source_location; }

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't already have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9,a-z,A-Z].[0-9]?[0-9,a-z,A-Z]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(latest_version == null)
					{
						alert("An error occured, latest version undefined.\r\nTry again later.");
						//CheckVersion();
					}
					else
					{
						if(current_version != latest_version)
						{
							if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
								GetNewVersion();
							else
								AskForReminder();
						} 
						else if(current_version == latest_version)
							alert("You have the latest version of " + script_title + ".");
					}
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//						- Weekly Auto-Update Check -
//===============================================================================

GM_registerMenuCommand("VF->Send Donation", SendDonation);

//===================
// Functions
//===================
function ToggleResize()
{ 
	bShrinkWindow = !bShrinkWindow; 
	GM_setValue("bShrinkWindow", bShrinkWindow);
}
function ToggleRelatedVideos() { 
	bShowRelatedVideos = !bShowRelatedVideos; 
	GM_setValue("bShowRelatedVideos", bShowRelatedVideos);
}
function ToggleComments() { 
	bShowComments = !bShowComments;
	GM_setValue("bShowComments", bShowComments);
}
function ToggleAutoplay() {
	bAutoplay = !bAutoplay;
	GM_setValue("bAutoplay", bAutoplay);
}
function ToggleSearchBox() {
	bShowSearchBox = !bShowSearchBox;
	GM_setValue("bShowSearchBox", bShowSearchBox);
}
function SetBackgroundColor()
{
	if(bgColor == null)
		bgColor = "";
	
	bgColor = prompt("Custom background color : (ex: #FFFFFF)\r\n(leave empty to use the original color)", bgColor);
	GM_setValue("bgColor", bgColor);
}
function SetVideoScale()
{
	var pScale = prompt("Video Scale (%) :", 100);
	if(pScale)
	{
		GM_setValue("scale", String(pScale / 100));
		scale = parseFloat(GM_getValue("scale", "1.0"));
	}
	else
	{
		GM_setValue("scale", 1.0);
		scale = 1.0;
	}
}
function SendDonation()
{
	window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=psycadelik%40yahoo%2ecom&item_name=Script%20Development%20Support&no_shipping=0&no_note=1&tax=0&currency_code=USD&lc=CA&bn=PP%2dDonationsBF&charset=UTF%2d8");
}
function SearchVideos()
{
	window.open("http://psycadelik.dyndns.org:8080/scripts/videofocus/search.php");
}
function Config()
{
	bShrinkWindow = confirm("Shrink the window to fit the video ?");
	GM_setValue("bShrinkWindow", bShrinkWindow);

	bShowRelatedVideos = confirm("Add related videos ?\r\n(Only YouTube and MySpace at the moment.)");
	GM_setValue("bShowRelatedVideos", bShowRelatedVideos);

	bShowComments = confirm("Add video comments ?\r\n(Only YouTube and MySpace at the moment.)");
	GM_setValue("bShowComments", bShowComments);

	bShowSearchBox = confirm("Display Search Box ?");
	GM_setValue("bShowSearchBox", bShowSearchBox);

	bAutoplay = confirm("Autoplay videos ?\r\n(Only YouTube at the moment)");
	GM_setValue("bAutoplay", bAutoplay);
	
	SetBackgroundColor();
	
	SetVideoScale();
	
	ShowAbout();
}

function $(id) 
{ 
	return document.getElementById(id); 
}

function DelNode(idRef)
{
  var iNode = (typeof(idRef) == "string") ? $(idRef) : idRef;
  if (iNode)
  	iNode.parentNode.removeChild(iNode);
}

function insertAfter(newNode, node)
{ 
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function createNode(type, attributes)
{
  var node = document.createElement(type);
  for (var attr in attributes) 
    node.setAttribute(attr, attributes[attr]);
  return node;
}

function RemoveAll(input, value)
{
	while(input.search(value) > -1)
	{
		input = input.replace(value, "");
	}
	return input;
}

function ReplaceAll(input, value, newValue)
{
	while(input.search(value) > -1)
	{
		input = input.replace(value, newValue);
	}
	return input;
}

function centerWindow()
{
	if(!bShrinkWindow)
		return;
		
	var heightOffset = -50;
	var xPos = screen.width / 2 - window.innerWidth / 2;
	var yPos = (screen.height - 30) / 2 - window.innerHeight / 2 + heightOffset;

	window.moveTo(xPos,yPos);
}

function maximizeWindow()
{
	//alert("maximize");
	if(winW < screen.width - 100 && winH < screen.height - 60)
	{
		window.resizeTo(screen.width, screen.height - 30);
		window.moveTo(0,0);
	}
	
	winW = window.innerWidth;
	winH = window.innerHeight - 40;
}

function resizeWindow(w, h)
{
	if(bShrinkWindow)
	{
		window.resizeTo(w, h);
		//javascript:resizeTo(width, height);		
		//if(bAlwaysCentered)
	}
	else
		maximizeWindow();
	
	winW = window.innerWidth;
	winH = window.innerHeight;
}

var scriptInfo = "&nbsp;&nbsp;<font color='#0066FF' style='font-size:11px; color:#0066FF;'>[ "+
			   	 "<a href='http://userscripts.org/scripts/show/19701' target='_blank'>VideoFocus</a>, Script by "+
			  	 "<a href='http://youtube.com/profile?user=psycad007' target='_blank'>PsyCadelik</a> - "+
			  	 "<a href='http://videofocus.webhop.net/' target='_blank'>Stats</a>"+
			  	 " ]</font>";

var searchBox = "<form id='searchForm' action='http://psycadelik.dyndns.org:8080/Scripts/VideoFocus/search.php' type='GET'>"+
				"<select name='h' style='background-color:#FFFFFF; font-size:11px; color:#000000;'>"+
				"<option value='1' selected>YouTube</option>"+
				"<option value='2'>Veoh</option>"+
				"<option value='3'>Megavideo</option>"+
				"<option value='4'>Dailymotion</option>"+
				"<option value='5'>Metacafe</option>"+
				"<option value='6'>MySpace</option>"+
				"<option value='7'>Yahoo Videos</option>"+
				"<option value='8'>Google Videos</option>"+
				"<option value='9'>LiveLeak</option>"+
				"<option value='10'>iFilm</option>"+
				"<option value='11'>EyeSpot</option>"+
				"<option value='12'>Crackle</option>"+
				"<option value='13'>Jumpcut</option>"+
				"<option value='14'>Vimeo</option>"+
				"<option value='15'>Blip.tv</option>"+
				"<option value='16'>Break</option>"+
				"<option value='17'>Buzznet</option>"+
				"<option value='18'>imeem</option>"+
				"<option value='19'>Kewego</option>"+
				"<option value='20'>PutFile</option>"+
				"<option value='21'>QubeTv</option>"+
				"<option value='22'>vMix</option>"+
				"<option value='23'>YouAre.tv</option>"+
				"<option value='24'>CollegeHumor</option>"+
				"<option value='25'>Glumbert</option>"+
				"<option value='26'>deviantArt</option>"+
				"<option value='27'>Fancase</option>"+
				"<option value='28'>Hulu</option>"+
				"<option value='29'>TinyPic</option>"+
				"<option value='30'>PhotoBucket</option>"+
				"<option value='31'>Guba</option>"+
				"<option value='32'>GameTrailers</option>"+
				"<option value='33'>Clipmoon</option>"+
				"<option value='34'>Snort</option>"+
				"<option value='35'>5min</option>"+
				"<option value='36'>AniBoom</option>"+
				"<option value='37'>ClipShack</option>"+
				"<option value='38'>Current</option>"+
				"<option value='39'>Dave.tv</option>"+
				"<option value='40'>ExpertVillage</option>"+
				"<option value='41'>FunnyOrDie</option>"+
				"<option value='42'>GoFish</option>"+
				"<option value='43'>Revver</option>"+
				"<option value='44'>BrightCove</option>"+
				"<option value='45'>Flixya</option>"+
				"<option value='46'>Lulu</option>"+
				"<option value='47'>StupidVideos</option>"+
				"<option value='48'>Vidiac</option>"+
				"<option value='49'>ZippyVideos</option>"+
				"</select>&nbsp;"+
				"<input id='search' type='textbox' name='q' size='20' value='Search..' style='vertical-align:top; height:14px; font-size:11px; background-color:#FFFFFF; color:#000000;' onclick='if(document.getElementById(\"search\").value==\"Search..\") document.getElementById(\"search\").value = \"\";' />&nbsp;"+
				"<input type='submit' value='@' style='font-size:12px; background-color:#BBCCCC;' />&nbsp;&nbsp;"+
				"</form>";

function SendStats()
{		
	if(cHost == "")
		return;
	
	//alert("sending stats..");
	
	var location = String(window.document.location);
	var link_title = String(window.document.title);
	var destination = "http://psycadelik.dyndns.org:8080/scripts/videofocus/counter.php?host=" + cHost + "&link=" + location + "&link_title=" + link_title;
	
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: destination,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application,application,text',
		    },
		    onload: function(responseDetails)
			{
				//alert(responseDetails.responseText);
		    }
		});
}
function Right(str, n)
{
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function Contains(value, input)
{
	if(input.search(value) == -1)
		return false;
	else
		return true;
}

function RemoveCode(matchCode, input)
{
	var output = input;

	var foundMatch = output.match(matchCode);
	if(foundMatch != -1)
		output = output.replace(foundMatch, "");
	
	return output
}

function RedrawSite()
{		
	winW = window.innerWidth;
	winH = window.innerHeight - 40;

	if(bRecordStats)		
		SendStats();	

	var strColor = "";
	if(bgColor != "default" && bgColor != "" && bgColor != null)
		strColor = "bgColor='" + bgColor + "'";

	if(!bShowSearchBox)
		searchBox = "";

	if(playerCode != "")
	{
		var mainCode = "";

		if(bShowRelatedVideos)
		{
			if(bShowComments)
			{
				var padStyle = "";
				if(!bShrinkWindow) padStyle = "style='padding-top:100px;'";

				//Comments and related videos
				mainCode = "<table border='0' align='center'><tr><td "+padStyle+">" + playerCode + "</td><td bgColor='#FFFFFF' valign='top' rowspan='2'>" + relatedVidsCode + "</td></tr>" +
				"<tr><td bgColor='#FFFFFF' style='vertical-align:top;'>" + commentsCode + "<br /><br /></td></tr></table>";
			}
			else
			{
				//Related videos only
				mainCode = "<table border='0' align='center'><tr><td>" + playerCode + "</td><td valign='top'>" + relatedVidsCode + "</td></tr></table>";
			}
		}
		else if(bShowComments)
		{
			//Comments only
			var padStyle = "";
			if(!bShrinkWindow) padStyle = "style='padding-top:100px;'";
			mainCode = "<table border='0' align='center'><tr><td align='center' "+padStyle+">" + playerCode + "</td></tr>" +
			"<tr><td bgColor='#FFFFFF' align='center' style='vertical-align:top;'>" + commentsCode + "<br /><br /></td></tr></table>";
		}
		else
		{
			//No comments, No related videos
			//var percentage = parseInt((winH - 40) / winH * 100);
			mainCode = "<table border='0' width='100%' height='100%' align='center'>"+
					   "<tr><td align='center' valign='center'>" + playerCode + "</td></tr></table>";
		}
		
		mainCode = "<table width='100%' height='90%' align='center' border='0' cellspacing='0' cellpadding='0' "+strColor+">" + 
				   "<tr><td>" + mainCode + "</td></tr></table>";
				   
	}
	else
	{
		//Handle the few sites that are not using the playercode variable (need to remove those and use playercode somehow)
		
		mainCode = "<center><table border='0' width='100%' height='" + winH + "' cellspacing='0' cellpadding='0' "+strColor+">" +
		"<tr><td align='center'>" + document.body.innerHTML + "</td></tr>";
		
		mainCode += "</table></center>";
	}		
	
	//Add header
	document.body.innerHTML = "<table border='0' cellspacing='0' cellpadding='0' width='100%' height='40px' "+strColor+">"+
						      "<tr><td valign='top' align='left' style='font-size:10px;'></td>" + //scriptInfo + "</td>"+
							  "<td style='text-align:right;'>" + searchBox + "</td></tr>"+
							  "</table>" + mainCode;
		
	//document.body.setAttribute("style", "border:0px");
		
	//Set background color
	document.body.setAttribute("style", "background-color:"+bgColor)
	document.body.setAttribute("style", "background:black") //Remove background image if present (funnyjunk.com)

	//100% Height
	document.body.innerHTML = "<style type='text/css'> body{color:#000; background-color: #fff;margin:0;padding:0} html, body{height:100%}</style>" + document.body.innerHTML;

	//Add download link to the menu
	GM_registerMenuCommand("Download Video", DownloadVideo);

	//Do Weekly Update Check
	CheckForUpdate();

	//window.moveTo(0,0);
	//window.scroll(0,0);
	if(bShrinkWindow)
		centerWindow();

	//Forced maximized - fixes the browser not resizing when the user hits the "Back" button
	//document.body.setAttribute('onunload', 'window.resizeTo(screen.width, screen.height - 30); window.moveTo(0,0);');
}

function DownloadVideo()
{
	var location = "http://psycadelik.dyndns.org:8080/Scripts/VideoFocus/download.php?url=" + document.location;
	window.open(location, "_blank", "location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no,width=600,height=150"); 
}

//===================
// End Functions
//===================

//document.body.onBlur = ResetFocus();
//setFocus();

//alert("script");

var hostname = window.location.host;

var prefix = hostname.substring(0, 3);
if(prefix == "www")
	hostname = hostname.substring(4);

//alert(hostname);
//window.document.body.innerHTML = "<div><font color='#ffffff'>host : " + hostname 
//								 + "</font></div><br />" + window.document.body.innerHTML;

if(Contains("youtube", hostname)) hostname = "youtube.com";
else if(Contains("myspace", hostname)) hostname = "myspace.com";
else if(Contains("yahoo", hostname)) hostname = "yahoo.com";
else if(Contains("google", hostname)) hostname = "google.com";
else if(Contains("imeem", hostname)) hostname = "imeem.com";
else if(Contains("liveleak", hostname)) hostname = "liveleak.com";
else if(Contains("putfile", hostname)) hostname = "putfile.com";
else if(Contains("streamanime", hostname)) hostname = "streamanime.info";
else if(Contains("narutomagic", hostname)) hostname = "narutomagic.com";
else if(Contains("avatarchapters", hostname)) hostname = "avatarchapters.org";
else if(Contains("deviantart", hostname)) hostname = "deviantart.com";		
else if(Contains("tinypic", hostname)) hostname = "tinypic.com";
else if(Contains("kewego", hostname)) hostname = "kewego.com";
else if(Contains("clipfish", hostname)) hostname = "clipfish.de";
else if(Contains("spike", hostname)) hostname = "ifilm.com";
else if(Contains("video.aol.com", hostname)) hostname = "video.aol.com";
else if(Contains("gamespot.com", hostname)) hostname = "gamespot.com";
else if(Contains("mediabum.com", hostname)) hostname = "mediabum.com";

switch(hostname)
{
	//==================
	// YouTube.com
	//==================
	case "youtube.com":		
		
		var player = $('movie_player');
				
		if (!player)
		{
			maximizeWindow();
			break;
		}

		var tId = player.getAttribute("flashvars").match(/t=([^&]+)/)[1];
		//var plid = player.getAttribute("flashvars").match(/plid=([^&]+)/)[1];
		var videoId = window.location.search.match(/v=([^&]+)/)[1];
		var ytHost = window.location.protocol + "//" + window.location.host;
		var videoURL = ytHost + "/get_video?video_id=" + videoId + "&t=" + tId;		

		var pWidth = 480 * scale;
		var pHeight = 385 * scale;

		if(scale != 1.0)
			pHeight -= 1;

		if(bAutoplay)
		{
			playerCode = $('watch-player-div').innerHTML;
			if(scale != 1){
			playerCode = playerCode.replace("height=\"385\"", "height='" + pHeight + "'");
			playerCode = playerCode.replace("width=\"480\"", "width='" + pWidth + "'");
			}
		}
		else
		{
			var video_id = "";
			var sk = "";
			var t = "";
			var plid = "";
			var l = "";
			var fmt_map = "";
				
			var flashvars =  player.getAttribute('flashvars');
			var vars = flashvars.split("&");

			var i=0;
			for(i=0;i<vars.length;i++){
				var values = vars[i].split("=");
				switch(values[0])
				{
					case "video_id":
						video_id = values[1];
						break;
					case "sk":
						sk = values[1];
						break;
					case "t":
						t = values[1];
						break;
					case "plid":
						plid = values[1];
						break;
					case "l":
						l = values[1];
						break;
					case "fmt_map":
						fmt_map = values[1];
						break;
				}
			}

			playerCode = videoURL + '<br /><embed type="application/x-shockwave-flash" src="/player2.swf"'+
			'style="" id="movie_player" name="movie_player" bgcolor="#FFFFFF" quality="high" allowfullscreen="true" '+
			'flashvars="'+
			'&amp;iurl=http%3A//img.youtube.com/vi/' + video_id + '/default.jpg'+
			'&amp;video_id=' + video_id+
			'&amp;fmt_map='+fmt_map+
			'&amp;t='+t+
			'&amp;hl=en'+
			'&amp;plid='+plid+
			'" autoplay="0" height="'+pHeight+'" width="'+pWidth+'">';
		}

		if(bShowRelatedVideos)
			relatedVidsCode = $('watch-related-videos-panel').innerHTML;
		if(bShowComments)
			commentsCode = $('watch-comments-stats').innerHTML;		

		if(bShowRelatedVideos)
			resizeWindow(pWidth + 350, pHeight + 200);
		else if(bShowComments)
			resizeWindow(pWidth + 60, pHeight + 200);				
		else		
			resizeWindow(pWidth + 15, pHeight + 200);

		cHost = "YouTube";
		RedrawSite();

		break;

	//=======================
	// MySpace.com
	//=======================	
	case "myspace.com":
	
		if(!$("flashy") || window.location.search.toLowerCase().search("videoid") == -1)
		{
			maximizeWindow();
			break;
		}

		var params = document.getElementsByTagName('param');
		var movie;
		
		var i=0;
		for(i=0;i<params.length;i++)
		{
			if(params[i].getAttribute('name') == "movie")
			{
				movie = params[i].getAttribute('value');
				break;
			}
		}

		var pWidth = 480 * scale;
		var pHeight = 400 * scale;
		
		if(movie)
		{
			playerCode = "<center><embed src='"+movie+"' allowfullscreen='true' allowscriptaccess='always' wmode='transparent' type='application/x-shockwave-flash' style='width: "+pWidth+"px; height: "+pHeight+"px;'></center>";
		}
		
		if(bShowComments)
			commentsCode = $("comments_holder").innerHTML;
		if(bShowRelatedVideos)
			relatedVidsCode = $("morevids_related").innerHTML;
			
		if(bShowRelatedVideos)
			resizeWindow(pWidth + 200, pHeight + 190);
		else if(bShowComments)		
			resizeWindow(pWidth + 25, pHeight + 190);
		else
			resizeWindow(pWidth + 10, pHeight + 190);
		
		cHost = "MySpace";
		RedrawSite();
		
		break;
	
	//=======================
	// Video.Google.com
	//=======================
	case "google.com":

		break;

	//=======================
	// Video.Yahoo.com
	//=======================
	case "yahoo.com":

		var player = $("video_player");
		if (!player || String(document.location) == "http://video.yahoo.com/") {			
			maximizeWindow();				
			break;
		}				

		var pl = $("video1");
		var pWidth = pl.width * scale;;
		var pHeight = pl.height * scale;

		playerCode = "<center><embed type='application/x-shockwave-flash' src='"+pl.src+"' bgcolor='#000' quality='high' allowscriptaccess='always' allowfullscreen='true' flashvars='"+pl.getAttribute('flashvars')+"' height='"+pHeight+"' width='"+pWidth+"'></center>";

		resizeWindow(pWidth+20,pHeight+200);

		cHost = "Yahoo";
		RedrawSite();

		break;

	//=======================
	// Veoh.com
	//=======================
	case "veoh.com":
	
		var player = $("videoPlayerSS");
		
		if (!player || String(window.location).search("videos") == -1)
		{			
			maximizeWindow();				
			break;
		}			

		playerCode = $("embed").getAttribute('value');
		playerCode = playerCode.replace("<a href=\"http://www.veoh.com/\">Online Videos by Veoh.com</a>", "");
		
		var pWidth = 540 * scale;
		var pHeight = 438 * scale;
		playerCode = ReplaceAll(playerCode, "540", pWidth);
		playerCode = ReplaceAll(playerCode, "438", pHeight);

		resizeWindow(pWidth + 40, pHeight + 190);		

		cHost = "Veoh";
		RedrawSite();

		break;
	
	//=======================
	// DailyMotion.com
	//=======================
	case "dailymotion.com":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if (!player || String(window.location).search("video") == -1) {			
			maximizeWindow();				
			break;
		}

		var pWidth = 420 * scale;
		var pHeight = 336 * scale;

		playerCode = '<embed type="application/x-shockwave-flash" src="'+player.src+'" style="" id="video_player" name="video_player" quality="true" allowfullscreen="true" allowscriptaccess="always" wmode="window" flashvars="'+player.getAttribute('flashvars')+'" height="'+pHeight+'" width="'+pWidth+'">';
		
		resizeWindow(pWidth+20,pHeight+205);

		cHost = "DailyMotion";
		RedrawSite();

		break;

	//=======================
	// Metacafe.com
	//=======================
	case "metacafe.com":

		var player = $("FlashObj");
		if (!player)
		{			
			maximizeWindow();				
			break;
		}
	
		var embed = document.getElementsByTagName("embed")[0];
		
		var pWidth = 400 * scale;
		var pHeight = 345 * scale;
		
		playerCode = '<embed type="application/x-shockwave-flash" src="'+embed.src+'" style="" id="fpObj" name="fpObj" quality="high" flashvars="'+embed.getAttribute('flashvars')+'" wmode="transparent" allowscriptaccess="always" height="'+pHeight+'" width="'+pWidth+'">';

		resizeWindow(pWidth + 30, pHeight + 190);

		cHost = "Metacafe";
		RedrawSite();

		break;

	//=======================
	// Blip.tv
	//=======================
	case "blip.tv":
	
		var player = $("video_player");
		if (!player)
		{			
			maximizeWindow();				
			break;
		}

		playerCode = player.innerHTML;
		
		resizeWindow(705,620);

		cHost = "blip.tv";
		RedrawSite();

		break;

	//=======================
	// AvatarChapters.org
	//=======================
	case "avatarchapters.org":			
	
		var player = document.getElementsByTagName("embed")[0];
		
		if(!player || String(document.location) == "http://www.avatarchapters.org/"){
			maximizeWindow();
			break;
		}
		
		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		
		playerCode = "<embed src='" + player.src + "' flashvars='" + player.getAttribute('flashvars') + "' type='application/x-shockwave-flash' width='" + pWidth + "' height='" + pHeight + "'>";

		resizeWindow(pWidth + 40, pHeight + 190);

		cHost = "AvatarChapters";
		RedrawSite();

		break;
		
	//=======================
	// NarutoMagic.com
	//=======================
	case "narutomagic.com":			
		
		var videos = document.getElementsByTagName("embed");									
		
		if(!videos || String(document.location) == "http://www.narutomagic.com/")
		{			
			maximizeWindow();
			break;
		}

		var embed_src = videos[0].getAttribute("src");
		var embed_flashvars = videos[0].getAttribute("flashvars");
		var embed_type = videos[0].getAttribute("type");
		var embed_width = videos[0].getAttribute("width");
		var embed_height = videos[0].getAttribute("height");				
		
		//MySpace
		if(embed_src != null)
		{
			playerCode = "<embed src='" + embed_src + "' flashvars='" + embed_flashvars + "' type='" + embed_type +"' width='" + embed_width + "' height='" + embed_height + "'></embed>";			
			//break;
		}

		//Veoh

		var innerHTML = document.body.innerHTML;

		innerHTML = innerHTML.replace("div","script");
		//innerHTML = innerHTML.replace("iframe","script");
		//innerHTML = innerHTML.replace("img","script");
		innerHTML = innerHTML.replace("googlesyndication.com","");
		innerHTML = innerHTML.replace("google-analytics.com","");
		innerHTML = innerHTML.replace("adbrite.com","");
		innerHTML = innerHTML.replace("google_ads_frame", "");
		innerHTML = innerHTML.replace("google_ad_client","poodle_ad_client");
		innerHTML = innerHTML.replace("google_ad_channel","poodle_ad_kennel");
		innerHTML = innerHTML.replace("narutomagic","noratumigac");
		innerHTML = innerHTML.replace("footer","");			
		innerHTML = innerHTML.replace("<p>","");			
		innerHTML = innerHTML.replace("</p>","");		

		document.body.innerHTML = innerHTML;
		
		resizeWindow(560, 645);		

		cHost = "NarutoMagic";
		RedrawSite();

		document.body.innerHTML = document.body.innerHTML.replace("<br>", "");

		break;

	//=======================
	//  LiveLeak.com
	//=======================
	case "liveleak.com":				

		var player = $("flashbanner");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var mpl = $('mpl');
		var pWidth = mpl.width; // * scale;
		var pHeight = mpl.height; // * scale;
				
		playerCode = player.innerHTML;
		//if(scale != 1){
		//	playerCode = ReplaceAll(playerCode, "%26mode%3Dcompact", "");
		//	playerCode = ReplaceAll(playerCode, mpl.width, pWidth);
		//	playerCode = ReplaceAll(playerCode, mpl.height, pHeight);
		//}
		
		resizeWindow(pWidth + 13, pHeight + 20);

		cHost = "LiveLeak";
		RedrawSite();

		break;
		
	//=======================
	//  iFilm.com
	//=======================
	case "ifilm.com":
	
		var player = $("clip");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
			
		playerCode = player.innerHTML;
		
		resizeWindow(690, 740);

		cHost = "iFilm";
		RedrawSite();

		break;	
		
	//=======================
	// StreamAnime.info
	//=======================
	case "streamanime.info":
	
		//alert("test");

		var player = $("container");
		
		if(!player || player.innerHTML.search("x-shockwave-flash") == -1)
		{
			maximizeWindow();
			break;
		}
		
		var htmlCode = player.innerHTML;

		htmlCode = htmlCode.replace("div","script");
		htmlCode = htmlCode.replace("a href=","comment test=");		
		htmlCode = htmlCode.replace("</a>","</script>");		
		//htmlCode = htmlCode.replace("img src=","comment test=");		
		htmlCode = htmlCode.replace("span","script");		
		htmlCode = htmlCode.replace("<a href=\"http://www.veoh.com/\">Online Videos by Veoh.com</a>","");		

		window.document.body.innerHTML = htmlCode;
		playerCode = htmlCode;
		
		resizeWindow(580, 650);

		cHost = "StreamAnime";
		RedrawSite();

		break;
		
	//=======================
	// EyeSpot.com
	//=======================
	case "eyespot.com":	
	
		var player = $("es_mediaPlayerContainer");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
			
		var pWidth = 432 * scale;
		var pHeight = 407 * scale;
		
		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "432", pWidth);
		playerCode = ReplaceAll(playerCode, "407", pHeight);
		}
		
		resizeWindow(455, 585);

		cHost = "EyeSpot";
		RedrawSite();

		break;
		
	//=======================
	// Crackle.com
	//=======================
	case "crackle.com":	
			
		var player = $("FlashPlayerContainer");		
		var loc = String(window.location);

		if(!player || loc == "http://www.crackle.com/")
		{
			maximizeWindow();			
			break;
		}						

		var strSplit = loc.split('#');
		var val = strSplit[1].split('&');
		
		var id = "";
		var ml = "";
		
		var i=0;
		for(i=0;i<val.length;i++)
		{
			var strTemp = val[i].split('=');
			switch(strTemp[0])
			{
				case "id":
					id = strTemp[1];
					break;
				case "ml":
					ml = strTemp[1];
					break;
			}
		}
		
		if(!id)
			id = strSplit[0];
		
		var pWidth = 600 * scale;
		var pHeight = 500 * scale;
		
		playerCode = "<div style='width:"+pWidth+"px; height:"+pHeight+"px''><embed type='application/x-shockwave-flash' src='/flash/ReferrerRedirect.ashx' style='' id='FlashPlayer' name='FlashPlayer' bgcolor='#000000' quality='high' wmode='opaque' allowfullscreen='true' allowscriptaccess='always' flashvars='id="+id+"&amp;ml="+ml+"&amp;rootURL=http%3A%2F%2Fwww.crackle.com&amp;ctrl=FlashPlayer&amp;internal=1' height='100%' width='100%'>";


		//var pWidth = pl.width * scale;
		//var pHeight = pl.height * scale;
		//var flashvars = pl.getAttribute('flashvars');

		//playerCode = player.innerHTML;

		//playerCode = "<div style='width:"+pWidth+"px; height:"+pHeight+"px''><embed type='application/x-shockwave-flash' src='"+pl.src+"' style='' bgcolor='#000000' quality='high' wmode='opaque' allowfullscreen='true' allowscriptaccess='always' flashvars='"+flashvars+"' height='100%' width='100%'>";
		
		resizeWindow(pWidth + 30, pHeight + 120);

		cHost = "Crackle";
		RedrawSite();
		
		break;
		
	//=======================
	// JumpCut.com
	//=======================
	case "jumpcut.com":	
	
		var player = $("viewer");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var pWidth = 499 * scale;
		var pHeight = 396 * scale;
		
		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "499", pWidth);
		playerCode = ReplaceAll(playerCode, "396", pHeight);
		}
		
		resizeWindow(510, 590);

		cHost = "JumpCut";
		RedrawSite();

		break;
		
	//=======================
	// Vimeo.com
	//=======================
	case "vimeo.com":	
	
		var player = $("meat");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var embed = document.getElementsByTagName('embed')[0];
		var pWidth = 506 * scale;
		var pHeight = 382 * scale;		

		playerCode = "<div style='width:"+pWidth+"px; height:"+pHeight+"px;'><embed type='application/x-shockwave-flash' src='"+embed.src+"' bgcolor='#ffffff' quality='high' allowscriptaccess='always' allowfullscreen='true' flashvars='"+embed.getAttribute('flashvars')+"' height='100%' width='100%'></div>";								

		resizeWindow(pWidth + 5, pHeight + 15);

		cHost = "Vimeo";
		RedrawSite();

		break;
		
	//=======================
	// Break.com
	//=======================
	case "break.com":
	
		var player = $("playerwrap");
		
		if(!player)
		{
			maximizeWindow()
			break;
		}
				
		playerCode = "<table width='464'><tr><td height='392'>" + $("defaultDiv").innerHTML + "</td></tr></table>";
		
		resizeWindow(487, 580);

		cHost = "Break";
		RedrawSite();

		break;
		
	//=======================
	// BuzzNet.com
	//=======================
	case "buzznet.com":	
	
		var player = $("vembed");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var	width = 470;
		var height = 410;

		playerCode = player.innerHTML;
		
		resizeWindow(width + 8, height + 185);

		cHost = "BuzzNet";
		RedrawSite();

		break;		
		
	//=======================
	// imeem.com
	//=======================
	case "imeem.com":
	
		var player = $("FlashContainer");
		
		if(!player)
		{			
			maximizeWindow();
			break;
		}
	
		var pWidth = player.clientWidth * scale;
		var pHeight = player.clientHeight * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, player.clientWidth, pWidth);
		playerCode = ReplaceAll(playerCode, player.clientHeight, pHeight);
		}
		
		resizeWindow(pWidth + 25, pHeight + 200);

		cHost = "imeem";
		RedrawSite();

		break;
		
	//=======================
	// Kewego.com
	//=======================
	case "kewego.com":
	
		var player = $("flash_player");
	
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var pWidth = 400 * scale;
		var pHeight = 300 * scale;
		
		window.document.body.innerHTML = player.innerHTML;		
		playerCode = player.innerHTML;
		
		if(scale != 1){
		playerCode = playerCode.replace("400", pWidth);
		playerCode = playerCode.replace("300", pHeight);
		}
		
		resizeWindow(553, 685);

		cHost = "Kewego";
		RedrawSite();

		break;	
		
	//=======================
	// PutFile.com
	//=======================
	case "putfile.com":	
	
		var player = $("flashcontent2");
		var object = $("flashObj0");
		
		if(!player && !object)
		{
			maximizeWindow();
			break;
		}
				
		if(player)
		{
			var pl = $("putfilePlayer");
			var pWidth = pl.width * scale;
			var pHeight = pl.height * scale;
			var src = pl.src;
			var flashvars = pl.getAttribute('flashvars');
			
			playerCode = "<embed type='application/x-shockwave-flash' src='"+src+"' style='' id='putfilePlayer' name='putfilePlayer' bgcolor='#000000' quality='high' allowfullscreen='true' allowscriptaccess='always' wmode='transparent' flashvars='"+flashvars+"' height='"+pHeight+"' width='"+pWidth+"'>";
		}
		else if(object)
		{
			var pWidth = object.width * scale;
			var pHeight = object.height * scale;
			playerCode = object.innerHTML;
			if(scale != 1){
				playerCode = ReplaceAll(playerCode, object.width, pWidth);
				playerCode = ReplaceAll(playerCode, object.height, pHeight);
			}
		}
		
		resizeWindow(650, 690);

		cHost = "PutFile";
		RedrawSite();

		break;
		
	//=======================
	// QubeTV.tv
	//=======================
	case "qubetv.tv":	
	
		var embed = document.getElementsByTagName('embed')[0];
		
		if(!embed || String(window.location).search("videos") == -1)
		{
			maximizeWindow();
			break;
		}

		var loc = String(window.location);
		var vIDs = loc.split("/");
		var videoID = vIDs[vIDs.length - 1];

		var pWidth = embed.width * scale;
		var pHeight = embed.height * scale;

		playerCode = "<embed src='/swf/flvplayer.swf' bgcolor='#000000' frontcolor='#000000' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='file=/videos/"+videoID+"/"+videoID+".flv&amp;autostart=true' height='"+pHeight+"' width='"+pWidth+"'>";
		
		
		resizeWindow(470, 530);

		cHost = "QubeTv";
		RedrawSite();

		break;	
		
	//=======================
	// VMix.com
	//=======================
	case "vmix.com":
	
		var player = $("videoPlayerContainer");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
				
		playerCode = player.innerHTML;
		
		resizeWindow(515, 590);

		cHost = "VMix";
		RedrawSite();

		break;
		
	//=======================
	// YouAre.tv
	//=======================
	case "youare.tv":
	
		var player = $("vid_panel1");
	
		if(!player)
		{
			maximizeWindow();
			break;
		}		

		var embed = document.getElementsByTagName('embed')[0];
		var pWidth = embed.width * scale;
		var pHeight = embed.height * scale;
		
		playerCode = "<embed src='"+embed.src+"' type='application/x-shockwave-flash' bgcolor='#000000' allowfullscreen='true' height='"+pHeight+"' width='"+pWidth+"'>";
		
		resizeWindow(pWidth + 10, pHeight + 15);

		cHost = "YouAre.tv";
		RedrawSite();

		break;
		
	//=======================
	// CollegeHumor.com
	//=======================
	case "collegehumor.com":
	
		var player = $("flash_player");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}

		var pl = $('moogaloop');
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;

		playerCode = player.innerHTML;
		
		if(scale != 1){		
		playerCode = ReplaceAll(playerCode, String(pl.width), pWidth);
		playerCode = ReplaceAll(playerCode, String(pl.height), pHeight);
		}

		resizeWindow(488, 545);

		cHost = "CollegeHumor";
		RedrawSite();

		break;
		
	//=======================
	// Glumbert.com
	//=======================
	case "glumbert.com":	
	
		if(!$("mediacontent"))
		{
			maximizeWindow();
			break;
		}				

		var videos = document.getElementsByTagName("embed");
		if(videos)
		{
			var embed_src = videos[0].getAttribute("src");
			var embed_bgcolor = videos[0].getAttribute("bgcolor");
			var embed_width = videos[0].getAttribute("width");
			var embed_height = videos[0].getAttribute("height");
			var embed_type = videos[0].getAttribute("type");
		
			var pWidth = embed_width * scale;
			var pHeight = embed_height * scale;

			commentsCode = $("comments").innerHTML;
			playerCode = "<embed src='" + embed_src + "' allowFullScreen='true' bgcolor='" + embed_bgcolor + "' width='" + pWidth + "' height='" + pHeight + "' align='middle' type='" + embed_type + "' pluginspage='http://www.macromedia.com/go/getflashplayer' />"; 
		
			winW = pWidth + 40;
			winH = pHeight + 180
			resizeWindow(winW, winH);

			cHost = "Glumbert";
			RedrawSite();
		}
		
		break;			

	//=======================
	// deviantART.com
	//=======================
	case "deviantart.com":		
		
		var player = $("flash_target_1");
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var playerSize = {width: player.clientWidth, height: player.clientHeight};
		var pWidth = playerSize.width * scale;
		var pHeight = playerSize.height * scale;
		//alert("scale=" + scale + ", width=" + pWidth + ", height=" + pHeight);
	
		playerCode = "<div style='width:" + pWidth + "px;height:" + pHeight + "px'>" + player.innerHTML + "</div>";
	
		cHost = "deviantART";
		RedrawSite();		

		break;
		
	//=======================
	// Fancast.com
	//=======================
	case "fancast.com":
	
		var player = document.getElementById("playerHolder");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		DelNode("adComponent");
		DelNode("logoComponent");
		//DelNode("overScreenDiv");
		//DelNode("metadataDiv");
		
		playerCode = "<table width='800px'><tr><td>" + player.innerHTML + "</td></tr></table>";
		
		var playerSize = {width: player.clientWidth, height: player.clientHeight};
		var pWidth = playerSize.width;
		var pHeight = playerSize.height;
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 300);
		
		cHost = "Fancast";
		RedrawSite();
		
		break;
		
	//=======================
	// Hulu.com
	//=======================
	case "hulu.com":
	
		var player = $('player');
		
		var elements = document.getElementsByTagName('tbody');
		var i=0;
		for(i=0;i<elements.length;i++)
		{
			elements[i].removeAttribute('style');
			elements[i].removeAttribute('border');
		}
		
		if(!player || String(window.location).search('watch') == -1)
		{
			maximizeWindow();
			break;
		}
		
		var embed_src = player.src;
		var embed_type = player.getAttribute('type');
		var embed_flashvars = player.getAttribute('flashvars');		
		
		playerCode = "<br /><br /><br /><br /><center><embed src='" + embed_src + "' allowFullScreen='true' width='" + player.width + "' height='" + player.height + "' type='" + embed_type + "' flashvars='" + embed_flashvars + "' pluginspage='http://www.macromedia.com/go/getflashplayer' /></center><br /><br /><br /><br />"; 
		
		cHost = "Hulu";
		RedrawSite();
		
		break;

	//=======================
	// TinyPic.com
	//=======================
	case "tinypic.com":

		var player = $("tinypic_video");

		if(!player || Contains("view.php", String(window.location)))
		{			
			maximizeWindow();
			break;
		}
		
		var pWidth = player.width * scale;
		var pHeight = player.height * scale;

		playerCode = "<center><embed type='application/x-shockwave-flash' src='"+player.src+"' bgcolor='#000000' quality='high' allowfullscreen='true' swliveconnect='true' allowscriptaccess='always' flashvars='"+player.getAttribute('flashvars')+"' height='"+pHeight+"' width='"+pWidth+"'></center>";
		
		if(bShrinkWindow)
			resizeWindow(480, 580);
		
		cHost = "TinyPic";
		RedrawSite();
		
		break;

	//=======================
	// PhotoBucket.com
	//=======================
	case "photobucket.com":

		var player = document.getElementById("containerMedia");
		var pl = $('mymovie');
		
		if(!player || !pl)
		{			
			maximizeWindow();
			break;
		}
		
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;
		
		playerCode = "<embed type='application/x-shockwave-flash' src='"+pl.src+"' bgcolor='#FFFFFF' quality='high' wmode='transparent' height='"+pHeight+"' width='"+pWidth+"'>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 15, pHeight + 45);
		
		cHost = "PhotoBucket";
		RedrawSite();
		
		break;

	//=======================
	// Guba.com
	//=======================
	case "guba.com":

		var player = document.getElementById("flash_player");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		playerCode = player.innerHTML;
		
		var playerSize = {width: player.clientWidth, height: player.clientHeight};
		var pWidth = playerSize.width;
		var pHeight = playerSize.height;
		
		if(bShrinkWindow)
			resizeWindow(pWidth, pHeight + 130);

		cHost = "PhotoBucket";
		RedrawSite();

		break;

	//=======================
	// GameTrailers.com
	//=======================
	case "gametrailers.com":

		var player = document.getElementById("media_div");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 480 * scale;
		var pHeight = 392 * scale;
		playerCode = "<div align='center' style='width:"+pWidth+"px; height:"+pHeight+"px;'>" + player.innerHTML + "</div>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 20, pHeight + 170);

		cHost = "GameTrailers";
		RedrawSite();

		break;
	
	//=======================
	// Megavideo.com
	//=======================
	case "megavideo.com":		

		var strSearch = String(document.location.search);
		
		if(strSearch.search("v=") == -1)
		{			
			maximizeWindow();
			break;
		}		

		var video = $('flashplayer');
		var pWidth = video.width * scale;
		var pHeight = video.height * scale;
		var src = video.src;
		var flashvars = video.getAttribute('flashvars');
		
		playerCode = "<embed pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' src='"+src+"' id='flashplayer' bgcolor='#ffffff' quality='high' swliveconnect='true' allowfullscreen='true' flashvars='"+flashvars+"' height='"+pHeight+"' width='"+pWidth+"'>";
		
		/*
		var htmlCode = document.body.innerHTML;
		htmlCode = "<table align='center'>" + document.getElementsByTagName("table")[1].innerHTML + "</table>";
		htmlCode = htmlCode.replace("<div style=\"position: absolute; top: -1px; left: 0px;\">", "<div style=''>");
		htmlCode = htmlCode.replace("<div style=\"position: relative; width: 484px; height: 418px;\">", "<div style='width: "+pWidth+"px; height: "+pHeight+"px;' id='video_player'>");
		htmlCode = htmlCode.replace("<div style=\"position: relative; width: 484px; height: 418px;\">", "<div style='width: 0px; height: 0px;' id='details'>");

		document.body.innerHTML = htmlCode;
		DelNode("details");
		
		playerCode = document.body.innerHTML;
		*/
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 225);

		cHost = "Megavideo";
		RedrawSite();
		
		break;	
		
	//=======================
	// Clipmoon.com
	//=======================		
	case "clipmoon.com":
	
		var player = document.getElementById("flashcontent");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 500 * scale;
		var pHeight = 357 * scale;
		
		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "500", pWidth);
		playerCode = ReplaceAll(playerCode, "357", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 30, pHeight + 210);

		cHost = "Clipmoon";
		RedrawSite();

		break;
	
	//=======================
	// Snotr.com
	//=======================		
	case "snotr.com":
	
		var player = document.getElementById("player");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		playerCode = $("player-wrap").innerHTML;

		if(scale != 1){
			playerCode = ReplaceAll(playerCode, player.width, pWidth);
			playerCode = ReplaceAll(playerCode, player.height, pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 60, pHeight + 240);

		cHost = "Snotr";
		RedrawSite();

		break;			

	//=======================
	// 5min.com
	//=======================
	case "5min.com":

		var player = document.getElementById("ctl00_MainContentPlaceHolder_FullPlayer1_flashcontent");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 510 * scale;
		var pHeight = 427 * scale;

		playerCode = "<div style='height:"+pHeight+"px;width:"+pWidth+"px'>" + player.innerHTML + "</div>";
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "510", pWidth);
		playerCode = ReplaceAll(playerCode, "427", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "5min";
		RedrawSite();

		break;

	//=======================
	// AniBoom.com
	//=======================
	case "aniboom.com":

		var player = $("ctl00_ContentPlaceHolder1_PlayerFrame");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 480;
		var pHeight = 394;

		playerCode = "<div style='height:"+pHeight+"px;width:"+pWidth+"px'>" + player.innerHTML + "</div>";

		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "AniBoom";
		RedrawSite();

		break;

	//=======================
	// ClipShack.com
	//=======================
	case "clipshack.com":

		var player = $("player");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 430 * scale;
		var pHeight = 370 * scale;

		var playerSrc = document.getElementsByTagName("embed")[0].src;

		playerCode = "<div id='player' style='width: "+pWidth+"px; height: "+pHeight+"px;'><embed type='application/x-shockwave-flash' src='"+playerSrc+"' id='player' name='player' bgcolor='"+bgColor+"' quality='high' allowfullscreen='true' swliveconnect='true' height='"+pHeight+"' width='"+pWidth+"'></div>";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ClipMailPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ClipMailLoginPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ClipMailThanksPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='AddFavoritePanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='AddFavoriteLoginPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='AddFavoriteErrorPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ContactPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ThanksPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='ratingControl'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='currentRatingControl'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='lblRating'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='CommentLoginPanel'></div";
		playerCode += "<div style='visibility: hidden; width: 0px; height: 0px;' id='CommentPanel'></div";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "ClipShack";
		RedrawSite();

		break;

	//=======================
	// Current.com
	//=======================
	case "current.com":

		var player = $("videoPlaybackEmbed");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = player.width;
		var pHeight = player.height;

		var flashvars = player.getAttribute('flashvars');
		
		playerCode = "<embed type='application/x-shockwave-flash' src='"+player.src+"' style='' bgcolor='#333333' quality='high' allowscriptaccess='always' allowfullscreen='true' allowscaling='true' wmode='transparent' flashvars='"+player.getAttribute('flashvars')+"' height='"+pHeight+"' width='"+pWidth+"'>";

		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "Current";
		RedrawSite();

		break;

	//=======================
	// Dave.TV
	//=======================
	case "dave.tv":

		var player = $("flashcontent");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 450 * scale;
		var pHeight = 400 * scale;

		playerCode = player.innerHTML;

		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "450", pWidth);
		playerCode = ReplaceAll(playerCode, "400", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "Dave.TV";
		RedrawSite();

		break;
		
	//=======================
	// ExpertVillage.com
	//=======================
	case "expertvillage.com":

		var player = $('__EVPlayerDivHolder');

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 491 * scale;
		var pHeight = 424 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = playerCode.replace(491, pWidth);
		playerCode = playerCode.replace(424, pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "ExpertVillage";
		RedrawSite();

		break;
				
	//=======================
	// FunnyOrDie.com
	//=======================
	case "funnyordie.com":

		var player = $("video_player");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pl = $('fodplayer');
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, pl.width, pWidth);
		playerCode = ReplaceAll(playerCode, pl.height, pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "FunnyOrDie";
		RedrawSite();

		break;

	//=======================
	// GoFish.com
	//=======================
	case "gofish.com":
	
		/*	
		if(!player || String(window.location).search("videoGfid") == -1)
		{			
			maximizeWindow();
			break;
		}		

		var gfid = window.location.search.match(/gfid=([^&]+)/)[1];
		var videoGfid = window.location.search.match(/videoGfid=([^&]+)/)[1];
				
		var pWidth = 492 * scale;
		var pHeight = 336 * scale;

		playerCode = "<embed type='application/x-shockwave-flash' src='http://www.gofish.com/player/GFPlayer.swf' id='GFPlayerID' name='GFPlayerID' swliveconnect='true' autoplay='false' bgcolor='#FFFFFF' quality='high' wmode='transparent' allowscriptaccess='always' allowfullscreen='true' flashvars='cgfid="+gfid+"&vgfid="+videoGfid+"' width='"+pWidth+"' height='"+pHeight+"'>";

		playerCode += "<div id='playList' style='visibility:hidden'></div>";
		playerCode += "<div id='tagBucket' style='visibility:hidden'></div>";
		playerCode += "<div id='commentBucket' style='visibility:hidden'></div>";
		playerCode += "<div id='relatedBucket' style='visibility:hidden'></div>";
		playerCode += "<div id='channelFansBucket' style='visibility:hidden'></div>";
		playerCode += "<div id='vrateBox' style='visibility:hidden'></div>";

		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "GoFish";
		RedrawSite();
		*/
		
		break;
		
	//=======================
	// Revver.com
	//=======================
	case "revver.com":

		var player = $("gflash_embed");

		if(!player)
		{			
			maximizeWindow();
			break;
		}

		var pWidth = 480 * scale;
		var pHeight = 392 * scale;

		var id = String(player.innerHTML.match(/id=\"rev([0-9,a-z,A-Z]*)/)).split("=")[1].substr(1);
		var metaId = String(player.innerHTML.match(/mediaId=([0-9]*)/)).split(",")[1];
		
		playerCode = "<object width='"+pWidth+"' height='"+pHeight+"' data='http://flash.revver.com/player/1.0/player.swf?mediaId="+metaId+"' type='application/x-shockwave-flash' "+
					 "id='"+id+"'><param name='Movie' value='http://flash.revver.com/player/1.0/player.swf?mediaId="+metaId+"'>"+
					 "</param><param name='FlashVars' value='allowFullScreen=true'></param><param name='AllowFullScreen' value='true'></param>"+
					 "<param name='AllowScriptAccess' value='always'></param>"+
					 "<embed type='application/x-shockwave-flash' src='http://flash.revver.com/player/1.0/player.swf?mediaId="+metaId+"' "+
					 "pluginspage='http://www.macromedia.com/go/getflashplayer' allowScriptAccess='always' flashvars='allowFullScreen=true' "+
					 "allowfullscreen='true' height='"+pHeight+"' width='"+pWidth+"'></embed></object>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 220);

		cHost = "Revver";
		RedrawSite();

		break;
		
	//=======================
	// BrightCove.tv
	//=======================
	case "brightcove.tv":
		
		var player = $("flashcontent");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}
		
		var pl = $("bcPlayer");
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;
		var src = pl.src;
		var flashvars = pl.getAttribute('flashvars');
		
		flashvars = ReplaceAll(flashvars, pl.width, pWidth);
		flashvars = ReplaceAll(flashvars, pl.height, pHeight);
		
		playerCode = "<embed type='application/x-shockwave-flash' src='"+src+"' bgcolor='#ffffff' quality='high' allowscriptaccess='always' allowfullscreen='true' flashvars='"+flashvars+"' width='"+pWidth+"' height='"+pHeight+"'>"
		
		playerCode += "<div id='commentSection' style='visibility:hidden'></div>";
		playerCode += "<div id='commentCount' style='visibility:hidden'></div>";
		playerCode += "<div id='commentCount2' style='visibility:hidden'></div>";
		playerCode += "<div id='content' style='visibility:hidden'></div>";

		if(bShrinkWindow)
			resizeWindow(pWidth + 80, pHeight + 200);

		cHost = "BrightCove";
		RedrawSite();
	
		break;

	//=======================
	// Flixya.com
	//=======================
	case "flixya.com":
		
		var player = document.getElementsByTagName('object')[0];
		var embed = document.getElementsByTagName('embed')[0];
		
		if(!player && !embed && String(window.location).search('video') == -1)
		{
			maximizeWindow();
			break;
		}

		if(player)
		{
			var pWidth = player.width * scale;
			var pHeight = player.height * scale;

			playerCode = player.innerHTML;
			if(scale != 1){
			playerCode = playerCode.replace(player.width, pWidth);
			playerCode = playerCode.replace(player.height, pHeight);
			}
		}
		else if(embed) 
		{
			return;
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 180);
		
		cHost = "Flixya";
		RedrawSite();

		break;

	//=======================
	// LuLu.tv
	//=======================
	case "lulu.tv":
		
		var player = $("flashcontent");
		
		if(!player || String(document.location) == "http://www.lulu.tv/")
		{
			maximizeWindow();
			break;
		}

		var pWidth = 482 * scale;
		var pHeight = 402 * scale;

		playerCode = player.innerHTML;
		playerCode = ReplaceAll(playerCode, "#ffffff", bgColor);
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "482", pWidth);
		playerCode = ReplaceAll(playerCode, "402", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 180);

		cHost = "LuLu";
		RedrawSite();

		break;

	//=======================
	// StupidVideos.com
	//=======================
	case "stupidvideos.com":
		
		var player = $("video_player");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}

		var pl = $("myFlash");
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;

		playerCode = "<embed type='application/x-shockwave-flash' src='"+pl.src+"' id='myFlash' name='myFlash' bgcolor='#FFFFFF' quality='high' wmode='transparent' allowscriptaccess='always' flashvars='"+pl.getAttribute('flashvars')+"' height='"+pHeight+"' width='"+pWidth+"'>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 40, pHeight + 180);

		cHost = "StupidVideos";
		RedrawSite();

		break;
		
	//=======================
	// Vidiac.com
	//=======================
	case "vidiac.com":
		
		var player = $("fPlayerContainer");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}

		var pl = $("playlist");
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;
		var flashvars = pl.getAttribute('flashvars');

		playerCode = "<embed type='application/x-shockwave-flash' src='"+pl.src+"' style='' quality='high' allowfullscreen='true' allowscriptaccess='always' salign='lt' bgcolor='#000000' flashvars='"+flashvars+"' width='"+pWidth+"' height='"+pHeight+"'>";

		if(bShrinkWindow)
			resizeWindow(pWidth + 80, pHeight + 180);

		cHost = "Vidiac";
		RedrawSite();

		break;

	//=======================
	// ZippyVideos.com
	//=======================
	case "zippyvideos.com":
		
		var player = $("clip");
		
		if(!player)
		{
			maximizeWindow();
			break;
		}

		var embed = document.getElementsByTagName('embed')[0];
		
		var pWidth = embed.width * scale;
		var pHeight = embed.height * scale;

		playerCode = "<OBJECT ID='MediaPlayer' WIDTH='"+pWidth+"' HEIGHT='"+pHeight+"' CLASSID='CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95' STANDBY='Loading..' TYPE='application/x-oleobject' codebase='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112'><PARAM name='stretchToFit' value='True'><PARAM NAME='FileName' VALUE='"+embed.src+"'><PARAM name='autostart' VALUE='"+bAutoplay+"'><PARAM name='ShowControls' VALUE='true'><param name='ShowStatusBar' value='false'><PARAM name='ShowDisplay' VALUE='false'><EMBED TYPE='application/x-mplayer2' SRC='"+embed.src+"' NAME='MediaPlayer' WIDTH='"+pWidth+"' HEIGHT='"+pHeight+"' ShowControls='1' ShowStatusBar='0' ShowDisplay='0' autostart='1' stretchToFit='1'></EMBED></OBJECT>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 80, pHeight + 120);
		
		cHost = "ZippyVideos";
		RedrawSite();

		break;

	//=======================
	// 56.com
	//=======================
	case "56.com":
	
		var player = $("VideoPlayObject");
		
		if(!player) {
			maximizeWindow();
			break;
		}
	
		playerCode = player.innerHTML;
		
		if(bShrinkWindow)
			resizeWindow(520, 600);
		
		cHost = "56";
		RedrawSite();
		
		break;

	//=======================
	// Bofunk.com
	//=======================
	case "bofunk.com":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if(!player) {
			maximizeWindow();
			break;
		}
	
		var pWidth = 446 * scale;
		var pHeight = 340 * scale;

		playerCode = '<embed src="'+player.src+'" quality="high" bgcolor="#000000" allowfullscreen="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" height="'+pHeight+'" width="'+pWidth+'">';
		
		if(bShrinkWindow)
			resizeWindow(pWidth + 20, pHeight + 200);
		
		cHost = "Bofunk";
		RedrawSite();
		
		break;		
		
	//=======================
	// ClipFish.de
	//=======================
	case "clipfish.de":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if(!player || String(document.location) == "http://www.clipfish.de/") {
			maximizeWindow();
			break;
		}
	
		var pWidth = 464 * scale;
		var pHeight = 380 * scale;

		var loc = String(document.location);
		var strSplit = loc.split('&');
		var videoID = strSplit[0].split('=')[1];

		playerCode = '<embed src="'+player.src+'" align="middle" quality="high" bgcolor="#0067B3" width="'+pWidth+'" height="'+pHeight+'" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';

		if(bShrinkWindow)
			resizeWindow(pWidth+35, pHeight+220);
		
		cHost = "ClipFish";
		RedrawSite();
		
		break;		

	//=======================
	// ClipLife.jp
	//=======================
	case "cliplife.jp":
	
		var player = document.getElementsByTagName('embed')[0];

		if(!player || String(document.location).search("content_id") == -1) {
			maximizeWindow();
			break;
		}
	
		var pWidth = player.width * scale;
		var pHeight = player.height * scale;

		var flashvars = player.getAttribute('flashvars');
		
		playerCode = '<embed src="'+player.src+'" quality="high" bgcolor="#ffffff" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+35, pHeight+220);
		
		cHost = "ClipLife";
		RedrawSite();
		
		break;	
	
	//=======================
	// ClipJunkie.com
	//=======================
	case "clipjunkie.com":
	
		var player = $('mediaspace');

		if(!player) {
			maximizeWindow();
			break;
		}
	
		var pWidth = 495 * scale;
		var pHeight = 370 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "495", pWidth);
		playerCode = ReplaceAll(playerCode, "370", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "ClipJunkie";
		RedrawSite();
		
		break;
	
	//=======================
	// CrunchyRoll.com
	//=======================
	case "crunchyroll.com":
			
		var player = $('embed_vid');

		if(!player)
		{
			maximizeWindow();
			break;
		}
	
		var vidObj = $('fo_embed_vid');
		var src= vidObj.data;
		var pWidth = vidObj.width * scale;
		var pHeight = vidObj.height * scale;
		
		var param = new Array();
		param = document.getElementsByTagName('param');
		
		var flashvars = "";
		
		var i=0;
		for(i=0;i<param.length;i++)
		{
			switch(param[i].name)
			{
				case "flashvars":
					flashvars = param[i].value;
					break;
			}
		}

		if(flashvars != "")
		{
			playerCode = "<embed src='"+src+"' width='"+pWidth+"' height='"+pHeight+"' allowscriptaccess='always' allowfullscreen='true' flashvars='"+flashvars+"' />";
			//cHost = "CrunchyRoll";
			RedrawSite();
		}
		
		break;
	
	//=======================
	// DingTV.com
	//=======================
	case "dingtv.com":
	
		var player = $('player');

		if(!player) {
			maximizeWindow();
			break;
		}
	
		var pl = document.getElementsByTagName('embed')[0];
	
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;
		
		playerCode = "<embed src='"+pl.src+"' type='application/x-shockwave-flash' wmode='transparent' width='"+pWidth+"' height='"+pHeight+"'>";

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "DingTV";
		RedrawSite();
		
		break;

	//=======================
	// DoubleAgent.com
	//=======================
	case "doubleagent.com":		
	
		var player = document.getElementsByTagName('embed')[1];
		var iframe = $('video');		

		if(!player  || String(document.location) == "http://www.doubleagent.com/") {
			if(!iframe) {
				maximizeWindow();
				break;
			}
		}
	
		var pWidth = 480 * scale;
		var pHeight = 410 * scale;	
		
		if(iframe){
			//alert(iframe.src);
			pWidth=480;
			pHeight=410;
			playerCode = "<iframe width='"+pWidth+"' height='"+pHeight+"' src='"+iframe.src+"'></iframe>";			
		} else
			playerCode = '<embed bgcolor="#000000" quality="high" allowscriptaccess="always" src="'+player.src+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+25, pHeight+200);
		
		cHost = "DoubleAgent";
		RedrawSite();
		
		break;


	//=======================
	// eSnips.com
	//=======================
	case "esnips.com":
	
		var player = document.getElementsByTagName('embed')[0];

		if(!player) {
			maximizeWindow();
			break;
		}
	
		var pWidth = 400 * scale;
		var pHeight = 300 * scale;

		var flashvars = player.getAttribute('flashvars');
		if(scale != 1){
		flashvars = ReplaceAll(flashvars, "400", pWidth);
		flashvars = ReplaceAll(flashvars, "300", pHeight);
		}
		
		playerCode = '<embed src="'+player.src+'" quality="high" scale="noscale" name="FLVPlayer" salign="LT" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "eSnips";
		RedrawSite();
		
		break;

	//=======================
	// Flurl.com
	//=======================
	case "flurl.com":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		var flashvars = player.getAttribute('flashvars');
		
		playerCode = '<embed src="'+player.src+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" play="true" wmode="transparent" loop="true" scale="showall" devicefont="false" bgcolor="#000d13" name="FLVPlayer" menu="true" allowfullscreen="true" allowscriptaccess="sameDomain" salign="" type="application/x-shockwave-flash" align="middle" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "Flurl";
		RedrawSite();
		
		break;

	//=======================
	// FunnyJunk.com
	//=======================
	case "funnyjunk.com":
	
		var player = document.getElementsByTagName('embed')[0];
		//var player = document.getElementsByTagName('object')[0];
		
		if(!player || String(window.location).search("movie") == -1 || String(window.location) == "http://www.funnyjunk.com/movies/")
		{
			maximizeWindow();
			break;
		}		
	
		var pWidth = player.width * scale;
		var pHeight = player.height * scale;

		/*
		playerCode = player.innerHTML;		
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, player.width, pWidth);
		playerCode = ReplaceAll(playerCode, player.height, pHeight);
		}
		*/
		
		playerCode = "<embed src='"+player.src+"' quality='high' bgcolor='#ffffff' menu='false' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+player.getAttribute('flashvars')+"' width='"+pWidth+"' align='middle' height='"+pHeight+"'>";
		
		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "FunnyJunk";
		RedrawSite();
		
		break;
		
	//=======================
	// HallPass.com
	//=======================
	case "hallpass.com":
	
		var player = $("mediadisp");
		
		if(!player || String(window.location).search("media") == -1) {
			maximizeWindow();
			break;
		}

		var pWidth = 482 * scale;
		var pHeight = 408 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "482", pWidth);
		playerCode = ReplaceAll(playerCode, "408", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "HallPass";
		RedrawSite();
		
		break;

	//=======================
	// HowCast.com
	//=======================
	case "howcast.com":
	
		var player = $('howcast_player');
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = 640 * scale;
		var pHeight = 393 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "640", pWidth);
		playerCode = ReplaceAll(playerCode, "393", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "HowCast";
		RedrawSite();
		
		break;

	//=======================
	// IndiaFM.com
	//=======================
	case "indiafm.com":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if(!player || String(document.location).search("video") == -1) {
			maximizeWindow();
			break;
		}

		var pWidth = player.width * scale;
		var pHeight = player.height * scale;

		playerCode = '<embed allowfullscreen="true" allowscriptaccess="sameDomain" src="'+player.src+'" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "HowCast";
		RedrawSite();
		
		break;
				
	//=======================
	// ishare.rediff.com
	//=======================
	case "ishare.rediff.com":
	
		var player = $('video_player');
		
		if(!player || String(window.location).search("filevideo") == -1) {
			maximizeWindow();
			break;
		}

		var pWidth = 400 * scale;
		var pHeight = 322 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "400", pWidth);
		playerCode = ReplaceAll(playerCode, "322", pHeight);
		}
		
		if(bShrinkWindow)
			resizeWindow(pWidth+25, pHeight+230);
		
		cHost = "iShare";
		RedrawSite();
		
		break;	
			
	//=======================
	// Tubearoo.com
	//=======================
	case "tubearoo.com":
	
		var player = $('video');
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = 400; // * scale;
		var pHeight = 300; // * scale;

		playerCode = player.innerHTML;
		//playerCode = ReplaceAll(playerCode, "400", pWidth);
		//playerCode = ReplaceAll(playerCode, "300", pHeight);

		if(bShrinkWindow)
			resizeWindow(pWidth+120, pHeight+250);
		
		cHost = "Tubearoo";
		RedrawSite();
		
		break;	

	//=======================
	// Ku6.com
	//=======================
	case "v.ku6.com":
	
		var player = document.getElementsByTagName('embed')[0];
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = 920;
		var pHeight = 407;

		var flashvars = player.getAttribute('flashvars');
		playerCode = '<embed id="video_player" name="video_player" flashvars="'+flashvars+'" wmode="window" allowfullscreen="true" allowscriptaccess="always" quality="high" src="'+player.src+'" type="application/x-shockwave-flash" height="'+pHeight+'" width="'+pWidth+'">';

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+200);
		
		cHost = "Ku6";
		RedrawSite();
		
		break;

	//=======================
	// Izlesene.com
	//=======================
	case "izlesene.com":
	
		var player = $('player');
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = 468 * scale;
		var pHeight = 359 * scale;

		playerCode = player.innerHTML;
		if(scale != 1){
		playerCode = ReplaceAll(playerCode, "468", pWidth);
		playerCode = ReplaceAll(playerCode, "359", pHeight);
		}

		if(bShrinkWindow)
			resizeWindow(pWidth+20, pHeight+200);
		
		cHost = "Izlesene";
		RedrawSite();
		
		break;

	//=======================
	// LiveVideo.com
	//=======================
	case "livevideo.com":
	
		var player = $('receiverDiv');
		
		if(!player) {
			maximizeWindow();
			break;
		}

		var pWidth = 980; // * scale;
		var pHeight = 417; // * scale;

		playerCode = player.innerHTML;
		//playerCode = ReplaceAll(playerCode, "468", pWidth);
		//playerCode = ReplaceAll(playerCode, "359", pHeight);

		if(bShrinkWindow)
			resizeWindow(pWidth+50, pHeight+220);
		
		cHost = "LiveVideo";
		RedrawSite();
		
		break;

	//=======================
	// GameSpot.com
	//=======================
	case "gamespot.com":

		var player = $("proteus2");
		
		if(!player){
			maximizeWindow();
			break;
		}

		var pl = $("flash_video_player");
		var pWidth = parseInt(pl.style.width);
		var pHeight = parseInt(pl.style.height);
		
		playerCode = "<div style='width:"+pWidth+"px; height:"+pHeight+"px;'><embed type='application/x-shockwave-flash' src='"+player.src+"' quality='high' allowscriptaccess='always' allowfullscreen='true' wmode='window' flashvars='"+player.getAttribute('flashvars')+"' height='100%' width='100%'></div>";

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+25);
			
		cHost = "GameSpot";
		RedrawSite();
		
		break;

	//=======================
	// Jokeroo.com
	//=======================
	case "jokeroo.com":

		var iframe = document.getElementsByTagName('iframe');
		var flv = "";
		var i=0;
		for(i=0;i<iframe.length;i++)
		{
			if(String(iframe[i].src).search("flv") != -1)
			{
				var vid = String(iframe[i].src).split("vid=")[1];
				vid = vid.replace(" ", "");

				if(vid.length > 0){
					flv = vid;
					break;
				}
			}
		}
		
		if(!flv){
			maximizeWindow();
			break;
		}

		var html = String(window.location);
		var pWidth = 490 * scale;
		var pHeight = 425 * scale;
		
		playerCode = "<embed src='http://www.jokeroo.com/promotional_player2.swf' swLiveConnect='true' Flashvars='channel=Extreme_Videos&vid="+flv+"&vid_url="+html+"&adv_url=' quality='high' bgcolor='#FFFFFF' width='"+pWidth+"' height='"+pHeight+"' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>";

		if(bShrinkWindow)
			resizeWindow(pWidth+15, pHeight+25);

		cHost = "Jokeroo";
		RedrawSite();

		break;

	//=======================
	// Video.AOL.com
	//=======================
	case "video.aol.com":

		var player = $("eplayer");
		
		if(!player){
			maximizeWindow();
			break;
		}
		
		var pl = document.getElementsByTagName('embed')[0];
		var pWidth = pl.width * scale;
		var pHeight = pl.height * scale;
		var src = pl.src;

		playerCode = "<embed src='"+src+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='"+pWidth+"' height='"+pHeight+"'>";
		
		cHost = "AOL";
		RedrawSite();

		break;

	//=======================
	// Atom.com
	//=======================
	case "atom.com":

		var player = $('FederatedPlayer');
		var loc = String(window.location);
		
		if(!player || loc.search("funny_videos") == -1 || loc.search("channel") != -1 || loc.search("showdown") != -1 || loc.search("connect") != -1 ){
			maximizeWindow();
			break;
		}

		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		var src = player.src;
		var flashvars = player.getAttribute('flashvars');
		
		playerCode = "<embed src='"+src+"' type='application/x-shockwave-flash' wmode='window' allowfullscreen='true' swliveconnect='true' enablejavascript='true' flashvars='"+flashvars+"' allowscriptaccess='always' width='"+pWidth+"' height='"+pHeight+"'>"
		
		cHost = "Atom";
		RedrawSite();
		
		break;

	//=======================
	// dalealplay.com
	//=======================
	case "dalealplay.com":

		var location = String(window.location);
		var playerDiv = $("reproductorDiv");
		
		if(!playerDiv || location.search("con=") == -1 || location.search("perfil_perso") != -1)
		{
			maximizeWindow();
			break;
		}

		var embeds = document.getElementsByTagName('embed');
		
		if(embeds.length == 1)
			var player = embeds[0];
		else if(embeds.length == 2)
			var player = embeds[1];

		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		
		playerCode = "<embed src='"+player.src+"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' play='true' loop='false' scale='showall' wmode='window' devicefont='false' bgcolor='#000000' menu='true' allowfullscreen='true' allowscriptaccess='sameDomain' salign='' type='application/x-shockwave-flash' width='"+pWidth+"' align='middle' height='"+pHeight+"' flashvars='"+player.getAttribute('flashvars')+"'>";

		cHost = "dalealplay";
		RedrawSite();
		
		break;

	//=======================
	// MediaBum.com
	//=======================
	case "mediabum.com":

		var player = document.getElementsByTagName('embed')[0];
		
		if(!player || String(window.location).search("videos") == -1)
		{
			maximizeWindow();
			break;
		}
		
		var pWidth = player.width * scale;
		var pHeight = player.height * scale;
		
		playerCode = "<embed movie='"+player.src+"' src='"+player.src+"' wmode='Transparent' quality='High' flashvars='' width='"+pWidth+"' height='"+pHeight+"'>";
		
		cHost = "MediaBum";
		RedrawSite();
		
		break;

	//=======================
	// PornoTube.com
	//=======================
	case "pornotube.com":
	
		var htmlCode = window.document.body.innerHTML;		
		
		var videos = document.getElementsByTagName("embed");		

		if(!videos)
		{
			maximizeWindow();
			break;
		}

		var embed_src = videos[0].getAttribute("src");
		var embed_bgcolor = videos[0].getAttribute("bgcolor");
		var embed_width = videos[0].getAttribute("width");
		var embed_height = videos[0].getAttribute("height");
		var embed_type = videos[0].getAttribute("type");

		if(embed_src != null)
		{
			playerCode = "<embed src='" + embed_src + "' allowFullScreen='true' bgcolor='" + embed_bgcolor + "' width='" + embed_width + "' height='" + embed_height + "' name='pornoPlayer' align='middle' type='" + embed_type + "' pluginspage='http://www.macromedia.com/go/getflashplayer' />"; 
			resizeWindow(488, 582);
			cHost = "PornoTube";
			RedrawSite();			
		}				

		break;

	//=======================
	//  YouPorn.com
	//=======================
	case "youporn.com":	

		var player = $("player");

		if(!player)
		{
			maximizeWindow();
			break;
		}

		var downloadDiv = $("download");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("<h2>Download:</h2>","");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("<ul>","");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("</ul>","");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("<li>","");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("</li>","");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("<p><a href=","<a href=");
		downloadDiv.innerHTML = downloadDiv.innerHTML.replace("</p>","");
		
		playerCode = player.innerHTML;
		
		resizeWindow(625, 665);

		cHost = "YouPorn";
		RedrawSite();

		break;	
		
	//=======================
	//  SpankWire.com
	//=======================
	case "spankwire.com":				

		var player = $("xmoov-flv-player");

		if(!player)
		{
			maximizeWindow();
			break;
		}

		DelNode("mytracer");
		DelNode("header");
		DelNode("nav1");
		DelNode("nav2");

		var htmlCode = document.body.innerHTML;
		htmlCode = htmlCode.replace("<div class=\"main\">", "<div>");
		htmlCode = htmlCode.replace("<div id=\"rate\">", "<!--<div id=\"rate\">");
		htmlCode = htmlCode.replace("<div style=\"float: left; min-height: 468px; width: 595px;\">", "<!--");
		htmlCode = htmlCode.replace("</div></div>", "-->");

		playerCode = htmlCode;
		
		resizeWindow(595, 730);

		cHost = "Spankwire";
		RedrawSite();

		break;
		
	//=======================
	// Megarotic.com
	//=======================
	case "megarotic.com":
	
		var video_id = String(window.location).split("?v=")[1];
		
		if(!video_id)
		{
			maximizeWindow();
			break;
		}
		
		var pWidth = 424 * scale;
		var pHeight = 337 * scale;
		
		playerCode = '<embed src="http://www.megarotic.com/video/ep.swf?v='+video_id+'" type="application/x-shockwave-flash" wmode="transparent" width="'+pWidth+'" height="'+pHeight+'"></embed>';

		resizeWindow(595, 530);
		
		cHost = "Megarotic";
		RedrawSite();
		
		break;
}
