// ==UserScript==
// @name        Discuz Forum Blue Unread
// @description Blue Unread Hyperlink For Discuz Forum
// @namespace   code by http://blog.jtwo.me/
// @version     2013.11.26
// @include     http://bbs.aau.cn/*
// @include     http://bbs.open.qq.com/forum.php?*
// @include     http://bbs.caicai.qq.com/forum.php?*
// ==/UserScript==

(function () {
	hrefForum = document.location.href.indexOf("forum")
	hrefThread = 1; //document.location.href.indexOf("newthread")
	if ( (hrefForum != -1) && (hrefThread != -1) ) {
		var threadCss = document.createElement("style")
		threadCss.type = "text/css"
		threadCss.innerHTML = "a.xst:link {color:mediumblue;}"
		document.getElementById("threadlist").appendChild(threadCss)
	};
}());
