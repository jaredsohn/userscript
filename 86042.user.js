// ==UserScript==
// @name        mail.bigmir.net ADS remover
// @namespace   https://mail.google.com/a/bigmir.net/*
// @description Removes topbar ADS from mail.bigmir.net
// @include     https://mail.google.com/a/bigmir.net/*
// @author      Kott
// ==/UserScript==

(function () {
	function checkAdds() {
		var doc = document.getElementById('canvas_frame');
		if (doc) {
			doc = doc.contentDocument;
			var el = doc.getElementsByTagName('iframe')[0];
			if (el)
				el.parentNode.removeChild(el);
		}
		setTimeout(checkAdds, 1000);
	}
    checkAdds();
})();