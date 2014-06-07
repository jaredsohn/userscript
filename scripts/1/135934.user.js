// ==UserScript==
// @name		Neat!
// @namespace		Facebook
// @description		Make the 'Like' text on Facebook say 'Neat!' instead.
// @include		http*://*.facebook.com/*
// @include		http*://facebook.com/*
// @run-at		document-start
// ==/UserScript==

var ran = false;
var classes = new Array();
classes.push( 'like_link stat_elem as_link' );
classes.push( 'stat_elem as_link cmnt_like_link' );

function Neatify( node ) {
	
	var buttons = node.getElementsByTagName('button');
	
	for ( n = 0; n < classes.length; n++ ) {
		var pattern = new RegExp("(^|\\s)"+classes[n]+"(\\s|$)"),
			Likes = new Array();
		
		for ( i = 0; i < buttons.length; i++ ) {
			if ( pattern.test( buttons[i].className ) ) {
				if ( !buttons[i].hasAttribute( 'FoundNeat' ) )
				{
					if ( buttons[i].innerHTML == '<span class="default_message">Like</span><span class="saving_message">Unlike</span>' ) {
						buttons[i].innerHTML = '<span class="default_message">Neat!</span><span class="saving_message">Uninteresting.</span>'
					} else if ( buttons[i].innerHTML == '<span class="default_message">Unlike</span><span class="saving_message">Like</span>' ) {
						buttons[i].innerHTML = '<span class="default_message">Uninteresting.</span><span class="saving_message">Neat!</span>'
					}
					
					buttons[i].setAttribute( 'title', 'Neat!' );
					buttons[i].setAttribute( 'FoundNeat', true );
				}
			}
		}
	}
}

function listen(evt)
{
	var node = evt.target;

	if ( node.nodeType == document.ELEMENT_NODE ) {
		document.body.removeEventListener( 'DOMNodeInserted', listen, false );
		Neatify( ran?node:document );
		if ( !ran ) { ran = true; }
		document.body.addEventListener( 'DOMNodeInserted', listen, false );
	}
	
}

document.body.addEventListener( 'DOMNodeInserted', listen, false );