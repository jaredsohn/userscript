// -*- coding: utf-8 -*-
//
// ==UserScript==
// @name          Google Cache Text Only Links
// @description   the google cache links in the search results link directy to the text only version
// @namespace     http://userscripts.org/users/161003
// @include       http://www.google.*/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// -WORKS WITH INSTANT!
// known BUGs
// -WORKS ONLY WITH FIREFOX!
// -if you open the link in the same tab the history.back will bring you back to an old search!!! [Instant only]
//

$(document).ready(function()
{
    function textOnly() {
	$("a[href^='http://webcache.googleusercontent.com']").each(function() {
			this.href = this.href+"&strip=1";
	});
    }

    //ajax
    $(document).bind('DOMSubtreeModified', function(e) {
	//if(e.target.id !== "")	alert(e.target.id);
	if ('foot' == e.target.id) {
	    textOnly();
		}
    });

    //legacy
    textOnly();
});