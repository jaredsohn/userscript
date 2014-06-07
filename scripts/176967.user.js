// ==UserScript==
// @name        Ryot HTTPS Fix
// @namespace   LouisTakePILLz
// @include     https://www.ryot.org/*
// @version     1.0
// @license     Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @updateURL   http://userscripts.org/scripts/source/176967.meta.js
// @grant       none
// @icon data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+fnGd/f3yJRUVGuPT09xT09PcU9PT3Fubm5SN/f3yL7+/sD////AOTk5BlmZmaYPDw8xD09PcU9PT3Fp6enWv///wD///8AIiIi3QAAAP8AAAD/AAAA/8LCwjr///8A////AODg4B4cHBziAAAA/wAAAP8AAAD/RkZGuPz8/AD///8A////ACIiIt0AAAD/AAAA/wAAAP/CwsI6////APz8/AE6OjrFAAAA/wAAAP8AAAD/EBAQ7uTk5Bn///8A////AP///wAiIiLdAAAA/wAAAP8AAAD/wsLCOv///wCUlJRqAAAA/wAAAP8AAAD/AAAA/56enl7///8A////AP///wD///8AIiIi3QAAAP8AAAD/AAAA/8LCwjrq6uoTFBQU6gAAAP8AAAD/AAAA/0xMTLL///8A////AP///wD///8A////ACIiIt0AAAD/AAAA/wAAAP/CwsI6WFhYpwAAAP8AAAD/AAAA/yYmJtns7OwS////AP///wD///8A////AP///wAiIiLdAAAA/wAAAP8AAAD/cHBwjgAAAP8GBgb4MDAwzn5+fn/s7OwS////AP///wD///8A////AP///wD///8AIiIi3QAAAP8AAAD/AAAA/5ycnGHKysoyvr6+P0BAQL8SEhLtLCws0np6eoXw8PAM////AP///wD///8A////ACIiIt0AAAD/AAAA/wAAAP/CwsI6////AP///wC+vr4/AAAA/wAAAP8AAAD/Ojo6xPz8/AD///8A////AP///wAiIiLdAAAA/wAAAP8AAAD/wsLCOv///wD///8A2traIwAAAP8AAAD/AAAA/wAAAP/U1NQq////AP///wD///8AIiIi3QAAAP8AAAD/AAAA/8LCwjr///8A////ANDQ0C0AAAD/AAAA/wAAAP8AAAD/1NTUKf///wD///8A////ACIiIt0AAAD/AAAA/wAAAP/CwsI6////AP///wB6enqFAAAA/wAAAP8AAAD/NjY2yfz8/AD///8A////AP///wAiIiLdAAAA/wAAAP8AAAD/wsLCOvDw8A5+fn5+AgIC/AAAAP8EBAT6WFhYpujo6BX///8A////AOfn5xjf398fvLy8Qra2tke2trZHtra2R8zMzDG8vLxBtra2R7a2tkfAwMA87u7uD////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAMPhAADDwQAAw4MAAMOHAADDBwAAwg8AAMA/AADDhwAAw8MAAMPDAADDwwAAw4MAAMOHAAD//wAA//8AAA==
// ==/UserScript==

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
  };
}

var types = 
[
	{ id:"a",		attr:"href" },
	{ id:"a", 		attr:"target" },
	{ id:"script",	attr:"src" },
	{ id:"link",	attr:"href" },
	{ id:"img",		attr:"src" },
	{ id:"form",	attr:"action" },
	{ id:"meta",	attr:"content" },
	//{ id:"iframe",	attr:"src" }
];

function fixElements()
{
	for (var x=0, xMax=types.length; x < xMax; x++) {
		var elements = document.getElementsByTagName(types[x]["id"]);
		for (var i=0, iMax=elements.length; i < iMax; i++) {
			//Check if the attribute exists
			if(elements[i].hasAttribute(types[x]["attr"])) {
				var attrValue = elements[i].getAttribute(types[x]["attr"]);
				if (attrValue.startsWith("http://")) {
					var newValue = attrValue.substring(5);
					//Magic!
					elements[i].setAttribute(types[x]["attr"], newValue);
				}
			}
		}
	}
}

fixElements(); //Pre-'loading' fix

window.onload = function()
{
	fixElements(); //In case new elements have been added
};