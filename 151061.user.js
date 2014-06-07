// ==UserScript==
// @name 			Pop-up Window Killer
// @id				popup_window_killer
// @namespace	  	com.kevinxw.userscripts
// @description		Block pop-up windows
// @license			GPL v3 or later version
// @updateURL		http://userscripts.org/scripts/source/151061.meta.js
// @include		*://www.xunfs.com/down.php?*
// @include		*://www.rmdown.com/link.php?*
// @version		0.1
// @author		Pokerface - Kevin
// ==/UserScript==

var w = null;	// unsafeWindow object

function _init($var) {
	if (!w) {
		// load unsafeWindow
		if (typeof(unsafeWindow) !== "undefined" && typeof(unsafeWindow[$var]) !== "undefined")
			w = unsafeWindow;
		else if (typeof(window[$var]) !== "undefined")
			w = window;
		else
			try {
				// for Chrome
				var a = document.createElement("a");
				a.setAttribute("onclick", "return window;");
				var win = a.onclick();
				if (typeof(win[$var]) !== "undefined")
					w = win;
			}
			catch (e) {
				console.debug('Kissogram Toolkit : Unable to load unsafeWindow Object!');
				w = null;
			}
	}
	return w;
}

_init("setpos");

w["setpos"] = function () {};
