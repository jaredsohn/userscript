// ==UserScript==
// @name        My TVGuide
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter TVGuide.com
// @include     http://www.tvguide.com/*
// @version     1
// @grant 		GM_addStyle
// ==/UserScript==

GM_addStyle('body {background: #468 !important}');
GM_addStyle('#body {margin-top: 15px !important; margin-bottom: 15px !important}');
GM_addStyle('#cf-w, #body, .paginate, .paginate-b {background: #edb !important}');
GM_addStyle('#body  {box-shadow: 0px 0px 6px 0px #000 !important}');
GM_addStyle('.caption {background: #ccc !important}');
GM_addStyle('a, p {font-weight:bold !important}');
GM_addStyle('strong {font-style:italic !important}');
GM_addStyle('#cf-l-w {width: 100% !important}');
GM_addStyle('.nw-agg-item {border-bottom: 1px solid #666 !important}');
GM_addStyle('#sandbox, #nav, .nw-ad-outbrain, .most-w, .ghead-c, .gridAdRow, .rls-list-w, .f-menu, #hulu-layer, .photo-credits, .infomercial, .most-popular,  .h-fullepisodes, #cf-r-c, .share-bottom, .whtht-c, .ph-w, .twitter-share-button, .twitter-follow-button, .nw-ad-468x60, .watchlistBanner {display:none !important}');

//