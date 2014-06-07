// ==UserScript==
// @name           phpBBv3 Show Old Posts
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Shows posts older than 24 hours
// @include        *viewforum.php*
// $LastChangedRevision: 421 $
// $LastChangedDate: 2008-03-17 09:25:58 -0500 (Mon, 17 Mar 2008) $
// ==/UserScript==

/*
   This requires that your current phpBBv3 displayed date format (configurable in your UCP) be parseable by Date.parse()
   
   Updates:
   17-Mar-2008  Correctly skips cells without a date
*/
(function(){

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var boardHome = document.evaluate( "//a[contains(@href, 'index.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
if ( boardHome.snapshotLength == 0 )
    return;

boardHome = boardHome.snapshotItem( 0 );

GM_xmlhttpRequest({
    method: 'GET',
    url: boardHome.href,
    onload: function( responseDetails )
    {
        var lastPosts = document.evaluate( "//dd[@class='lastpost']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        if ( lastPosts.snapshotLength == 0 )
            return;

        var currDateTime = responseDetails.responseText.match( /<p>It is currently ([^<]+)<\/p>/ )[ 1 ];
        var dt = new Date();
        var msCurrent = Date.parse( currDateTime );

        for ( var iLastPost = 1; iLastPost < lastPosts.snapshotLength; iLastPost++ )
        {
            var lastPost = lastPosts.snapshotItem( iLastPost );
            var m = lastPost.innerHTML.stripTags().match( /on (.*$)/i );
            if ( !m )
                continue;
            m = m[ 1 ];
            var msPost = Date.parse( m );
            var msDiff = msCurrent - msPost;
            var hoursDiff = msDiff / 1000 / 60 / 60;
            if ( hoursDiff >= 24.0 )
            {
                lastPost.style.background = '#ddd';
            }
            else
            {
                var hoursLeft = 24 - hoursDiff;
                var hours = Math.floor( hoursLeft );
                var min = ( '0' + Math.floor( ( hoursLeft - hours ) * 60 ) ).match( /(\d{2})$/ )[ 1 ];
                lastPost.getElementsByTagName( 'span' )[ 0 ].innerHTML += ' (' + hours + ':' + min + ')';
                if ( hoursDiff > 23.0 )
                {
                    lastPost.style.background = '#f90';
                }
                else if ( hoursDiff > 22.0 )
                {
                    lastPost.style.background = '#ff3';
                }
                else if ( hoursDiff > 21.0 )
                {
                    lastPost.style.background = '#ff6';
                }
                else if ( hoursDiff > 20.0 )
                {
                    lastPost.style.background = '#ff9';
                }
                else if ( hoursDiff > 12.0 )
                {
                    lastPost.style.background = '#ffb';
                }
            }
        }
    },
    });

})();