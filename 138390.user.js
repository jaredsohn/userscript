// ==UserScript==
// @name        NYT Article Limit Remover
// @namespace   http://userscripts.org/users/131241234
// @include     /^https?://[^/]*\.nytimes\.com/.*$/
// @include     http://*.nytimes.com/*
// @version     3.1
// @grant	GM_addStyle
// @grant	GM_log
// @grant	GM_xmlhttpRequest
// @run-at document-start
// ==/UserScript==


log = GM_log;
check_interval = 25, max_retry = 20, activeTime = 15000;

clearSettings();

waitFor('unsafeWindow.define', function(){
	unsafeWindow.define("auth/mtr", ["auth.mtr"], nil);
	unsafeWindow.define("auth/gateway", ['auth/gateway'], nil);
	unsafeWindow.define("auth/gateway/creatives", ['auth/gateway/creatives'], nil);
}); 

GM_addStyle('.applicationButtonLt, #gatewayCreative {display: none!important;}  #overlay {height:0px!important;} html, body {height: auto!important; overflow: visible!important;}');

if(window.location.search.indexOf("REFUSE_COOKIE_ERROR")>=0){
	try {
		window.location.href = "http://nytimes.com/" + window.location.search.match(/\/(.*)&/)[1];
	}
	catch(e){};
}

var nl = window.location.search.replace(/_r=\d+/g, "_r=0");
if(nl!=window.location.search)
	window.location.search = nl;

observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		for(var i = 0; i < mutation.addedNodes.length; i++)
			if(mutation.addedNodes[i].id=='overlay'){				
				observer.disconnect();
				scrapePage();
				return;
			}
	});
});

observer.observe(document, { childList: true, subtree: true } );
setTimeout( function(){ observer.disconnect(); }, activeTime );

waitFor(
	function(){
		return (article = document.querySelector('#article, #content, #story')) && (articleText = article.innerHTML) || document.getElementById('articleBody');
	},
	null, activeTime
);

function scrapePage(){
	if(document.getElementById('articleBody'))
		;
	else
		if(('articleText' in window) && articleText.length > 0)
			write(articleText);
		else
			getPage();
	//alert('scrapePage');
}

function write(text){
	/*var text = '';
	text_.split("\n").forEach(function(entry){
		text += entry.replace('script', 'noscript');
	});*/
	
	waitFor('article', function(){
		var div = document.createElement('div');
		var id = article.id;
		article.id = '';
		div.id = id;		
		div.innerHTML = text;
		article.style.display = 'none';
		article.parentNode.insertBefore(div, article);
		article.parentNode.removeChild(article);
	}, null, activeTime);
}

function getPage(){
	var retry = 0;
	(function getPage_(){
		if(retry++ < max_retry)
			GM_xmlhttpRequest({
				method: "GET",
				url: location.href,
				timeout: 20000 - 15000 / retry,
				onerror: arguments.callee,
				ontimeout: arguments.callee,
				onload: response
			});
	})();
}

function response(resp){
	var div = document.createElement('div');
	div.innerHTML = resp.responseText;
	write(div.querySelector('#article, #content, #story').innerHTML);
}

function waitFor(condition, callback, maxTime){
	var t = 0;
	if(typeof callback != 'function')
		var callback = function(){};
	(function(){
		if((typeof condition == 'function') && condition())
			return callback();
		if(typeof condition == 'string'){
			try {
				if(eval(condition))
					return callback();
			}
			catch(e){}		
		}
		if((typeof maxTime != 'undefined') && (t>= maxTime))
			return;
		t += check_interval;
		window.setTimeout(arguments.callee, check_interval);
	})();
}

function clearSettings(){
	document.cookie = "nyt-m=;path=/;domain=nytimes.com;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	unsafeWindow.localStorage.removeItem('nyt-m');
	unsafeWindow.name = '';
}

function nil(){	return null; }
