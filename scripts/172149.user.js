// ==UserScript==
// @name           Aol Reader UI Fixer
// @author         StealthMonkey
// @namespace      http://www.stealthmonkey.com
// @description    Fixes multiple issues with the Aol Reader user interface
// @homepage       https://userscripts.org/scripts/show/172149
// @updateURL      https://userscripts.org/scripts/source/172149.meta.js
// @downloadURL    https://userscripts.org/scripts/source/172149.user.js
// @include        http*://reader.aol.com/*
// @version        1.17
// ==/UserScript==

// Version 1.17:
// - Tweaking the scroll position of the last item
//
// Version 1.16:
// - Fixed the scroll position of the last item when in fullscreen mode
//
// Version 1.15:
// - Adjusted the sidebar in fullscreen mode, it is now always fully visible
//
// Version 1.14:
//  - Tweaked the amount of vertical space before and after items
//
// Version 1.13:
//  - Removed the "Discover" item from the sidebar
//  - Reduced the amount of vertical space after items
//
// Version 1.12:
//  - Minor updates after recent Aol Reader changes
//
// Version 1.11:
//  - Minor updates after recent Aol Reader changes
//
// Version 1.10:
//  - Minor updates after recent Aol Reader changes
//
// Version 1.9:
//  - Gray out titles of read items
//
// Version 1.8:
//  - Tweaking hyperlink region of images
//
// Version 1.7:
//  - Tweaking hyperlink region of images
//
// Version 1.6:
//  - Improved hyperlink region of images being too large
//
// Version 1.5:
//  - Fixed over-aggressive image hyperlink region code
//
// Version 1.4:
//  - Even further improved hyperlink region of images being too large
//
// Version 1.3:
//  - Further improved hyperlink region of images being too large
//
// Version 1.2:
//  - Fixed hyperlink region of images being too large
//
// Version 1.1:
//  - Increased max width of images within content
//
// Version 1.0:
//  - Initial release

// Increase Width of Articles
GM_addStyle(".article-item-full .article-content { width: 800px !important; }");
GM_addStyle(".article-body img { max-width: 800px !important; }");

// Fix Image Hyperlink Region
GM_addStyle(".article-body p, .article-body div { display: table; }");
GM_addStyle(".article-body * img { margin-bottom: 0 !important; }");

// Increase Sidebar Width
GM_addStyle(".feed-header { left: 300px !important; }");
GM_addStyle("#reader-container { margin-left: 300px !important; }");
GM_addStyle(".article-list { left: inherit !important; }"); // Pane View Only
GM_addStyle("#category-list { width: 299px !important; }");
GM_addStyle(".nav, .nav-list { width: 299px !important; }");

// Hide Aol Service Icons
GM_addStyle(".header-service-menu { display: none !important; }");

// Gray out titles of read items
GM_addStyle(".article-item-read .article-content .article-title a { color: gray !important; }");

// Hide the Discover item on sidebar
GM_addStyle("#label-discover { display: none !important; }");

// Reduce the vertical padding after items 
GM_addStyle(".article-content { padding-top: 15px !important; padding-bottom: 10px !important; }");

// Always show the sidebar in fullscreen mode
GM_addStyle(".fullscreen .nav .refresh-feed, .fullscreen .nav .sidebar-add, .fullscreen .nav .sidebar-options, .fullscreen .nav .nav-list { display: inline-block !important; }");
GM_addStyle(".sidebar-expand, .sidebar-collapse { display: none !important; }");
GM_addStyle(".fullscreen .nav.nav-expand { -webkit-box-shadow: none !important; -moz-box-shadow: none !important; box-shadow: none !important; }");

// Fix the scroll position of the last item when in fullscreen mode
GM_addStyle(".article-item-fill { height: 750px !important;}");
