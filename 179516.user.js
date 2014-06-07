// ==UserScript==
// @name        Pixiv New Works Nav Remover
// @namespace   foo
// @include     http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @version     1
// @grant       none
// ==/UserScript==


window.addEventListener('load', function (e) {onxxload();}, false);

function onxxload() {
	var nav = document.getElementsByClassName("sibling-items adjust")[0];
	nav.parentNode.parentNode.removeChild(nav.parentNode);
}

