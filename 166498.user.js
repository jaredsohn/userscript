// ==UserScript==
// @name       		Fixed/Static YouTube Toolbar
// @version		   2.0
// @namespace      http://userscripts.org/users/514417
// @author         MrAndroidster
// @description    Fixed YouTube Toolbar
// @include 		http://youtube.*/*
// @include 		http://*.youtube.*/*
// @run-at         document-end
// ==/UserScript==

//Copyright by MrAndroidster

GM_addStyle("#yt-masthead-container {position: fixed; margin-bottom: 10px; z-index: 999999;}");
GM_addStyle(".site-left-aligned #yt-masthead-container, .site-left-aligned #masthead-appbar, .site-left-aligned #footer-container, .exp-new-site-width #ticker, body #sb-wrapper {width: 100%!important;}");
GM_addStyle(".body.exp-new-site-width, body #masthead-expanded-container {width: 100%; position: fixed!important; z-index: 99999; padding-top: 30px; padding-bottom: 0px;}");
GM_addStyle("#masthead-expanded {position: fixed!important;z-index: 99999;padding-top: 30px;padding-bottom: 0px;}");
GM_addStyle("#page-container {padding-top: 50px;}");
GM_addStyle(".gssb_c {z-index: 999999999; position: fixed!important}");