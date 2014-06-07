// ==UserScript==
// @name          ceronjp-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   ceron.jpをスキップして元記事に飛ぶ
// @include       http://ceron.jp/*
// ==/UserScript==
(function(){
	location.replace(location.href.replace(/^http:\/\/ceron\.jp\/url\/(.*)/, 'http://$1'));
})();
