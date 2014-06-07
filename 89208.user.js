// ==UserScript==
// @name           better.php - get tags
// @namespace      http://what.cd
// @description    better.php - get tags
// @include        http*://*what.cd/better.php?*
// ==/UserScript==

(function(){
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined') {
				window.setTimeout(GM_wait, 100);
		} else {
			$ = unsafeWindow.jQuery.noConflict(true);
			letsJQuery();

		}
	}
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();
//jquery


function letsJQuery() {
	function load_page_then(uri, then) {

		GM_xmlhttpRequest({

			method: "GET",

			url: uri,

			onload: then

		});

	}
	var link = $('a:[title=View Torrent]');
	function add(i) {
		load_page_then(link[i], function (response) {
			var x = response.responseText.split("torrents.php?taglist=");
			var add = "";
			for (var e = 1; e < x.length; e++) {
				add += " " + x[e].split("\"")[0] + ",";

			}
			$(link[i].parentNode).append("<div>" + add.substr(0,add.length-1) + "</div>");
		});
	}
	for (var i = 0; i < link.length; i++) {	add(i); }
}