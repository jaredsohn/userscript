// ==UserScript==
// @name          Pirlotv No Ads
// @namespace     fr.kergoz-panic.watilin
// @description   Remove Adblock-resistant ads. Firefox 19+ only.
// @match         *://*.pirlotv.tv/*
// @match         *://*.liveflash.tv/*
// @match         *://*.castalba.tv/*
// @match         *://*.mips.tv/*
// @match         *://*.yukons.net/*
// @version       1.1
// @grant         none
// @run-at        document-start
//
// @downloadURL   https://userscripts.org/scripts/source/182926.user.js
// @updateURL     https://userscripts.org/scripts/source/182926.meta.js
// @icon          https://s3.amazonaws.com/uso_ss/icon/182926/large.png
// ==/UserScript==

// NOTE: I couldn't get the streams working for channels 1 to 8, so
// maybe these ones still have advertising. Sorry.

// only run within iframes
if (window !== top) {
   
   console.info("iframe loaded", location.href);

   // observe any script execution
   var i = 0;
   document.addEventListener("beforescriptexecute", function( event ){
      var $script = event.target;
      if ($script.src) return;
      
      var text = $script.textContent;
      var details = "";
      if (/ad/i.test(text)) details = " *";
      
      // basic ad detection--may need to be improved
      var mustStop = false;
      var domain = location.hostname.match(/[\w-]+\.\w+$/)[0];
      switch (domain) {
         case "pirlotv.tv":
         case "castalba.tv":
            if (text.contains('"ad_overlay"')) mustStop = true;
            break;
         case "liveflash.tv":
         case "mips.tv":
         case "yukons.net":
            if (text.contains("bigAds")) mustStop = true;
            break;
      }
      if (mustStop) {
         details += " ### prevented";
         event.preventDefault();
      }
      
      console.groupCollapsed(i + " (" + text.length + " bytes)" + details);
      console.debug(text);
      console.groupEnd();
      
      i++;
   });
}
