// ==UserScript==
// @name          buzzurl-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   buzzurl.jpをスキップして元記事に飛ぶ
// @include       http://buzzurl.jp/entry/*
// ==/UserScript==
(function(){
	location.replace(location.href.replace(/^http:\/\/buzzurl\.jp\/entry\/(.*)/, '$1'));
})();