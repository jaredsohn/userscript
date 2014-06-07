// ==UserScript==
// @name           Sogou.Cloud.Input
// @namespace      Sogou.Cloud.Input
// @version        1.3
// @description    Sogou.Cloud.Input
// @match          http://*/*
// @match          https://*/*
// ==/UserScript==

if(self.innerWidth>500&&self.innerHeight>400){
	(function(){
		var e=document.createElement('script');
		e.setAttribute('src','http://web.pinyin.sogou.com/web_ime/init.js');
		document.body.appendChild(e);
	})();
}