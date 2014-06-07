// ==UserScript==
// @name           4chan fixes
// @namespace      4chan-fixes
// @description    Some minor things for my style.
// @include        http://boards.4chan.org/*
// @include        http://rs.4chan.org/*
// @include        http://rs.4chan.org/
// ==/UserScript==

var rerem = document.getElementsByTagName('span');

for(i=0; i<rerem.length; i++) {
	if(rerem[i].innerHTML=='[<a href=".././" accesskey="a">Return</a>]') {
		rerem[i].style.display='none';
	}
	if(rerem[i].innerHTML=='[<a href=\".././\">Return</a>]') {
		rerem[i].style.display='none';
	}
}

var navtop = document.getElementById('navtop');
navtop.innerHTML = '[\
<a href="http://boards.4chan.org/a/">anime &amp; manga</a> / \
<a href="http://boards.4chan.org/g/">technology</a> / \
<a href="http://boards.4chan.org/v/">video games</a> / \
<a href="http://boards.4chan.org/3/">3dcg</a> / \
<a href="http://boards.4chan.org/lit/">literature</a> / \
<a href="http://boards.4chan.org/sci/">science &amp; math</a> / \
<a href="http://boards.4chan.org/ck/">cooking &amp; food</a> / \
<a href="http://boards.4chan.org/int/">international</a>] \
[wallpapers: <a href="http://boards.4chan.org/w/">anime</a> / \
<a href="http://boards.4chan.org/wg/">general</a>] \
[<a href="http://rs.4chan.org/">rapidshares</a>]';