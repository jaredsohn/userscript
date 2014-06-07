// ==UserScript==
// @name        Fairfax Media Article Limit Remover
// @namespace   http://userscripts.org/*
// @match     *://*.smh.com.au/*
// @match     *://*.theage.com.au/*
// @version     2.3
// @run-at		document-start
// @grant       GM_xmlhttpRequest
// ==/UserScript==


window.localStorage.clear();
max_retry = 10;

if((window.location.pathname.indexOf('/story-')>=0)&&(document.referrer.indexOf('google.co')<0)){
	window.stop();
	getPage();
}

function ajaxReq(url, callback){
	var count = 0;
	(function(){
		if(count++>10)
			return;
		delCookies();
		GM_xmlhttpRequest({
			method : "GET",
			url : url,
			headers : {
				Referer : "http://news.google.com/url?sa=" + rndStr()
			},
			onload : callback,
			ontimeout : arguments.callee,
			onerror : arguments.callee,
			timeout : 20000 - 17000 / count
		});
	})();
}

function getPage(){
	ajaxReq(window.location.href, function(response){
		document.documentElement.innerHTML = response.responseText;
	});
}

function rndStr(){
	var s = '';
	for(var i = 0, l = Math.random()*5+5; i<l; i++)
		s += String.fromCharCode(Math.floor(Math.random()*26) + 97);
	return s;
}

