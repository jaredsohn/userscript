// ...: True Share Crew :...
// later modified by killuminati@xboard to work for Megaupload.com links.

// ==UserScript==
// @name	Rapidshare.de + Megaupload.com
// @description Skip rapidshare.de and Megaupload counter
// @include	http://rapidshare.de*
// @include	http://www.megaupload.com*
// ==/UserScript==

(function() {
   window.setTimeout = newSetTimeout;
   function newSetTimeout(func, interval) {
      var fCall = new Function(func);
      fCall();	
   }; 
})();