// ==UserScript==
// @name           DDL Unframe
// @namespace      nord
// @description    Unframe download page.
// @version        0.1.0.7
// @include        http://warez.ag/download/*
// @include        http://www.primewire.ag/watch-*
// @include        http://www.primewire.ag/tv-*
// ==/UserScript==

(function(){
	var hostnameMatch = location.origin.match(/^(?:https?:\/\/)?(?:www\.)?((?:warez\.ag)|(?:primewire\.ag))/i);
	var hostname = hostnameMatch && hostnameMatch[1] && hostnameMatch[1].toLowerCase();
	if(!hostname) return;
	
	var getParam = function (name, url /* optional, default current location url */) {
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	  results = regex.exec(url || location.href);
	  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	
	var processWarezAgFn = function(){
		// look for all link
		// filtered by the one that has redirect action
		var watchLinks = document.querySelectorAll('a[href^="/redirect.php?"]');
		for(var i=0; i<watchLinks.length; i++) {
			var currentLink = watchLinks[i];
			var linkUrl = currentLink.getAttribute('href');
			var url = getParam('url', linkUrl);
			var url = unescape(url);
			currentLink.setAttribute('href', url);
		}
	};
	
	var processPrimeWireAgFn = function(){
		// look for all link
		// filtered by the one that has redirect action
		var watchLinks = document.querySelectorAll('a[href^="/external.php?"]');
		for(var i=0; i<watchLinks.length; i++) {
			var currentLink = watchLinks[i];
			var linkUrl = currentLink.getAttribute('href');
			var url64 = getParam('url', linkUrl);
			var url = atob(url64);
			currentLink.setAttribute('href', url);
		}
	};
	
	switch(hostname) {
		case 'warez.ag':
			processWarezAgFn();
			break;
			
		case 'primewire.ag':
			processPrimeWireAgFn();
			break;
	}
	
})();