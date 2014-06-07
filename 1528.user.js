// ==UserScript==
// @name          Focus IMDB search
// @namespace     http://felixfamily.net/gm
// @description	  Focus the search box when IMDB loads.
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// @author        Michael Felix, gm@mfelix.allmail.net
// ==/UserScript==


(function() {
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++){
		if (inputs[i].name == 'for'){
			inputs[i].focus();
			return;
		}	
	}
})();

