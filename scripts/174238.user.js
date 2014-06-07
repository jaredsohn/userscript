// ==UserScript==
// @name          Automatically Expands YouTube "Show More" Box
// @namespace       http://www.facebook.com/YouTubeCenter 
// @author         Mikha (Helped by Jeppe Rune Mortensen (YePpHa))
// @version        V 0.05
// @namespace      userscripts.org
// @description    Automatically Expands YouTube "Show More" Box 
// @domain          youtube.com
// @domain          www.youtube.com
// @match           http://*.youtube.com/*
// @match           https://*.youtube.com/*
// @include         http://*.youtube.com/*
// @include         https://*.youtube.com/* 
// ==/UserScript==

      
(function(){
  function removeClass(elm, className){
    if (typeof elm === "undefined") return;
    var classNames = elm.className.split(" ");
    var _new = [];
    for (var i = 0; i < classNames.length; i++) {
      if (classNames[i] === className || classNames[i] === "") continue; // Already present or empty.
      _new.push(classNames[i]);
    }
    elm.className = _new.join(" ");
  }
  removeClass(document.getElementById("watch-description"), "yt-uix-expander-collapsed");
})();