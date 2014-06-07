// ==UserScript==
// @name		Konachan: Forum Last Redirect
// @namespace	Zolxys
// @description	Makes sure the "last" links on the forums list actually take you to the last page.
// @include	http://konachan.com/forum*
// @include	http://konachan.net/forum*
// @version	1.1
// ==/UserScript==
if (/^\/forum\/show\//.test(location.pathname)) {
	var n = document.getElementById('paginator');
	if (n.getElementsByTagName('em').length == 0) {
		var a = n.getElementsByTagName('a');
		if (a.length > 0)
			location.replace(a[a.length - 1].href);
	}
	else if (/^#lastpage$/.test(location.hash)) {
		var a = n.getElementsByTagName('a');
		for (var i = a.length - 1; i > 0; --i)
		  if (/^\d+$/.test(a[i].innerHTML.trim())) {
			var r = /[\?&]page=(\d+)(&|$)/.exec(location.search);
			var p = ((r == null)? 1 : parseInt(r[1]));
			if (p < parseInt(a[i].innerHTML.trim())) {
				location.replace(a[i].href);
				return;
			}
			break;
		}
		location.replace(location.protocol +'//'+ location.host + location.pathname + location.search);
	}
}
else {
	var a = document.getElementById('forum').getElementsByTagName('table')[0].getElementsByTagName('a');
	for (var i = 0; i < a.length; ++i)
		if (/\/forum\/show\/\d+\?page=\d+$/.test(a[i].href))
			a[i].href += '#lastpage';
}
