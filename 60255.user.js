// ==UserScript==
// @name           Facebook - Fishwrangler Smart Autofish
// @namespace      iispyderii
// @description    A smart autofisher for the Fishwrangler facebook app
// @version       1.5.1  Added Boat Fuel auto-buy for Mini Cruiser
// @version       1.5.0  Added Auto Update featue along with easier Evil/Good Setting
// @version       1.4.0  Added Chum auto-buying feature
// @version       1.3.1  Added simple auto auger portion
// @version       1.3.0  Fixes the break in code that happend 10/13/09
// @version       1.2.2  Added treasureChest variable and handling block. Currently, I do nothing, but others may want to personally.
// @version       1.2.1  Changed variable "location" to "island" for better compatibility.
// @version       1.2.0  Added safety check to Sans Culpra for fishing more than 15 times without a license.
// @version       1.1.0  Stops autofishing in Magma Reef if it may be unsafe to, and if something needs repair.
// @version       1.0.0  Initial Release
// @include       http://www.facebook.com/common/error.html
// @include       http://apps.facebook.com/fishwrangler/*
// @exclude       http://apps.facebook.com/fishwrangler/map-travel/*
// @exclude       http://apps.facebook.com/fishwrangler/cast
// @exclude       http://apps.facebook.com/fishwrangler/discussion-board
// ==/UserScript==





var inputs = document.getElementsByTagName("input");
var anchors = document.getElementsByTagName("a");
var timervalue = -1;
//var ignoreSafety = false; //change to true to ignore safety checks (akin to v1.0 since it had no safety checks)
//I TOOK IGNORESAFETY OUT B/C IT SEEMS POINTLESS TO NOT HAVE THE CHECKS OF A TREASURE CHEST. I SUGGUEST YOU LEAVE IT OFF AS WELL (THAT MEANS DONT MESS WITH THE ABOVE LINES OF CODE)
var safeToFish = (document.body.innerHTML.indexOf("NEEDS REPAIR!</a>") == -1); //check if anything needs repair
var fakeSafeToFish = (document.body.innerHTML.indexOf(" NEEDS REPAIR!") != -1);
var treasureChest = (document.body.innerHTML.indexOf("huge green bold") != -1); //check if a captcha is detected

var fakeTreasureChest = (document.body.innerHTML.indexOf("Select a Treasure! ") != -1);
var fuelLevel = (document.body.innerHTML.indexOf("EMPTY!") != -1);
var youJustAugered = (window.location.href == "http://apps.facebook.com/fishwrangler/auger");
var needChum = (document.body.innerHTML.indexOf("Get Chum") != -1);
//var elem = document.getElementById('frmMain').elements;
// If something ever comes up with the fake line of txt they put in (it's laughable really how they try to stop us) do recognize that the fakeSafe to fish is " NEEDS REPAIR!", you must have the space beforehand or it could take it from a broken pole. Same goes for the Treasure! there is a SPACE in the "Treasure! "



function trimAll(sString) 
{
while (sString.substring(0,1) == ' ')
{
sString = sString.substring(1, sString.length);
}
while (sString.substring(sString.length-1, sString.length) == ' ')
{
sString = sString.substring(0,sString.length-1);
}
return sString;
}

if ((GM_getValue('Evil', 'not set' ) == 'not set') || (GM_getValue('Good', 'not set') == 'not set'))
{ alert('You haven\'t changed your preference for Icelantia Chum\n\n' + 'NEW INSTRCTIONS!!!\n\n' + 'Please right click the monkey in the bottom right corner of your browser\n' + 'And go to "Userscript Commands" and choose your preference for chum in Icelantia\n\n' + 'If you don\'t change it, this script \nWILL NOT FISH AUTOMATICALLY for you\n\n' + 'And this window will keep buggerin you :P\n\n')}


/*var idArray = document.getElementById("app8138090269_c_poles_user_active");
var activePole = trimAll(idArray.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(10,40));*/
//this pulls what pole you have active
if(inputs)
{
   //loop through and find the fish timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("timer_hidden") != -1)
      {
         timervalue = inputs[i].value;         
         break;
      }
   }
   
}

//figure out which Island we're fishing at. 
//If it's Magma Reef, look for the text "You can safely lava fish". 
//Note: You'll probably have to manually fish once at Magma Reef to get the party started.
//If it's Sans Culpra, look for the text "Scuba Diving License REQUIRED..." and abort if found
for(var i = 0; i < anchors.length; i++)
{   
   if(anchors[i].href.indexOf("map") != -1)
   {
      images = anchors[i].getElementsByTagName("img");
      if(images.length == 1 && images[0].title.indexOf("Island:") != -1)
      {
         //parse out location name from image tag
         //probably easier ways to do it, this was just the first I thought of and went with it
         //doesn't take much time, but it's gonna fail hardcore if they change the title attribute
         //for this image
         island = images[0].title.substr("Island: ".length, images[0].title.length - "Island: ".length);
                   
         if(island == "Magma Reef")
         {
           safeToFish &= (document.body.innerHTML.indexOf('You can safely lava fish') != -1);
         }
         else if(island == "Sans Culpra")
         {      
           safeToFish &= (document.body.innerHTML.indexOf('Scuba Diving License REQUIRED...') == -1);
         }
         
         images = null;      
         break;
      }
   }   
}
anchors = null;
inputs = null;


