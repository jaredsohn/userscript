// ==UserScript==
// @name          Fullkomlig Idioti
// @namespace     http://instagib.wordpress.com
// @description	  Adds 'Vilket, sjävfallet, är fullkomlig idioti.' to the end of every paragraph on Swedish news sites.
// @include       http://news.google.se/*
// @include       http://www.svd.se/*
// @include       http://svt.se/2.105671/nyheter/*
// @include       http://expressen.se/*
// @include       http://www.aftonbladet.se*
// @include       http://www.sr.se/*
// @include       http://www.dn.se/*
// @include       http://www.nyhetsportalen.se/*
// @include       http://www.svenskanyheter.se/*

// ==/UserScript==s

(function() {
	paragraphs = document.getElementsByTagName( 'P' );

	for ( i=0; i<paragraphs.length; i++
){ 
		content = paragraphs[i].innerHTML; 
		content+= ' Vilket, sjävfallet, är fullkomlig idioti.'; 	
		paragraphs[i].innerHTML = content; 
	}
})();
