// ==UserScript==
// @name           Brand New - linkable comments
// @namespace      b0at.tx0.org
// @include        http://www.underconsideration.com/brandnew/*
// ==/UserScript==

var $spans = document.getElementsByTagName("span");
var $static_count = 0;

// add fragment identifiers, links
	
Array.prototype.forEach.apply($spans, [function($span) {
	if( $span.className != "head" ) return; // so far, this comparison is reliable

	var $id = "comment_" + (++$static_count);
	$span.setAttribute("id", $id);
	
	var $link = document.createElement("a");
	$span.insertBefore($link, $span.firstChild);
	$link.href = "#" + $id;
	$link.appendChild(document.createTextNode("#"));

	// style -- or use custom css (e.g., with Stylish)
	$link.className = "GM_b0at-tx0-org_brand-new-linkable-comments";
	GM_addStyle("a.GM_b0at-tx0-org_brand-new-linkable-comments { font-size: 50% !important; float: right !important; }");
}]);


// go to link, which didn't exist when the page finished loading

// recipe for infinite loop, duh
//location.hash = location.hash;

// 20071009
