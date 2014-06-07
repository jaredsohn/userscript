// ==UserScript==
// @name           Failed-To-Process-Ponychan
// @namespace      http://userscripts.org/users/430392
// @include        http://www.ponychan.net/chan/board.php
// ==/UserScript==
if (document.getElementsByTagName('h1')[0].innerHTML.indexOf('Error') != -1)
{
	var e = document.getElementsByTagName('h1')[0]
	var imgURL = 'http://i.imgur.com/96GGf.jpg';
	e.innerHTML = ('<img src="' + imgURL + '" style="position:relative;display:block;margin-left:auto;margin-right:auto;">');
}