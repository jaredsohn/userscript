// ==UserScript==
// @name           Lepra More Posts Autoloader
// @namespace      http://userscripts.org/users/splurov
// @description    Автоматически подгружает посты под «Ещё? Ещё!» при достижении конца страницы.
// @include        http://*leprosorium.ru/*
// ==/UserScript==

var lmpObj = document.getElementsByClassName('load_more_posts');
if (lmpObj && lmpObj[0]) {
	lmpObj = lmpObj[0];
	var timeout = null;
	window.addEventListener('scroll', function(){
		if (lmpObj.className.indexOf('js-loading') == -1 && window.pageYOffset + document.body.clientHeight + 500 > findPos(lmpObj)[1]) {
			unsafeWindow.morePostsHandler.load(lmpObj);
		}
	}, false);
}

// (c) ppk, http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}