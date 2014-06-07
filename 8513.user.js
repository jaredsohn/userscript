// ==UserScript==
// @name          Rom Hustler Slimdown
// @description   Removes a lot of the unnecessary lore from rom listings.
// @include       http://*romhusler.net*
// ==/UserScript==
//
// By: all code by psykr, hacked/stolen by mikezila
// Last Update: steak and potatos


// -- utility: remove div element by ID
function RemoveDIV( ElementID ) {
    elem = document.getElementById( ElementID );
    if( elem ) {
        // inline CSS formatting 
        elem.setAttribute( "style", "display: none" );
    }
}

// -- utility: check if url matches
function MatchURL( TargetRegex ) {
    return location.href.match( TargetRegex );
}

// -- utility: inject CSS code
function InjectCSS( CSSCode ) {
    head = document.getElementsByTagName( "head" )[0];
    if( head ) {
        style = document.createElement( "style" );
        style.setAttribute( "type", "text/css" );
        style.innerHTML = css;
        head.appendChild( style ); 
    }  
}


// remove annoying ass block of text.  I just want roms damnit!
RemoveDIV( "sysinfo" );
