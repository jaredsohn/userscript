// ==UserScript==
// @name           MouseHunt 10min Refresher
// @namespace      yy1993
// @version        v1.2
// @description    Refresh MouseHunt's page every 10 minutes to refrain you from being inactive. Doesn't work for "Camp" (MouseHunt Homepage). Based off http://userscripts.org/scripts/show/4271 & http://userscripts.org/scripts/show/58297. Thanks and credits to them! 
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @exclude        http://apps.facebook.com/mousehunt/index.php
// @exclude        http://apps.new.facebook.com/mousehunt/index.php
// @exclude        http://apps.facebook.com/mousehunt/soundthehorn.php
// @exclude        http://apps.new.facebook.com/mousehunt/soundthehorn.php
// @exclude        http://apps.facebook.com/mousehunt/
// @exclude        http://apps.new.facebook.com/mousehunt/
// ==/UserScript==

var ms;
var basetitle;

function ClockItYo()	//ms, basetitle)
{
    if(ms>0)
    {
        document.title = "Refreshing in " + (FormatCountDown(ms--)) + " | " + basetitle;
        window.setTimeout(ClockItYo, 1000);
    } else {
        window.location.reload('true');
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

//  update in .x minutes (30000-90000) and pass off to our title counter
var randomnumber=(Math.floor(1*1)*600)+0;
basetitle = document.title;
ms = randomnumber;
window.setTimeout(ClockItYo, 1000);

