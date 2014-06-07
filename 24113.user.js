// ==UserScript==
// @name          Zeit.de Single Page View
// @namespace     null
// @description   Redirect to the whole article on zeit.de
// @include       http://www.zeit.de/*
// ==/UserScript==

var eh = function eventHandler(e) {
	var pattern = /.*\/\d{4}\/\w{2}\/(?!bg-)[^?]*$|.*\d{4}-\d{2}\/(?!fs-|bg-)[^?]*$/;
	var el = e.target
	var href;
	
	while (el.nodeName != "A" && (el=el.parentNode) != null);
	if (el != null &&
	    (href = el.getAttribute("HREF")) != null &&
	    pattern.test(href)){
		el.setAttribute("HREF", href+"?page=all");
	}
}

window.addEventListener("click", eh, true);