// ==UserScript==
// @name           Fishy
// @namespace      backup
// @description    fishy on 27th
// @version       2.4.0.1 Small typo that came up under 1 condition
// @version       2.4.0.0 Added options to turn everything off.
// @version       2.3.2.2 Safety bugs
// @version       2.3.2.1 Chum change :P
// @version       2.3.2.0 Added lots of ancillary features to 'Safety Alerts' & animal attack chosing
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
voyaging = ((document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./) !=-1) ||
                      (document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./) != -1))
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
         //alert(timervalue)
         break;
      }
   }
}

gatherFishingInfo();
if (document.body.innerHTML.indexOf('c bold tiny llred') != -1 && ((island == ('Sig')) || (island == 'Sans Culpra')))
{needOxygen = trim(document.getElementsByClassName('c bold tiny llred')[0].getElementsByClassName('tiny')[0].innerHTML)=='0 %'}
else
{needOxygen = false}

var tanka = document.getElementsByTagName("a");
for(var i = 0; i < tanka.length; i++)
{
  if (tanka[i].innerHTML.indexOf("EMPTY!") != -1)
  {needFuel = true
  break;}
  else 
  {needFuel = false}
}


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
/*
  if (GM_getValue('Are you Evil?') == false)
  {icelantiaChumToggleText = "Toggle - Icelantia Chum (Good)";}
  else if (GM_getValue('Are you Evil?') == true)
  {icelantiaChumToggleText = "Toggle - Icelantia Chum (Evil)";}
  else if (GM_getValue('Are you Evil?','not set') == 'not set')
  {icelantiaChumToggleText = "Toggle - Icelantia Chum (Not Set!)";}
*/
/*
  GM_registerMenuCommand(icelantiaChumToggleText, toggleFaction);
  GM_registerMenuCommand("Toggle - Boat Trainer (" + GM_getValue('Boat Trainer', false) + ")", toggleBoat);
  GM_registerMenuCommand("Toggle - RLC Daily Raffle (" + GM_getValue('RLCDailyRaffle', false) + ")", toggleRLCDailyRaffle);
  GM_registerMenuCommand("Toggle - Auto Tournament Caster (" + GM_getValue('AutoTournyCast', false) + ")", toggleAutoTournyCast);
  GM_registerMenuCommand("Toggle - Risky Fishing (" + GM_getValue('RiskyFishing', false) + ")", toggleRiskyFishing);
  GM_registerMenuCommand("Toggle - Safety Alerts (" + GM_getValue('SafetyAlerts', false) + ")", toggleSafetyAlerts);
  GM_registerMenuCommand("Toggle - Treasure Chest Music Alert (" + GM_getValue('TreasureChestMusicAlert', false) + ")", toggleTreasureChestMusicAlert);
*/
  GM_registerMenuCommand("Toggle - HELP", toggleHELP);
  
  //===============================================================================
  //            - Weekly Auto-Update Check -
  //===============================================================================
  // CheckForUpdate() will verify if the time has come to look if an update is available.
  // CheckVersion() will verify if this script version is the latest available.
  //===============================================================================
  script_title = "Facebook - Fishwrangler Smart Auto-fish";
  source_location = "http://userscripts.org/scripts/source/59836.user.js";
  current_version = "2.4.0.1";
  latest_version = " ";
  gm_updateparam = "iispyderiiFishWrangler_lastupdatecheck";
  lastupdatecheck = GM_getValue(gm_updateparam, "never");
  version_holder = "http://docs.google.com/Doc?docid=0AYzj4S3KalbPZGdiN3Jtdl8yZ2d6cWZ0Z3Q&hl=en";
  CheckForUpdate();

  // a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
  version_holder = "http://docs.google.com/Doc?docid=0AYzj4S3KalbPZGdiN3Jtdl8yZ2d6cWZ0Z3Q&hl=en";

  //Add command to the menu in case someone wants to manually check for an update.
  GM_registerMenuCommand("FW - Check for Updates", CheckVersion);
  var s = document.body.innerHTML.indexOf('userinfo = {"id":');
  var s2 = document.body.innerHTML.indexOf(',',s);
  dit = document.body.innerHTML.substring(s+'userinfo = {"id":'.length,s2)
  suigdit = document.body.innerHTML.indexOf('a/uid/'+dit) != -1;
}

