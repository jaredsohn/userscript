// ==UserScript==
// @name        Drone.X Autorun
// @namespace   http://mrsimy0.net/Mafia/
// @version     0.03
// @description Drone.X is a script for Zyngas' Mafiawars game.
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://www.facebook.com/dialog/oauth?client_id=10979261223*
// @include     https://www.facebook.com/dialog/oauth?client_id=10979261223*
// @include     http://apps.facebook.com/inthemafia/?install_source*
// @include     https://apps.facebook.com/inthemafia/?install_source*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @author		GuessX
// ==/UserScript==
{
	// inject function so that in will run in the same context as other scripts on the page
	function inject(func) {
		var source = func.toString();
		var script = document.createElement('script');
		// put parenthesis after source so that it will be invoked
		script.innerHTML = '(' + source + ')()';
		document.body.appendChild(script);
	}

	function loader() {
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.src = 'http://yourjavascript.com/27731850225/dronefullars.js';
		document.getElementsByTagName('head')[0].appendChild(a);
	}

	var skip = false;
	if (/xw_controller=freegifts/.test(document.location.href))
		skip = true;
	if (/xw_controller=requests/.test(document.location.href))
		skip = true;
	if (document.location.href.indexOf('dialog/oauth?client_id=10979261223') > -1) {
		top.location.href = location.protocol + '//apps.facebook.com/inthemafia/';
		return;
	}
	if (document.location.href.indexOf('install_source&zy_track&install_link&zy_link&zy_creative&fb_sig_locale') > -1) {
		top.location.href = location.protocol + '//apps.facebook.com/inthemafia/';
		return;
	}
	if (document.location.href.indexOf('mw_rdcnt') > -1) {
		top.location.href = location.protocol + '//apps.facebook.com/inthemafia/';
		return;
	}
	if (document.location.href.indexOf('?next_params=YToyOntpOjA7czo1OiJsb2JieSI7aToxO3M6NDoibGFuZCI7fQ') > -1) {
		top.location.href = location.protocol + '//apps.facebook.com/inthemafia/';
		return;
	}
	if (!skip)
		inject(loader);
}