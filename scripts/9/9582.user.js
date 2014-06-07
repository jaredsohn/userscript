// ==UserScript==
// @name           phpBB Collapse Quotes
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Collapse quotes within posts on a phpBB board
// @include        *viewtopic.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 96 $
// $LastChangedDate: 2007-05-31 12:50:45 -0500 (Thu, 31 May 2007) $
// ==/UserScript==
/*
   Updates:
   31-May-2007 - Initial version
*/
(function() {

var quotes = document.evaluate( '//td[@class="quote"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i = 0; i < quotes.snapshotLength; i++ )
{
    var quoteCell = quotes.snapshotItem( i );
    var wroteCell = previousSiblingEx( quoteCell.parentNode ).cells[ 0 ];
    var a = document.createElement( 'a' );
    wroteCell.innerHTML += '&nbsp;';
    wroteCell.insertBefore( a, wroteCell.lastChild.nextSibling );
    a.href = '#'
    a.innerHTML = '<b>...</b>';
    a.addEventListener( 'click', function(e) {
        e.preventDefault();
        var wroteCell = nextSiblingEx( this.parentNode.parentNode ).cells[ 0 ];
        wroteCell.style.display = ( wroteCell.style.display == 'none' ? '' : 'none' );
    }, false );

    // Don't hide outermost quote
    quoteCell.style.display = ( parentTag( wroteCell, 'TD' ).getAttribute( "colspan" ) == '2' ) ? '' : 'none';
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
