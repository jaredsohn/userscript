// ==UserScript==
// @name           Wiki
// @description    wiki patch
// @version        1.0
// @include        http://*.wikipedia.org/*
// @match          http://*.wikipedia.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

(function(window, undefined){
	function main(){
		$("#siteNotice").css({"display":"none"});
		$("#mw-head,#mw-panel,#footer,#catlinks,#firstHeading,#bodyContent,#mw-dismissable-notice").css({"display":"block"});
	}
	window.addEventListener('DOMContentLoaded', main, false);
})(window);