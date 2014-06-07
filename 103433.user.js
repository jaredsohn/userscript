// ==UserScript==
// @name          Change YouTube user banners to plain text
// @namespace     http://www.manuelseeger.de
// @description   Changes back YouTube user banners to plain text as it used to be
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @include       http://www.youtube.com/watch*
// @include       https://www.youtube.com/watch*
// @version       1.0
// ==/UserScript==

if (document.getElementById('watch-userbanner')) {
	var img = document.querySelector('#watch-userbanner > strong > img');
	img.parentNode.replaceChild(document.createTextNode(img.alt), img);
	document.getElementById('watch-userbanner').id = 'watch-username';
}