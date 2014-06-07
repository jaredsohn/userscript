// ==UserScript==
// @name           Meebo Blog Self-Destruct
// @description    Hides the Meebo blog window when Meebo starts up. If you're like me, you don't really care what Sandy, Elaine and company are up to. Maybe someday they will make a preference to turn off the blog window, or reserve that functionality for REALLY important messages.
// @include        http*://www*.meebo.com/*
// @version        0.5
// @date           2007-11-2
// @creator        Jorge Monasterio (@ logonpro.com)
// ==/UserScript==
// Updated
//    11/2/2007 0.5 - Fix for Mac Firefox. Who knows why it's different?
//    11/1/2007 0.4 - Added version/date flags for User Script Updates: See http://userscripts.org/scripts/show/2296
//    10/21/2007 0.3 - New approach using style sheet, avoids the timer hack. Blog no longer seen briefly at startup.
//    10/20/2007 0.2 Fix problem with include path.
//     10/20/2007 0.1 Original script
(function()
	{
	// Hide the blog
	GM_addStyle( '#welcomeWin { visibility : hidden; } ');
	// Add this line to fix scrollbar problems on Mac Firefox. For some
	//	reason, one of the scrollbars in the blog window is not hidden.
	GM_addStyle( '#welcomeWin #content div { overflow : hidden; } ');

  	})();