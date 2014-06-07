// ==UserScript==
// @name           Quake Live Launch in Window Mode
// @namespace      http://userscripts.org/users/469998
// @description    Attempts to make Quake Live start in window mode
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	var oldLaunchGame = LaunchGame;
	LaunchGame = function (params) {
		SetCvar('r_fullscreen', 0);
		params.hasFullscreen = false;
		params.Append('+toggleconsole'); // Should stop QL grabbing the mouse while loading the first map
		return oldLaunchGame.apply(this, arguments);
	}
});
