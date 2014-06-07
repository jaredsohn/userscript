// ==UserScript==
// @name           Google Calendar Show All Sidebar Calendars
// @namespace      http://www.henrybridge.com/
// @description    Removes scrollbars and displays all calendars in the sidebar.  Moves search public calendars up to top.  Skeleton taken from Arthaey Angosii's Script.
// @include        http*://www.google.com/calendar/*
// ==/UserScript==

// FIXME
//  - make public cal search location dynamic, not hardcoded

window.addEventListener("load", function() {
   	addGlobalStylesheet(
		"div.sidetable {height:auto !important;}" + 
		"#calendars {height:auto !important; overflow:visible !important;}" +
		"#calendarsBottomChrome{position:absolute !important; top:312px !important; left: 26px !important;}" +
		"#searchAddCal{position:absolute; top:47px; left:166px; width:203px !important;}"
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