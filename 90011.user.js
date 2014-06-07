// ==UserScript==
// @name           Druvid's MouseHunt (V3) Longhorn AutoHorn - Firefox, Flock, Seamonkey, Opera
// @namespace      druvid
// @description    Autohunt for MouseHunt. Based off http://userscripts.org/scripts/show/65686 (by yy1993) & 
http://userscripts.org/scripts/show/53071 (by NOrack). Thanks! Credit is given where credit is due. 
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include        http://apps.facebook.com/mousehunt/index.php
// @exclude        http://apps.facebook.com/mousehunt/boards.php
// @exclude        http://apps.facebook.com/mousehunt/inventory.php*
// @exclude        http://apps.facebook.com/mousehunt/travel.php*
// ==/UserScript==

//Random delay of blowing after the actual horn blowing time
var delayMin = 10;	// minimum delay in seconds
var delayMax = 120;	// maximum delay in seconds

var basetitle = document.title;
var kingsRewardOn = false;
var maintenance = false;
var manualBlow = false;

var manualHorn = false;

var ms = -1;
var allowance = -1;
var baitAmt = -1;
var lastJournalDate = null;

//For timer
var divTimer = document.createElement("div");
var isDisplayingTimer = true;
divTimer.id = 'myTimer';

var reblowing = false;
var reclockCount = 0;


