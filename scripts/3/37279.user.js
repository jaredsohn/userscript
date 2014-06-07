// ==UserScript==
// @name           Frequent Shopper Key Unlocker
// @namespace      http://www.google.com/
// @description    Unlocks Key Word Island
// @include        http://frequentshopper.msn.com/Activities/KeyWordIsland/*
// ==/UserScript==

unsafeWindow.addEventListener('load',function(){pickOne()},true);
function pickOne()
{
   chk = document.getElementById('ctl00_ctl00_contentPane_activityContent_imgNextRound');
   if(chk)
   {
      txt = document.getElementById('ctl00_ctl00_contentPane_activityContent_lblCorrect');
      if(txt && txt.innerHTML == "You just earned 0 credits.")
      {
         return;
      }
      chk.click();
      return;
   }
   if(window.location != 'http://frequentshopper.msn.com/Activities/KeyWordIsland/Select.aspx')
   {
      window.location = 'http://frequentshopper.msn.com/Activities/KeyWordIsland/Select.aspx';
      return;
   }
   if(document.getElementById('ctl00_ctl00_contentPane_activityContent_pnlButtons'))
   {
      for(var i = 0; i < 300; i++)
      {
         obj = document.getElementById('ctl00_ctl00_contentPane_activityContent'+
         '_btnSelect'+Math.floor(Math.random()*7));
         if(obj)
         {
            obj.click();
            break;
         }
      }
   }
}