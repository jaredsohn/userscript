// ==UserScript==
// @name        My AccuWeather
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Accuweather
// @include     http://www.accuweather.com/*
// @version     1
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('html, #wrap-content {background: #468 !important}');
GM_addStyle('.content {background: #bcd !important}');
GM_addStyle('.panel-body, .panel-body-lt, .panel-body-rt, .subnav-head-tabs-lt, .subnav-head-tabs-rt  {background: #eee !important}');
GM_addStyle('li, .info {color: #004 !important}');
GM_addStyle('.subnav-head-tabs-rt {width: 615px !important}');
GM_addStyle('#news, #offers, #footer, .social-icons, #ecbody, .tvideo, .sponsor-col2, #bt-menu-settings, #bt-menu-login, .logo-ad, #wrap-country-settings, #panel-feature-video, #acpTooltip, #panel-feature-video-short, #feature-sun, #feature-moon,  .feature-controls, .panel-top-story, .panel-foot, .panel-head,  #ad-links, #aadBot300, #cobrand-banner-wrap-head, #nav-main-add-interests {display: none !important}');

//