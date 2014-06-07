// ==UserScript==
// @name           phpBB Add Common Nav Links
// @description    Add navigation links to additional pages
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @include        *informationwarriors.net*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
/*
   Usage: You'll need to add your boards to the list of URLs @included by this script

   Updates:
   07-Jun-2007 - Added code to handle a (standard?) phpBB3 template
   21-Jun-2007 - Added 'Bookmarks' to phpBB3 links, and shortened text for others
   23-Aug-2007 - Changed @include
   16-Dec-2007 - Fix due to handle certain board mods
   17-Dec-2007 - Fix so that links only are added next to UCP link
   17-Dec-2007 - Fix so that links will be added if board hasn't been modified
   [Begin pwlk updates]
   24-Apr-2013 - Added unread posts link and modified for informationwarriosr.net
*/


(function() {

var forumlines = document.evaluate(
    "//*[contains(@class, 'forumline')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( forumlines.snapshotLength > 0 )
{
    phpBBv2x_addNavLinks();
    return;
}

var linkLists = document.evaluate(
    "//ul[contains(@class,'linklist')]/li[@class='icon-ucp']/..",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( linkLists.snapshotLength == 0 )
{
    linkLists = document.evaluate(
        "//ul[contains(@class,'linklist')]/li/a[@class='icon-ucp']/../..",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
}
if ( linkLists.snapshotLength > 0 )
{
    phpBBv3x_addNavLinks( linkLists );
    return;
}

function phpBBv3x_addNavLinks( linkLists )
{
    for ( var i = 0; i < linkLists.snapshotLength; i++ )
    {
        var li = linkLists.snapshotItem( i ).getElementsByTagName( 'li' )[ 0 ];
        if ( !/href="\.\/ucp\.php"/i.test( li.innerHTML ) && !/href="\.\/index\.php"/i.test( li.innerHTML ) )
            continue;

        li.innerHTML = li.innerHTML.replace( /\>view your posts\</i, '>Yours<' );

        if ( !/search.php\?search_id=egosearch/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="search.php?search_id=egosearch">Yours</a>';
        if ( !/search\.php\?search_id=newposts/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="search.php?search_id=newposts">New</a>'
        if ( !/search\.php\?search_id=unreadposts/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="search.php?search_id=unreadposts">Unread</a>'
        if ( !/search\.php\?search_id=active_topics/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="search.php?search_id=active_topics">Active</a>'
        if ( !/ucp.php\?i=main&mode=subscribed/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="ucp.php?i=main&mode=subscribed">Subscriptions</a>';
        if ( !/ucp.php\?i=main&mode=subscribed/i.test( li.innerHTML ) )
            li.innerHTML += ' &bull; <a href="ucp.php?i=main&mode=bookmarks">Bookmarks</a>';
    }
}


function phpBBv2x_addNavLinks()
{
    var LINKS = '<nobr><a class="gensmall" href="search.php?search_id=egosearch">View your posts</a></nobr><br/><nobr><a class="gensmall" href="search.php?search_id=newposts">View posts since last visit</a></nobr><br/>';

    var forum = forumlines.snapshotItem( 0 );
    var tbody = previousSiblingEx( forum );
    if ( /viewforum\.php\?f=/i.test( location.href ) )
    {
        var tr = tbody.getElementsByTagName( 'TR' )[ 1 ];
        var td = tr.cells[ tr.cells.length - 1 ];
        td.innerHTML = LINKS + td.innerHTML;
        tbody = nextSiblingEx( nextSiblingEx( forum ) );
    }
    else
    {
        var tr = tbody.getElementsByTagName( 'TR' )[ 0 ];
        var td = document.createElement( 'TD' );
        td.style.textAlign = "right";
        td.innerHTML = LINKS;
        tr.appendChild( td );
        tbody = nextSiblingEx( forum );
    }

    tr = tbody.getElementsByTagName( 'TR' )[ 0 ];
    var td = tr.cells[ tr.cells.length - 1 ];
    td.innerHTML = td.innerHTML.replace( /(all times are)/i, LINKS + '$1' );
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
})();