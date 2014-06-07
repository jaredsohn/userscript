// --------------------------------------------------------------------
// ==UserScript==
// @name          devarticles.com no-popup print & pdf
// @namespace     tag:sessy@citromail.hu,2005-12-28:devarticlesGM
// @description	  Make the print & PDF popups normal links on devarticles.com
// @include       http://devarticles.com/*
// @include       http://www.devarticles.com/*
// ==/UserScript==
//
// Based on http://www.diveintogreasemonkey.org/casestudy/offsiteblank.html

var a, links;
links = document.getElementsByTagName('a');
for (var i = 0; i<links.length; i++) { 
	a = links[i]; 
	if(a.href.match(/task=view/)) {
		links[i].href = links[i].href.replace(/.*\(\'(.*?)\'.+$/,"$1");
	}
	if(a.href.match(/do_pdf=1/)) {
		links[i].href = links[i].href.replace(/.*\(\'(.*?)\'.+$/,"$1");
	}
}
