// ==UserScript==
// @name           YouTube - Search By Date Added [2013]
// @namespace      http://userscripts.org/users/54261
// @description    Adds a "By Date" button next to the YouTube search box for results sorted with most recently added at top
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://youtube.com/*
// @include        https://*.youtube.com/*
// @grant          GM_addStyle
// @copyright      RazorXL and JoeSimmons
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// note this script is an updated and revised version of the script
// Joe Simmons wrote for me at http://userscripts.org/topics/100113
// Due to changes on YouTube, the script did not work perfectly, so
// I'm re-hosting it now so that I can maintain it.

f = document.evaluate("//form[@id='masthead-search']", document,null,9,null).singleNodeValue;
GM_addStyle(".searchbydate-btn-component{ float:right; height:32px; padding:0 .91em;opacity:1;filter:none;_margin-left:-3px;*zoom:1;}");
	
if(f && f!=null && typeof f!='undefined') {
	var a = document.createElement('button');
	a.setAttribute('id', 'search-bydate-btn');
	a.setAttribute('class', 'searchbydate-btn-component search-button yt-uix-button yt-uix-button-default');
	a.setAttribute('type', 'submit');
	a.setAttribute('dir', 'ltr');
	a.setAttribute('tabindex', '2');
	a.setAttribute('role', 'button');
	a.setAttribute('aria-pressed', 'false');
	a.setAttribute('href', '#');
	a.setAttribute('label', 'By Date');
	a.addEventListener('click', function(){
		var date_added = document.createElement('input');
		date_added.setAttribute('type', 'hidden');
		date_added.setAttribute('name', 'search_sort');
		date_added.setAttribute('value', 'video_date_uploaded');
		f.appendChild(date_added);
		f.submit();
		}, false);
	oldBtn = document.evaluate("//button[@id='search-btn']", document,null,9,null).singleNodeValue;
	oldBtn.setAttribute('tabindex','3');
	oldBtn.parentNode.insertBefore(a, oldBtn.nextSibling);
	
	var box = document.createElement('span');
	box.className = 'yt-uix-button-content';
	box.textContent = '';
	box.innerHTML = 'By Date';
	a.appendChild(box);
}