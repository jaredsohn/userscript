// ==UserScript==
// @name           Highlight starred submissions on any page
// @namespace      http://ttam.org/reddit/
// @description    Does what it says...
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// @exclude        http://reddit.com/r/iama/*
// @exclude        http://www.reddit.com/r/iama/*
// ==/UserScript==

(function(){
	var head = document.getElementsByTagName( 'head' )[0];         
	var css = document.createElement( 'link' );
	css.rel = 'stylesheet';
	css.type = 'text/css';
	css.href = 'http://ttam.org/reddit/cache/css.css';
	head.appendChild( css );
})();