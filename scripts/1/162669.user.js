// ==UserScript==
// @name        My Verizon
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Verizon.com
// @include     http://*.verizon.com/*
// @include     https://*.verizon.com/*
// @version     2
// @grant	GM_addStyle
// ==/UserScript==

GM_addStyle('body, .scbDiagGreyBack  {background: #468 !important}');
GM_addStyle('#ghfbodycontent {box-shadow: 0px 0px 8px 0px #000 !important}');
GM_addStyle('.oo_feedback_float, #showmyvzres2012footer, .header_main, #scbsmbheader, .comp_tabs, .verizon_tour_toggle {display: none !important}');

//