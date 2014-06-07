// ==UserScript==
// @name           EX.UA FLV links
// @description	   Adds download links near the play buttons (only for FLV files)
// @namespace      http://addons.opera.com/addons/extensions/details/tonkaia-nastroika-saita-exua/
// @source         http://userscripts.org/scripts/show/124289
// @identifier     http://userscripts.org/scripts/source/124289.user.js
// @author         Vadym Gulyi <me@vady.kiev.ua>
// @icon64         http://addons.opera.com/media/extensions/15/19315/1.0-rev1/icons/icon_64x64.png
// @date           2013-06-21
// @version        1.0.0
// @versiontext    Initial release
// @include        http://www.ex.ua/*
// ==/UserScript==

(function() {
	'use strict';
	window._content = window;
	//window.opera.addEventListener('AfterEvent.DOMContentLoaded', function() {
	window.addEventListener("DOMContentLoaded", function() {
		if(window.player_list) {
			var p=JSON.parse('['+window.player_list+']');
			for (var i=0;i<p.length;i++){
				if(p[i].type=='video'){
					var d=document.createElement('a');
					d.setAttribute('href',p[i].url);
					d.innerHTML="&#9660;";
					document.getElementById("play_"+i).parentNode.appendChild(d);
				}
			}
		}
	}, false);
})();