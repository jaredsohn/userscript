// ==UserScript==
// @name           Wikipedia links in new tabs
// @namespace      http://jtymes.net
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

//set the url to the wikipedia version you use(default is english)
var myWiki = "en";
//grab all of the links
var links = document.getElementById('content').getElementsByTagName('a');
//if they start with the correct version, do some magic!
for(var i = 0; i < links.length; i++) {
	if(links[i].href.indexOf("http://"+myWiki+".wikipedia.org/wiki/") === 0 && links[i].href.indexOf(window.location) !== 0) {
		links[i].addEventListener('click', function( e ) {
			e.preventDefault();
			GM_openInTab(this.href);
		},
		false
		);
	}
}