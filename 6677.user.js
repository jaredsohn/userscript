// ==UserScript==
// @name           Go to the Begin
// @author         Ceccon Francesco
// @namespace      http://
// @description    Add a link to go to begin of a web page
// @include        *
// ==/UserScript==

// Create link to the Begin

function create_go_up () {
if (document.body){
	var b = document.createElement('b');
	b.innerHTML = "Torna all'inizio";
	b.style.cssText = "opacity:0.7;position:fixed;text-align:right;right:0px;top:0px;z-index:50000;border:2px ridge #5c5c5c; background:#ccff00;font-size:9pt;font-family:arial,sans-serif;padding:3px;color:#fff;";
	b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
	b.addEventListener('mouseout', function(){ b.style.opacity = 0.7; }, false);
	b.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(b);
	}
};
if(self==top) create_go_up();



