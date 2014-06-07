// ==UserScript==
// @name          GDNet Ad Remover
// @description	  Removes some ads
// @author        psykr
// @include       http://*gamedev.net/*
// ==/UserScript==

// -- utility: remove div element by ID (CSS Hide)
function RemoveDIV( ElementID ) {
    elem = document.getElementById( ElementID );
    if( elem ) {
        // inline CSS formatting 
        elem.setAttribute( "style", "display: none" );
    }
}


// -- utility: remove element from DOM
function Remove( Element ) {
    Element.parentNode.removeChild( Element );
}


// head: remove top ad
RemoveDIV( "CM_AdContainer" );

// body: on forum pages, remove two icons on left
(function(){
    var AllTableCols = getElementsById( headsmall );
    Remove( AllTableCols[0] );
    Remove( AllTableCols[1] );  
})();
