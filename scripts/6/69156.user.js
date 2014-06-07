// ==UserScript==
// @name juick.meonicons
// @description Пытается добавить favicon во все ссылки "Me on..."
// @namespace http://juick.com
// @include http://juick.com/*
// ==/UserScript==

var meonlinks = document.getElementsByClassName("meonico");

for(var i = 0, n = meonlinks.length; i < n; i += 1){
	if(meonlinks[i].style.backgroundPosition === "0pt 32px" || meonlinks[i].style.backgroundPosition === "0px 32px"){
		meonlinks[i].style.background = "url(http://www.google.com/s2/favicons?domain_url=" + encodeURI(meonlinks[i].href) + ")";
		meonlinks[i].style.backgroundRepeat = "no-repeat";
	}
}