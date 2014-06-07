// ==UserScript==
// @name	Dagbladet nattkommentarer
// @version 0.2
// @include	https://www.dagbladet.no/*
// @include	http://www.dagbladet.no/*
// ==/UserScript==

var kommentarer = (document.getElementById('kommentarer') || document.getElementsByClassName('comments')[0]);

if(typeof kommentarer !== "undefined" && kommentarer != null && kommentarer.innerHTML.match(/Vi holder imidlertid stengt/i)){
	kommentarer.innerHTML = '<div id="disqus_thread"></div>';

	var ide = document.createElement('script');
	ide.type = 'text/javascript';
	ide.async = true;
	ide.innerHTML = "var disqus_identifier = '" + window.location.href.match(/\/(\d+)\/$/)[1] + "';";
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ide);

	var dsq = document.createElement('script');
	dsq.type = 'text/javascript';
	dsq.async = true;
	dsq.src = '//dbno.disqus.com/embed.js';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}