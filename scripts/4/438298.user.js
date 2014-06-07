// ==UserScript==
// @name        Drone.x Full
// @namespace   Drone.x Full
// @description Drone.x Full is a script for Zynga's Mafia Wars game.
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://www.facebook.com/dialog/oauth?client_id=10979261223*
// @include     https://www.facebook.com/dialog/oauth?client_id=10979261223*
// @author		GuessX
// @version     0.02
// @comment 	Trolllololol
// ==/UserScript==

{
	// inject function so that in will run in the same context as other scripts on the page
	function inject(func)
	{
		var source = func.toString();
		var script = document.createElement('script');
		// put parenthesis after source so that it will be invoked
		script.innerHTML = '('+source+')()';
		document.body.appendChild(script);
	}

	function loader()
	{
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.src = 'http://creallaborate.com/guessx/MafiaWars/Scripts/DroneFullARS.js';
		document.getElementsByTagName('head')[0].appendChild(a);
	}

	var skip = false;
	if (/xw_controller=freegifts/.test(document.location.href))
		skip = true;
	if (/xw_controller=requests/.test(document.location.href))
		skip = true;
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	if(document.location.href.indexOf('dialog/oauth?client_id=10979261223') > -1){
			window.location.href = http+'apps.facebook.com/inthemafia/';	
			return;
	}
	if (!skip)
		inject(loader);
}


