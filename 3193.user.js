// ==UserScript==
// @name			delicious_blank
// @namespace		delicious_blank.user.js
// @description	Adds a target_blank to links so that they can open in a new tab and in the background (tabbrowser set appropriately)
// @include		http://del.icio.us/*
//
//	This is a more sophisticated version of Shayne Power's  (public.email.mule@xoxy.net) attempt for this same goal. Tha _blank tag is only addded to the links, and not to tags.
//	By Peter Sziebig (sziebig@gmail.com)
//
// ==/UserScript==
(function () {
var divTags = document.getElementsByTagName("h4");
for (i=0; i<divTags.length; i++) { 
		divTags[i].childNodes[0].target = "_blank";
}
})();