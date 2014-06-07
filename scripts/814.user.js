// ==UserScript==
// @name			SearchNewTab
// @namespace		http://power.gq.nu/searchnewtab.user.js
// @description	Adds a target_blank to gmail and delicious links so that they can open in a new tab and in the background (tabbrowser set appropriately)
// @include		http://del.icio.us/*
// @include         	http*://*.google.*/*
//
//				I always open google and del.icio.us links in new tabs. With this script, it saves me from having to right-click and
//				"open in new tab". (Have to use the tabbrowser extension and have it set up properly though...
//
//				One major problem though: it adds the target to the tag links in delicious too, so if I wanted to navigate through
//				my tags I would open a whole jungle of tabs!! I have never used js before, I only copied most of this script from 
//				the killtarget.user.js at http://meddle.dzygn.com/eng/weblog/destroy.target/, and I don't know regexp, so I'm stuck
//				What I picture is to make the if statement exclude links that start with htt://del.icio.us, but I don't know how!!
//				
//				Any help would be appreciated: public.email.mule@xoxy.net (Shayne Power)
//
// ==/UserScript==
(function () {
	var external = document.links;
	for (var k=0; k<external.length; k++){
		if (external[k].href) {
			external[k].target = "_blank";
		}
	}
})();