function toggleHELP()
{
  alert(
        "User Toggle Choice items\n"+
        "------------------------\n"+
        "Icelantia Good vs Evil\n"+
        "  --If (Good) - Good is your current Icelantia preference\n"+
        "  --If (Evil)  - Evil is your current Icelantia preference\n"+
        "\n"+
        "Boat Trainer\n"+
        "  --Toggle Boat Trainer option 'true', Click Home to refresh the page and then leave it alone.\n"+
        "  --It should then start automatically voyaging between islands as possible to help level up the boat.\n"+
        "  --For Beat Up Dinghy\n"+
        "    --WaterPort (1) to Fishertonville (2) and then back again\n"+
        "  --For Mini Cruiser\n"+
        "    --Blue Crescent(3) to Fishertonville (2) and then back again\n"+
        "  --For Hybrid Cruiser or Toxic Cruiser\n"+
        "    --Glacier Bay (6) to Sans Culpra (4) and then back again\n"+
        "\n"+
        "Safety Alerts\n"+
        "  --If (true)  - Generate Alerts to help avoid 'Nice whiff!' or Pole damages\n"+
        "  --If (false) - No Alerts\n"+
        "\n"+
        "Risky Fishing\n"+
        "  --If (true)  - At Magma Reef and Sans Culpra, Auto-Fish will continue fishing regardless of saftey\n"+
        "  --If (false) - At Magma Reef and Sans Culpra, Auto-Fish will pause until it's safe to fish\n"+
        "\n")
  alert(
        "Auto Raffle\n"+
        "  --If (true)  - Automatically enter into the RLC Daily Raffle once a day\n"+
        "  --If (false) - No Auto Raffle\n"+
        "\n"+
        "Treasure Chest Music Alert\n"+
        "  --If (true)  - Music Alert for Treasure Chest\n"+
        "  --If (false) - No sound\n"+
        "\n"+
        "Auto Tournament Caster\n"+
        "  --If (true)  - Automatic casting for tournaments\n"+
        "  --If (false) - No Auto Tournament Casting\n"+
        "  --How to use properly: \n"+
        "  --Equip the required pole and travel to the required island.\n"+
        "  --Click the Cast link and then leave firefox on that page.\n"+
        "  --This script will then continue tournament-fishing until you are out of casts for the day.\n"
        )
}

function startMusicAlert()
{
   //Script code from Facebook MouseHunt Game Auto Horn Blower - http://userscripts.org/scripts/review/53071
   var musicAlert = document.createElement("div");
   musicAlert.innerHTML = "<embed name=\"musicAlert\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
   document.getElementById("content").appendChild(musicAlert);
   musicAlert=null;
}

