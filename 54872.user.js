// ==UserScript==
// @name           Travian Any Page Login
// @namespace      Travian Any Page Login
// @description    Forget about dorf1. Travian will directly login to any page.
// @include        http://s*.travian*.*/*.php*
// @include        http://welt*.travian*.*/*.php*
// @exclude        http://s*.travian*.*/log*.php*
// @exclude        http://welt*.travian*.*/log*.php*
// @exclude        http://s*.travian*.*/*x.php*
// @exclude        http://welt*.travian*.*/*x.php*
// @author         Gabraham
// @version        1.0
// @license        Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Argentina
// ==/UserScript==

/* 
 * This script is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Argentina License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ar/
 */

window.addEventListener('load', function() {
	if ((document.evaluate( ".//input[@value='login']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength) {
		var form = ((document.getElementsByTagName('FORM'))[0]);
		form.action = (window.location.href).split("/")[3];
		form[2].style.borderColor = form[3].style.borderColor = 'lightblue';
		form = null;
	};
},true);