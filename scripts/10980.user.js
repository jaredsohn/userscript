// ==UserScript==
// @name           Google Calendar Extend Current Time Bar
// @namespace      http://www.henrybridge.com/
// @description    Extends the current time bar's width to fit the entire current view 
// @include        http*://www.google.com/calendar/*
// ==/UserScript==

window.addEventListener("load", function() {
   	addGlobalStylesheet("#currentTime {position:absolute !important; left: 0px!important; width:100% !important; overflow:visible !important; height:3px !important}"
	   );
}, true);

function addGlobalStylesheet(css) {
   var head = document.getElementsByTagName('head')[0];
   if (head) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
   }
}