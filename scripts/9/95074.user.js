// ==UserScript==
// @name           RapidLeech Skip Ads
// @namespace      http://www.gratismusika.com
// @description    Skip counting and pop-up in some Rapidleech
// @include        http://www.rsleecher.me/*
// @include        http://www.warezrocker-leecher.info/*
// @include        http://www.zleech.com/*
// @include        http://onleech.net/*
// ==/UserScript==

var $; (function(){ if (typeof unsafeWindow.jQuery == 'undefined') { var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script'); GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; GM_JQ.type = 'text/javascript'; GM_JQ.async = true; GM_Head.insertBefore(GM_JQ, GM_Head.firstChild); } GM_wait(); })(); function GM_wait() { if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); } else { $ = unsafeWindow.jQuery.noConflict(true); letsJQuery(); } } function letsJQuery() { var sButTex='Rapid Skip';var sIncl='<input style="background:red;color:white" type="submit" value="' + sButTex + '">';$('input[type=submit]').remove();$('input[type=button]').remove();$('input[name=B2]').before(sIncl);$('input[name=btnRestablecer]').before(sIncl); }
