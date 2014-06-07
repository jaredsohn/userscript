// ==UserScript==
// @name           Facebook - Fishwrangler Smart Autofish
// @namespace      iispyderii
// @description    A smart autofisher for the Fishwrangler facebook app
// @version       2.3.1.2 Change detection in treasure
// @version       2.3.1.1 Small typos.
// @version       2.3.1.0 Change detection in treasure
// @version       2.3.0.1 Small typos, errors.
// @version       2.3.0.0 A new GUI for the options
// @version       2.2.1.1 Small bug fix.
// @version       2.2.1.0 Added a DEFINITE way to find oxygen.
// @version       2.2.0.0 Added auto Oxygen buyer for those in SL, SV, and SW
// @version       2.1.1.0 Changed the way the script finds the boat timer. Dane has tested. Should work fine.
// @version       2.1.0.1 Added maintainence detection fix.
// @version       2.1.0.0 Added oxygen detector and detector when you were ready to fish but 'Last crew trip' was up there instead of "Go Fishing Now", Added Pneumatic Spear to safety checks (it was accidentally left out), Small syntax changes in title bars.
// @version       2.0.2.1 Small Boat Trainer error, now fixed hopefully
// @version       2.0.2.0 Updated Boat Trainer, AutoFuel for the Mini Cruiser
// @version       2.0.1.2 Bug fix, syntax error.
// @version       2.0.1.1 Added oxygen detector
// @version       2.0.1.0 Better implementation of functions. Added MINI CRUISER to Boat Trainer.
// @version       2.0.0.1 Couple of adjustments to script and alerts.
// @version       2.0.0.0 Danith added new features [Auto-Caster (improved), Alerts, Risky Fishing, Treasure Music], Increased Chum buying amount. Added Snowpeak Summit and Sig's Lair.
// @version       1.8.6.1 Fixed where it directed to publisher page
// @version       1.8.6.0 Important update! Fixes detecting island.
// @version       1.8.5.3 Adding some things, quick fixes, suggestions. Other sorts.
// @version       1.8.5.2 Fixed another link.
// @version       1.8.5.1 They keep changing the links. I will keep it updated as much as possible.
// @version       1.8.5  Spelling error, just making sure everyone gets the update now.
// @version       1.8.4  Fixed a big bug in upgrading from 1.7.2 to 1.8.0 and you only had 1 kind of boat
// @version       1.8.3  Looks like they added apps.new.facebook to the URL.
// @version       1.8.2  Error in spelling
// @version       1.8.1  Small bug in not storing last update check.
// @version       1.8.0  Added autodraw for RLC Raffle, added Beat Up Dinghy to Boat Trainer
// @version       1.7.1  Fix for detecting pole levels more than 99
// @verison       1.7.0  Added Icelatia auto-battle for penguin/racoon/polar bear
// @version       1.6.2  Fixed a bug where fish timer and travel timer mess up each other
// @version       1.6.1  Bug Fixes for Ice Trainer
// @version       1.6.0  Added Ice Boat trainer. It's under script commands.
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
// @include       http://fb.fishwranglr.com/*
// @include       http://apps.new.facebook.com/fishwrangler/*
// @exclude       http://apps.facebook.com/fishwrangler/profile/*
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
safeToFish = true;
timervalue = -1;
timeoutvalue = -1;
//treasureChest = (document.body.innerHTML.indexOf("http://72.2.118.86/images/treasure2.jpg") != -1); //check if a captcha is detected
//repairNeeded = (document.body.innerHTML.indexOf("NEEDS REPAIR!</a>") != -1); //check if anything needs repair
voyaging = ((document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./) !=-1) ||
                      (document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./) != -1))
//needChum = (document.body.innerHTML.indexOf("Get Chum") != -1); //check if need to buy chum
//needFuel = (document.body.innerHTML.indexOf("EMPTY!") != -1); //check if need to buy fuel
nightFishing = (document.body.innerHTML.indexOf('Night Fishing!') != -1); //check if a Night Fishing is detected
//check for scheduled downtime
scheduledDowntime = ((document.body.innerHTML.indexOf('Scheduled Downtime: Fish Wrangler should be back up in') != -1) || (document.body.innerHTML.indexOf('Scheduled Maitenance: Fish Wrangler should be back up in') != -1));
//check if Oxygen Tank is empty


initialize();

