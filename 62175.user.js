// ==UserScript==
// @name           QuakeLive AddBlocker
// @namespace      http://www.quakelive.com/*
// @include        http://*.quakelive.com/* 
// ==/UserScript==
//Hide Adds and everything in right column except chat
GM_addStyle('#post_spon_content{display:none !important;} #spon_vert{display:none !important;} #qlv_topFadeAds{display:none;} .spon_media{display:none;}');

//Uncomment/comment it to hide/view your personal quick stats
GM_addStyle('.personal_stats{display:none;} .twocol_left{min-height: 0px;} .thirtypxhigh{display:none;}');

//Hide/show footer
GM_addStyle('#qlv_footer2{display:none;}');

//reduce height of chat contact  list
GM_addStyle('#im-body{height:auto !important; max-height:300px;}');

//Forum improvements
//
//Remove Header
//GM_addStyle('.pageheading{display:none;}');
//
//Remove AD frames
//GM_addStyle('.advert{display:none !important}');
//
//Threadslist must be wider now (if AD frames are removed)
//GM_addStyle('#threadslist{width:100% !important;}');
