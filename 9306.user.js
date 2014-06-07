// ==UserScript==
// @name           Yahoo Fantasy Baseball Ad Remover
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Removes ad over the MLB scores, removes certain League Notes
// @include        *baseball.fantasysports.yahoo.com/*
// @include        http://sports.yahoo.com/mlb/recap*
// $LastChangedRevision: 85 $
// $LastChangedDate: 2007-05-29 14:58:14 -0500 (Tue, 29 May 2007) $
// ==/UserScript==
/*
   Updates:
   29-May-2007 - Changed include path to allow http://beta.
*/
var ad = document.getElementById( 'yspadLREC' );
if ( ad )
    ad.parentNode.removeChild( ad );

ad = document.getElementById( 'yspadREC' );
if ( ad )
    ad.parentNode.removeChild( ad );

ad = document.getElementById( 'yspadSKY' );
if ( ad )
    ad.parentNode.removeChild( ad );

var ads = document.evaluate(
    "//*[contains(@class, 'ad_slug_table')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( ads.snapshotLength > 0 )
{
    ad = ads.snapshotItem( 0 );
    var el = ad;
    do {
        el = el.parentNode;
    } while ( el.tagName != 'TABLE' );
}


// Determines which League Notes to remove
var reUnwanted = /who's the best\?\s+who are the rest\?/i;

var leagueNotes = document.getElementById( 'leaguenotes' );
var unwantedNotes = new Array();
if ( leagueNotes )
{
    var lis = leagueNotes.getElementsByTagName( 'LI' );
    var originalCount = lis.length;
    var removed = 0;
    for ( var i = 0; i < lis.length; i++ )
    {
        var li = lis[ i ];
        var liText = stripTags( li.innerHTML );
        if ( reUnwanted.test( liText ) )
            unwantedNotes.push( li );
    }
    if ( unwantedNotes.length == originalCount )
        leagueNotes.parentNode.removeChild( leagueNotes );
    else
    {
        for ( var i = 0; i < unwantedNotes.length; i++ )
            unwantedNotes[ i ].parentNode.removeChild( unwantedNotes[ i ] );
    }
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}