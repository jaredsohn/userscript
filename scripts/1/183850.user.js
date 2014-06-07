// ==UserScript==
// @name	Newscorp Paywall Reset
// @namespace	http://userscripts.org/*
// @description	Resets the article limit for Newscorp online content
// @match		http://www.news.com.au/*
// @match		http://www.theaustralian.com.au/*
// @match		http://www.dailytelegraph.com.au/*
// @match		http://www.heraldsun.com.au/*
// @match		http://www.couriermail.com.au/*
// @match		http://www.adelaidenow.com.au/*
// @match		http://www.perthnow.com.au/*
// @match		http://www.businessspectator.com.au/*
// @match		http://www.eurekareport.com.au/*
// @exclude		http://www.businessspectator.com.au/subscribe/*
// @exclude		http://www.eurekareport.com.au/subscribe/*
// @run-at		document-start
// @version		1.9
// @grant       GM_log
// @grant       GM_addStyle
// @grant		GM_xmlhttpRequest
// ==/UserScript==

timeout = 50, article = null;

switch(window.location.hostname) {
	case 'www.eurekareport.com.au':
	case 'www.businessspectator.com.au':
		preloadPremiumPage();
		checkPremium();
		break;
	default:
		delCookies();
		if((window.location.pathname.indexOf('/story-')>=0)&&(document.referrer.indexOf('google.co')<0)){
			window.stop();
			getPage();
		}
}

GM_addStyle(".mm-reveal.account-lightbox, .module.prm.prm-preview.prm-preview-, .bs-paywall-modal, body > .ui-widget-overlay, #aibm_channels_paywall_container, .mm-ribbon-container { display: none!important; }");

function checkPremium(){
	var nn = null, pageTitle = null;
	(function(){
		var ready = true;
		if(!pageTitle)
			pageTitle = document.getElementById('page-title');
		if(!article)
			ready = false;
		else
			if(pageTitle && (pageTitle.childElementCount==0))
				return article = null;
		if(!nn)
			nn = document.getElementById('aibm_channels_paywall_container');
		if(!nn)
			ready = false;
		if(!ready)
			return window.setTimeout(arguments.callee, timeout);
		nn.parentNode.insertBefore(article, nn);
		article = null;
	})();
};

function removeModalDialog(){
	var dialog = document.getElementById('bs-paywall-modal');	
	(function(){
		if(dialog.className.indexOf('ui-dialog-content')<0)
			return window.setTimeout(arguments.callee, timeout);
		unsafeWindow.jQuery(dialog).dialog('close');
	})();
}
	
observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if(mutation.target.id != 'bs-paywall-modal')
			return;
		removeModalDialog();
		observer.disconnect();
	});   
});
observer.observe(document.documentElement, { attributes: true, subtree: true } );

function preloadPremiumPage(){
	var nid_ = document.querySelector("link[rel='shortlink']");
	if(!nid_)
		return window.setTimeout(arguments.callee, timeout);
	var nid = nid_.href.split('/')[4];
	var url = window.location.protocol + '//' + window.location.host + '/print/' + nid;
	ajaxReq(url, function(res){
		div.innerHTML = res.responseText;
		article = div.querySelector('.field-body'), div = null;
	});
	var div = document.createElement('div');
}

function getPage(){
	ajaxReq(window.location.href, function(response){
		document.documentElement.innerHTML = response.responseText;
	});
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

function tld(){
	var d = window.location.hostname.split('.');
	d.splice(0, d.indexOf('com') - 1);
	return d.join('.');
}

function delCookies(){
	var ck = document.cookie.match ( '(^|;) ?([a-z0-9]{13})=([a-zA-Z0-9]{48})(;|$)' );
	if ( ck )
		document.cookie = ck[2] + "=;path=/;domain=" + tld() + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	document.cookie = "gr=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	document.cookie = "n_rme=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	document.cookie = "newskey=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
}

function rndStr(){
	var s = '';
	for(var i = 0, l = Math.random()*5+5; i<l; i++)
		s += String.fromCharCode(Math.floor(Math.random()*26) + 97);
	return s;
}
