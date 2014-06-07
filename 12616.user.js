// ==UserScript==
// @name           ArsTechnica Forums: linkable posts
// @namespace      b0at.tx0.org
// @description    Fix links to post ids that don't exist. Posts have ids of the form "post_somenumbers", but links (the icons of a page on each post) only have the numbers. This script enables you to finally mark your place in the page.
// @include        http://episteme.arstechnica.com/*
// ==/UserScript==

(function(){
	var $pattern = /^.*#(\d+)$/; // only leave the id in the end!

	var $as = document.links;
	for(var $i=0; $i<$as.length; $i++) {
		var $a = $as[$i];
		var $m = $a.href.match($pattern);
		if( $m && document.getElementById('post_'+$m[1]) ) {
			$a.href = $a.href.replace($pattern, "#post_$1");
		}
		
		// noisy debug
		/*
		else { GM_log("DEBUG 001: "+$a.href); }
		*/
	}

})(); // 20070928