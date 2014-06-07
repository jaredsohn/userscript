// ==UserScript==
// @name       CMS-Extra
// @namespace  http://styleshit.me/
// @version    0.1
// @description  Extra functions for CMS.
// @match      http://cms.alibaba-inc.com/*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
$(function(){
	$.get('http://styleshit.me/chromeExts/cms-extra/js/intro.js?v=2013-1-' + Math.floor(new Date().getTime()/(1000*60)));
});