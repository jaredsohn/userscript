scr_meta=<><![CDATA[
// ==UserScript==
// @name          Facebook MouseHunt Game Auto Horn Blower
// @author        NOrack
// @version       3.5
// @namespace     http://apps.facebook.com/mousehunt/
// @description   (Version 3.5) A macro to blow the horn of facebook mousehunt game when the right time comes
// @source        http://userscripts.org/scripts/review/53071
// @identifier    http://userscripts.org/scripts/source/53071.user.js
// @include       http://apps.facebook.com/mousehunt/*
// @include       http://apps.new.facebook.com/mousehunt/*
// @include       http://www.facebook.com/common/error.html
// ==/UserScript==
]]></>.toString(); 

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
var SoundWarning = false;   // change this to FALSE if player dont want
                           //   to be warned with sound.


petaka_53071={i:'53071',d:2,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){petaka_53071.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match("the page you requested doesn't exist")||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);petaka_53071.ca(true)});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);petaka_53071.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);petaka_53071.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')petaka_53071.ch();



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
var DelayBeforeKingReward = JedaCaptcha ();
var JedaMinimum = 90;
var Judul = document.title;


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

if (Math.abs(DelayBeforeHORN - DelayBeforeCheckTrap) < JedaMinimum)
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
         { window.location.href = "http://apps.facebook.com/mousehunt/" }, 3000);
   }
   else
   {
      var CaptchaDelay = (Math.round(Math.random() *
         (krDelay_max - krDelay_min)) + krDelay_min) * 60;
      document.title ="(Autoreload in " +
         FormatCountDown (CaptchaDelay) + ") " + Judul;
      window.setTimeout(function ()
         { window.location.href =
         "http://apps.facebook.com/mousehunt/" }, CaptchaDelay * 1000);
      CaptchaDelay=null;
   }
}
else if (window.location.href == "http://www.facebook.com/common/error.html")
{
   document.title ="(Autoreload in 3 seconds) " + Judul;
   window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/mousehunt/" }, 3000);
}
else if (window.location.href.indexOf("snuid=") != -1)
{
   var ProfileDelay = (Math.round(Math.random() *
      (poDelay_max - poDelay_min)) + poDelay_min) * 60;
   document.title ="(Autoreload in " +
      FormatCountDown (ProfileDelay) + ") " + Judul;
   window.setTimeout(function () { location.reload(true) }, ProfileDelay * 1000);
   ProfileDelay=null;
}
else if (DelayBeforeHORN < -1 &&
   (window.location.href == "http://apps.facebook.com/mousehunt/" ||
   window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
   window.location.href.indexOf(".facebook.com/mousehunt/soundthehorn.php") != -1))
{
   document.title = "(Autoreload in 30 minutes) Something is wrong, probably your trap is out of bait    | " + Judul;
   window.setTimeout(function ()
      { window.location.href = "http://apps.facebook.com/mousehunt/" }, 1800000);
}
else if (DelayBeforeHORN == -1 &&
   (window.location.href == "http://apps.facebook.com/mousehunt/" ||
   window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
   window.location.href.indexOf(".facebook.com/mousehunt/soundthehorn.php") != -1))
{
   document.title = "Reloading: Cant find hidden MouseHunt countdown timer    | " + Judul;

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
   if (DelayBeforeHORN > 0 && DelayBeforeCheckTrap > 0)
   {
      document.title = FormatCountDown(DelayBeforeHORN--) + " -Horn- " 
         + FormatCountDown(DelayBeforeCheckTrap--) + " -Check Trap- "
         + FormatCountDown(DelayBeforeKingReward--) + " -King's Reward-"
         + "      | " + Judul;
      window.setTimeout(function () { (HornWhenNeeded)() }, 1000);
   }
   else if (DelayBeforeHORN <= 0)
   {
      document.title = "Blowing The Horn ...    | " + Judul;
      window.location.href = "http://apps.facebook.com/mousehunt/soundthehorn.php";     
   }
   else
   {
      document.title = "Checking The Trap ...    | " + Judul;
      window.location.href = "http://apps.facebook.com/mousehunt/";
   }
}

function JedaCaptcha ()
{
   var Sekarang = (new Date ()).getTime ();
   var Terakhir = GM_getValue ("lastKingReward", " ");
   var JedaMax = 3 * 3600;
   
   
   if (Terakhir == " ")
   {      
      GM_setValue ("lastKingReward", Sekarang.toString ());
      return JedaMax;
   }
   else
   {
      var Selisih = JedaMax - parseInt((Sekarang - Terakhir) / 1000);
      
      if (Selisih < 0)
      {
         GM_setValue ("lastKingReward", Sekarang.toString ());
         return JedaMax;      
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
   kerasukan.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
   if (SoundWarning)
   {
      document.getElementById("content").appendChild(kerasukan);
   }
   document.title = "Macro is paused: Claim your King Reward   | " + Judul;
   kerasukan=null;
}



inputs=null;CurrentTime=null;CurrentSecond=null;CurrentMinute=null;today=null;mhDelay_min=null;mhDelay_max=null;tcDelay_min=null;tcDelay_max=null;krDelay_min=null;krDelay_max=null;poDelay_min=null;poDelay_max=null;pause=null;JedaMinimum=null;SoundWarning=null;petaka_53071=null;