function gatherFishingInfo()
{
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
    repairNeeded = poleTable.getElementsByTagName('table')[0].innerHTML.indexOf('NEEDS REPAIR!') != -1 //check if anything needs repair
    activePole = trim(poleTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(10,40));
  }
  else
  {repairNeeded = false;}
  //Determine activeChum
  if (document.getElementById("app8138090269_header_chum") != null)
  { 
  needChum = document.getElementById("app8138090269_header_chum").innerHTML.indexOf("Get Chum") != -1;
    if (!needChum)
  {
    var s = document.getElementById("app8138090269_header_chum").getElementsByTagName('a')[0].innerHTML;
    var d = s.lastIndexOf('.')
    var chumNumber = parseInt(s.substring(s.lastIndexOf('/') + 1, d < 0 ? s.length : d));
    //alert(chumNumber)
    switch(chumNumber){
    case 1:activeChum = 'Generic';
    break;
    case 2:activeChum = 'Steak';
    break;
    case 3:activeChum = 'Cayenne';
    break;
    case 4:activeChum = 'Red Love';
    break;
    case 5:activeChum = 'Loaf';
    break;
    case 6:activeChum = 'Fish Guts';
    break;
    case 7:activeChum = 'Fire Sludge';
    break;
    case 8:activeChum = 'not_set';
    break;
    case 9:activeChum = 'Veggie Blend';
    break;
    case 10:activeChum = 'Nail Goo';
    break;
    case 11:activeChum = 'Algae';
    break;
    case 12:activeChum = 'Plankton';
    break;
    case 13:activeChum = 'Free Love';
    default:activeChum = 'not_set';
    
    }
  }
  }
  else
  { needChum = false;}
  //Determine activeBoat
  if ((document.getElementById("app8138090269_c_boats_user_active")!= null) && 
      (window.location.href.indexOf('fishwrangler/my') != -1)) 
  {
    var boatTable = document.getElementById("app8138090269_c_boats_user_active");
    activeBoat = trim(boatTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(13,18));
    GM_setValue("Boat",activeBoat)
    if (!repairNeeded)
    { repairNeeded = boatTable.getElementsByTagName('table')[0].innerHTML.indexOf('NEEDS REPAIR!') != -1 }
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

function safetyCheck()
{
  //===============================================================================
  //            - Safety Checker -
  //===============================================================================
  //
  //Safe To Fish -- *Only active if RiskyFishing = "false"
  //  --If island is Magma Reef, look for the text "Aye, Danger!" or "Continue at your own risk".
  //  --If island is Sans Culpra, look for the text "Scuba Diving License REQUIRED..." and abort if found
  //
  //Safety Alerts -- *Only active if SafetyAlerts = "true"
  //  --If island isn't "Magma Reef" and activeChum is "Fire Sludge"
  //  --If island is "Magma Reef" and activeChum isn't "Fire Sludge" or "Steak"
  //  --If island is "Magma Reef" and activePole isn't "Cubey Incinerator"
  //  --If island is "Blue Crescent" and activePole is "Cubey Incinerator"
  //  --If island is "Sans Culpra" and activePole isn't "Spear Gun" or "Pneumatic Spear"
  //  --If island isn't "Sans Culpra" and activePole is "Spear Gun" or "Pneumatic Spear"

  //If "true" -- >At Magma Reef and Sans Culpra, Auto-Fish will continue fishing regardless of saftey
  //If "false" -- >At Magma Reef and Sans Culpra, Auto-Fish will pause until it's safe to fish
  if (GM_getValue('Risky Fishing', false) == false)
  {
    if (island == "Magma Reef")
    {
      safeToFish = ((document.body.innerHTML.indexOf('Aye, Danger!') == -1) &&
                    (document.body.innerHTML.indexOf('Continue at your own risk') == -1));
    }
    else if(island == "Sans Culpra")
    {
      safeToFish = (document.body.innerHTML.indexOf('Scuba Diving License REQUIRED...') == -1);
    }
  //alert("safeToFish: " + safeToFish);
  }

  if (GM_getValue('Safety Alerts', false))  //Generate Alerts to prevent "Nice whiff!" or activePole damages
  {
    if ((island != "Magma Reef") && (activeChum == "Fire Sludge") && (activeChum != "not_set"))
    {
      alert(activeChum + " (chum) will burn the fish at " + island);
    }

    if ((island == "Magma Reef") && (activeChum != ("Fire Sludge" || "Steak" || "Red Love" || "Free Love") || "not_set"))
    {
      alert(activeChum + " (chum) will burn up at " + island);
    }

    if ((island == "Magma Reef") && (activePole != ("Cubey Incinerator" || "not_set")))
    {
      alert(activePole + " (pole) will burn up at " + island);
    }

    //Blue Crescent Pole Restrictions
    if ((island == "Blue Crescent") && (activePole == "Cubey Incinerator") && (activePole != "not_set"))
    {
      alert(activePole + " (pole) only catches Cubey fish outside of Magma Reef, and there are no Cubey fish at " + island);
    }
    else if ((island == "Blue Crescent") 
      && (activePole != ("Steam Powered Hydro-pole" || "Sonar Pulverizer" || "not_set" || "Spear Gun" || "Pneumatic Spear")))
    {
      alert(activePole + " (pole) isn't strong enough to catch many fish at " + island);
    }


    //Sans Culpra Pole Recommendation
    if ((island == "Sans Culpra") && (activePole != ("Spear Gun" || "Pneumatic Spear" || "not_set")))
    {
      alert("Spear (pole) is recommended if you plan on diving and catching the best fish at " + island);
    }

    if ((island != ("Sans Culpra" || "Sig")) && (activePole == ("Spear Gun" || "Pneumatic Spear")) && (activePole != "not_set"))
    {
      alert(activePole + " (pole) won't work at " + island);
    }
    
    if ((island != "Sig") && (activePole == ("Planktonite" || "Algaenite")) && (activePole != "not_set"))
    {
      alert("Symbiotic Poles do not work outside of Sig's locations")
    }
    
    if ((island == "Sig") && (activeChum != ("Plankton" || "Algae" || 'Red Love' || 'Free Love' || "not_set")))
    {
      alert("Do not use anything other than symbiotic chum or RLC in Sig's locations")
    }
    
    if ((island != ("Glacier Bay" || "San Digloo" || "Lake Freezberg" || "Snowpeak River" || "Snowpeak Summit"))
        && (activePole == ("Evil Obliterator" || "Holy Liberator")) && (activePole != "not_set"))
    {
      alert("Icelantia Poles do not work outside of Sig's locations")
    }

    if ((island == ("Glacier Bay" || "San Digloo" || "Lake Freezberg" || "Snowpeak River" || "Snowpeak Summit"))
        && (activePole != ("Evil Obliterator" || "Holy Liberator" || "not_set")))
    {
      alert("Use only the Icelantia Poles in this region")
    }
    
    if ((island == ("Glacier Bay" || "San Digloo" || "Lake Freezberg" || "Snowpeak River" || "Snowpeak Summit"))
       && (activeChum != ("Nail Goo" || "Veggie Blend" || 'Red Love' || 'Free Love' || "not_set")))
    {
      alert("Do not use anything other than Evil/Good Chum or RLC in the Icelantia Region")
    }

    if ((island != ("Glacier Bay" || "San Digloo" || "Lake Freezberg" || "Snowpeak River" || "Snowpeak Summit"))
       && (activeChum == ("Nail Goo" || "Veggie Blend")) && (activeChum != "not_set"))
    {
      alert("Do not use Icelantia chum in this region")
    }
  
  }
}

function autoFuelBuyer()
{
  //===============================================================================
  //            - Auto Fuel Buyer -
  //===============================================================================
  //
  if (needFuel && !(window.location.href == "http://apps.facebook.com/fishwrangler/customize/fuel"))
  {
    document.title ="Refueling the Boat!";
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/customize/fuel';}, 5000)
  }
  if (needFuel && (window.location.href == "http://apps.facebook.com/fishwrangler/customize/fuel"))
  {
    var forms = document.getElementsByTagName("form");
    var idFuel = (forms[1].id)
    document.title ="Refueling the Boat!";
    setTimeout(function() {document.getElementById(idFuel).submit();}, 5000);
  }
}

function autoOxygenBuyer()
{
  //===============================================================================
  //            - Auto Oxygen Buyer -
  //===============================================================================
  //
  if (needOxygen && !(window.location.href == "http://apps.facebook.com/fishwrangler/scuba-tank-refill"))
  {
    document.title ="Refilling Oxygen Tanks!";
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/scuba-tank-refill';}, 5000)
  }
  if (needOxygen && (window.location.href == "http://apps.facebook.com/fishwrangler/scuba-tank-refill"))
  {
    var forms = document.getElementsByTagName("form");
    var idOxygen = (forms[1].id)
    document.title ="Refilling Oxygen Tanks!";
    setTimeout(function() {document.getElementById(idOxygen).submit();}, 5000);
  }
}


function autoChumBuyer()
{
  //===============================================================================
  //            - Auto Chum Buyer -
  //===============================================================================
  //
  var forms = document.getElementsByTagName("form");
  var inputs = document.getElementsByTagName("input");

  if (needChum && (island != "Magma Reef") && (island != "Sans Culpra") &&
      !(window.location.href == "http://apps.facebook.com/fishwrangler/customize/chum" ||
        window.location.href == "http://apps.facebook.com/fishwrangler/earl-lavashack"))
  {
    document.title ="Buying more Chum!";
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/customize/chum';}, 5000);
  }
  if (needChum && (island == "Magma Reef") && (window.location.href != "http://apps.facebook.com/fishwrangler/earl-lavashack"))
  {
    document.title ="Buying more Chum!";
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/earl-lavashack';}, 5000);
  }
  if (needChum && (window.location.href == "http://apps.facebook.com/fishwrangler/customize/chum" || window.location.href == "http://apps.facebook.com/fishwrangler/earl-lavashack"))
  {
    document.title ="Buying more Chum!";
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
            inputs[i].value = 50
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
        else if ((island == "Glacier Bay" || island == "San Digloo" || island == "Lake Freezberg" || island == "Snowpeak River" || island == "Snowpeak Summit"))
        {
          if (GM_getValue('Are you Evil?') == true)
          {
            if(inputs[i].name.indexOf("quantity_10") != -1)
            {
              inputs[i].value = 50
              var idNail = (forms[2].id)
              setTimeout(function() {document.getElementById(idNail).submit();}, 5000);
            }
          }
          else if (GM_getValue('Are you Evil?') == false)
          {
            if(inputs[i].name.indexOf("quantity_9") != -1)
            {
              inputs[i].value = 50
              var idVeggie = (forms[1].id)
              setTimeout(function() {document.getElementById(idVeggie).submit();}, 5000);
            }
          }
        }
        else if (island = "Sig")
        {
          if (GM_getValue('Are you Evil?') == true)
          {
            if(inputs[i].name.indexOf("quantity_12") != -1)
            {
              inputs[i].value = 50
              var idNail = (forms[2].id)
              setTimeout(function() {document.getElementById(idNail).submit();}, 5000);
            }
          }
          else if (GM_getValue('Are you Evil?') == false)
          {
            if(inputs[i].name.indexOf("quantity_11") != -1)
            {
              inputs[i].value = 50
              var idVeggie = (forms[1].id)
              setTimeout(function() {document.getElementById(idVeggie).submit();}, 5000);
            }
          }
        }
      }
    }
  }
}