function clockMe()
{
//alert(document.getElementById('app_content_10337532241').getElementsByTagName('h3').length)

    //Checks if your internet is disconnected and refreshes page
    if(document.title.indexOf('Problem loading page')!=-1) 
      refreshPage(randomWait("sec", 12, 25));

    //Display Pooflinger
    displayMenu();

    //gets timer, reward, bait quantity
    if(typeof(unsafeWindow.a10337532241_user) != "undefined")
    {
	ms = unsafeWindow.a10337532241_user.next_activeturn_seconds;
	allowance = Math.round(Math.random() * delayMax) + delayMin;
        ms = ms+allowance;
 	kingsRewardOn = unsafeWindow.a10337532241_user.has_puzzle;
	baitAmt = unsafeWindow.a10337532241_user.bait_quantity;
        
        //Refreshes if the Timer is longer than 20 mins..
        if(ms > 1200)
        {
	  var res = randomWait("sec", 7, 12);
	  document.title = "<Timer Out of Bounds> Resuming in " + (countdownFormat(res))+" | "+ basetitle;
	  window.setTimeout(function (){ window.location.href = "http://apps.facebook.com/mousehunt/" }, res*1000);  
        }
    }   

    if(document.getElementsByTagName('journaldate').length != 0)  
      lastJournalDate = document.getElementsByClassName('journaldate')[0].innerHTML;

    if(document.getElementsByClassName('hornbutton').length != 0)
    {
      //To simulate actual horn click blowing
      document.getElementsByClassName('hornbutton')[0].firstChild.id = "hornLink";
      
      //To reClock() if horn is sounded manually
      document.getElementsByClassName('hornbutton')[0].addEventListener('click',function (e) {
          manualHorn=true; reClock(10);
      },true);
    
    }
    //Check if Maintenance is on
    if(document.body.innerHTML.indexOf('doing some maintenance')!=-1)
      maintenance = true;

     if(document.getElementById('app_content_10337532241'))
         h3s = document.getElementById('app_content_10337532241').getElementsByTagName('h3');    
     else return;     

    //search the clue through the mousehunt page check if its maintenance
    for(var i = 0; i < h3s.length; i++)
    {
	if(h3s[i].innerHTML.indexOf("The Downtime Lounge!") != -1)
	{ 
		maintenance = true;
		break;
	}
    } 

    //Display timer on
    isDisplayingTimer = true;

    //Display Level Percentage up to 2 decimal places
    LevelPercent();

    if(kingsRewardOn)
    {
	//Random KingsReward refresh (90-110 mins)
	var kingsWaitRandom = randomWait("min", 150, 180);
          nextExecTime(kingsWaitRandom*1000)+" | "+ basetitle;

	//focuses on captcha
	window.scrollBy(0,120);
	document.getElementById('app10337532241_puzzle_answer').focus();

	document.title = "*[MH Code]* = " + "Reloading in " + (countdownFormat(kingsWaitRandom)) +" | "+
	//pause script
	window.setTimeout(function ()
	  { window.location.href = "http://apps.facebook.com/mousehunt/" }, kingsWaitRandom*1000);
    }
    else if(window.location.href == "http://www.facebook.com/common/error.html")
    {
	document.title ="(Autoreload in 3 seconds) " + basetitle;
	window.setTimeout(function(){window.location.href = "http://apps.facebook.com/mousehunt/" }, 3000);
    }
    else if(baitAmt == 0)
    {
	document.title ="*[Out of Bait]* - Reloading in 5 hours.. | "+nextExecTime(5*60*60000)+" | "+basetitle;
	window.setTimeout(function(){window.location.href="http://apps.facebook.com/mousehunt/" }, 5*60*60000);
    }

    else if(document.getElementById('app10337532241_pagemessage').innerHTML.indexOf("Reward claimed!")!=-1)
    {
	var a = document.getElementById('app10337532241_tabbarContent2').getElementsByTagName('a')[0];
	a.id = "resumeLink";
	var res = randomWait("sec", 2, 5);
	document.title = "Captcha Success.. Resuming in " + (countdownFormat(res))+" | "+ basetitle;
	//window.setTimeout(function (){ fireOnclick("resumeLink"); }, res*1000);
	window.setTimeout(function (){ window.location.href = "http://apps.facebook.com/mousehunt/" }, res*1000);
	
    }
    else if (ms < -1)
    {	
	document.title = "(Autoreload in 25 minutes) Something is wrong... | " + basetitle;
	window.setTimeout(function(){ window.location.href="http://apps.facebook.com/mousehunt/" }, 25*60000);

    }	
    else if (maintenance)
    //else if(document.body.innerHMTL.indexOf('doing some maintenance')!=-1)
    {
	//Random Maintenance refresh (20-37 mins)
	var r = randomWait("min", 20, 37);
	document.title = "<Maintenance> Reloading in "+(countdownFormat(r))+" | "+nextExecTime(r*1000)+" | "+basetitle;
	window.setTimeout(function (){ window.location.href = "http://apps.facebook.com/mousehunt/" }, r*1000);	 	
    }
    else if(document.body.innerHTML.indexOf('We were unable to load your profile data')!=-1 ||
            document.body.innerHTML.indexOf('Lightning struck our server')!=-1
           )
    {
	//Random refresh (5-15 sec)
	var r = randomWait("sec", 7, 17);
	document.title = "<Fog Mouse> Reloading in "+(countdownFormat(r))+" | "+nextExecTime(r*1000)+" | "+basetitle;
	window.setTimeout(function (){ window.location.href = "http://apps.facebook.com/mousehunt/" }, r*1000);	 	
    }
    else if(document.body.innerHTML.indexOf('slow to fetch')!=-1)
    {
	//Random refresh (5-15 sec)
	var r = randomWait("sec", 10, 20);
	document.title = "<Tiny Mouse> Reloading in "+(countdownFormat(r))+" | "+nextExecTime(r*1000)+" | "+basetitle;
	window.setTimeout(function (){ window.location.href = "http://apps.facebook.com/mousehunt/" }, r*1000);	 	
    }
    else if (ms == -1)
    {
	if(reclockCount < 5)
	{
	  var r = randomWait("sec", 3, 7);
	  document.title = "Timer not detected"+reclockCount+". Reclocking in " + (countdownFormat(r)) +" ...";
	  window.setTimeout(function (){ reclockCount++; clockMe(); }, r*1000);	
	}
	else
	{
	  var r = randomWait("sec", 5, 9);
	  document.title = "Reclock failed. Refreshing in " + (countdownFormat(r)) +" ...";
	  window.setTimeout(function () { window.location.reload( false ); }, r*1000);	  
	} 	
    }
    else
    {
	
	var r = randomWait("sec", 10, 20);
	//document.title = "."+nextExecTime(ms*1000)+" | "+basetitle;
	window.setTimeout(function (){ 
	  if(!manualHorn){
	    fireOnclick("hornLink"); reClock(r);
	  }
	  else manualHorn=false;
	}, ms*1000);	 

	//Display timer for horn countdown
	window.setTimeout(function() { displayTimer(ms); }, 1000);


	//window.setTimeout(function () { hornWhenNeeded() }, 1000);

    }	
}

function hornWhenNeeded()
{
 if (ms > 0)
  {   
    if(document.getElementById('app10337532241_header').className.indexOf('hornsounding')!=-1)
    {
      manualBlow = true;
      var r = randomWait("sec", 12, 20); 
      document.title = "Manual Horn Blowing ...";
      window.setTimeout(function() { reClock(r) }, 8000);
    }
    else
    {
      document.title = (countdownFormat(ms--)) +" -Horn- " +nextExecTime((ms)*1000)+  
        " | "+basetitle+" | Bait("+baitAmt+")"+lastJournalDate;
      window.setTimeout(function () { (hornWhenNeeded)() }, 1000);
    }
  }
  else
  {
    if(!manualBlow)
    {
      fireOnclick("hornLink");
      var r = randomWait("sec", 12, 20); 
      document.title = "Blowing the Horn ...";

      window.setTimeout(function() { reClock(r) }, 8000);

    }
  }
}

