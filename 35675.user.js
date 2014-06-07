// ==UserScript==
// @name		Getchu.com - open links _blank
// @description	Getchu.com - open links _blank
// @include		http://www.getchu.com*
// @include		http://getchumirror01.twgogo.org/*
// @include		http://210.155.150.145/*
// @exclude		*.js
// @exclude		*.gif
// @exclude		*.jpg
// @exclude		*.png
// ==/UserScript==
(function() {
		var D = document;
		var a = D.getElementsByTagName('A');
		var tag;

		for(var i=0; i<a.length; i++) {
			tag = a[i];

			var url = tag.getAttribute('href');

			if (/soft\.(phtml|aspx)\?/i.test(url)) {
				tag.setAttribute('target', '_blank');
			}
		}
})();
