// ==UserScript==
// @name           imgur to mirur
// @namespace      lanulus@gmail.com
// @description    Replaces all imgur links on reddit with mirur links
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

var a = document.getElementsByTagName('a');
for (i=0;i<a.length;i++) {
	p = /imgur\.com\/([A-Za-z0-9]+)/;
	res = p.exec(a[i]);

	if (res!=null) {
		a[i].href = 'http://sparc.in/imgur/?' + res[1];
	}
}