// ==UserScript==
// @name OGame: Shorten messages links
// @namespace http://userscripts.org/users/36331
// @description OGame: usefull for some internet connections
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=messages*
// ==/UserScript==

var strFunc = (function(){

	$(document).ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=messages") == -1) return;
		if (settings.data.indexOf("displayPage") == -1) return;

		$("#messageContent td.subject a.overlay").each(function () {
			var link = $(this);
			var href = link.attr("href");
			link.attr("href", href.replace(/&mids=[^&]*/,""));
		});
	});

}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);

