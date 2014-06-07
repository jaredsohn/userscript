// ==UserScript==
// @name	  Computerworld nyhedsbreve links til udskriftsudgave
// @version	  1.00
// @description	  Ændrer links så de linker direkte til udskriftsudgave af artiklen
// @author	  Flemming Thor Hansen a4@c.dk
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// @include	  http://*.mail.google.com/*
// @include	  https://*.mail.google.com/*
// ==/UserScript==

(function(){
var l = document.links;
	for ( var i = 0; i < l.length; i++ ) {
	   if ( l[i].href.match(/newsletter/) ) {
	   	l[i].href = l[i].href.replace(/a=newsletter.*$/, "op=print");
	   };
	};
}
)();

