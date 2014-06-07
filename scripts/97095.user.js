// ==UserScript==
// @name           DR.dk rengøring 
// @namespace      http://userscripts.org/users/87736
// @description    Fjerner top og andre flash bannere fra DR.dk
// @match          http://www.dr.dk/*
// ==/UserScript==

var els = document.querySelectorAll("div[id^=ba_containerFor],#globalTopBannerWrapper"), i = els.length;
while (i--) 
{  
  if (els[i].nextElementSibling.tagName == "SCRIPT") {
    els[i].parentNode.removeChild(els[i].nextElementSibling);
  }
  els[i].parentNode.removeChild(els[i]);
}
