// ==UserScript==
// @name           Frequent Shopper Bargain Hunter
// @namespace      http://www.google.com/
// @description    Hunts Bargains
// @include        http://frequentshopper.msn.com/Activities/BargainHunter/BargainHunter.aspx*
// @version        1.2
// ==/UserScript==

unsafeWindow.addEventListener('load',function(){pickOne()},true);
function pickOne()
{
   chk = document.getElementById('ctl00_ctl00_contentPane_activityContent_lblCredits');
   if(chk && chk.innerHTML == "0")
      return;
   obj = document.getElementById('ctl00_ctl00_contentPane_activityContent_btnNewBargain');
   if(obj)
      obj.click();
   rnd = Math.random();
   if(rnd > 0.66)
      objId = 0;
   else if(rnd < 0.33)
      objId = 1;
   else
      objId = 2;
   obj = document.getElementById('ctl00_ctl00_contentPane_activityContent'+
   '_rptProducts_ctl0'+objId+'_btnChooseProduct');
   if(obj)
      obj.click();
}