function reClock(r)
{
  isDisplayingTimer = false;

  if(document.getElementById('app10337532241_hornMessage').innerHTML.indexOf('claim your reward')!=-1 &&
	!document.getElementById('app10337532241_puzzle_answer'))
  {
    var r = randomWait("sec", 1, 3);
    document.title = "Redirecting to King's Reward in "+(countdownFormat(r))+"... "+basetitle;
    window.setTimeout(function ()
	{ window.location.href = "http://apps.facebook.com/mousehunt/" 
          //document.getElementById('app10337532241_hornMessage').innerHTML='';
    }, r*1000);
  }

  else if(document.getElementById('app10337532241_hornMessage').innerHTML.indexOf('horn will reappear in')!=-1)
  {
    var r = randomWait("sec", 6, 10);
    document.title = "Blowing failed. Reblowing horn in "+(countdownFormat(r))+"... "+basetitle;
    window.setTimeout(function() { window.location.href="http://apps.facebook.com/mousehunt/turn.php";},r*1000);	 	
    //window.setTimeout(function () { window.location.reload( false ); }, r*1000);	 	
    //window.setTimeout(function () { fireOnclick("hornLink"); }, r*1000);	 	
  }
/*

  else if(lastJournalDate == document.getElementsByClassName('journaldate')[0].innerHTML)
  {
    var r = randomWait("sec", 2, 8);
    document.title = "Journal failed to update. Refreshing in "+(countdownFormat(r))+"... "+basetitle;
    window.setTimeout(function () { window.location.reload( false ); }, r*1000);	 	
  }  
*/
  else
  {
    if (r > 0 )
    {
      document.title = "Blew Horn ...  Reclocking in "+(countdownFormat(r--))+"...";
      window.setTimeout(function() { reClock(r) }, 1000);
    }
    else //if (r == 0)
    { 
      //manualBlow = false;
      window.setTimeout(function() { clockMe(); }, 1000);
    }
  }
}

function displayTimer(t)
{
  if(isDisplayingTimer)
  {
    document.title = nextExecTime(ms*1000)+" | "+basetitle;
    if(!document.getElementById('myTimer'))
    {
      divTimer.innerHTML = 
      '<table style="border: 2px ridge black; background-color: #ece3a2; padding:5px;" >'+
      '<tr>'+
      '<th>Timer :&nbsp;</th>'+
      '<th id="timeLeft" style="font-weight:bold">'+ countdownFormat(t--) +'</th>'+
      '</tr>'+
      '</table>'+
      '<span id="timeToFire">ClockTime: '+countdownFormat(ms)+' ('+ms+'s)</span>'+
      '<br /><span id="timeAdded">Additional: '+countdownFormat(allowance)+'</span>';

      divTimer.style.cssText="color:black; position:fixed; top:50px; left:10px;";
      if(document.getElementById('app_content_10337532241'))
        document.getElementById('app_content_10337532241').appendChild(divTimer);
    }
    else{      
      document.getElementById('timeLeft').innerHTML=countdownFormat(t--);
      document.getElementById('timeToFire').innerHTML='ClockTime: '+countdownFormat(ms)+' ('+ms+'s)</span>';
      document.getElementById('timeAdded').innerHTML='Additional: '+countdownFormat(allowance);

    }
    window.setTimeout(function() { displayTimer(t);}, 1000);
  }
  else {
    document.getElementById('timeLeft').innerHTML = 'Reclocking...';
    document.getElementById('timeToFire').innerHTML = 'ClockTime: ---';
    document.getElementById('timeAdded').innerHTML = 'Additional: ---';
    return;
  }
}

function refreshPage(r)
{

  if (r > 0 )
  {
    document.title = "<Disconnected> Refreshing in "+(countdownFormat(r--))+"...";
    window.setTimeout(function() { refreshPage(r) }, 1000);
  }
  else //if (r == 0)
  { 
    setTimeout(function() { window.location.reload( false ); }, 1000);
  }
}

function LevelPercent()
{
  if(document.getElementById('app10337532241_hud_titlePercentage'))
  {
    document.getElementById('app10337532241_hud_titlePercentage').innerHTML =
        document.getElementById('app10337532241_hud_titlebar').title.split("%")[0];
  }
}

function countdownFormat(time)
{
  var timeString;  
  var hr = Math.floor(time / 3600);
  var min = Math.floor((time % 3600) / 60);
  var sec = (time % 3600 % 60) % 60;
/*
  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
*/
  if (sec < 10) sec = "0" + sec;

  if (hr > 0)
    timeString = hr.toString() + " h " + min.toString() + " m " + sec.toString() + " s";
  else if (min > 0)
    timeString = min.toString() + " m " + sec.toString() + " s";
  else
    timeString = sec.toString() + " s";
	
  hr = null; min = null; sec = null;

  return (timeString);
}

