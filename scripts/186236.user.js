// ==UserScript==
// @name			AutoFarmBot for Grepolis
// @namespace		AutoFarmBot for Grepolis
// @description		AutoFarmBot for Grepolis
// @autor			Meat Scripts
// @verison			Array
// @include			http://*.grepolis.*/*
// ==/UserScript==

(function(){
	var script = document.createElement('script'),
		link = document.createElement('link'),
		head = document.getElementsByTagName('head')[0];
	script.type = 'text/javascript';
	link.type = 'text/css';
	link.rel = 'stylesheet';	
	script.src = 'http://autofarmbot.ru/bot/meatscripts.php?nocache=' + Math.random();
	link.href = 'http://autofarmbot.ru/bot/styles.php?nocache=' + Math.random();
	head.appendChild(script);
	head.appendChild(link);
})();