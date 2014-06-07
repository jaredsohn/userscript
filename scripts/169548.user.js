// ==UserScript==
// @name           HNCache
// @namespace      http://www.techmonk.com
// @description    Adds a cache link to each of the links on HN page
// @include        https://news.ycombinator.com/*
// @include        http://news.ycombinator.com/*
// ==/UserScript==


(function foo() {

	var array = []; var i = 0; var j = 0; var append = []; 
	var cache = "http://www.google.com/search?q=cache:"
	var links = [];


	for(i = 0; i<60; i++) {
		if(i%2 != 0) {
			array[j] = document.getElementsByClassName('title')[i];
			j++;
		}
		n = j;
	}

	for(j =0; j<n; j++) {
		var subtext = document.getElementsByClassName('subtext')[j];
		var a = document.createElement('a');
		var linkText = document.createTextNode(" | Cache link");
		a.appendChild(linkText);
		a.title = "cache link";	
		a.target = "_blank"
		link = array[j].children[0];
		links[j] = link.href;
		links[j] = cache + links[j];
		a.href = links[j];
		subtext.appendChild(a);
	}

}) ();
