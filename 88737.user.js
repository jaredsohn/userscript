// ==UserScript==
// @name           Read Later for V2EX
// @namespace      http://userscripts.org/users/195534
// @description    Save topic to Instapaper
// @include        http://v2ex.appspot.com/t/*
// @include        http://www.v2ex.com/t/*
// @include        http://v2ex.com/t/*
// ==/UserScript==

var $, jQuery;
loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init()
{
	$ = jQuery = unsafeWindow.jQuery;
	$(document).ready(function() {
    	var _url = window.location;
    	var _title = $("title").text();
    	var _desc = ($(".topic_content").text()).substr(0, 20);
    	var instaButton = '<iframe border="0" scrolling="no" width="78" height="17" allowtransparency="true" frameborder="0"';
    	instaButton += 'style="position: absolute; margin-left: 10px; z-index: 1338; border: 0; background-color: transparent; overflow: hidden;"';
    	instaButton += 'src="http://www.instapaper.com/e2?url='+ encodeURIComponent(_url) +'&title='+ encodeURI(_title) +'&description='+ encodeURIComponent(_desc) +'"></iframe>';
    	$("#Content .box .cell strong small.fade").after(instaButton);
	});
}