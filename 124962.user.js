// ==UserScript==
// @name           jQuery Bugs Exchanger
// @namespace      http://www.jeroenvanwarmerdam.nl/
// @include        http://bugs.jquery.com/ticket/*
// ==/UserScript==

(function($){

	/* Make the missing repository links work */
	var repositoryUrl = "https://github.com/jquery/jquery/commit/";
	$(".missing.changeset").attr("href", function(){ return repositoryUrl + $(this).text(); });

})(unsafeWindow.jQuery);



//*** STATISTICS ***//
// Chars (exclude spaces): 474
// Chars (include spaces): 542
// Chars (Chinese): 0
// Words: 59
// Lines: 22