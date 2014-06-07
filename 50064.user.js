// ==UserScript==
// @name           Google Click-Track Remover
// @description    Just remove the Click-Track.
// @include        http://*.google.com/search?*
// @include        http://www.google.com/*
// @include        http://google.com/*
// ==/UserScript==

(function()
{
   var e=document.getElementsByTagName("a");
   for(i=0;i<e.length;i++)
   {
      e[i].removeAttribute("onmousedown");
   }

})();