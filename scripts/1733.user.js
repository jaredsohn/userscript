// ==UserScript==
// @name	mail.com
// @description	Skip Mail.Com ad pages (updated version for Firefox 1.5) 
// @include	http://*.mail.com/*
// ==/UserScript==
//      
(function() {
 
      var script_var = "var adShown  = 'true';  seenAd();";
      var skip_ad = document.createElement("script");
      skip_ad.setAttribute('type', 'text/javascript');
      skip_ad.innerHTML = script_var;
      document.body.appendChild(skip_ad);
   
})();
