// ==UserScript==
// @name          GameFAQs Minimized II
// @description   Removes a lot of the unnecessary CNET crap on GameFAQs.com (keeps navigation)
// @include       http://*gamefaqs.com*
// ==/UserScript==
//
// By: psykr
// Last Update: 07/15/2006
// Modified: 16-March-2007 by XeroRestraint to restore platform navigation list


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


// header: remove grey toolbar at top
RemoveDIV( "gne_nav" );


// header: remove quicknav, platform list boxes
RemoveDIV( "quicknav" );
// **I liked the platform quicknav list so I'm commenting this section out [XeroRestraint]**
// RemoveDIV( "platformlist" );


// body: on search results pages, remove Sponsored Links / Matches
// body: remove side banner on right side of some pages
(function(){
    PodElems = document.getElementsByTagName( "iframe" );
    for( var i = 0; i < PodElems.length; i++ ) {
        CurrentIter = PodElems[i];
        // remove all IFRAMEs
        CurrentIter.src = "about:blank";
        CurrentIter.height = 0;
        CurrentIter.width = 0;
    }
   
    var AllElems = document.all ? document.all : document.getElementsByTagName( "div" );
    for( var i = 0; i < AllElems.length; i++ ) {
        if( AllElems[i].className == "adbox" )
            AllElems[i].setAttribute( "style", "display: none" );
    }  
})();

// footer: remove massive gray toolbar on bottom
RemoveDIV( "footer" );
