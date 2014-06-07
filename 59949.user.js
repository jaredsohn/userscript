// ==UserScript==
// @name           View Forum Posts Quick yo
// @namespace      View Forum Posts Quick yo
// @description    This scriptizzle adds a Forum Posts link to the 'Profile' dropdown menu.
// @include        http://*bungie.net/*
// ==/UserScript==

function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}
var login = getCookie("BungieDisplayName"), profile_menu = document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu');
profile_menu.innerHTML += '<li><a href="http://www.bungie.net/Search/default.aspx?q='+login+'&g=5">Forum Posts</a></li>';