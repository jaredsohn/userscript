// ==UserScript==
// @name			Reverting href for YJ
// @version			1.1
// @author			DianthuDia
// @namespace		http://d.hatena.ne.jp/DianthuDia/20100603/1275529731
// @description		This script reverts href of <a>tag to the original.
// @include			http://search.yahoo.co.jp/*
// ==/UserScript==
( function() {
	const CONFIG = {
		IS_REDIRECT : true	// enable REDIRECT
	};

	const SEP = "%3A//";
	function remakeLink(e) {
		var aTags = Array.prototype.slice.call( document.getElementsByTagName('a') );
		aTags.forEach(function(aTag){
			var link = aTag.href;
			var lastIndexSEP = link.lastIndexOf(SEP);
			if(lastIndexSEP == -1) { return; }; // It's direct link
			
			aTag.href = decodeURIComponent(link.slice(lastIndexSEP-SEP.length+1));
			
			if(CONFIG.IS_REDIRECT) {
				var redirector = function(e){ (new Image).src = link; return true; };
				
				aTag.addEventListener("mousedown", redirector , false);	// Mouse input
				aTag.addEventListener("click", redirector, false);		// Keyboard input
			}
		});
	}
	
	window.addEventListener("DOMContentLoaded", remakeLink, false);
	window.addEventListener("load", remakeLink, false);
	window.addEventListener("scroll", remakeLink, false);	// for AutoPagerize
}) ();
