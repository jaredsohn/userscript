// ==UserScript==
// @name           PlayZoo Auto Page changer
// @namespace      http://userscripts.org/users/125450
// @include        http://apps.facebook.com/playzoo/zoo/*
// ==/UserScript==

//setInterval ( "changePage()", 1020000 );
//setInterval ( "changePage()", 5000 );

var ms;
var basetitle;

function reloadPage()	//ms, basetitle)
{
    if(ms>0)
    {
        document.title = "Refreshing in " + (FormatCountDown(ms--)) + " | " + basetitle;
        window.setTimeout(reloadPage, 1000);
    } else {
        window.location.reload('true');
    }
}


function FormatCountDown (timeLeft)
{
   if (!timeLeft) return false;
   if (isNaN(parseInt(timeLeft))) return timeLeft;
   
   var	hoursLeft = parseInt(timeLeft / 3600);
   var	msLeft = timeLeft % 3600;
   var	minLeft = parseInt(msLeft / 60);
   var	detik = msLeft % 60;
   var   penampakan = "";
   if (hoursLeft < 10) hoursLeft = "0" + hoursLeft;
   if (minLeft < 10) minLeft = "0" + minLeft;
   if (detik < 10) detik = "0" + detik;
   if (detik <= 0)
   {
      if (minLeft <= 0)
      {
         if (hoursLeft > 0) penampakan = hoursLeft + " h";
      }
      else if (hoursLeft > 0) penampakan = hoursLeft + " h " + minLeft + " m";
      else penampakan = minLeft + " m";      
   }
   else
   {
      if (hoursLeft <= 0)
      {
         if (minLeft > 0) penampakan = minLeft + " m " + detik + " s";
         else penampakan = detik + " s";
      }
      else penampakan = hoursLeft + " h " + minLeft + " m " + detik + " s";
   }
   msLeft=null;hoursLeft=null;minLeft=null;detik=null;
   return penampakan;
   
}

//  update in .x minutes (30000-90000) and pass off to our title counter
var randomnumber=(Math.floor(Math.random()*1200)+0);
basetitle = document.title;
ms = randomnumber;
window.setTimeout(reloadPage, 1000);