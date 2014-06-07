// ==UserScript==
// @name           phpBBv3 Highlight Your Topics
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Highlight topics you have created in a phpbb3 board with the standard template
// @include        */viewforum.php*
// @include        */search.php*
// @include        */ucp.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 406 $
// $LastChangedDate: 2008-02-20 00:22:22 -0600 (Wed, 20 Feb 2008) $
// ==/UserScript==
/*
    Updates:
    18-Sep-2007 - Fixed bug causing script not to work with usernames containing spaces.
    25-Sep-2007 - Fixed bug causing sent PM's to be highlighted.
    20-Feb-2008 - Highlight logged in user's name wherever it appears.
*/

(function() {

var logout = document.evaluate( '//li[@class="icon-logout"]/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( logout.snapshotLength == 0 )
    return;

var username = logout.snapshotItem( 0 ).innerHTML.replace( /&nbsp;/gi, '' ).replace( /.*\[\s+(.+)\s+\].*/i, '$1' );

GM_addStyle( '.gncMyName { background: #ffa !important; color: maroon !important; font-weight: bold; }' );

var myTopics = document.evaluate( '//dl[@class="icon"]/dt/a[.="' + username + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < myTopics.snapshotLength; i++ )
{
    var nameLink = myTopics.snapshotItem( i );
    var row = nameLink.parentNode.parentNode.parentNode;

    // Change attributes of topic row
    row.style.background = '#ddd';
}

// <a href="./memberlist.php?mode=viewprofile&u=28247" rel="nofollow">Bwanna</a>
var myNames = document.evaluate( '//a[contains(@href,"viewprofile")][.="' + username + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < myNames.snapshotLength; i++ )
{
    // Change attributes of your name
    var nameLink = myNames.snapshotItem( i );
    nameLink.setAttribute( "class", "gncMyName" );
}

})();