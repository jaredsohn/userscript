// ==UserScript==
// @name           Bypass Middle Page
// @namespace      http://www.dotblogs.com.tw/chhuang
// @description    跳過網頁書籤分享網站的介紹頁面, 直接到達作者的原始網站
// @include        http://www.dzone.com/links/rss/*
// @include        http://digg.com/news/*
// @include        http://www.reddit.com/r/*
// @include        http://www.dotnetkicks.com/stories/*

// ==/UserScript==
(function(d){
	if(history.length != 1){ return; }
	
	var dzoneRegex = /www\.dzone\.com/i // DZone
	var diggRegex = /digg\.com/i // Digg
	var redditRegex = /reddit\.com/i // reddit
	var dotnetkicksRegex = /dotnetkicks\.com/i // dotnetkicks
	
	if (dzoneRegex.exec(window.location) !== null) {
		var site = 'dzone';
	} else if (diggRegex.exec(window.location) !== null) {
		var site = 'digg';
	} else if (redditRegex.exec(window.location) !== null) {
		var site = 'reddit';
	} else if (dotnetkicksRegex.exec(window.location) !== null) {
		var site = 'dotnetkicks';        
	} else if (funpRegex.exec(window.location) !== null) {
		var site = 'funp';
	} 
	
	switch (site) {
		case 'dzone':
			var content = document.getElementById('content');
			var divList = content.getElementsByTagName('div');
			var divLength = divList.length;

			for (var i = 0; i < divLength; i++) {
				if (divList[i].className == 'ldThumb') {
					window.location = divList[i].getElementsByTagName('a')[0].href;
					break;
				}
			}
			break;
				
		case 'digg':
			var divList = document.getElementsByTagName('h3');
			var divLength = divList.length;

			for (var i = 0; i < divLength; i++) {
				if (divList[i].className == 'story-item-title') {
					window.location = divList[i].getElementsByTagName('a')[0].href;
					break;
				}
			}
			break;

		case 'reddit':
			var divList = document.getElementsByTagName('p');
			var divLength = divList.length;

			for (var i = 0; i < divLength; i++) {
				if (divList[i].className == 'title' && 
					document.location.href != divList[i].getElementsByTagName('a')[0].href) {
					window.location = divList[i].getElementsByTagName('a')[0].href;
					break;
				}
			}
			break;

		case 'dotnetkicks':
			var divList = document.getElementsByTagName('h2');
			var divLength = divList.length;

			for (var i = 0; i < divLength; i++) {
				if (divList[i].className.indexOf('story-title') != -1) {
					window.location = divList[i].getElementsByTagName('a')[0].href;
					break;
				}
			}
			break;

	}
	
}(document));
