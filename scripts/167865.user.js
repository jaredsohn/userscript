// ==UserScript==
// @name		Konachan/yande.re: Standard Thumbnail Resize
// @namespace	Zolxys
// @description	Shows larger thumbnails on all pages except comments and pool pages.
// @include	http://konachan.com/post
// @include	http://konachan.com/post?*
// @include	http://konachan.com/user/show/*
// @include	http://konachan.com/post/similar*
// @include	http://konachan.com/wiki/show*
// @include	http://konachan.net/post
// @include	http://konachan.net/post?*
// @include	http://konachan.net/user/show/*
// @include	http://konachan.net/post/similar*
// @include	http://konachan.net/wiki/show*
// @include	https://yande.re/post
// @include	https://yande.re/post?*
// @include	https://yande.re/user/show/*
// @include	https://yande.re/post/similar*
// @include	https://yande.re/wiki/show*
// @version	1.1
// ==/UserScript==
if (document.getElementById('post-list-posts') != null) {
	var a = document.getElementsByTagName('img'); // Searches from document instead of id 'post-list-posts' because that id occurs multiple times on the profile page.
	for (var i = 0; i < a.length; i++) {
		var c = 0;
		var d = a[i];
		while (d.id != 'post-list-posts') {
			d = d.parentNode;
			++c;
			if (d == null)
				break;
			if (c == 2 && d.nodeName != 'DIV')
				break;
			if (c == 4) {
				if (d.id != 'post-list-posts')
					break;
				a[i].parentNode.parentNode.style.height=((location.host == 'yande.re')? '300px' : '270px'); // div
				if (a[i].title != '') {
					a[i].parentNode.parentNode.parentNode.style.width='310px'; // li
					a[i].parentNode.parentNode.style.width='310px'; // div
					a[i].removeAttribute('width');
					a[i].removeAttribute('height');
				}
			}
		}
	}
}
document.getElementById('index-hover-overlay').firstElementChild.style.display = 'none';
