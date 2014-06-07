// ==UserScript==
// @name           HDBits Completed Download Links
// @namespace      hdbitscompleted
// @include        *
// @description    Download links to completed torrents on hdbits
// ==/UserScript==

var c, w, t, h, l, i, e;

c = document.body.className;
w = 'http://hdbits.org';

	h = document.getElementsByTagName('a');
	i = h.length;

       alert(i);

	while (i--)
	{
			t = encodeURIComponent(h[i].innerHTML);
			l = w + '/download.php?id=' + t;
			h[i].parentNode.innerHTML += ' <a href="' + l + '"><img src="' + w + '/favicon.ico" /></a>'; // favicon link
	}
}