// ==UserScript==
// @name           blogs.msdn.com-comment-hash-scrollTo
// @version        0.0
// @namespace      http://userscripts.org/users/484734
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description    Support scrolling down to comments loaded by JavaScript on blogs.msdn.com which is broken on most things other than IE.
// @include        http://blogs.msdn.com/b/*
// @include        https://blogs.msdn.com/b/*
// ==/UserScript==
this.jQuery = jQuery.noConflict(true);
// scope is to “this”? Hopefully
jQuery(window).load(function() {
    if (location.hash && location.hash.length > 1)
    {
	var elem = jQuery(location.hash + ', *[name="' + String(location.hash).substring(1) + '"]')[0];
	elem = elem.wrappedJSObject || elem;
	elem.scrollIntoView();
    }
});
