// ==UserScript==
// @name       google image jump to page without hightlight preview
// @version    0.2
// @description  google image jump to page without hightlight preview
// @match      *www.google.com*
// @copyright  2012+, You
// ==/UserScript==
document.onclick = function (e) {
	var e = e.target;
	if ('rg_hi' !== e.id) return;
	window.location.href = decodeURIComponent(/imgrefurl=([^&]+)/.exec(e.parentNode.href)[1]);
	return false;
}

