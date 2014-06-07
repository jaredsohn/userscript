// ==UserScript==
// @name        Bugzilla UX Improvement
// @namespace   http://gh4ck3r.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @include     https://bugzilla.mozilla.org/*
// @exclude
// @grant		None
// @version     1
// ==/UserScript==

$(document).ready(function(){
	// Make Comment controller floating
	var controller=$("ul.bz_collapse_expand_comments");
	var origControllerTop = Math.ceil(controller.offset().top);
	var controllerParent = controller.parent();
	var origPaddingTop = controllerParent.css('padding-top');
	$(document).scroll(function(){
		var newPaddingTop = $(window).scrollTop() - origControllerTop;
		controllerParent.css('padding-top',newPaddingTop>0?newPaddingTop:origPaddingTop);
	});
})
