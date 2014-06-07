// ==UserScript==
// @name           HotmailFillScreen
// @namespace      http://googatrix.googlepages.com
// @include        *.mail.live.com/*
// ==/UserScript==

// make main box fill the whole width of screen
GM_addStyle( ".Unmanaged .WithSkyscraper #MainContent{ margin-right:3px; !important }" );	
GM_addStyle( ".Managed .WithSkyscraper #MainContent{ right:0pt; !important }" );	

// hide the msn logo at the bottom
GM_addStyle( ".Crm120Container{ display:none; !important }" );
