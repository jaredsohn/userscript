// ==UserScript==
// @name           phpBB Add Return To Forum Link
// @description    Add 'Return to [forum]' link after adding/removing bookmark/subscription for phpBBv3 forum
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @include        *viewtopic.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 201 $
// $LastChangedDate: 2007-07-23 13:19:17 -0500 (Mon, 23 Jul 2007) $
// ==/UserScript==

(function() {

if ( /&f=\d+/i.test( location.href ) )
{
    var returnLinks = document.evaluate(
        "//a[contains(@href, 'viewtopic.php')][contains(., 'Return to the topic last visited')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    if ( returnLinks.snapshotLength > 0 )
    {
        var a = returnLinks.snapshotItem( 0 );
        var div = document.createElement( 'div' );
        var href = location.href.replace( /(^.+)viewtopic.php\?.*(f=\d+).*$/, '$1viewforum.php?$2' );
        var forumTitle = location.search.replace( /^.*ftitle=(.+)$/i, '$1' );
        div.innerHTML = '<a href="' + href + '">' + unescape( forumTitle ) + '</a><br/><br/>';
        a.parentNode.insertBefore( div, a );
        return;
    }
}

var links = new Array();
var subLinks = document.evaluate(
    "//a[contains(@class, 'icon-subscribe')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for ( var i = 0; i < subLinks.snapshotLength; i++ )
    links.push( subLinks.snapshotItem( i ) );
var bmLinks = document.evaluate(
    "//a[contains(@class, 'icon-bookmark')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for ( var i = 0; i < bmLinks.snapshotLength; i++ )
    links.push( bmLinks.snapshotItem( i ) );
    
if ( links.length == 0 )
    return;

var forumLinks = document.evaluate(
    "//a[contains(@href, 'viewforum.php?f=')][contains(.,'Return to')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( forumLinks.snapshotLength == 0 )
    return;

var forumQuery = forumLinks.snapshotItem( 0 ).href.replace( /^.+(f=\d+).*$/, '$1' );
var forumTitle = forumLinks.snapshotItem( 0 ).innerHTML;
for ( var iLink = 0; iLink < links.length; iLink++ )
{
    var a = links[ iLink ];
    a.href = a.href + '&' + forumQuery + '&ftitle=' + forumTitle;
}

})();