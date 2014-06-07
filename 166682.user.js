// ==UserScript==
// @name BatmanR3 Skin
// @namespace Flash, Lord_Nick
// @description Changes the Reign theme to BatmanR3.
// @include http://www.reign.ws/*
// @include http://reign.ws/*
// @exclude http://reign.ws/images/*
// @exclude http://reign.ws/news/*
// @run-at document-start
// ==/UserScript==

/* Replace existing titlebars with the BatmanR3 titlebar */
GM_addStyle('.titlebar_med {background: url(http://i.imgur.com/qFY3Fh7.png) !important;}');
GM_addStyle('.titlebar_small {background: url(http://i.imgur.com/loSn81Y.png) !important;}');
GM_addStyle('.forum_titlebar_med {background: url(http://i.imgur.com/wPMiWVF.png) !important;}');

/* Replace page background */
GM_addStyle('body {background: url(http://i.imgur.com/cQVsZuI.jpg) !important;}');

/* Modifies the background of pane contents */
//GM_addStyle('.pane_small {background: url(http://i.imgur.com/3z2fp.png) !important;}');
//GM_addStyle('.pane_med {background: url(http://i.imgur.com/BvUor.png) !important;}');

//GM_addStyle('.pane_bottom_med {background: url(http://i.imgur.com/eZuBYnF.png) !important;}');
//GM_addStyle('.pane_bottom_small {background: url(http://i.imgur.com/G9klPn2.png) !important;}');