if (fuelLevel && !(window.location.href == "http://apps.facebook.com/fishwrangler/customize/fuel"))
    {
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/customize/fuel';}, 5000)
    }
{
if (fuelLevel && (window.location.href == "http://apps.facebook.com/fishwrangler/customize/fuel"))
    {
    var forms = document.getElementsByTagName("form");
    var idFuel = (forms[1].id)
    setTimeout(function() {document.getElementById(idFuel).submit();}, 5000);
    }
    var forms = null;
}
    
var chumPage = "http://apps.facebook.com/fishwrangler/customize/chum"
if (needChum && (island != "Magma Reef") && (island != "Sans Culpra") && !(window.location.href == "http://apps.facebook.com/fishwrangler/customize/chum" || window.location.href == "http://apps.facebook.com/fishwrangler/earl-lavashack"))
{
setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/customize/chum';}, 5000);
}
if (needChum && (island == "Magma Reef") && (window.location.href != "http://apps.facebook.com/fishwrangler/ear-lavashack"))
    {
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/earl-lavashack';}, 5000);
    }
    
    if ((window.location.href == "http://apps.facebook.com/fishwrangler/customize/chum" || window.location.href == "http://apps.facebook.com/fishwrangler/earl-lavashack") && needChum)
    
        {

var forms = document.getElementsByTagName("form");
var inputs = document.getElementsByTagName("input");


if(inputs)
{   
   
   for(i = 0; i < inputs.length; i++)
   { 
    if ((island == "WaterPort" || island == "Fishertonville"))
        { 
            if(inputs[i].name.indexOf("quantity_3") != -1)
              {
              inputs[i].value = 20
              var idCayenne = (forms[3].id)
              setTimeout(function() {document.getElementById(idCayenne).submit();}, 5000);

              }
        }
        else if (island == "Blue Crescent")
            { 
            if(inputs[i].name.indexOf("quantity_6") != -1)
              {
              inputs[i].value = 20
              var idGuts = (forms[1].id)
              setTimeout(function() {document.getElementById(idGuts).submit();}, 5000);

              }
            }
        else if (island == "Magma Reef")
            { 
            if(inputs[i].name.indexOf("quantity_7") != -1)
              {
              inputs[i].value = 20
              var idFire = (forms[1].id)
              setTimeout(function() {document.getElementById(idFire).submit();}, 5000);

              }
            }
        else if ((island == "Glacier Bay" || island == "San Digloo" || island == "Lake Freezberg" || island == "Snowpeak River"))
            {
                if (GM_getValue('Evil') == true)
                    {
                    if(inputs[i].name.indexOf("quantity_10") != -1)
                        {
                            inputs[i].value = 20
                            var idNail = (forms[2].id)
                            setTimeout(function() {document.getElementById(idNail).submit();}, 5000);
                        }
                    }
                else if (GM_getValue('Good') == true)
                    { 
                    if(inputs[i].name.indexOf("quantity_9") != -1)
                        {
                        inputs[i].value = 20
                        var idVeggie = (forms[1].id)
                        setTimeout(function() {document.getElementById(idVeggie).submit();}, 5000);

                        
                        }

                    }
            }
    } 
}       
}  


if (youJustAugered)
{
setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';}, ((Math.round(Math.random() * 20) + 1) * 1000));
}

if (timervalue > 0 && (safeToFish)) 
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';} , timeoutvalue);

}
else if(treasureChest)
{
   //handle captcha if desired.
   //possibilities:
   //1. refresh to main page every 5 minutes
   //setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/';}, 300000)
   //2. ???
   //3. Profit!
}

if(!safeToFish)
{
   document.body.innerHTML = document.body.innerHTML + "<br />It was determined to be possibly unsafe to fish.<br /><br /><br />"
}

// Handle Facebook error pages.
if (location.href.indexOf('error') != -1) {
  var delay = 30;
  var p = document.createElement('p');
  var wait = function() {
    if (!delay) return back();
    p.innerHTML = 'You will automatically return to the previous page in ' +
                  delay-- + ' seconds.';
    window.setTimeout(wait, 1000);
  }
  document.body.appendChild(p);
  wait();
  return;
}

GM_registerMenuCommand("Icelantia - I want to be Good", imGood);
function imGood()
{ 
GM_setValue('Good', true);
GM_setValue('Evil', false);
}
GM_registerMenuCommand("Icelantia - I want to be EVIL!", imEvil);
function imEvil()
{ 
GM_setValue('Evil', true);
GM_setValue('Good', false);
}


//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Facebook - Fishwrangler Smart Autofish";
var source_location = "http://userscripts.org/scripts/source/59836.user.js";
var current_version = "1.5.1";
var latest_version = " ";
var gm_updateparam = "iispyderiiFishWrangler_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/Doc?docid=0AYzj4S3KalbPZGdiN3Jtdl8yZ2d6cWZ0Z3Q&hl=en";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("FW - Check for Updates", CheckVersion);

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
		if(interval >= 3)			
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
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded 3 days only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var twodays_ms = 2 * 24 * 60 * 60 * 1000;
		var tda_ms = today - twodays_ms;		
		var twodaysago = new Date(tda_ms)

		//Since we check for updates after 3 days, just make it seem like the last check was 2 days ago.
		GM_setValue(gm_updateparam, String(twodaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in 3 days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================