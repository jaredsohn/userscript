// ==UserScript==
// @name           Freshports nonbug killer
// @namespace      http://userscripts.org/users/nitrogl
// @description    This removes noising "nonbug" from freshports website
// @include        http://www.freshports.org/
// @copyright      Roberto Metere
// @version        1.0
// @license        BSD License
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
var i, elfound;
for (i = 0; i < imgs.length; i++) {
	if (/notbug.gif/.test(imgs[i].src)) {
		imgs[i].style.display = 'none';
	}
}
