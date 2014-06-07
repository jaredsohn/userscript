// ==UserScript==
// @name		Konachan/yande.re: Comments Thumbnail Resize
// @namespace	Zolxys
// @description	Shows larger thumbnails on the comments page.
// @include	http://konachan.com/comment*
// @include	http://konachan.net/comment*
// @include	https://yande.re/comment*
// @version	1.1
// ==/UserScript==
var ss = document.styleSheets[document.styleSheets.length - 1];
ss.insertRule('div#comment-list > div.post > div.col1 {width: 320px;}', ss.cssRules.length);
var a = document.getElementsByTagName('img');
for (var i = 0; i < a.length; i++)
 if (a[i].parentNode.parentNode != null)
  if (a[i].parentNode.parentNode.className == 'col1') {
	a[i].removeAttribute('width');
	a[i].removeAttribute('height');
}
