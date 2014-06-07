// ==UserScript==
// @name           Rutracker.org banners
// @namespace      *rutracker.org*
// @include        *rutracker.org*
// ==/UserScript==
window.hideBanners = function() {
	var i = 0; 
	var test = '';
	var ban_mass = new Array('sidebar1','logo','latest_news','page_footer','adriver-240x120');
	for (i = 0; i <= ban_mass.length-1; i++) {
		test = document.getElementById(ban_mass[i]);
		if ((test != null) && (test.style.display != 'none')) test.style.display = 'none';
	}
	
	//setTimeout(function() { hideBanners(); },100);
}

hideBanners();