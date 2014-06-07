// ==UserScript==
// @name		Swagbucks Redirector
// @namespace	Crazycatz00
// @description	Redirects Swagbucks. Only affects search.swagbucks.com!
// @icon		https://www.swagbucks.com/images/favicon.ico
// @downloadURL	https://userscripts.org/scripts/source/153182.user.js
// @updateURL	https://userscripts.org/scripts/source/153182.meta.js
// @match		*://search.swagbucks.com/*
// @grant       none
// @run-at      document-start
// @version		3.0.0
// @copyright	2013 Crazycatz00
// ==/UserScript==
(function(window){'use strict';
	var init=function(){
			var t='https://duckduckgo.com/?kp=-1&kh=1&kk=s&kb=v&kf=fw&kj=kt&ky=%23110F11&kx=g&k7=%23060506&k8=%23E1E1E1&kab=%23646464&kw=w&ke=-1&kv=1',captcha=document.getElementsByClassName('contCongrats').length!==0&&(document.getElementById('captchaImg')!==null||document.getElementsByName('captchaword').length!==0);
			if(document.getElementById('nonMemberBanner')!==null){window.open('https://search.swagbucks.com/p/login');}
			if(window.location.hash.search(/[#&]ClickFirst(?:=(.*))?$/)!==-1){
				if(RegExp.$1!==''){t=RegExp.$1;}
				else{t=window.jQuery('#searchResults h3>a[onmousedown]').first().prop('href');}
			}
			else if(window.location.search.search(/[?&]q=([^&]+)(?:&|$)/)!==-1){t+='&q='+RegExp.$1;}
			if(!captcha&&t.length!==0){
				window.stop();
				window.location.replace(t);
			}
		},poll=function(){if(document.readyState==='loading'&&document.getElementById('sponsoredLinks_Bottom')===null){setTimeout(poll,100);return;}init();};
	if(window.location.pathname.indexOf('/p/login')!==0){poll();}
}(typeof window.jQuery!=='function'&&typeof unsafeWindow!=='undefined'&&typeof unsafeWindow.jQuery==='function'?unsafeWindow:window));