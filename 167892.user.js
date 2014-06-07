// ==UserScript==
// @name		Konachan/yande.re: Forum Post - Veiw in Parent
// @namespace	Zolxys
// @description	When veiwing a individual forum post that has a parent, the "Parent" link at the bottom is changed to "View in parent".  This link takes you to the actual page the post you were viewing is on and then scrolls down to the post.
// @include	http://konachan.com/forum/show/*
// @include	http://konachan.net/forum/show/*
// @include	https://yande.re/forum/show/*
// @version	1.1
// ==/UserScript==
var a = document.getElementById('subnavbar').getElementsByTagName('a');
for (var i = 0; i < a.length; ++i)
  if (a[i].innerHTML.trim() == 'Parent') {
	var s = document.getElementById('forum').getElementsByTagName('a')[1].href;
	a[i].href += '#find'+ s.substr(s.lastIndexOf('/') + 1) +'in1-X';
	a[i].innerHTML = 'View in parent';
	break;
}
var r = /[\?&]page=(\d+)(&|$)/.exec(location.search);
var page = ((r == null)? 1 : parseInt(r[1]));
r = /^#find(\d+)in(\d+)-(\d+|X)$/.exec(location.hash);
var first = 0, last = 0;
if (r != null || /^#c\d+$/.test(location.hash)) {
	a = document.getElementById('forum').getElementsByTagName('a');
	for (var i = 1; i < a.length; ++i)
	 if (a[i].parentNode.tagName == "SPAN")
	  if (/^[^\/]+\/\/[^\/]+\/forum\/show\/\d+$/.test(a[i].href)) {
		var n = parseInt(a[i].href.substr(a[i].href.lastIndexOf('/') + 1));
		a[i-1].id = 'c'+ n;
		if (first == 0)
			first = n;
		last = n;
	}
	if (/^#c\d+$/.test(location.hash))
		location.hash = location.hash;
}
if (r != null) {
	var target = parseInt(r[1]);
	if (first <= target && target <= last) {
		location.replace(location.protocol +'//'+ location.host + location.pathname + location.search +'#c'+ target);
	}
	else {
		var s = location.search.replace(/(\?|&)(page)=[^&]+(?=(&|$))/g, '$1$3').replace(/(\?|&)&/g, '$1').replace(/(^\?)|(&$)/g, '');
		var pf = null, pt = null;
		if (r[3] == 'X') {
			var p = document.getElementById('paginator').getElementsByTagName('a');
			for (var w = p.length - 1; w > 0; --w)
			  if (/^\d+$/.test(p[w].innerHTML.trim())) {
				pt = parseInt(p[w].innerHTML.trim());
				break;
			}
			if (pt > 0)
				pf = 1;
		}
		else {
			pf = parseInt(r[2]);
			pt = parseInt(r[3]);
			if (target < first)
				pt = page - 1;
			else
				pf = page + 1;
		}
		if (pf != null && pf <= pt) {
			page = Math.round((pf + pt) / 2);
			location.replace(location.protocol +'//'+ location.host + location.pathname + s + ((s == '')? '?' : '&') +'page='+ page +'#find'+ target +'in'+ pf +'-'+ pt);
		}
	}
}
