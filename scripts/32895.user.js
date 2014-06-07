// ==UserScript==
// @name           Frequent Shopper Hot List Filler Outer
// @namespace      http://www.google.com/
// @description    Fills out the form with random answers, and submits the form.
// @include        http://frequentshopper.msn.com/Activities/HotList/ProductHotList.aspx
// ==/UserScript==

unsafeWindow.addEventListener('load',function(){fillForm()},true);
function fillForm()
{
   for(var i=0;i<10;i++)
   {
      objId = "ctl00_ctl00_contentPane_activityContent_lpVote_rptProducts_ctl0"+i+"_rb";
      if(Math.random() > 0.5)
         objId += "Yes";
      else
         objId += "No";
      obj = document.getElementById(objId);
      if(!obj)
         return;
      obj.checked = true;
   }
   document.getElementById('ctl00_ctl00_contentPane_activityContent_lpVote_btnSubmit').click();
}