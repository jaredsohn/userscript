// ==UserScript==
// @name           fs-inline-images
// @namespace      http://userscripts.org/users/133663
// @include        http://www.formspring.me/*
// ==/UserScript==

var make_it_so = function() {
	var a = document.getElementsByTagName('a');
	for (var b in a) {
		if (a[b].href) {
			if ((/\.(jpg|png|gif)/i.test(a[b].href)) && !(a[b].getElementsByTagName('img')[0])) {
				var c = document.createElement('img');
				c.src = a[b].href;
				var d = c.height; var e = c.width;
				if (d > 360) { e = e * 360 / d; d = 360; }
				if (e > 480) { d = d * 480 / e; e = 480; }
				c.height = d; c.width = e;
				a[b].appendChild(c);
	}	}	}
};

make_it_so();
setInterval("make_it_so()",6000);