// ==UserScript==
// @name        NDR No Slimbox Animation
// @namespace   http://userscripts.org/scripts/show/50826
// @include		http://navratdoreality.cz/*
// @version     1
// ==/UserScript==

jQuery(function($) {
	$("a[rel^='lightbox']").unbind("click");
	$("a[rel^='lightbox']").slimbox({
	    resizeDuration: 0,
	    imageFadeDuration: 0,
	    captionAnimationDuration: 0
	}, null, function(el) {
		return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
	});
});