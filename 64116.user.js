// ==UserScript==
// @name          Fishwrangler - Chrome Compatability
// @namespace     iispyderii
// @description   It's for Chrome, It's not for beginners.
// @version       1.0.0  Initial Release
// @include       http://www.facebook.com/common/error.html
// @include       http://apps.facebook.com/fishwrangler/*
// @include       http://fb.fishwranglr.com/*
// @include       http://apps.new.facebook.com/fishwrangler/*
// @exclude       http://apps.facebook.com/fishwrangler/profile/*
// ==/UserScript==

// EDIT THIS FOR CHROME //

poleLevelLocal = 0;
areYouGood = false;
//END: STOP EDITING



var inputs = document.getElementsByTagName("input");
safeToFish = true;
timervalue = -1;
timeoutvalue = -1;
treasureChest = (document.body.innerHTML.indexOf("huge green bold") != -1); //check if a captcha is detected
repairNeeded = (document.body.innerHTML.indexOf("NEEDS REPAIR!</a>") != -1); //check if anything needs repair
voyaging = ((document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./) !=-1) || (document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./) != -1))
needChum = (document.body.innerHTML.indexOf("Get Chum") != -1); //check if need to buy chum
needFuel = (document.body.innerHTML.indexOf("EMPTY!") != -1); //check if need to buy fuel
nightFishing = (document.body.innerHTML.indexOf('Night Fishing!') != -1); //check if a Night Fishing is detected
scheduledDowntime = (document.body.innerHTML.indexOf('Scheduled Downtime: Fish Wrangler should be back up in') != -1);
oxygenNeeded = (document.body.innerHTML.indexOf(">0%</span></a>") != -1); //check if Oxygen Tank is empty

if(inputs)
{
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("timer_hidden") != -1)
      {
         timervalue = inputs[i].value;
         timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
         break;
      }
   }
}

gatherFishingInfo();
autoBattle();
if (window.location.href == "http://apps.facebook.com/fishwrangler/cast")
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

function gatherFishingInfo()
{
  //===============================================================================
  //            - Gather Fish Wrangler Information -
  //===============================================================================
  var images = document.getElementsByTagName("img");
  island = "not_set";

  for(var i = 0; i < images.length; i++)
  {
    //Determine Island
    if (images[i].src.indexOf("images/towns/thumbs/") != -1)
    {
      island = images[i].title;
      //alert("island: " + island);
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
  if (needChum && (island == "Magma Reef") && (window.location.href != "http://apps.facebook.com/fishwrangler/ear-lavashack"))
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
        else if ((island == "Glacier Bay" || island == "San Digloo" || island == "Lake Freezberg" || island == "Snowpeak River" ||island == "Snowpeak Summit"))
        {
          if (areYouGood == false)
          {
            if(inputs[i].name.indexOf("quantity_10") != -1)
            {
              inputs[i].value = 50
              var idNail = (forms[2].id)
              setTimeout(function() {document.getElementById(idNail).submit();}, 5000);
            }
          }
          else if (areYouGood == true)
          {
            if(inputs[i].name.indexOf("quantity_9") != -1)
            {
              inputs[i].value = 50
              var idVeggie = (forms[1].id)
              setTimeout(function() {document.getElementById(idVeggie).submit();}, 5000);
            }
          }
        }
        else if (island = "Sig's Lair")
        {
          if (areYouGood == false)
          {
            if(inputs[i].name.indexOf("quantity_12") != -1)
            {
              inputs[i].value = 50
              var idNail = (forms[2].id)
              setTimeout(function() {document.getElementById(idNail).submit();}, 5000);
            }
          }
          else if (areYouGood == true)
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

function autoBattle()
{

  //===============================================================================
  // - Flying Penguin/ Rabid Racoon/ Polar Bear -
  // - Based on level of pole-
  //===============================================================================
  //
  var forms = document.getElementsByTagName("form");
  var inputs = document.getElementsByTagName("input");

  if ((document.body.innerHTML.indexOf('The Flying Penguin is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (poleLevelLocal < 45)
          {
          if (inputs[i].value.indexOf('give') != -1) // this is if the pole level is < 45
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (poleLevelLocal >= 45)
          {
          if (inputs[i].value.indexOf('alt') != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
    }
  setTimeout(function() {document.getElementById(idAttacker).submit();}, 5000);
   }
  if ((document.body.innerHTML.indexOf('The Rabid Raccoon is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (poleLevelLocal < 66)
          {
          if (inputs[i].value.indexOf('give') != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (poleLevelLocal >= 66)
          {
          if (inputs[i].value.indexOf('alt') != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
    }
  setTimeout(function() {document.getElementById(idAttacker).submit();}, 5000);
   }
  if ((document.body.innerHTML.indexOf('The Polar Bear is near by...') != -1))
   {
   for(var i=0;i<inputs.length;i++)
    {
    var idAttacker = (forms[1].id)
      if (poleLevelLocal < 88)
          {
          if (inputs[i].value.indexOf('give') != -1)
              {
              inputs[i].checked = true;
              break;
              }
          }
      else if (poleLevelLocal>= 88)
          {
          if (inputs[i].value.indexOf('alt') != -1)
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

function autoTourny()
{
  var inputs = document.getElementsByTagName("input");
  var tournyTimervalue = -1;
  if(inputs)
  {
     for(i = 0; i < inputs.length; i++)
     {
        if(inputs[i].id.indexOf("tourny_timer_hidden") != -1)
        {
           tournyTimervalue = inputs[i].value;
           break;
        }
     }
  }
  if(tournyTimervalue > 0)
  {
    tournyTimeoutvalue = (parseInt(tournyTimervalue) + Math.round(Math.random() * 2) + 3) * 1000;
    document.title = "Tourny Active - Cast at " + nextAvailableTime(tournyTimeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/cast';} , tournyTimeoutvalue);
  }
  else
  {
     document.location = 'http://apps.facebook.com/fishwrangler/my'
  }

}

function autoFish()
{
  if (treasureChest)
  {
    document.title = "Select a Treasure! - Auto-Fish is paused";
  }
  else if (needChum)
  {
    autoChumBuyer();
  }
  else if (needFuel)
  {
    autoFuelBuyer();
  }
  else if ((!safeToFish) && (!voyaging) && (window.location.href != "http://apps.facebook.com/fishwrangler/map"))
  {
    document.title ="Not safe to fish! - Auto-Fish is paused";
  }
  else if (repairNeeded)
  {
    document.title ="Repair Needed! - Auto-Fish is paused";
  }
  else if (oxygenNeeded)
  {
    document.title ="Refill Oxygen Tank! - Auto-Fish is paused";
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
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';}, ((Math.round(Math.random() * 5) + 1) * 1000));
  }
  else if (voyaging)
  {
    document.title ="Voyaging - Next trip at " + nextAvailableTime(timeoutvalue);
    setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/my';} , (timeoutvalue + 10000));
  }
  else if ((timeoutvalue == -1) && (nightFishing))
  {
    document.title ="Night Fishing! - Refreshing main page every hour until Go Fishing Now! is displayed";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/my" }, 3660000);
  }
  else if ((timeoutvalue == -1) && (scheduledDowntime))
  {
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
  else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Last <a class="ul"') != -1) && (safeToFish))
  {
    document.title ="Fish NOW!";
    window.setTimeout(function ()
        { window.location.href = "http://apps.facebook.com/fishwrangler/start" }, 3000);
  }
  else if (timeoutvalue == -1)
  {
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