// ==UserScript==
// @name CarbonNeonR3 Skin
// @namespace CarbonNeon, Flash, Lord_Nick
// @description Changes the Reign theme to CarbonNeonR3.
// @include http://www.reign.ws/*
// @include http://reign.ws/*
// @exclude http://reign.ws/images/*
// @run-at document-start
// ==/UserScript==

/* Replace existing titlebars with the CrimsonR3 titlebar */
GM_addStyle('.titlebar_med {background: url(http://i.imgur.com/YA6E2.png) !important;}');
GM_addStyle('.titlebar_small {background: url(http://i.imgur.com/0O8Nj.png) !important;}');
GM_addStyle('.forum_titlebar_med {background: url(http://i.imgur.com/rxTnQ.png) !important;}');

/* Replace page background */
GM_addStyle('body {background: url(http://i.imgur.com/YaEUi.jpg) !important;}');
GM_addStyle('.pane_small {background: url(http://i.imgur.com/3z2fp.png) !important;}');
GM_addStyle('.pane_med {background: url(http://i.imgur.com/BvUor.png) !important;}');

/* Modifies background of pane contents */
GM_addStyle('.pane_top_small {background: url(http://i.imgur.com/3sW1F.png) !important;}');
GM_addStyle('.pane_top_med {background: url(http://i.imgur.com/6dPRk.png) !important;}');