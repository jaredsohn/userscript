// ==UserScript==
// @name           FacebookMakeover V2
// @namespace      http://www.facebook.com
// @description    Fixes annoying layout, using a different, potentially faster method
// @include        *.facebook.com/*
// ==/UserScript==
// This will get rid of the stupid cutcorner look, change some colors, make the top nav full-height. Ahh, a normal layout again!
// Original Script created by Tristan Schneiter with help from Josh Booth, Tyler Collins, Josh Christopherson, Alan Kelly, Joseph Hickman, and others. Thanks guys!
// Rewritten to simplify and speed loading by Alan Kelly.

GM_addStyle("body { margin-top: -1em; } #sidebar { z-index: 2; } #navigator { background: #3B5998 none repeat scroll 0%; height: 37px; width: 649px; margin: 0 !important; padding: 9px 0 4px 0 !important; z-index: 2 !important; position: relative; left: -1px; border-bottom: 5px solid #6D84B4; border-right: 1px solid #E5E5E5; } #nav_unused_1 { position: relative; left: 17px; top: 12px; } #nav_unused_2 { position: relative; left: 5px; top: 13px; } #sidebar_content { background-color: #F7F7F7; border-left: 1px solid #CCCCCC; } #publicity { border-left: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; background-color: #F7F7F7; padding: 10px 12px 12px 12px; height: auto; } #publicity h5 { line-height: 120%; } .profileimage { background-color: transparent; } .navigator_menu { width: 100%; }");