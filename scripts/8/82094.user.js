// ==UserScript==
// @name           lookByAuthor
// @namespace      lookByAuthor
// @include        http://*.tianya.cn/*
// @include        http://bbs.city.tianya.cn/*
// ==/UserScript==


window.addEventListener('load',function() {
	var V = unsafeWindow.V;
	var nereq = new RegExp("#ty_vip_look[" + unsafeWindow.chrAuthorName + "]" ,"g");
	V.lookByAuthor();
	topPage = V.$('pageDivTop');
	bottomPage = V.$('pageDivBottom');
	if ( !!topPage && !!bottomPage ) {
		if (!V.pageContentLog) V.pageContentLog = topPage.innerHTML;
	}
	if ( !!topPage && !!bottomPage ) {
		var pageContent = V.pageContentLog.replace(nereq,"");
		topPage.innerHTML = pageContent;
		bottomPage.innerHTML = pageContent;
	}
},true);
