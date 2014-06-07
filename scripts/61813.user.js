scr_meta=<><![CDATA[
// ==UserScript==
// @name          ptt_mh_xd
// @author        luwanana
// @version       0.8.5
// @namespace     http://apps.facebook.com/mousehunt/
// @description   0.8.5 based on NOrak's "Facebook MouseHunt Game Auto Horn Blower"
// @source        http://userscripts.org/scripts/review/61813
// @identifier    http://userscripts.org/scripts/source/61813.user.js
// @include       http://apps.facebook.com/mousehunt/*
// @include       http://apps.new.facebook.com/mousehunt/*
// @include       http://www.facebook.com/common/error.html
// ==/UserScript==
]]></>.toString(); 

//===============================================================================
//			- 請 自 行 設 定 以 下 參 數 -
//===============================================================================
var partitionTime = 60;                  //請將 60除以團隊中清醒的吹號小幫手使用者人數 
                                         //ex. 60/4=15

var rotationID = 0;                      //請依序設定id, 由0開始 
                                         //ex. 4位清醒的吹號小幫手使用者 則為0 1 2 3

var PauseMax = 200 * 60;                 //請設定使用者的King's Reward時間 以 分鐘 * 60 為格式 
                                         //ex. 3小時則為 180 * 60

//===============================================================================
//			- 請 自 行 設 定 以 上 參 數 -
//===============================================================================

//Random delay of blowing after the actual horn blowing time
var mhDelay_min = 2;                      // minimum delay in seconds
var mhDelay_max = 7;                     // maximum delay in seconds

//Random delay of checking after the actual trap checking time
var tcDelay_min = 5;                     // minimum delay in seconds
var tcDelay_max = 15;                     // maximum delay in seconds

//Random delay between King's reward captcha checking
var krDelay_min = 15;                     // minimum delay in minutes
var krDelay_max = 17;                     // maximum delay in minutes

//Random delay between profile page refreshing
var poDelay_min = 60;                     // minimum delay in minutes
var poDelay_max = 90;                    // maximum delay in minutes

//Sound warning when player get king reward
var SoundWarning = true;   // change this to FALSE if player dont want
                           //   to be warned with sound.

//===============================================================================
//                      - Delay tight or loose
//===============================================================================
if (GM_getValue('tight', 'not set') == 'not set')
   GM_setValue('tight', false);


GM_registerMenuCommand("MH - ptt_mh_xd toggle Tight/Loose", TightOrLoose);

function TightOrLoose() 
{
   if (GM_getValue('tight', false) == false)
      { 
         GM_setValue('tight', true);
         alert('"Tight" is your current delay setting');
         mhDelay_min = 1;
         mhDelay_max = 3;  
      }
   else if (GM_getValue('tight', true))
      {
         GM_setValue('tight', false);
         alert('"Loose" is your current delay setting');
         mhDelay_min = 2;
         mhDelay_max = 7;
      }
}
//===============================================================================
//                      - Delay tight or loose
//===============================================================================
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
var script_title = "ptt_mh_xd";
var source_location = "http://userscripts.org/scripts/source/61813.user.js";
var current_version = '0.8.5';
var latest_version = " ";
var gm_updateparam = "ptt_mh_xd_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/Doc?docid=0AQrFp4Lh_eP1ZGhnc2c4OHdfMmNmYjN6cXg4&hl=en";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("MH - ptt_mh_xd Check for Updates", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var update_today = new Date();
        GM_setValue(gm_updateparam, String(update_today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{
	var update_today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		update_today = update_today.getTime(); //Get update_today's date
		var interval = (update_today - new Date(lastupdatecheck).getTime()) / one_day; //Find out how much days have passed		
        
		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 3)			
			CheckVersion();
	}
	else
		CheckVersion();

}
CheckForUpdate()
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
                        var update_today = new Date()
                        GM_setValue(gm_updateparam, String(update_today))
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
		var update_today = new Date();
		update_today = update_today.getTime();		
		var twodays_ms = 2 * 24 * 60 * 60 * 1000;
		var tda_ms = update_today - twodays_ms;		
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
	var update_today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(update_today));
}

//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================


mhDelay_max = mhDelay_max - mhDelay_min;
tcDelay_max = Math.round( (tcDelay_max - tcDelay_min) / 3);
tcDelay_min = Math.round(tcDelay_min / 3);


