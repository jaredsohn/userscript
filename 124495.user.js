// ==UserScript==
// @name           clear
// @namespace      http://mne3.org
// @include        *
// ==/UserScript==

(function () {

	if (document.getElementsByTagName('link')) {
		var links = document.getElementsByTagName('link');
		console.log(':'+links);
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			//console.log(i+':'+links.item(i));
			if (link.href.indexOf('css') >= 0
			|   link.href.indexOf('CSS') >= 0
			|   link.type == 'text/css' ) {
				link.disabled = true;
			}
		}
	}

	if (document.getElementsByTagName('style')) {
		var styles = document.getElementsByTagName('style');
		for (var j = 0; j < styles.length; j++) {
			style = styles[j];
			style.disabled = true;
		}
	}

	if (document.getElementById('site-title')) {
		var aaa = document.getElementById('site-title');
		var bbb = aaa.parentNode.parentNode;
		bbb.parentNode.removeChild(bbb);
	}

	if (document.getElementsByTagName('aside')) {
		var asides = document.getElementsByTagName('aside');
		for (var i = 0; i < asides.length; i) {
			asides[0].parentNode.removeChild(asides[0]);
		}
	}
})();
