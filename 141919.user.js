// ==UserScript==
// @name            FaveZone adf.ly Remove
// @namespace       http://userscripts.org/users/367653
// @description     Remove adf.ly Links From FaveZone Site.
// @version         1.1
// @author          TzAnAnY
// @include         http://www.favezone.net*
// @include         http://favezone.net*
// @include         http://www.favez0ne.net*
// @include         http://favez0ne.net*
// @grant           none
// ==/UserScript==
(function() {
	var a, item, href, start;
	a = document.getElementsByTagName("a");
	for(var i=0; i<a.length ; i++) {
		item = a.item(i);
		href = item.href;
		start = href.lastIndexOf("http://");
		if(start == -1 || start == 0)
			start = href.lastIndexOf("https://");
		if(start != -1 && start != 0)
			item.href = href.substring(start);
	}
})();