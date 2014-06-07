// ==UserScript==
// @name           RTM Open URL by Hotkey
// @namespace      http://chimericdream.com/
// @include        https://www.rememberthemilk.com/*
// @include        http://www.rememberthemilk.com/*
// @include        https://rememberthemilk.com/*
// @include        http://rememberthemilk.com/*
// ==/UserScript==

window.addEventListener("keypress", KeyCheck, false);

function KeyCheck(e) {
   var unicode = e.keyCode ? e.keyCode : e.charCode;
   if (unicode == 118) {
       var link = document.getElementById('detailsurl_span').childNodes[0];
       if (link.style.display != 'none' && link.style.visibility != 'hidden') {
           window.open(link);
       }
   }
}