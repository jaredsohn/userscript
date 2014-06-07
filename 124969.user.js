// ==UserScript==
// @name		Me Gusta
// @namespace		Facebook
// @description		Make the 'Like' text on Facebook say 'Me Gusta' instead.
// @include		http*://*.facebook.com/*
// @include		http*://facebook.com/*
// @run-at		document-start
// ==/UserScript==

var ran = false;
var classes = new Array();
classes.push( 'like_link stat_elem as_link' );
classes.push( 'stat_elem as_link cmnt_like_link' );

function me_gustafy( node ) {
	
	var buttons = node.getElementsByTagName('button');
	
	for ( n = 0; n < classes.length; n++ ) {
		var pattern = new RegExp("(^|\\s)"+classes[n]+"(\\s|$)"),
			Likes = new Array();
		
		for ( i = 0; i < buttons.length; i++ ) {
			if ( pattern.test( buttons[i].className ) ) {
				if ( !buttons[i].hasAttribute( 'gustad' ) )
				{
					if ( buttons[i].innerHTML == '<span class="default_message">Like</span><span class="saving_message">Unlike</span>' ) {
						buttons[i].innerHTML = '<span class="default_message">Me Gusta</span><span class="saving_message">No Me Gusta</span>'
					} else if ( buttons[i].innerHTML == '<span class="default_message">Unlike</span><span class="saving_message">Like</span>' ) {
						buttons[i].innerHTML = '<span class="default_message">No Me Gusta</span><span class="saving_message">Me Gusta</span>'
					}
					
					buttons[i].setAttribute( 'title', 'Me Gusta this.' );
					buttons[i].setAttribute( 'gustad', true );
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
		me_gustafy( ran?node:document );
		if ( !ran ) { ran = true; }
		document.body.addEventListener( 'DOMNodeInserted', listen, false );
	}
	
}

document.body.addEventListener( 'DOMNodeInserted', listen, false );