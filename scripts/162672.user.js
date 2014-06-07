// ==UserScript==
// @name        My Zap2It
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Zap2It.com
// @include     http://*.zap2it.com/*
// @version     1
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('body, #aff_wrapper, #aff_rightbar_inner {background: #468 !important}');
GM_addStyle('#zc-wrapper {margin-top: 15px !important}');
GM_addStyle('#zc-wrapper {box-shadow: 0px 0px 6px 0px #000 !important}');
GM_addStyle('#zc-topbar-features {margin-top: -15px !important}');
GM_addStyle('#zc-topbar-location {margin-top: -30px !important; margin-left: 630px !important}');
GM_addStyle('#zc-topbar-inputs {margin-top: -20px !important; border-width: 0px !important}');
GM_addStyle('#zc-wrapper-inner {width: 1001px !important}');
GM_addStyle('.zc-tn-i {border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important}');
GM_addStyle('.zc-st {border-right: 1px solid #000 !important}');
GM_addStyle('#zc-topbar, #zc-topbar-inputs, #zc-topbar-btns, .zc-tn-i, .zc-st {background: #db8 !important}');
GM_addStyle('.zc-g-F {background: #fd8 !important}');
GM_addStyle('.zc-row {background: #edb !important}');
GM_addStyle('.zc-st {width: 60px !important}');
GM_addStyle('.zc-tn-t {width: 145px !important}');
GM_addStyle('.zc-tn-t, .zc-tn-z {font-size: 12px !important}');
GM_addStyle('a, #zc-topbar-user-welcome, #zc-topbar-provider-name, #zc-topbar-showtimes-label {font-size: 11px !important}');
GM_addStyle('a, .zc-tn-i, .zc-textBox, #zc-topbar-provider-name, input, option, li {font-weight: bold !important}');
GM_addStyle('#header, #zc-footer, #aff_footer, #zc-topbar-help, #zc-topbar-tivo-a, #zc-search-link, .zc-grid-ad, .zc-topbar-genres-item, #zc-topbar-title, #zc-topbar-print, #zc-topbar-channel, #zc-topbar-showhide-descriptions, #zc-topbar-view-calendar, #zc-st-11180 {display: none !important}');

//