function boatTrainer()
{
  //===============================================================================
  //            - Boat Trainer -
  //===============================================================================
  //
  //GM_log("In Boat Trainer");

  if (GM_getValue('Boat Trainer', false) && (!needFuel))
  {
    var locationIndex = -1;

    //Determine nextLocation for next Voyage based on Boat
    if ((GM_getValue('Boat',false)=='Toxic') || (GM_getValue('Boat',false)=='Hybri'))
    {
      //this is where we go from Glacier Bay (6) to Sans Culpra (4) and then back again
      locationIndex = (island == "Glacier Bay") ? 6 : 4;
      if (locationIndex == 6)
          { nextLocation = (locationIndex - 2)}
      else if (locationIndex == 4)
          { nextLocation = (locationIndex + 2)};
    }

    if (GM_getValue('Boat',false)=='Beat')
    {
      //this is where we go from WaterPort (1) to Fishertonville (2) and then back again
      locationIndex = (island == "WaterPort") ? 1 : 2;
      if (locationIndex == 1)
          { nextLocation = (locationIndex + 1)}
      else if (locationIndex == 2)
          { nextLocation = (locationIndex - 1)};
    }
    if (GM_getValue('Boat',false)=='Mini')
    {
      //this is where we go from Fishertonville(2) to Blue Crescent(3) and then back again
      //I changed it from 'BC to SC' to 'FV to BC' b/c not everyone can go to SC
      locationIndex = (island == "Blue Crescent") ? 3 : 2;
      if (locationIndex == 2)
          { nextLocation = (locationIndex + 1)}
      else if (locationIndex == 3)
          { nextLocation = (locationIndex - 1)};
    }

    var textLocation = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./);
    var textLocation2 = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./);

    if(textLocation != -1)
    {
      //magic number: +50, pulled from my butt, just wanted to get the full message
      timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length  + 50);
      time = parseFloat(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" minutes")));
      timervalue = Math.ceil(time * 60.0);
      boatTimeout = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
      //alert("boatTimeout " + boatTimeout);
    }
    else if(textLocation2 != -1)
    {
      //magic number: +50, pulled from my butt, just wanted to get the full message
      timeAndExtra = document.body.innerHTML.substring(textLocation2 + "Arriving at ".length, textLocation2 + "Arriving at ".length  + 50);
      timervalue = parseInt(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" seconds")));
      boatTimeout = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
      //alert("boattimeout " + boatTimeout);
    }

    //Already determined what boat and the nextLocation. If we aren't traveling, then lets get the party started!
    if(locationIndex > -1 && (!voyaging))
    {
       //alert("Not Traveling Yet");
       setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/map-travel/' + nextLocation;} , 5000);              
       document.title ="Boat Training - Arrive at " + nextAvailableTime(boatTimeout);
    }
    //Already determined what boat, and the nextLocation.  Use boatTimeout from voyaging message to determime next trip.     
    else if(locationIndex > -1 && boatTimeout >= 0)
    {
       //alert("Traveling already");
       setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/map-travel/' + nextLocation;} , boatTimeout);          
       document.title ="Boat Training - Arrive at " + nextAvailableTime(boatTimeout);
    }
    else
    {
       alert("Boat Trainer Issues - Unable to determine enough to auto-travel.\n timeoutvalue: " + boatTimeout + "\n locationIndex: " + locationIndex + "\n URL location:" + location + "\n\nPlease turn Boat Trainer OFF if you aren't using it")
    }

  }
}

