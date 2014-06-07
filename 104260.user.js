// ==UserScript==
// @name           Traukiem.lv APP Helper
// @namespace      http://blog.vienalga.net
// @include        http://www.draugiem.lv/*
// ==/UserScript==

if (document.body.innerHTML.indexOf('draugiem_app_id') != -1){
	var script  = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.innerHTML = 'window.onbeforeunload = function(){ \
			return "Pārtraukt spēli?"; \
		}';
	document.body.appendChild(script);
}