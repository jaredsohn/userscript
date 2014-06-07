// ==UserScript==
// @name        soitgo.es helper
// @namespace   http://soitgo.es
// @include     https://soitgo.es/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     2.5
// ==/UserScript==

$(document).ready(function()
{
	// Initial XXX hiding, do it no matter what
	$(".XXX").hide();

	// Covers both Firefox and Chrome implementations
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    // Fires when new DOM nodes are added
	    for(var i = 0; i < mutations[0].addedNodes.length; ++i)
	    {
	    	if ($(mutations[0].addedNodes[i]).hasClass('XXX'))
	    	{
	    		console.log("New XXX links detected and hidden")
	    		$(".XXX").hide();
	    		break;
	    	}
	    };
	});

	// define what element should be observed by the observer
	observer.observe(document, {
		subtree: true,
		childList: true
	});

});