// ==UserScript==
// @name       facebook link tabber
// @namespace  http://www.facebook.com/
// @version    0.4.1 beta
// @description  Opens feed links into a new tab
// @include    http://*facebook.com/*
// @include    https://*facebook.com/*
// @copyright  2011+, Jason Arencibia
// @license    GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$(document).each('a[href^="http*://"]', function(i,e) { 
		e.attr({target: "_blank" });
	});
});