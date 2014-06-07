// ==UserScript==
// @name           Google Footer Promo Remove
// @namespace      
// @description    Remove the footer_promos from google
// @include        *google*
// @author         Ray Logel
// ==/UserScript==

(function() {
    
var node = document.getElementById( 'footer_promos' );
node.parentNode.removeChild( node );

node = document.getElementById( 'footerwrap' );
node.parentNode.removeChild( node );})();
