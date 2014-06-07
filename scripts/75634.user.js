// ==UserScript==
// @name           Pandora.com - Centered Page
// @description    Makes the site centered in the browser
// @include        http://pandora.com/*
// @include        http://www.pandora.com/*
// @include        https://pandora.com/*
// @include        https://www.pandora.com/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

GM_addStyle("body {text-align: center !important;}");
GM_addStyle("#container {width: 725px !important; margin-left: auto !important; margin-right: auto !important; position: relative !important;}");
GM_addStyle("#content {width: 662px !important; margin-left: auto !important; margin-right: auto !important; padding-top: 53px !important; position: relative !important; left: 0px !important; top: 0px !important;}");
GM_addStyle("#footer {width: 662px !important; margin: 50px auto 20px !important;}");
GM_addStyle("#advertisement, #google_adwords, #advertisement_bottom, #ad_controls, #google_companion_ad_div_container, #skinP1TrialImage, #skinSponsorImage {display: none !important;}");