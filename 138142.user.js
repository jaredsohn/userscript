// ==UserScript==
// @name         SelfUpdateTest
// @description  Do not install this script, I'm using it just to test userscripts functionality.
// @id           me.4ndrew.SelfUpdateTest
// @version      1.1
// @author       nopox
// @homepageURL  http://userscripts.org/scripts/show/138142
// @supportURL   http://userscripts.org/scripts/discuss/138142
// @updateURL    http://userscripts.org/scripts/source/138142.meta.js
// @include      https://www.google.com/
// @match        https://www.google.com/
// ==/UserScript==

var el;
if (el = document.getElementById('gbqfsa')) {
	el.innerHTML = "Google Search!!"
}