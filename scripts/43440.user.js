// ==UserScript==
// @name           gmail scroll controll
// @namespace      gmail_scroll_controll@basyura.org
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==
(function () {
 var SCROLL_HEIGHT = 150;
 window.addEventListener('keypress',
   function(e) {
     var tagName = e.target.tagName;
	 if (tagName == "TEXTAREA" || tagName == "INPUT") {
		return;
	 }
     if (e.charCode == 32) {
       var h = SCROLL_HEIGHT;
       if(e.shiftKey) {
         h = h * -1;
       }
       document.documentElement.scrollTop += h;
       e.preventDefault();
       e.stopPropagation();
     }
   }, true);
})();