if(inputs)
{
   //loop through and find the fish timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("timer_hidden") != -1)
      {
         timervalue = inputs[i].value;
         //calculate timeoutvalue in milliseconds
         //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly
         //the random time is to help keep it less obvious mostly.
         timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
         //alert("Page will be reloaded in " + (timervalue/60).toFixed(1) + " minutes " );
         break;
      }
   }
}

gatherFishingInfo();

if (document.body.innerHTML.indexOf('c bold tiny llred') != -1 && ((island == ('Sig')) || (island == 'Sans Culpra')))
{needOxygen = trim(document.getElementsByClassName('c bold tiny llred')[0].getElementsByClassName('tiny')[0].innerHTML)== '0%'}
else
{needOxygen = false}

if (GM_getValue('Boat Trainer', false) == false)
{
  safetyCheck();
}

autoBattle();
autoRaffle();

if ((GM_getValue('Auto Tourny', false) == true) && (window.location.href == "http://apps.facebook.com/fishwrangler/cast"))
{
  autoTourny();
}
else
{
  autoFish();
}

//===============================================================================
//            - ALL FUNCTIONS ARE BELOW -
//===============================================================================
function trim(stringToTrim) {
return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function nextAvailableTime(zTimeoutvalue)
{
  //Determine the current date, add the timeoutvalue in milliseconds, and
  //return the formatted time.
  d = new Date();

  if(zTimeoutvalue >= 0)
  {
    d.setTime(d.getTime() + zTimeoutvalue);
  }

  minutes = d.getMinutes();
  seconds = d.getSeconds();

  if (minutes < 10)
  {minutes = "0" + minutes;}

  if (seconds < 10)
  {seconds = "0" + seconds;}

  return d.getHours() + ':' + minutes + ':' + seconds;
}

function initialize()
{
  if (GM_getValue('Are you Evil?', 'not set') == 'not set')
  { alert('You haven\'t changed your preference for Icelantia Chum\n\n' + 'NEW INSTRCTIONS!!!\n\n' +
    'Please right click the monkey in the bottom right corner of your browser\n' +
    'And go to "Userscript Commands" and choose your preference for chum in Icelantia\n\n' +
    'If you don\'t change it, this script \nWILL NOT FISH AUTOMATICALLY for you\n\n' +
    'And this window will keep buggerin you :P\n\n')
  }

  //===============================================================================
  // - Registering GreaseMonkey Commands -
  //===============================================================================
  //
  //if (GM_getValue('Are you Evil?') == false)
 // {icelantiaChumToggleText = "Toggle - Icelantia Chum (Good)";}
 // else if (GM_getValue('Are you Evil?') == true)
 // {icelantiaChumToggleText = "Toggle - Icelantia Chum (Evil)";}
 // else if (GM_getValue('Are you Evil?','not set') == 'not set')
  //{icelantiaChumToggleText = "Toggle - Icelantia Chum (Not Set!)";}

//*
 // GM_registerMenuCommand(icelantiaChumToggleText, toggleFaction);
  //GM_registerMenuCommand("Toggle - Boat Trainer (" + GM_getValue('Boat Trainer', false) + ")", toggleBoat);
 // GM_registerMenuCommand("Toggle - RLC Daily Raffle (" + GM_getValue('RLCDailyRaffle', false) + ")", toggleRLCDailyRaffle);
  //GM_registerMenuCommand("Toggle - Auto Tournament Caster (" + GM_getValue('AutoTournyCast', false) + ")", toggleAutoTournyCast);
  //GM_registerMenuCommand("Toggle - Risky Fishing (" + GM_getValue('RiskyFishing', false) + ")", toggleRiskyFishing);
 // GM_registerMenuCommand("Toggle - Safety Alerts (" + GM_getValue('SafetyAlerts', false) + ")", toggleSafetyAlerts);
//  GM_registerMenuCommand("Toggle - Treasure Chest Music Alert (" + GM_getValue('TreasureChestMusicAlert', false) + ")", toggleTreasureChestMusicAlert);
 // GM_registerMenuCommand("Toggle - HELP", toggleHELP);
//*/

  //===============================================================================
  //            - Weekly Auto-Update Check -
  //===============================================================================
  // CheckForUpdate() will verify if the time has come to look if an update is available.
  // CheckVersion() will verify if this script version is the latest available.
  //===============================================================================
  //script_title = "Facebook - Fishwrangler Smart Auto-fish";
 // source_location = "http://userscripts.org/scripts/source/59836.user.js";
  //current_version = "2.3.1.2";
  //latest_version = " ";
  //gm_updateparam = "iispyderiiFishWrangler_lastupdatecheck";
  //lastupdatecheck = GM_getValue(gm_updateparam, "never");
  //version_holder = "http://docs.google.com/Doc?docid=0AYzj4S3KalbPZGdiN3Jtdl8yZ2d6cWZ0Z3Q&hl=en";
  //CheckForUpdate();

  // a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
  //version_holder = "http://docs.google.com/Doc?docid=0AYzj4S3KalbPZGdiN3Jtdl8yZ2d6cWZ0Z3Q&hl=en";

  //Add a command to the menu in case someone wants to manually check for an update.
  //GM_registerMenuCommand("FW - Check for Updates", CheckVersion);


  //===============================================================================
  //            - Gather Fish Wrangler Information -
  //===============================================================================
  //
  //Determine which Island we're fishing.
  //Determine which Pole we're using.
  //Determine which Chum we're using.
  //Determine nextAvailableTrip time.
  var images = document.getElementsByTagName("img");
  island = "not_set";
  activePole = "not_set";
  activeChum = "not_set";

  for(var i = 0; i < images.length; i++)
  {
    //Determine Island
    if (images[i].src.indexOf("images/towns/thumbs/") != -1)
    {
      island = images[i].title;
      //alert("island: " + island);
    }
  }

  //Determine activePole
  if (document.getElementById("app8138090269_c_poles_user_active") != null)
  {
    var poleTable = document.getElementById("app8138090269_c_poles_user_active");
    activePole = trim(poleTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(10,40));
  }

  //Determine activeChum
  if (document.getElementById("app8138090269_c_chum_user_active") != null && !needChum)
  {    
    var chumTable = document.getElementById("app8138090269_c_chum_user_active");
    activeChum = trim(chumTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(10,40));
  }
  
  //Determine activeBoat
  if ((document.getElementById("app8138090269_c_boats_user_active")!= null) && 
      (window.location.href.indexOf('fishwrangler/my') != -1)) 
  {
    var boatTable = document.getElementById("app8138090269_c_boats_user_active");
    activeBoat = trim(boatTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(13,18));
    GM_setValue("Boat",activeBoat)
  }
  else if ((document.getElementById("app8138090269_c_boats_user_active")== null) && 
          (window.location.href.indexOf('fishwrangler/my') != -1))
  {
    GM_setValue("Boat", "Beat")
  }
  
  //alert("activePole: +" + activePole + "+");
  //alert("activeChum: " + activeChum);
  //alert("boat: " + activeBoat); 
}


 function autoRaffle()
{
  //===============================================================================
  //             - Auto RLC Raffle -
  //===============================================================================
  //

  if (GM_getValue('RLC Daily Raffle', true))
  {
    var gm_RLCparam = "RLC_raffle";
    var lastRaffle = GM_getValue(gm_RLCparam, "never");
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

    if(lastRaffle != "never")
    {
      today = today.getTime(); //Get today's date
      var interval1 = (today - new Date(lastRaffle).getTime()) / one_day; //Find out how much days have passed

      if(interval1 >= 1)
      {RLCraffle();}
    }
    else
    {RLCraffle()}
  }
}

function RLCraffle()
{
  var today = new Date();
  var gm_RLCparam = "RLC_raffle";
  GM_setValue(gm_RLCparam, String(today));
  window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/fishwrangler/raffle?show-me-the-rlc#rafflina-bumbalina-gimme-da-goods" }, 2000);
}


  //================================================================================
  //              -Auto Tourny-
  //================================================================================
function autoTourny()
{
  //Copied from "Facebook Fishwrangler - Smart Auto Tournament Caster", thanks to Wr3cktangle
  var inputs = document.getElementsByTagName("input");
  var tournyTimervalue = -1;

  if(inputs)
  {
     //loop through and find the fish timer hidden input box and get it's value
     for(i = 0; i < inputs.length; i++)
     {
        if(inputs[i].id.indexOf("tourny_timer_hidden") != -1)
        {
           tournyTimervalue = inputs[i].value;
           break;
        }
     }
  }

  //recast or go home
  if(tournyTimervalue > 0)
  {
    //calculate timeoutvalue in milliseconds
    //tournytimervalue is in seconds, so convert that, and add on [3,5) seconds randomly
    //the random time is to help keep it less obvious mostly.
    tournyTimeoutvalue = (parseInt(tournyTimervalue) + Math.round(Math.random() * 2) + 3) * 1000;
    
    document.title = "Tourny Active - Cast at " + nextAvailableTime(tournyTimeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/cast';} , tournyTimeoutvalue);
  }
  else
  {
     document.location = 'http://apps.facebook.com/fishwrangler/my'
  }
}


  
/**/
  //================================================================================
  //              -FISHING FUCTION-
  //                -MOST IMPORTANT-
  //================================================================================

function autoFish()
{
  //if (needChum)
  //{
  //  autoChumBuyer();
  //}
  //else if (needFuel)
  //{
  //  autoFuelBuyer();
  //}
  //else if ((!safeToFish) && (!voyaging) && (window.location.href != "http://apps.facebook.com/fishwrangler/map"))
  //{
  //  document.title ="Not safe to fish! - Auto-Fish is paused";
  //}
  //else if (repairNeeded)
  //{
  //  document.title ="Repair Needed! - Auto-Fish is paused";
  //}
  //else if (needOxygen && (island == "Sig"))
  //{
  //  autoOxygenBuyer();
  //}
  //else if (needOxygen)
  //{
  //  document.title ="Refill Oxygen Tank! - Auto-Fish is paused";
  }
  else if (window.location.href == "http://www.facebook.com/common/error.html")
  {
    document.title ="Error Page - Relfresh in 5 seconds";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 5000);
  }
  else if (window.location.href == "http://apps.facebook.com/fishwrangler/my?treasure")
  {
    document.title ="Treasure Chest claimed - Resuming Auto-Fish in 5 seconds";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 5000);
  }
  else if (window.location.href == "http://apps.facebook.com/fishwrangler/auger")
  {
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/my';}, ((Math.round(Math.random() * 5) + 1) * 1000));
  }
  else if (window.location.href == "http://apps.facebook.com/fishwrangler/raffle?show-me-the-rlc#rafflina-bumbalina-gimme-da-goods")
  {
    document.title ="See if you won RLC, Quick!";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 15000);
  }
  else if (GM_getValue('Boat Trainer', false))
  {
    //Auto Fish logic resumes when arriving to your destination
    document.title ="Boat Trainer Active! - Auto-Fish is paused";
    boatTrainer();
  }
  else if (voyaging)
  {
    //Auto Fish logic resumes when arriving to your destination
    document.title ="Voyaging - Next trip at " + nextAvailableTime(timeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/my';} , (timeoutvalue + 10000));
  }
  //moved this a few slots up to increase priority
  else if ((timeoutvalue == -1) && (nightFishing))
  {
    //If Night Fishing! has started, check for timer every hour by reloading the
    //Fish Wrangler home page until "Go Fishing Now!" is found.
    document.title ="Night Fishing! - Refreshing main page every hour until Go Fishing Now! is displayed";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 3660000);
  }
  else if ((timeoutvalue == -1) && (scheduledDowntime))
  {
    //If Scheduled Downtime has started, check for timer every hour by reloading the
    //Fish Wrangler home page until "Go Fishing Now!" is found.
    document.title ="Scheduled Downtime! - Refreshing main page every hour until Go Fishing Now! is displayed";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 3660000);
  }
  else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Go Fishing Now!') != -1) && (safeToFish))
  {
    document.title ="Fish NOW!";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/start" }, 3000);
  }
  else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Last <a class="ul"') != -1 || (document.body.innerHTML.indexOf('win-500-rlc.gif') != -1)) && (safeToFish))
  {
    document.title ="Fish NOW!";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/start" }, 3000);
  }
  else if (timeoutvalue == -1)
  {
    //As a last resort to ensure Auto-Fish is working 100% of the time, if timeoutvalue is still
    //not found, reload Fish Wrangler Home page every 60 seconds until "Go Fishing Now!" is found.
    document.title ="Auto-Fish Issue - Reloading in 60 seconds";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 60000);
  }
  else if (timeoutvalue >= 0 && (safeToFish))
  {
    document.title ="Active - Next trip at " + nextAvailableTime(timeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';} , timeoutvalue);
  }
}