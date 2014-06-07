// ==UserScript==
// @name        Outlook Extend Panel
// @version     1.02
// @description Extend right side panel of Outlook mail
// @namespace   iFantz7E.OutlookExtendPanel
// @match       https://*.mail.live.com/*
// @grant       GM_addStyle
// @updateURL   http://userscripts.org/scripts/source/293639.meta.js
// @downloadURL	https://userscripts.org/scripts/source/293639.user.js
// @icon        https://a.gfx.ms/OLFav.ico
// ==/UserScript==

GM_addStyle("#MainContent {right: 0px !important;} .WithRightRail {right: 0px !important;} #RightRailContainer {display: none !important;}");