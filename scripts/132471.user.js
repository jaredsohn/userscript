// ==UserScript==
// @name CrimsonR3 Skin
// @namespace CrimsonReign, Flash, Lord_Nick
// @description Changes the Reign theme to CrimsonR3.
// @include http://www.reign.ws/*
// @include http://reign.ws/*
// @exclude http://reign.ws/images/*
// @run-at document-start
// ==/UserScript==

/* Replace existing titlebars with the CrimsonR3 titlebar */
GM_addStyle('.titlebar_med {background: url(http://i.imgur.com/MHmMa.png) !important;}');
GM_addStyle('.titlebar_small {background: url(http://i.imgur.com/3GmzO.png) !important;}');
GM_addStyle('.forum_titlebar_med {background: url(http://i.imgur.com/DLr5l.png) !important;}');

/* Replace page background */
GM_addStyle('body {background: url(http://reigngame.com/images/kaibkgwide2.jpg) !important;}');

/* Modifies the background of pane contents */
GM_addStyle('.pane_small {background: url(http://i.imgur.com/3z2fp.png) !important;}');
GM_addStyle('.pane_med {background: url(http://i.imgur.com/BvUor.png) !important;}');
GM_addStyle('.pane_top_small {background: url(http://i.imgur.com/xtv0g.png) !important;}');
GM_addStyle('.pane_top_med {background: url(http://i.imgur.com/To0AP.png) !important;}');
GM_addStyle('.forum_top_med {background: url(http://i.imgur.com/jqGzb.png) !important;}');

/* Modifies button colours */
GM_addStyle('button {background: #660000 !important;}');
GM_addStyle('button {color: #FFFFFF !important;}');

/* Modifies link colours */
GM_addStyle('a {color: #FFCC00 !important;}');
GM_addStyle('a:hover {color: #FFCC33 !important;}');