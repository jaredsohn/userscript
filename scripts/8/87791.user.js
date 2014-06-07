// ==UserScript==
// @name           googlesharing antispam
// @description    Removes googlesharing spam from the SERPs. Also deals with the leaks outside of .com domain.
// @include        http://*google*
// @include        https://*google*
// @version        0.2
// @license        public domain
// @author         sd
// ==/UserScript==

(function() {
	var gs_spam;
	try {
	gs_spam = document.getElementById("googlesharing_addition")
	gs_spam.parentNode.removeChild(gs_spam);
	} catch(e) {};
	gs_spam = document.createElement('div');
	gs_spam.id = 'googlesharing_addition';
	document.body.appendChild(gs_spam);

	var url = window.location.href;
	var nurl = url.replace(/http:\/\/www\.google\.(?!com)[^\/]*\//,'http://www.google.com/');
	if (url != nurl) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.google.com/ncr",
			onload: function(response) {
				document.location.href = nurl;
			}
		});
	}
})();

