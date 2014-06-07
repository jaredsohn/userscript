// ==UserScript==
// @name           Minimise Waffles News
// @namespace      http://userscripts.org/users/almostkilledme
// @description    Automatically minimises all news on the Waffles.FM index page
// @include        https://www.waffles.fm/index.php
// @include        http://www.waffles.fm/index.php
// @include        https://www.waffles.fm/home.php
// @include        http://www.waffles.fm/home.php
// @include        https://www.waffles.fm/
// @include        http://www.waffles.fm/
// @require        http://updater.usotools.co.cc/52899.js
// ==/UserScript==

(function () {
	var h2s = document.getElementsByTagName("h2");
	var minimised = 0;
	var klappe = document.body.innerHTML.match(/onclick="(javascript:klappe_news\(.+'\))"/ig);
	var plus = new Image();
	plus.src = "https://static.waffles.fm/pic/plus.gif";
	plus.addEventListener('click', maximiseAll, true);
	var minus = new Image();
	minus.src = "https://static.waffles.fm/pic/minus.gif";
	minus.addEventListener('click', minimiseAll, false);
	var spacer = new Image();
	spacer.src = "http://img39.imageshack.us/img39/8900/spacerj.png";
	
	function main() {
		addButtons();
		doAll();
	}
	
	function addButtons() {
		h2s[0].innerHTML = h2s[0].innerHTML + "&nbsp;";
		h2s[0].appendChild(plus);
		h2s[0].appendChild(spacer);
		h2s[0].appendChild(minus);
	}
	
	function maximiseAll() {
		if (minimised != 0) {
			for (var j = 0 ; j < klappe.length ; j++) {
				klappe[j] = klappe[j].replace(/onclick="/ig,'');
				klappe[j] = klappe[j].replace(/"/ig,'');
				location.href = klappe[j];
			}
			minimised = 0;
		}
	}
	
	function minimiseAll() {
		if (minimised != 1) {
			for (var j = 0 ; j < klappe.length ; j++) {
				klappe[j] = klappe[j].replace(/onclick="/ig,'');
				klappe[j] = klappe[j].replace(/"/ig,'');
				location.href = klappe[j];
			}
			minimised = 1;
		}
	}
	
	function doAll() {
		for (var j = 0 ; j < 2 ; j++) {
			klappe[j] = klappe[j].replace(/onclick="/ig,'');
			klappe[j] = klappe[j].replace(/"/ig,'');
			location.href = klappe[j];
		}
		for (var i = 5 ; i < 7 ; i++) {
			klappe[i] = klappe[i].replace(/onclick="/ig,'');
			klappe[i] = klappe[i].replace(/"/ig,'');
			location.href = klappe[i];
		}
		if (minimised == 0) {
			minimised = 1;
		}
		else {
			minimised = 0;
		}
	}
	
	main();
})();