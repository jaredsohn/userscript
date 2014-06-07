// ==UserScript==
// @name           Indowebster auto-download
// @include        http://ipgue.com/?key=*
// @include        http://*.ipgue.com/?key=*
// @include        http://*.jeruknipis.com/?key=*
// @include        http://*.hackers.co.id/?key=*
// @include        http://hackers.co.id/?key=*
// @updated        2010-03-22
// ==/UserScript==

window.addEventListener("DOMNodeInserted", linkCheck, true);

function linkCheck(e) {
	var link = e.target;
	if (link.getAttribute("href") && /^http:.www/.test(link.getAttribute("href")) && /block/.test && /indowebster.com^/.test(link.getAttribute("href")) 

(link.parentNode.getAttribute('style'))) {
		document.body.innerHTML = '<a href="'+link+'">'+link+'</a>';
		location.replace(link);
	}
}