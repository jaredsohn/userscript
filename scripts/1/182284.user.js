// ==UserScript==
// @name                Flatten the Web
// @description	        In some ways, a flat UI represents less information than one with depth.  The ultimate extension of this is this quick bookmarklet which can make many websites "flat" just by adding a bit of CSS
// @include		http://twitter.com/*
// @include		http://www.twitter.com/*
// @include		http://www.facebook.com/*
// @include		http://facebook.com/*
// @include		http://mail.google.com/*
// @exclude		*
// ==/UserScript==

var d = document.createElement('div');
d.innerHTML = '\
	<style>\
		*:not(.icon):not(i), *:not(.icon):not(i):after, *:not(.icon):not(i):before {\
			box-shadow: none !important;\
			text-shadow: none !important;\
			background-image: none !important;\
		}\
		*:not(.icon):not(i) {\
			border-color: transparent !important;\
		}\
	</style>\
';
document.body.appendChild(d);