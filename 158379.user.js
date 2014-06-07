// ==UserScript==
// @name       Sydsvenskan paywall remover
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  Removes the paywall
// @match      http://*.sydsvenskan.se/*
// @copyright  Public domain
// ==/UserScript==

var popupIds = ['ctl00_ctl00_ctlLimitPopup_pnlLimitPopup',
                'ctl00_ctl00_ctlWarningPopup_pnlWarningPopup', 
                'ctl00_ctlLimitPopup_pnlLimitPopup'];
 
for (var i = 0; i < popupIds.length; i++) {
  var popupId = popupIds[i];
  var popupElement = document.getElementById(popupId);
  if(popupElement != null)
  {
      popupElement.style.display = 'none';
  }
}

document.querySelectorAll(".b-meteredmodel-limit")[0].style.height="auto";

document.getElementsByTagName('body')[0].className = "";
