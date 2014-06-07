// ==UserScript==
// @name       TheOldReader_To_Greader
// @namespace  http://go.ogle.hu
// @version    0.1
// @description  Just to make Google Reader like the theoldreader.com
// @include     http://theoldreader.com/*
// @copyright  2013+, BOJ
// ==/UserScript==


GM_log("TheOldReader_To_Greader starting...");
//window.alert('TheOldReader_To_Greader starting...');

GM_addStyle('body .span3 {width:0px' + ' !important'); // "!important" overrides existing value


GM_addStyle('body .body-fixed-top {width:98%' + ' !important'); // "!important" overrides existing value
GM_addStyle('body .body-fixed-top {left:0px' + ' !important'); // "!important" overrides existing value


GM_log('TheOldReaderCleanup complete.');
//window.alert('TheOldReader_To_Greader complete.');