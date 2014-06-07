// ==UserScript==
// @run-at		document-start
// @nocompat
// @name		UniverseView
// @namespace	Warsaalk
// @icon		http://extension.universeview.be/img/uv_icon.png
// @description	Tool for ogame, advanced galaxy view for player planets.
// @version		2.2.3
// @author		Warsaalk
// @downloadURL	http://universeview.be/download/151420.user.js
// @include		http://*.ogame.gameforge.com/game/index.php?*page=*
// ==/UserScript==
var s = document.createElement('script');
s.src = 'http://universeview.be/universeview.js';
s.onload = function() {
    this.parentNode.removeChild(this); //Remove the script element (makes it invisible)
};
(document.head||document.documentElement).appendChild(s);