var inputs = document.getElementsByTagName("input");
var DelayBeforeHORN = -1;
var pause = false;
var today= new Date();
var CurrentMinute  = today.getMinutes();
var CurrentSecond = today.getSeconds();
var CurrentTime = CurrentMinute * 60 + CurrentSecond;
var DelayBeforeCheckTrap = 3600 - CurrentTime 
   + (Math.round(Math.random() * tcDelay_max) + tcDelay_min) * 3;
var DelayBeforeKingReward = PauseCaptcha ();
var PauseMinimum = 90;
var Title = document.title;


if (GM_getValue('AFMcheck', 'not set') == 'not set')
   GM_setValue('AFMcheck', false);


GM_registerMenuCommand("MH - ptt_mh_xd Away from monitor", CheckAFM);

function CheckAFM() 
{
   if (GM_getValue('AFMcheck', false) == false)
      { 
         GM_setValue('AFMcheck', true)
         alert('"true" is your current AFM setting')
      }
   else if (GM_getValue('AFMcheck', true))
      {
         GM_setValue('AFMcheck', false)
         alert('"false" is your current AFM setting')
      }
}


if (inputs)
{
   //search the clue thru the mousehunt page to find a hidden
   //  countdown timer or king reward captcha.
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("hornWaitValue") != -1)
      {
         //when the hidden timer is found, adjust the time by adding with
         //  a random delay between mhDelay_min and mhDelay_max.
         DelayBeforeHORN = parseInt(inputs[i].value) 
            + Math.round(Math.random() * mhDelay_max) + mhDelay_min;
         break;
      }
   } 
   
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].name.indexOf("puzzle") != -1)
      {
         //when the king reward is detected, pause the script
         //  to prevent detection by game server.
         pause = true;
         break;
      }
   }
}





//check if the hidden timer has been found then show the timer on
//  mousehunt title bar to let player knows when the horn will be blown

if (Math.abs(DelayBeforeHORN - DelayBeforeCheckTrap) < PauseMinimum)
   if (DelayBeforeHORN > DelayBeforeCheckTrap) DelayBeforeCheckTrap = DelayBeforeHORN;
   else DelayBeforeHORN = DelayBeforeCheckTrap;


if (pause) 
{
   document.title = "Macro is paused";
   GM_setValue ("lastKingReward", (new Date ()).getTime ().toString ());
   bebunyian();
   //Check again later after 15 minutes whether the king reward
   //  captcha has gone already or not yet.
   if (document.title == "Macro is paused")
   {
      window.setTimeout(function ()
         { window.location.href = "http://apps.facebook.com/mousehunt/" }, 900000);
   }
   else
   {
      var CaptchaDelay = (Math.round(Math.random() *
         (krDelay_max - krDelay_min)) + krDelay_min) * 60;
      document.title ="(Autoreload in " +
         FormatCountDown (CaptchaDelay) + ") " + Title;
      window.setTimeout(function ()
         { window.location.href =
         "http://apps.facebook.com/mousehunt/" }, CaptchaDelay * 1000);
      CaptchaDelay=null;
   }
}
else if (window.location.href == "http://www.facebook.com/common/error.html")
{
   document.title ="(Autoreload in 1 minute) " + Title;
   window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/mousehunt/" }, 60000);
}
else if (window.location.href.indexOf("snuid=") != -1)
{
   var ProfileDelay = (Math.round(Math.random() *
      (poDelay_max - poDelay_min)) + poDelay_min) * 60;
   document.title ="(Autoreload in " +
      FormatCountDown (ProfileDelay) + ") " + Title;
   window.setTimeout(function () { location.reload(true) }, ProfileDelay * 1000);
   ProfileDelay=null;
}
else if (DelayBeforeHORN < -1 &&
   (window.location.href == "http://apps.facebook.com/mousehunt/" ||
   window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
   window.location.href.indexOf(".facebook.com/mousehunt/soundthehorn.php") != -1))
{
   document.title = "(Autoreload in 30 minutes) Something is wrong, probably your trap is out of bait    | " + Title;
   window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/mousehunt/" }, 1800000);
}
else if (DelayBeforeHORN == -1 &&
   (window.location.href == "http://apps.facebook.com/mousehunt/" ||
   window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
   window.location.href.indexOf(".facebook.com/mousehunt/soundthehorn.php") != -1))
{
   document.title = "Reloading: Cant find hidden MouseHunt countdown timer    | " + Title;

   window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/mousehunt/" }, 15000);
}
else if (window.location.href == "http://apps.facebook.com/mousehunt/" ||
   window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
   window.location.href.indexOf(".facebook.com/mousehunt/soundthehorn.php") != -1)
{
   window.setTimeout(function () { HornWhenNeeded() }, 1000);
}



