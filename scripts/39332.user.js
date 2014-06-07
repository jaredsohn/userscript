// ==UserScript==
// @name          Todayhumor_anticlean firefox patch hsver.
// @namespace     http://blog.naver.com/bluelenz (hs)
// @description   anticlean
// @include       http://todayhumor.*
// @exclude       
// ==/UserScript==


// Remove cleanIMG
var all_img;
all_img = document.getElementsByTagName('img');
for(var i = 0; i<all_img.length; i++) {
	element = all_img[i];
	if(element.onLoad.match('www.zective.com')){
		element.parentNode.removeChild(element);
	}
}
