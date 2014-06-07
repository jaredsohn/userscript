// ==UserScript==
// @name           Maize - BBC Search Hack
// @namespace      http://www.bbc.co.uk/
// @description    Search the BBC website properly!
// @include        http://www.bbc.co.uk/*
// ==/UserScript==

function addStylesheet(url) {
	var head;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	head.appendChild(link);
}
// <script src="/cs/jst/mod/1/jst_core.v1.3.js" type="text/javascript"></script>

function addScript(url) {
	var head;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
}

(function() {
	addStylesheet('http://code.opencoding.net/bbc/maze.css');
	addScript("http://code.opencoding.net/bbc/script.js");
})();