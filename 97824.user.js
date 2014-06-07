// ==UserScript==
// @name           Ikariam Tollbar Plus
// @namespace      http://ikariam.com.netw.gr	
// @autor          A-thnanatos
// @description    Add toolbar links (CT,MR,Support).
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// @version        0.1
// ==/UserScript==

var toolbar = document.getElementById('GF_toolbar');
if (toolbar) {
	var uls = toolbar.getElementsByTagName('ul');
	if (uls.length == 1) {
		var ul = uls[0];
		
		

        ul.innerHTML = '<li class="Gameforge Mustread"><a target="_blank" title="Gameforge Mustread" href="http://mustread.gf-international.de/index.php?page=Index"><span class="textLabel">Gameforge Mustread</span></a><li>'+ul.innerHTML;
		ul.innerHTML = '<li class="Comatoll"><a target="_blank" title="Comatoll" href="http://coma.gameforge.de/"><span class="textLabel">Comatoll</span></a><li>'+ul.innerHTML;
		ul.innerHTML = '<li class="Support"><a target="_blank" title="Support" href="http://support.ikariam.gr/"><span class="textLabel">Support</span></a><li>'+ul.innerHTML;


                ul.style.paddingright = '30px';
		ul.style.width = '950px';
		ul.style.textAlign = 'LEFT';
	}
}