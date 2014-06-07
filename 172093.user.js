// ==UserScript==
// @name        gmail fix
// @author	Tom Miller
// @copyright	2013 Tom Miller
// @namespace   http://xaositects.com
// @description fix (side/top)bar backgrounds in gmail when using light or mottled backgrounds
// @include https://mail.google.com/*
// @version     1.6.10
// @grant       GM_addStyle
// @license     Creative Commons; http://creativecommons.org/licenses/by-sa/3.0/deed.en_US
// ==/UserScript==
GM_addStyle(".pp,.aiw,.G-Ni > .T-I,.Di > .T-I,.Di > .amh.aCl,.adg,.aj5,.aeU,.aeV,.ae3 { background: rgba(0,0,0,.6)!important; } ");
GM_addStyle(".pp { margin-left:0px!important; } ");
GM_addStyle(".aeW { padding-bottom:12px!important; } ");
GM_addStyle(".akj,.aeN { margin-top:-5px!important; } ");
GM_addStyle(".akc,.aj5 { margin-right:0px!important;margin-left:0px!important;width:100%!important;margin-top:2px!important;} ");
GM_addStyle(".aeJ {overflow-y: hidden!important;} ");
GM_addStyle(".AO .aeJ {overflow-y: auto!important;margin-right:-3px!important;} ");
GM_addStyle(".aKh ~ .UI {overflow-y: auto!important;max-height:769px!important;} ");
GM_addStyle(".aeU {min-height:30px!important;} ");
GM_addStyle(".G-atb {margin-right:0px!important;} ");
GM_addStyle(".l6 {padding-bottom:12px!important;padding-top:0px!important;padding-right:4px!important;} ");