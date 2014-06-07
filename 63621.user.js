// ==UserScript==
// @name           自动转向
// @namespace      auto.redirect
// @description    让Chrome在发帖后自动转向
// @include        http://www.hi-pda.com/forum/post.php*replysubmit=yes*
// ==/UserScript== 

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
var bigSection=getElementsByClass ("altbg1 bottom");
var str=bigSection[0].innerHTML;
lpos=str.indexOf ("<a href=\"viewthread.php?tid=")+9;
rpos=str.indexOf ("\">如果您的浏览器");
str=str.slice(lpos,rpos);
str=str.replace(/&amp;/g,"&");
location.href=str;