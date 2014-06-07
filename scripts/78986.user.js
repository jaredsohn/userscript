// ==UserScript==
// @name           qq Cloud IME
// @namespace      scottxp@126.com
// @description    qq Cloud IME
// @include        *
// ==/UserScript==

if(top.window!=self.window)
	return;
(function(q){!!q?q.toggle():(function(d,j){j=d.createElement('script');j.src='http://ime.qq.com/fcgi-bin/getjs';;j.setAttribute('ime-cfg','lt=2');d.getElementsByTagName('head')[0].appendChild(j)})(document)})(window.QQWebIME) 