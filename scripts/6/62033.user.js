// ==UserScript==
// @name           Click challenge
// @namespace      http://userscript.org/scrpts/62033
// @description    Annyit kattinthatsz, amennyit csak akarsz
// @include        http://moje.napady.cz/clickchallenge/*
// ==/UserScript==

window.addEventListener('load',
	function(){
		var b = document.getElementById('eon');
		b.addEventListener('mouseover',
			function(e){
				for(var i = 0; i<=3000; i++)
					e.target.click();
			},
			true);
	},
	false);