function HornWhenNeeded ()
{
   var rightNow=new Date();
   if ((DelayBeforeKingReward<=600)&&(GM_getValue('AFMcheck',false) == true))
   {
      GM_setValue('AFMcheck', false);
      window.location.href = "http://www.facebook.com/";
   }
   else
   {
      if (DelayBeforeHORN > 0 && DelayBeforeCheckTrap > 0)
      {
         document.title = FormatCountDown(DelayBeforeHORN--) + " -Horn- " 
            + FormatCountDown(DelayBeforeCheckTrap--) + " -Check Trap- "
            + FormatCountDown(DelayBeforeKingReward--) + " -King's Reward-"
            + "      | " + Title;
         window.setTimeout(function () { (HornWhenNeeded)() }, 1000);
      }
      else if ((DelayBeforeHORN <= 0)&& ( (Math.floor( (rightNow.getMinutes()) /partitionTime )) == rotationID))
      {
         document.title = "Blowing The Horn ...    | " + Title;
         window.location.href = "http://apps.facebook.com/mousehunt/soundthehorn.php";     
      }
      else if(DelayBeforeCheckTrap <= 0)
      {
         document.title = "Checking The Trap ...    | " + Title;
         window.location.href = "http://apps.facebook.com/mousehunt/";  
      }
      else
      {
         document.title = "Checking The Trap ...    | " + Title;
         window.setTimeout(function ()
         { window.location.href = "http://apps.facebook.com/mousehunt/" }, 60000);
      }
   }
}

function PauseCaptcha ()
{
   var Sekarang = (new Date ()).getTime ();
   var Terakhir = GM_getValue ("lastKingReward", " ");
   
   
   if (Terakhir == " ")
   {      
      GM_setValue ("lastKingReward", Sekarang.toString ());
      return PauseMax;
   }
   else
   {
      var Selisih = PauseMax - parseInt((Sekarang - Terakhir) / 1000);
      
      if (Selisih < 0)
      {
         GM_setValue ("lastKingReward", Sekarang.toString ());
         return PauseMax;      
      }
      else return Selisih;      
   }
}

function FormatCountDown (waktu)
{
   if (!waktu) return false;
   if (isNaN(parseInt(waktu))) return waktu;
   
   var	jam = parseInt(waktu / 3600);
   var	sisawaktu = waktu % 3600;
   var	menit = parseInt(sisawaktu / 60);
   var	detik = sisawaktu % 60;
   var   penampakan = "";
   if (jam < 10) jam = "0" + jam;
   if (menit < 10) menit = "0" + menit;
   if (detik < 10) detik = "0" + detik;
   if (detik <= 0)
   {
      if (menit <= 0)
      {
         if (jam > 0) penampakan = jam + " h";
      }
      else if (jam > 0) penampakan = jam + " h " + menit + " m";
      else penampakan = menit + " m";      
   }
   else
   {
      if (jam <= 0)
      {
         if (menit > 0) penampakan = menit + " m " + detik + " s";
         else penampakan = detik + " s";
      }
      else penampakan = jam + " h " + menit + " m " + detik + " s";
   }
   sisawaktu=null;jam=null;menit=null;detik=null;
   return penampakan;
   
}

function bebunyian ()
{
   var kerasukan = document.createElement("div");
   kerasukan.innerHTML = "<embed name=\"kingreward\" src=\"http://sql.jaes.tpc.edu.tw/javaroom/midi/alas/Ma/march1_8.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
   if (SoundWarning)
   {
      document.getElementById("content").appendChild(kerasukan);
   }
   document.title = "Macro is paused: Claim your King Reward   | " + Title;
   kerasukan=null;
}



inputs=null;CurrentTime=null;CurrentSecond=null;CurrentMinute=null;today=null;mhDelay_min=null;mhDelay_max=null;tcDelay_min=null;tcDelay_max=null;krDelay_min=null;krDelay_max=null;poDelay_min=null;poDelay_max=null;pause=null;PauseMinimum=null;SoundWarning=null;update_61813=null;