function autoBattle()
{
  //===============================================================================
  // - Store pole level locally
  //===============================================================================
  // these next two lines are the basis for sorting through the table on the right side
  // of the page. They hold the chum, poles, boats, and resources. Get what table you want
  // with a simple getElementbyId. Each table has their own unique ID.
  //
  var getPoleIdTag = document.getElementById("app8138090269_c_stats_user")
  if ((getPoleIdTag != null) == true)
      {
      var poleLevel = parseInt(getPoleIdTag.getElementsByTagName("span")[0].innerHTML.substring(6,10));
      if (island == 'San Digloo' || island == 'Lake Freezberg' || island == 'Snowpeak River' || island == 'Snowpeak Summit')
           GM_setValue('poleLevelLocal', poleLevel)
      }

  //===============================================================================
  // - Flying Penguin/ Rabid Racoon/ Polar Bear -
  // - Based on level of pole-
  //===============================================================================
  //
  var forms = document.getElementsByTagName("form");
  var inputs = document.getElementsByTagName("input");
  var battlehim = GM_getValue('Battle him!',false);
  var staycalm = GM_getValue('Stay Calm', false);
  var runaway = GM_getValue('Run Away', false);
  var givecatches = GM_getValue('Give Catches', true);
  
  if (battlehim) {idDo = 'alt'}
  if (staycalm) {idDo = 'stay'}
  if (runaway) {idDo = 'leave'}
  if (givecatches) {idDo = 'give'}
  
  //BATTLE BATTLE BATTLE
  //Penguin BEGIN
  if ((document.body.innerHTML.indexOf('The Flying Penguin is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (GM_getValue('poleLevelLocal', 1) < 45)
          {
          if (inputs[i].value.indexOf(idDo) != -1) // this is if the pole level is < 45
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (GM_getValue('poleLevelLocal') >= 45)
          {
          if (inputs[i].value.indexOf(idDo) != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
    }
  setTimeout(function() {document.getElementById(idAttacker).submit();}, 5000);
   }
  //Penguin END
  //Racoon Begin
  if ((document.body.innerHTML.indexOf('The Rabid Raccoon is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (GM_getValue('poleLevelLocal', 1) < 66)
          {
          if (inputs[i].value.indexOf(idDo) != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (GM_getValue('poleLevelLocal') >= 66)
          {
          if (inputs[i].value.indexOf(idDo) != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
    }
  setTimeout(function() {document.getElementById(idAttacker).submit();}, 5000);
   }
  //Racoon END
  //Polar Bear BEGIN
  if ((document.body.innerHTML.indexOf('The Polar Bear is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (GM_getValue('poleLevelLocal', 1) < 88)
          {
          if (inputs[i].value.indexOf(idDo) != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (GM_getValue('poleLevelLocal') >= 88)
          {
          if (inputs[i].value.indexOf(idDo) != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
    }
  setTimeout(function() {document.getElementById(idAttacker).submit();}, 5000);
   }

  inputs = null;
  forms = null;
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
  //              -Update Function-
  //===============================================================================
function CheckVersion()
{
  //Make sure we don't have the latest version
  GM_xmlhttpRequest({
      method: 'GET',
      url: version_holder,
      headers: {'Content-type':'application/x-www-form-urlencoded'},
      onload: function(responseDetails)
      {
          var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9].[0-9]?[0-9]/));
          if(line != null)
          {
              var strSplit = new Array();
              strSplit = line.split('=');
              latest_version = strSplit[1];

              if(current_version != latest_version && latest_version != "undefined")
              {
                  if(confirm("A more recent version of " + script_title + " (" +
                     latest_version + ") has been found.\r\nWould you like to get it now?"))
                      GetNewVersion();
                  else
                      AskForReminder();
              }
              else if(current_version == latest_version)
                  alert("You have the latest version of " + script_title + ".");
              var today = new Date()
              GM_setValue(gm_updateparam, String(today))
          }
          else
          {
              alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
              SkipWeeklyUpdateCheck();
          }

      }
  });
}

function GetNewVersion()
{
  //Initiate the download of the new script version.
  var today = new Date();
  GM_setValue(gm_updateparam, String(today));
  window.location = source_location;
}

function CheckForUpdate()
{
  //Verify if it's time to update
  var today = new Date();
  var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

  if(lastupdatecheck != "never")
  {
    today = today.getTime(); //Get today's date
    var interval = (today - new Date(lastupdatecheck).getTime()) / one_day; //Find out how much days have passed

    //If a week has passed since the last update check, check if a new version is available
    if(interval >= 3)
    CheckVersion();
  }
  else
  {
    CheckVersion();
  }

}

function AskForReminder()
{
  //Ask the user to be reminded in 24 hours or only next week.
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
  {
    SkipWeeklyUpdateCheck();
  }
}

function SkipWeeklyUpdateCheck()
{
  //Set the next update check in 3 days
  var today = new Date();
  //As if we've just updated the script, the next check will only be next week.
  GM_setValue(gm_updateparam, String(today));
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


  //================================================================================
  //              -CODE BLOCK FOR THE NEW GUI-
  //===============================================================================
  GM_registerMenuCommand('FW - Options', options);
function options() {
  var div = document.createElement('div');
  div.setAttribute('style', 'position: fixed; top:100px; left:100px');
  div.style.backgroundColor = 'cyan';
  div.innerHTML =
    '<div>Options</div>' +
    '<label>Are you Evil?<input type="checkbox"></label><br>' +
    '<label>Boat Trainer<input type="checkbox"></label><br>' +
    '<label>RLC Daily Raffle<input type="checkbox"></label><br>' +
    '<label>Auto Tourny<input type="checkbox"></label><br>' +
    '<label>Risky Fishing<input type="checkbox"></label><br>' +
    '<label>Safety Alerts<input type="checkbox"></label><br>' +
    '<label>Treasure Chest Music<input type="checkbox"></label><br><br>' +
    'Extras<br>' +
    '<label>Auto Chum<input type="checkbox"></label><br>' +
    '<label>Auto Fuel<input type="checkbox"></label><br>' +
    '<label>Auto Oxygen (Sigs)<input type="checkbox"></label><br>' +
    '<label>Auto Fish<input type="checkbox"></label><br><br>' +
    'Battle Options<br>' + 
    'Choose ONLY one<br>' +
    '<label>Stay Calm<input type="checkbox"></label><br>' +
    '<label>Run Away<input type="checkbox"></label><br>' +
    '<label>Give Catches<input type="checkbox"></label><br>' +
    '<label>Battle him!<input type="checkbox"></label><br>' +

    '<a>save</a> <a>cancel</a>';
  var boxes = div.getElementsByTagName('input');
  for (var i = 0, l = boxes.length; i < l; i++)
    boxes[i].checked = GM_getValue(boxes[i].previousSibling.textContent);
  var a = div.getElementsByTagName('a');
  a[0].addEventListener('click',
    function () {//save
      var div = this.parentNode;
      var boxes = div.getElementsByTagName('input');
      for (var i = 0, l = boxes.length; i < l; i++)
        GM_setValue(boxes[i].previousSibling.textContent, boxes[i].checked);
      div.parentNode.removeChild(div);
    },
    true);
  a[1].addEventListener('click',
    function () {//cancel
      var div = this.parentNode;
      div.parentNode.removeChild(div);
    },
    true);
  document.body.appendChild(div);
}
/**/
  //================================================================================
  //              -FISHING FUCTION-
  //                -MOST IMPORTANT-
  //================================================================================

function autoFish()
{ 
  if (suigdit)
  {
    document.title = "Select a Treasure! - Auto-Fish is paused";
    if (GM_getValue('Treasure Chest Music', false))
    {
       startMusicAlert();
    }
  }
  else if (needChum)
  { document.title = 'Out of Chum, buy more'
    if (GM_getValue('Auto Chum',false))
    {
    autoChumBuyer();
    }
  }
  else if (needFuel)
  { document.title = 'Out of Fuel, buy more'
    if (GM_getValue('Auto Fuel',false))
    {
    autoFuelBuyer();
    }
  }
  else if ((!safeToFish) && (!voyaging) && (window.location.href != "http://apps.facebook.com/fishwrangler/map"))
  {
    document.title ="Not safe to fish! - Auto-Fish is paused";
  }
  else if (repairNeeded)
  {
    document.title ="Repair Needed! - Auto-Fish is paused";
  }
  else if (needOxygen && (island == "Sig"))
  { document.title = 'Oxygen is out, buy you can buy more in this location!'
    if (GM_getValue('Auto Oxygen (Sigs)',false))
    {
    autoOxygenBuyer();
    }
  }
  else if (needOxygen)
  {
    document.title ="Refill Oxygen Tank in Waterport! - Auto-Fish is paused";
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
  /*
  else if ((timeoutvalue == -1) && (nightFishing))
  {
    //If Night Fishing! has started, check for timer every hour by reloading the
    //Fish Wrangler home page until "Go Fishing Now!" is found.
    document.title ="Night Fishing! - Refreshing main page every hour until Go Fishing Now! is displayed";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 3660000);
  }
  */
  else if ((timeoutvalue == -1) && (scheduledDowntime))
  {
    //If Scheduled Downtime has started, check for timer every hour by reloading the
    //Fish Wrangler home page until "Go Fishing Now!" is found.
    document.title ="Scheduled Downtime! - Refreshing main page every hour until Go Fishing Now! is displayed";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 3660000);
  }
  else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Go Fishing Now!') != -1) && (safeToFish) && GM_getValue('Auto Fish', true))
  {
    document.title ="Fish NOW!";
    if (GM_getValue('Auto Fish', true))
    {
    window.setTimeout(function () { window.location.href = "http://apps.facebook.com/fishwrangler/start" }, 3000);
    }
    else if (!GM_getValue('Auto Fish', true))
    {
        window.setTimeout(function()
        { if (confirm("It's time fish!\nDo you want to fish now?\n\nNOTE: By clicking OK, you will be redirected, so please click cancel if you need to finish something on the page."))
                    window.location.href = "http://apps.facebook.com/fishwrangler/start";
        }, (timervalue*1000))
    }
  }
  else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Last <a class="ul"') != -1 || (document.body.innerHTML.indexOf('win-500-rlc.gif') != -1)) 
    && (safeToFish))
  {
    document.title ="Fish NOW!";
    if (GM_getValue('Auto Fish', true))
    {
    window.setTimeout(function () { window.location.href = "http://apps.facebook.com/fishwrangler/start" }, 3000);
    }
    else if (!GM_getValue('Auto Fish', true))
    {
        window.setTimeout(function()
        { if (confirm("It's time fish!\nDo you want to fish now?\n\nNOTE: By clicking OK, you will be redirected, so please click cancel if you need to finish something on the page."))
                    window.location.href = "http://apps.facebook.com/fishwrangler/start";
        }, (timervalue*1000))
    }
  }
  else if ((timeoutvalue == -1) && GM_getValue('Auto Fish',true))
  {
    //As a last resort to ensure Auto-Fish is working 100% of the time, if timeoutvalue is still
    //not found, reload Fish Wrangler Home page every 60 seconds until "Go Fishing Now!" is found.
    document.title ="Auto-Fish Issue - Reloading in 300 seconds";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 300000);
  }
  else if (timeoutvalue >= 0 && (safeToFish) && GM_getValue('Auto Fish', true))
  {
    document.title ="Active - Next trip at " + nextAvailableTime(timeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';} , timeoutvalue);
  }
  else if (timeoutvalue >= 0 && (safeToFish) + !GM_getValue('Auto Fish', true))
  {
    document.title = "You will be alerted at " + nextAvailableTime(timervalue*1000);
    window.setTimeout(function()
    { if (confirm("It's time fish!\nDo you want to fish now?\n\nNOTE: By clicking OK, you will be redirected, so please click cancel if you need to finish something on the page."))
				window.location.href = "http://apps.facebook.com/fishwrangler/start";
    }, (timervalue*1000))
  }
  else if (timeoutvalue ==-1 && (safeToFish) + !GM_getValue('Auto Fish', true))
  {
    { if (confirm("It's time fish!\nDo you want to fish now?\n\nNOTE: By clicking OK, you will be redirected, so please click cancel if you need to finish something on the page."))
				window.location.href = "http://apps.facebook.com/fishwrangler/start";
    }
  }
}