// ==UserScript==
// @name           phpBBv3 Filter New Posts
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Allow filtering of new posts by forum
// @include        */search.php?search_id=newposts
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 269 $
// $LastChangedDate: 2007-08-08 19:47:22 -0500 (Wed, 08 Aug 2007) $
// ==/UserScript==
/*
   Updates:
   08-Aug-2007 - Bugfix
*/
(function() {

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var jumpbox = document.getElementById( 'f' );
if ( !jumpbox || jumpbox.name != 'f' )
    return;

var pageBody = document.getElementById( 'page-body' );
if ( !pageBody )
    return;

var div = document.createElement( 'div' );
div.innerHTML = 'Forum Filter: <select><option value="-1">(Show all new posts)</option></select>';
div.setAttribute( 'style', 'float: left; margin-top: 5px; align-vertical: middle' );

pageBody.insertBefore( div, pageBody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling );

var map = new Object();
var allTopics = document.evaluate("//ul[@class='topiclist']/li/dl/dt/a[contains(@href,'viewforum.php?f=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < allTopics.snapshotLength; i++ )
{
    var a = allTopics.snapshotItem( i );
    var forumId = a.href.replace( /^.*viewforum.php\?f=(\d+).*$/i, '$1' );
    map[ forumId ] = true;
}

var filter = div.getElementsByTagName( 'select' )[ 0 ];
for ( var i = 0; i < jumpbox.options.length; i++ )
{
    if ( !map.hasOwnProperty( jumpbox.options[ i ].value ) )
        continue;

    var option = document.createElement( 'option' );
    option.value = jumpbox.options[ i ].value;
    option.innerHTML = jumpbox.options[ i ].innerHTML.stripTags();
    filter.appendChild( option );
}

filter.addEventListener( 'change', function(e) {
    filterPosts( this );
    }, false );

function filterPosts( filter )
{
    var forumId = parseInt( filter.options[ filter.selectedIndex ].value, 10 );
    var forumName = filter.options[ filter.selectedIndex ].innerHTML;

    var allTopics = document.evaluate("//ul[@class='topiclist']/li/dl/dt/a/../../..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( var i = 0; i < allTopics.snapshotLength; i++ )
    {
        var li = allTopics.snapshotItem( i );
        var a = li.getElementsByTagName( 'dl' )[ 0 ].getElementsByTagName( 'dt' )[ 0 ].getElementsByTagName( 'a' )[ 0 ];
        li.style.display = ( forumId != -1 && !eval( '/\\?f=' + forumId + '\\b/' ).test( a.href ) ) ? 'none' : 'block';
    }
}

})();