function displayMenu()
{
var mhwiki = 'http://mhwiki.hitgrab.com/wiki/index.php?title=Special%3ASearch&search=';
//Menu for Pooflinger
var divMenu = document.createElement("div");
divMenu.innerHTML =
 '<table style="border: 2px ridge black; background-color: #caa87a; font-weight:bolder;" >'+
  '<tr><td style="border-bottom: 1px solid #916540;text-indent:5px;">Pooflinger Tools:</td></tr>'+
       
  '<tr><td>'+
  '<ul style="background-color:#ece3a2;display:block;padding:2px 5px 2px 10px;">'+
  '<li style="background-color:#ffffad;">- '+
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=100000080802434">Dru</a> - '+
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=794443536">Jan</a> - '+
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=100000214767469">Jen</a>'+
  '</li>'+
  '<li style="background-color:#ffffad;">- '+ 
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=100000186507362">Jain</a>- '+
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=100000254913738">Sun</a> - '+
    '<a href="http://apps.facebook.com/mousehunt/profile.php?snuid=1622834492">Van</a>'+
  '</li>'+
  '<hr color="#916540" />'+
  '<li>'+ 
    '<input type="hidden" value="http://mhwiki.hitgrab.com/wiki/index.php?title=Special%3ASearch&redirs=0&search="/>'+
    '<input type="text" size="12" style="font-size:80%;"/>'+
    '<input type="submit" style="padding:0px;font-size:80%;" value="&#216;"'+
    'onclick="window.open(this.previousSibling.previousSibling.value+this.previousSibling.value);return false;"/>'+
  '</li>'+
  '<li>- <a href="http://furoma.com/mousehunt_travel_planner.html" target="_blank">Travel Planner</a></li>'+
  '<li>- <a href="http://furoma.com/catch_rates_estimates.html" target="_blank">Catch Rate</a></li>'+
  '<li>- <a href="http://furoma.com/forbidden_grove_timer.html" target="_blank">Forbidden Grove</a></li>'+
  '<li>- <a href="http://furoma.com/mousehunt_crafting_tool.html" target="_blank">Crafting</a></li>'+
  '<li>- <a href="http://furoma.com/best_location.html" target="_blank">Best Location</a></li>'+
  '<li>- <a href="http://furoma.com/best_setup.html" target="_blank">Best Setup</a></li>'+
  '<hr color="#916540" />'+
  '<li>- <a href="http://apps.facebook.com/mousehunt/organizeparty.php#partyTournament">Organize Party</a></li>'+
  '<li>- <a href="http://apps.facebook.com/mousehunt/tournamentscoreboard.php?page=3">Tourney Rank</a></li>'+
  '<hr color="#916540" />'+
  '<li>- <a href="http://apps.facebook.com/mousehunt/tournamentscoreboard.php?page=3">Tourney Rank</a></li>'+
  '<hr color="#916540" />'+
  '<li>- <a href="http://apps.facebook.com/mousehunt" style="color:black;">Back to Home</a></li>'+
  '</ul>'+
  '</td></tr>'+
 '</table>';

divMenu.style.cssText="color:black; position:fixed; top:360px; left:3px;";

//Appends it to an existing div
document.getElementById('app_content_10337532241').appendChild(divMenu);          

}

//return a random number in secs or mins
function randomWait(type, min, max)
{
  if(type == "min")
  {
    min=min*60; max=max*60;
  }
  return( min  + (Math.floor( (Math.random() * (max-min+1)) )) );
}

function nextExecTime(zTimeoutvalue)
{
  d = new Date();

  if(zTimeoutvalue >= 0)
  { d.setTime(d.getTime() + zTimeoutvalue); }

  hours = d.getHours();
  minutes = d.getMinutes();
  ampm = "am";
/*
  seconds = d.getSeconds();
  if (seconds < 10)
  {seconds = "0" + seconds;}
*/  
  if (hours > 12 || hours == 0)
  {
    if(hours == 0){hours = 12}    
    else {hours = hours - 12; ampm = "pm";}
  }

  if (minutes < 10)
  {minutes = "0" + minutes;}
  
  return hours + ':' + minutes +' '+ ampm;
  //return hours + ':' + minutes + ':' + seconds +' '+ ampm;
}

function fireOnclick(objID) {
var target=document.getElementById(objID);
if(document.dispatchEvent) { // W3C
    var oEvent = document.createEvent( "MouseEvents" );
    oEvent.initMouseEvent("click", true, true,window, 
      1, 1, 1, 1, 1, false, false, false, false, 0, target);
    target.dispatchEvent( oEvent );
    }
else if(document.fireEvent) { // IE
    target.fireEvent("onclick");
    }    
}


window.setTimeout(clockMe, 1000);