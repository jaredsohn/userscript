// ==UserScript==
// @name           Douban Floors
// @namespace      Sleven
// @author         Sleven
// @copyright      Sleven (http://weibo.com/sleven)
// @description    Show floor numbers for Douban posts.
// @features       Douban Floors V1.5 Beta
// @version        1.5.1
// @license        MIT License
// @require        http://userscripts.org/scripts/source/124916.user.js
// @updateURL      http://userscripts.org/scripts/source/124916.meta.js
// @website        http://userscripts.org/scripts/show/124916
// @created        2012.02.05
// @modified       2012.02.05
// @include        http://www.douban.com/*
// @include        http://site.douban.com/*
// @noframes
// ==/UserScript==

(function() {
	var ScriptInfo = {
		name    : 'Douban Floors',
		id      : '124916',
		version : '1.5.1'
	};
	var DoubanSites = {
		site    : 'site.douban.com',
		group   : 'www.douban.com/group/',
		event   : 'www.douban.com/event/',
		online  : 'www.douban.com/online/',
		note    : 'www.douban.com/note/'
	};
	
	var currentUrl = window.location.href.toLowerCase();
	var currentPageNum = currentUrl.match(/start=(\d+)/i);
	var startFloor = (currentPageNum == null) ? 0 : parseInt(currentPageNum[1]);
	
	var platform = 'www';
	var floorWrap = (document.getElementById('comments') != null) ? document.getElementById('comments') : false;
	var floorClass = 'comment-item';
	var floors = new Array();
	
	if (String(currentUrl).indexOf(DoubanSites.group) != -1) {
		platform = 'group';
		floorWrap = (document.getElementsByClassName('topic-reply').length > 0) ? document.getElementsByClassName('topic-reply')[0] : false;
		floorClass = 'clearfix';
	}
	
	if (floorWrap) floors = floorWrap.getElementsByClassName(floorClass);
	if (floors.length == 0) return;
	
	for(var f = 0; f < floors.length; f++) {
		var floorNumEl = document.createElement('span');
		floorNumEl.style.cssText = "position:absolute;top:2px;right:4px;color:#c00;";
		floorNumEl.innerHTML = startFloor + f + 1 + ' F';
		floors[f].style.position = 'relative';
		floors[f].appendChild(floorNumEl);
	}
})();