// ==UserScript==
// @name        Australian Financial Review Paywall Bypass
// @namespace   http://userscripts.org/*
// @include     /^https?://(\w+\.)?afr.com/.*$/
// @include     /^https?://(\w+\.)?afrsmartinvestor.com.au/.*$/
// @include     /^https?://(\w+\.)?misaustralia.com.au/.*$/
// @grant       GM_log
// @grant       GM_addStyle
// @grant		GM_xmlhttpRequest
// @run-at		document-start
// @version     2.0
// ==/UserScript==

ajaxReq('http://brw.com.au' + window.location.pathname, parseResponse);
div = document.createElement('div');
GM_addStyle(".locked-article, article.article > header, .subscribe-area { display: none!important; }");
max_retry = 10, timeout = 50, premium = true, auth = null;

document.addEventListener("DOMContentLoaded", function(event) {
    if(document.getElementsByClassName('locked-article').length==0)
		premium = false;
});

function parseResponse(resp){
	div.innerHTML = resp.responseText.replace('headline-image', 'image');
	for(var scripts = div.getElementsByTagName('script'), i = 0; i < scripts.length; i++)
		scripts[i].parentNode.removeChild(scripts[i]);
	for(var h2 = div.getElementsByTagName('h2'), i = 0; i < h2.length; i++)
		h2[i].className += " story_headline2 section-title";

	var text = div.querySelectorAll('.article > div.body');
	auth = div.querySelector('p.byline');
	div = null;
	(function(){
		if(premium == false)
			return;
		var la_ = document.querySelectorAll('.locked-article, article.article > header:first-of-type');
		if(la_.length==0)
			return window.setTimeout(arguments.callee, timeout);
			
		var t = document.querySelectorAll("#story_tools~div:not([id]), .span8 .content");
		for(var i = 0; i < t.length; i++)
			t[i].parentNode.removeChild(t[i]);

		var la = la_[0];
		for(var i = 0; i < text.length; i++)
			la.parentNode.insertBefore(text[i], la);
		la.parentNode.removeChild(la);
		postProcess();
	})();
}

function tld(){
	var d = window.location.host.split('.');
	return d.slice(d.indexOf('com')-1).join('.');
}

function postProcess(){
	switch (tld()) {
		case 'afr.com':
			document.getElementsByClassName("body")[0].id = 'story_content';
			if(auth){
				auth.className = 'editor_details';
				var p1 = document.querySelector("div.body > p");
				p1.parentNode.insertBefore(auth, p1);
			}
		break;
		case 'afrsmartinvestor.com.au':
			var image = document.querySelector('article .image');
			if(image){
				var figure = document.createElement('figure');
				figure.appendChild(image.getElementsByTagName('img')[0]);
				var caption = document.querySelector('article .image > p');
				if(caption){
					var figcaption = document.createElement('figcaption');
					figcaption.textContent = caption.textContent;
					figure.appendChild(figcaption);
				}
				image.parentNode.replaceChild(figure, image);
			}

			var b = document.querySelectorAll('.span8 .body');
			for(var i = 0; i < b.length; i++)
				b[i].className = 'content';			
		break;
	}

}

function ajaxReq(url, callback){
	var count = 0;
	(function(){
		if(count++ > window.max_retry)
			return;
		GM_xmlhttpRequest({
			method : "GET",
			url : url,
			onload : callback,
			ontimeout : arguments.callee,
			onerror : arguments.callee,
			timeout : 20000 - 17000 / count
		});
	})();
}
