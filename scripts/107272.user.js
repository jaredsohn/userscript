// ==UserScript==
// @name           Google Result-Privacy
// @description    Removes the redirects from Google search results to prevent Google from tracking which links you clicked.
// @namespace      hege.cc/userscripts
// @include        *://www.google.tld/*
// @include        *://ipv6.google.tld/*
// the following entries are there, because .tld does not work in chrome
// @include        *://www.google.*/*
// @include        *://www.google.co.uk/*
// @include        *://www.google.com.hk/*
// @exclude        *://www.google.*/imgres?*
// @version        0.2
// ==/UserScript==
(function(){
	function process_links(links) {
		for( var i=0; i<links.length; ++i ){
			links[i].removeAttribute("onmousedown");
		}
	};

// for static search-pages
	process_links(document.links);

// when Google instant is active
	document.addEventListener('DOMNodeInserted', function(e){
		process_links(e.target.getElementsByTagName('a'));
		return true;
	}, false);
})();
