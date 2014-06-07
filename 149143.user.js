// ==UserScript==
// @name           killnews
// @namespace   killnews
// @include    http://www.nicovideo.jp/watch/*
// @version        0.2
// ==/UserScript==
//
(function () {
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', function () {
			var script = document.createElement("script");
			script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}

	function main() {
		jQ(".textMarqueeInner")[0].style.visibility = "hidden"
		jQ(".prevButton")[0].style.visibility = "hidden"
		jQ(".nextButton")[0].style.visibility = "hidden"
	}

	addJQuery(main);
})();
