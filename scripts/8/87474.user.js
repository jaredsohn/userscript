// ==UserScript==
// @name           QQ.Cloud.Input
// @namespace      QQ.Cloud.Input
// @version        1.3
// @description    QQ.Cloud.Input
// @match          http://*/*
// @match          https://*/*
// ==/UserScript==

if(self.innerWidth>500&&self.innerHeight>400){
	(function(q){
		q?q.toggle():(function(d,j){
			j=d.createElement('script');
			j.async=true;j.src='http://ime.qq.com/fcgi-bin/getjs';
			j.setAttribute('ime-cfg','lt=2&im=012');d=d.getElementsByTagName('head')[0];
			d.insertBefore(j,d.firstChild);
		})(document);
	})(window.QQWebIME);
}