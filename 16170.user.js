// ==UserScript==
// @name           InstantSwap
// @namespace      goglinstudios.com
// @description    instantly displays the file you get back from file-swap.com, and bypasses the copyright box
// @include        *file-swap.com/
// ==/UserScript==

//bypasses that annoying popup box by overriding the function
var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.text="function confirmUpload(){return true;}";
document.body.appendChild(script); 

//automaticly show the forum by setting the style
document.getElementById('uploading').style.display = 'none';

//automaticly show preview by searching through all links for the keywords and following the preview link
var links = document.getElementsByTagName( 'a' );
var element;
for ( var i = 0; i < links.length; i++ ) {
    element = links[ i ];
    if ( element.href.indexOf( "viewInIframe" ) != -1 ) {
	window.location = element.href
    }
}