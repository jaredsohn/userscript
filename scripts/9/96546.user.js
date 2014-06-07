// ==UserScript==
// @name           Adultism
// @namespace      com.adultism.greasemonkey
// @description    Doesn't hide the image in adultism allowing you to save the image
// @include        http://*.adultism.com/*
// @version 0.5
// ==/UserScript==

function loadHook(e) {
	var dynImg=document.getElementById( "dyn_image" );
	if( !dynImg ) return;

	var getMatches = function(nodes, strg){

	  var matches = [],
	      len = nodes.length;

	  for( var i = 0; i < len; i++ ) {
	  	if( nodes[i].nodeType == 1 ) {
	    		if( nodes[i].className.indexOf(strg) > -1 ) matches.push(nodes[i]);
	    	}
	  }

	  // return an array of matches
	  return matches;
	}; 	

	var topChildren = dynImg.childNodes;
	var prel_mt8 = getMatches( topChildren, "mt8" );
	if( prel_mt8 && prel_mt8.length > 0 ) {
		var secondChildren = prel_mt8[0].getElementsByTagName( "div" );
		for( var i = 0; i < secondChildren.length; i++ ) 
			secondChildren[i].style.width="0px";
	}
}

function timering(e) {
	setTimeout( "loadHook()", 1000 );
}

window.addEventListener( "load", loadHook, false );
