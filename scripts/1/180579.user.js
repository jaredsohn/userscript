// ==UserScript==
// @name        VK Statlink
// @namespace   local
// @include     https://vk.com/*
// @version     2
// @grant       none
// ==/UserScript==

window.addEventListener("load", function(e) {
	function addlink() {
		var el = document.getElementById('public_followers');

		if (el) {
			var str = el.children[0].href;
			var link = 'http://vk.com/stats?gid=' + str.replace(/.*\=/, '', str);
			el.innerHTML = '<div class="button_blue button_wide subscribe_button"><button onclick="document.location=\''+ link + '\'">Статистика</button></div>' + el.innerHTML;
			clearInterval(add_link);
		}
	}

	var add_link = setInterval(addlink, 500);

}, false);