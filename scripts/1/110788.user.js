// ==UserScript==
// @name           EFF +1
// @namespace      com.maltera
// @description    Adds a Google +1 button to the social icons section of EFF articles.
// @include        https://www.eff.org/deeplinks/*
// ==/UserScript==

// create the +1 button element
var button = document.createElement( 'g:plusone' );
button.setAttribute( 'size', 'small' );
button.setAttribute( 'count', false );

// append the button to the social icons area
var container = document.getElementById( 'social-icons' );
container.appendChild( button );

// create a script element to load the +1 widget JavaScript
var script = document.createElement( 'script' );
script.src   = 'https://apis.google.com/js/plusone.js';
script.type  = 'text/javascript';

// find or create the document's head element
var head = document.getElementsByTagName( 'head' )[ 0 ];
if (!head) {
    head = document.createElement( 'head' );
    document.documentElement.insertBefore( head, document.body );
}

// add the script tag at the end of the head
head.appendChild( script );
