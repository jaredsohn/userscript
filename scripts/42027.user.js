// ==UserScript==
// @name           Anti RickRoll
// @namespace      http://ewanm89.co.uk/
// @description    Stops Rickrolls (in a rather brutal way ;) )
// @include        *
// @exclude	   http://userscripts.org/*
// @exclude	   http://ewanm89.co.uk/*
// @exclude	   http://*.wikipedia.org/*
// ==/UserScript==

//==============================
//start autoupdate code
//==============================
var script_title = "Anti RickRoll";
var source_location = "http://userscripts.org/scripts/source/42027.user.js";
var current_version = "0.0.4";
var latest_version = " ";
var gm_updateparam = "antirickroll_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://ewanm89.co.uk/antirickroll-VERSION";
//I get rolled for your sanity: http://ewanm89.co.uk/2009/02/08/anti-rickoll/

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("AR->Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
	var today = new Date();
	GM_setValue(gm_updateparam, String(today));
	window.location = source_location;
}

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
		if(interval >= 5)			
			CheckVersion();
	}

}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: version_holder,
		headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		
		onload: function(responseDetails)
		{
			var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				

			if(line != null)
			{
				var strSplit = new Array();
				strSplit = line.split('=');
				latest_version = strSplit[1];

				if(current_version != latest_version && latest_version != "undefined")
				{
					if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
						GetNewVersion();
					else
						AskForReminder();
				} 
				else if(current_version == latest_version)
					alert("You have the latest version of " + script_title + ".");
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
////=============================================================================
////			- Weekly Auto-Update Check -
////==============================================================================

CheckForUpdate()

//=======================
// Actual block stuff.
//=======================


html=document.getElementsByTagName("html")[0].innerHTML;

if(html.search(/\Wrickroll\W/) != -1 || html.search(/\Wrickrolled\W/) != -1 || ((html.search(/\Wrolled\W/) != -1 || html.search(/\Wroll\W/i) != -1 || html.search(/\Wastley\W/i) != -1) && (html.search(/\Wrick\W/i) != -1 || html.search(/\Wbarack\W/i) != -1 )) || (html.search(/\Wnever\W/i) != -1 && html.search(/\Wgonna\W/i) != -1 && html.search(/\Wgive\W/i) != -1 && html.search(/\Wyou\W/i) != -1 && html.search(/\Wup\W/i) != -1))
{
	if(document.domain.search("youtube") != -1)
	{
		GM_log("youtube");
		removeContent("movie_player");
		alert("Possible Rickroll!");
	}
	else if(document.domain.search("vimeo") != -1)
	{
		GM_log("vimeo");
		removeContent("player");
		alert("Possible Rickroll!");
	}
	else if(document.domain.search(/video\.google/) != -1)
	{
		GM_log("google video");
		removeContent("tv-player-td");
		alert("Possible Rickroll!");
	}
	else
	{
		GM_log("other");
		//document.getElementsByTagName("body")[0].removeChild(0);
		document.getElementsByTagName("body")[0].innerHTML="<div style=\"color: #ff0000; font-style: bold; text-align: center; font-size: 72px; margin: 0 autotext-align:center;;\">Warning, Rickroll!</div>";
	}

}

//******************************************************************************
//Will remove the child of the element of the object you pass (thanks to Paul Fenwick who's "MySpace for Antisocial Fascist Bastards" code has been modified here) 
//******************************************************************************
function removeContent(id)
{

	var node = document.getElementById(id);

	if (node) 
	{
		node.parentNode.removeChild(node);
		node = null;
	}
	else
	{
		var nodes = document.getElementsByClassName(id);
		for (node in nodes) 
		{
			nodes[node].parentNode.removeChild(nodes[node]);
			nodes[node] = null;
		}
	}
}
