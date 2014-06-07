// ==UserScript==
// @name           Ikaraiam Title Advisor
// @namespace      tag:kris7topher@gmail.com,2008-01-07:IkariamTitleAdvisor
// @description    Shows if advisors have something to say in the titlebar. Modified version of http://userscripts.org/scripts/show/29331
// @include        http://*.ikariam.tld/*
// ==/UserScript==

(function () {
var x = "";
['advCities', 'advMilitary', 'advResearch', 'advDiplomacy'].some(function(e) {
	if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) x += e[3].toLowerCase();
	else if (document.evaluate('.//a[@class="premiumactive"]', document.getElementById(e), null, 8, null).singleNodeValue) x += e[3].toLowerCase();
	else if (document.evaluate('.//a[@class="normalalert"]', document.getElementById(e), null, 8, null).singleNodeValue) x += e[3].toUpperCase();
	else if (document.evaluate('.//a[@class="premiumalert"]', document.getElementById(e), null, 8, null).singleNodeValue) x += e[3].toUpperCase();
	else x += '-';
});
sel = document.getElementById('citySelect');
city = sel.options[sel.selectedIndex].innerHTML;
world = document.title.split(' ').pop();
document.title = '[' + x + '] ' + city + '-' + world;
})();