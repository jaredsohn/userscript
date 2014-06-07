// ==UserScript==
// @name           Ännu ett meningslöst GM-script
// @namespace      icaaq.com
// @description    Lägger till frebro överst på sidan
// @include        http://twitter.anvisning.se/8/lista-over-svenska-twitter-anvandare/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function() {
	var h1 = $(document.createElement("H1"));
	h1.html($("#entry li:contains('@frebro')").clone().html());
	$(body).prepend(h1);
})();