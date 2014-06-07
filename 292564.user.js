// ==UserScript==
// @name        猴岛去广告
// @namespace   houdao
// @description 猴岛去广告
// @include     *bbs.houdao.com*
// @version     1
// @grant       none
// ==/UserScript==

jQuery("#top-banner").hide();
jQuery("body").children(":not(#top, #headerbg, #main, #main-footer)").hide();
jQuery(".related, .sigline, .signature").hide();
