// ==UserScript==
// @name           jumpNiCom
// @namespace      http://userscripts.org/users/strobolights
// @include        http://*.2ch.net/*
// @include        http://*.nicovideo.jp/*
// ==/UserScript==

(function(){
	document.body.innerHTML = document.body.innerHTML.replace(/([a-z]{2}[0-9]{5,6})\s/g,
	"<a href='http://ch.nicovideo.jp/community/$1'><img style='border-style:none;width:100px;height:100px;' src='http://icon.nimg.jp/community/s/$1.jpg'/></a>");
})();