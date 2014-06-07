// ==UserScript==
// @name          Unity3D Documents Link Fixer
// @namespace     http://userscripts.org/scripts/show/173987
// @description	  Remove the onclick loadPage() on links
// @author        S1M0N
// @include       http://docs.unity3d.com/Documentation/*
// @grant       none
// ==/UserScript==

$( 'a[onclick^="loadPage"]' ).each(function(){
	var $link = $(this);
	var title = /loadPage\('([\S]+)'\); return false;/.exec( $link.attr("onclick"));

	if ( title && title.length > 1 ) {
		$link.attr("href", title[1]+".html")
		     .removeAttr('onclick');
	}
});