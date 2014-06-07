// ==UserScript==
// @name          Bypass Drupal's private files method
// @description	  replaces all images/links path from /system/files to /files.
// @version			1.0
// @author      Volkan K.
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @copyright   2012-2013 Volkan K.
// @include     *
// ==/UserScript==

GM_registerMenuCommand("Bypass Drupal's private files method", function() {

htre = new RegExp("(.*)(^|/)(system/)(files/)(.*)");

es = document.getElementsByTagName("a");
for (var i = 0; i < es.length; i++){
	var href = es[i].href;

	if (!href) continue;

	if (href.match(htre)) {
		href = href.replace(htre, "$1$2$4$5");
		es[i].href = href;
	}
}

et = document.getElementsByTagName("img");
for (var i = 0; i < et.length; i++){
	var src = et[i].src;

	if (!src) continue;

	if (src.match(htre)) {
		src = src.replace(htre, "$1$2$4$5");
		et[i].src = src;
	}
}

});