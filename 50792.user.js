// ==UserScript==
// @name           Castle Age Best Buy
// @namespace      taocode
// @description    ROI calculator to aid in Castle Age Land purchasing
// @include        http://apps.facebook.com/castle_age/*
// ==/UserScript==
/*

History
-------
   08/23/09 - Updated to work with new code changes from Castle Age.
   06/06/09 - Now runs if entering on land page:
               http://apps.facebook.com/castle_age/land.php
   06/04/09 - Created
*/
if(unsafeWindow.console){
   GM_log = unsafeWindow.console.log;
}

function addROI(ev) {
   if (ev && ev.target.id != 'app46755028429_app_body') return;
   try {
      // suspend from listening while making alterations.
      mainDiv.removeEventListener('DOMNodeInserted', addROI, false);
      landElement = document.getElementById('app46755028429_land');
      if (! landElement) return;
      dtrs = landElement.getElementsByTagName('tr');
      
      var hroi = 0.0, lroi = 9999.9;
      trs = Array();
      for (var i = 0; i < dtrs.length; i++) {
         ctr = dtrs[i];
         if (ctr.className == 'land_buy_row') {
            trs.push(ctr);
            ctd = ctr.cells[0];
            lis = ctd.getElementsByTagName('strong');
            ctr.income = lis[1];
            ctr.cost = lis[2];
            
            ctr.f_income = parseFloat(ctr.income.innerHTML.replace(/\D/g, ''));
            ctr.f_cost = parseFloat(ctr.cost.innerHTML.replace(/\D/g, ''));
            ctr.roi = ctr.f_income / ctr.f_cost * 100;
            roi_div = '<div style="float: right; margin: 0 30px 0 0; padding: 2px 5px; font-size: 11px; background-color: #000; width: 50px; height: 15px;">::' 
            + Math.round(ctr.roi * 1000)/100.0 + "</div>";
            ctr.income.innerHTML = roi_div + ctr.income.innerHTML;
            if (hroi < ctr.roi) hroi = ctr.roi;
            if (lroi > ctr.roi) lroi = ctr.roi;
         }
      }
      
      // colorize
      var cc = 128;
      for (var i = 0; i < trs.length; i++) {
         ctr = trs[i];
         // color factor
         cf = parseFloat(ctr.roi - lroi) / parseFloat(hroi - lroi);
         g = parseInt(cf * (255 - cc)) + cc;
         rb = 255 - g;
         rgb = 'rgb('+rb+','+g+','+rb+')';
         ctr.income.style.color = rgb;
         ctr.cost.style.color = 'rgb(0,'+(g-cc)+',0)';
         sels = ctr.getElementsByTagName('select');
         for (var si = 0; si < sels.length; si++) {
            sels[si].style.backgroundColor = rgb;
         }
      }
   } catch (err) {
      GM_log('Error: '+ err);
   } finally {
      // resume listening now that we've made our changes.
      mainDiv.addEventListener('DOMNodeInserted', addROI, false);
   }
}
var mainDiv = document.getElementById('app46755028429_mainDiv');
mainDiv.addEventListener('DOMNodeInserted', addROI, false);
addROI();