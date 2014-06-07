// ==UserScript==
// @name        My Bing
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Bing news website
// @include     http://www.bing.com/news*
// @version     2
// @grant 		GM_addStyle
// ==/UserScript==

GM_addStyle('body, li, .weth, .p1_4, .newsFilter, #sw_hdr, #sw_b {background: #edb !important}');
GM_addStyle('body {overflow-x: hidden}');
GM_addStyle('.sw_qbox {background: #ffd !important; font-weight: bold !important; width: 360px !important}');
GM_addStyle('.sw_a2 {margin-left: 110px !important; margin-top: -45px !important}');
GM_addStyle('#sw_hdr {margin-left: 720px !important; margin-top: -20px !important}');
GM_addStyle('#sw_b {border: 0px !important; padding 0px !important}');
GM_addStyle('a {color: #04b !important; text-decoration: none !important}');
GM_addStyle('a:hover {color: #d40 !important}');
GM_addStyle('a, h1, h2, h3, span {font-weight:bold !important; text-decoration: none !important}');
GM_addStyle('h1, h2, h3 {color: #d40 !important}');
GM_addStyle('.sn_tm {color: #b60 !important}');
GM_addStyle('cite {color: #084 !important}');
GM_addStyle('.left_border {border-left: 1px solid #666 !important}');
GM_addStyle('.hl, #NewPopnow, #Popnow, .weth, .ln, .NewsLabel {border-bottom: 1px solid #666 !important}');
GM_addStyle('.NewsLabel {border-top: 0px !important}');
GM_addStyle('.sw_hdr_img, #swi, #sw_footL, #id_h, .WeatherAttr, .vid, #FB_Badge, .sn_pin, ul.sw_a, ul.actions, .sw_menu, .sw_logo, .sn_videos, .mynewsPromotion, .sw_qbtn, .sw_dvdr, .WebResult, .WebLabel, .sw_aa {display: none !important}');

//