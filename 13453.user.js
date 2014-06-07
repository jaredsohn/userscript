// ==UserScript==
// @name           Footballguys Forum Collapse Quotes
// @namespace      http://glenncarr.com/greasemonkey/footballguys
// @description    Collapse forum quotes on footballguys.com
// @include        *forums.footballguys.com/forum/*
// $LastChangedRevision: 344 $
// $LastChangedDate: 2007-10-30 09:44:31 -0500 (Tue, 30 Oct 2007) $
// ==/UserScript==
(function() {

var quotes = document.evaluate( '//div[@class="quotemain"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i = 0; i < quotes.snapshotLength; i++ )
{
    var quoteDiv = quotes.snapshotItem( i );
    var wroteDiv = previousSiblingEx( quoteDiv );
    var a = document.createElement( 'a' );
    wroteDiv.innerHTML += '&nbsp;';
    wroteDiv.insertBefore( a, wroteDiv.lastChild.nextSibling );
    a.href = '#'
    a.innerHTML = '<b>...</b>';
    a.title = 'Show or hide quote';
    a.addEventListener( 'click', function(e) {
        e.preventDefault();
        var wroteDiv = nextSiblingEx( this.parentNode );
        wroteDiv.style.display = ( wroteDiv.style.display == 'none' ? '' : 'none' );
    }, false );

    // Don't hide outermost quote
    quoteDiv.style.display = ( parentTag( wroteDiv, 'DIV' ).getAttribute( "class" ) != 'quotemain' ) ? '' : 'none';
}

function previousSiblingEx( el )
{
    var p = el;
    do
        p = p.previousSibling;
    while (p && p.nodeType != 1);
    return p;
}

function nextSiblingEx( el )
{
    var p = el;
    do
        p = p.nextSibling;
    while (p && p.nodeType != 1);
    return p;
}

function parentTag( el, tagName )
{
    var p = el.parentNode;
    do
    {
        if ( p.tagName.toUpperCase() == tagName.toUpperCase() )
            return p;
        var p = p.parentNode;
    }
    while ( p != null );
}
})();
