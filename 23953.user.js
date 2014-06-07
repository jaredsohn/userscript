// ==UserScript==
// @name           NPR Download As MP3
// @namespace      http://edpad.com/npr-mp3/
// @description    This adds a link to NPR story pages so that you can right-click and download the story MP3 file (instead of being forced to play their files through the Flash player). Please support your local NPR station!
// @include        http://*.npr.org/templates/story/story.php*
// @include        http://*.npr.org/templates/player/mediaPlayer.html*
// @include        http://*.npr.org/2010/*
// @include        http://*.npr.org/2011/*
// @version 0.5.1
// ==/UserScript==
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
if(sPage != 'mediaPlayer') {
	var con = document.getElementById("storybody").innerHTML;
	var i = con.indexOf("NPR.Player.openPlayer");
	var t = con.indexOf("(",i);
	var j = con.indexOf(",",t);
	var k = con.indexOf(",",j+1);
	var id1 = con.substring(t+1,j);
	var id2 = con.substring(j+2,k);
	
	 	
	 GM_xmlhttpRequest({
   method:"GET",
   url:"http://api.npr.org/query?fields=show,audio,multimedia,titles,dates,song,album&apiKey=MDAzMzQ2MjAyMDEyMzk4MTU1MDg3ZmM3MQ010&id=" + id1 +"&m="+id2+ "&t=1",    
   headers:{
     "User-Agent": navigator.userAgent,       
     "Accept":"text/xml"
   },
   onload:function(response) {

var xmlobject = (new DOMParser()).parseFromString(response.responseText, "text/xml");
var root = xmlobject.getElementsByTagName('audio');
for(var i=0; i<root.length; i++) { 
		var ids = root[i].getAttribute("id");
		
		//var tRoot = root[i].getElementsByTagName('title');
		//var tDesc = tRoot[0].firstChild.nodeValue;
		var mRoot = root[i].getElementsByTagName('mp3');
		if (mRoot[0].getAttribute("type") == 'mp3') {
		var desc = mRoot[0].firstChild.nodeValue;
		var altdesc = desc.replace ("pd","download");
		downloadDiv = document.createElement('li');
		downloadDiv.innerHTML = '<a class="download" href="' + desc + '" style=""><span>Download</span></a> <a href="' + altdesc + '" style="padding-left:0px;">(Alt)</a>';
		var link = document.getElementById("res" + ids).getElementsByTagName('ul')[0];
		//insertAfter(downloadDiv, link);
		link.insertBefore(downloadDiv,link.firstChild);
		//link.insertBefore(downloadDiv2,link.firstChild);
	}
		
	}
   }
 });
}
else {
//media player page
	function gup( name )
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
		return "";
	  else
		return results[1];
	}
	id1 = gup("id");
	id2 = gup("m");
		 GM_xmlhttpRequest({
   method:"GET",
   url:"http://api.npr.org/query?fields=show,audio,multimedia,titles,dates,song,album&apiKey=MDAzMzQ2MjAyMDEyMzk4MTU1MDg3ZmM3MQ010&id=" + id1 +"&m=" + id2 + "&t=1",    
   headers:{
     "User-Agent": navigator.userAgent,       
     "Accept":"text/xml"
   },
   onload:function(response) {
   var xmlobject = (new DOMParser()).parseFromString(response.responseText, "text/xml");

var root = xmlobject.getElementsByTagName('mp3');
var desc = root[0].firstChild.nodeValue

var altdesc = desc.replace ("pd","download");
downloadDiv = document.createElement('div');
		downloadDiv.innerHTML = '<a class="download" href="' + desc + '" style=""><span>Download</span></a> <a href="' + altdesc + '" style="padding-left:0px;">(Alternate)</a>';
var link = document.getElementById("homepageFlash");
link.insertBefore(downloadDiv,link.firstChild);
			}
		
	});
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================

var script_title = "NPR Download As MP3";
var source_location = "http://edpad.com/npr-mp3/nprmp3.user.js";
var current_version = "0.5.1";
var latest_version = " ";
var gm_updateparam = "nprmp3_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://edpad.com/npr-mp3/latest.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("NPRMP3: Check for update", CheckVersion);

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
		var interval = (today - lastupdatecheck.getTime()) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
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
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================