// ==UserScript==
// @name           Yahoo Baseball Show More Player Stats
// @description    Adds IP or AB to the big stats displayed at the top of baseball players' profile page
// @namespace      http://glenncarr.com/greasemonkey/yahoosports
// @include        *sports.yahoo.com/mlb/players/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 631 $
// $LastChangedDate: 2012-05-07 09:25:39 -0500 (Mon, 07 May 2012) $
// ==/UserScript==
/*

    Updates:
    20-Jun-2007 - Add ABs for hitters; Fix so that it works even with Yahoo slugs appended to the URL (;_ylt=...)
    23-Jun-2007 - Fix border color of new cells
    11-Jul-2007 - Added WHIP along with IP for relief pitchers
    11-Jul-2007 - Added number of ABs per HR/RBI/Runs/SB for hitters
    15-Jul-2007 - Handle division by zero
    16-Jul-2007 - Show hitter stats projected over 550 ABs
    19-Jul-2007 - Display age next to birth date; Shorten projection captions
    27-Jul-2007 - Display age all the time
    12-Aug-2009 - Fix to display age again.  Other stuff still broken.
    07-May-2012 - Fix age display.
*/

(function() {

// <strong>Born:</strong> <time itemprop="birthDate" datetime="1983-04-01">Apr  1, 1983</time> - Houston, TX

var timeElement = document.evaluate("//time[@itemprop='birthDate']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( timeElement.snapshotLength > 0 )
{
    timeElement = timeElement.snapshotItem( 0 );
    var birthdate = timeElement.innerHTML;
	var bdate = new Date();
	bdate.setTime( Date.parse( birthdate ) );
	GM_log( bdate );
	var today = new Date();
	var years = today.getFullYear() - bdate.getFullYear();
	var months = today.getMonth() - bdate.getMonth();
	if ( months < 0 )
	    years -= 1;
	months = (12 + months) % 12;
	var days = today.getDate() - bdate.getDate();
	if ( days < -15 )
	    months -= 1;
	var span = document.createElement( 'span' );
	span.innerHTML = '(' + years + '.' + months + ')';
	span.setAttribute( "id", "gncAge" );
	timeElement.parentNode.insertBefore( span, null );
	GM_addStyle( '#gncAge { font-weight: bold; color: yellow; padding-left: 1em }' );
}

var matches = location.href.match( /\?year=(\d+)/ );
if ( matches && parseInt( matches[ 1 ], 10 ) != (new Date()).getFullYear() )
    return;

if ( !/sports\.yahoo\.com\/mlb\/players\/\d+(\/gamelog(\?year=\d+)?)?($|;)/i.test( location.href ) )
    return;


var cellIndex = 2;
var statTitles = new Array();
var statValues = new Array();
statTitles.push( 'IP' );

var whip = null;
var bigStats = document.evaluate("//table[@class='yspwhitebg']//td[contains(., 'W-L')]/../..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( bigStats.snapshotLength == 0 )
{
    cellIndex = 1;
    statTitles = new Array();
    statTitles.push( 'AB' );
    bigStats = document.evaluate("//table[@class='yspwhitebg']//td[contains(., 'Avg')]/../..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( bigStats.snapshotLength == 0 )
        return;
}
else
{
    var bigWHIP = document.evaluate("//table[@class='yspwhitebg']//td[contains(., 'WHIP')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( bigWHIP.snapshotLength == 0 )
    {
        var whipCells = document.evaluate("//td[@class='yspdetailttl'][contains(., 'WHIP')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if ( whipCells.snapshotLength > 0 )
        {
            var tdWhip = whipCells.snapshotItem( whipCells.snapshotLength - 1 );
            var tbody = tdWhip.parentNode.parentNode;
            var year = (new Date()).getFullYear();
            for ( var i = 0; i < tbody.rows.length; i++ )
            {
                var tr = tbody.rows[ i ];
                if ( tr.cells[ 0 ].innerHTML.indexOf( year ) > 0 )
                {
                    statTitles.push( 'WHIP' );
                    whip = tr.cells[ tdWhip.cellIndex ].innerHTML;
                    break;
                }
            }
        }
    }
}

var statTotal = document.evaluate("//td[@class='yspscores']//b[contains(., 'Total')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( statTotal.snapshotLength == 0 )
    return;

GM_addStyle( '.gncPerStat { font-size: 12px; white-space: nowrap }' );

statValues.push( statTotal.snapshotItem( 0 ).parentNode.cells[ cellIndex ].innerHTML );
if ( whip != null )
    statValues.push( whip );

var tbody = bigStats.snapshotItem( 0 );

for ( var iStat = 0; iStat < statTitles.length; iStat++ )
{
    // Caption
    var td = document.createElement( 'td' );

    var existingCell = tbody.rows[ 0 ].cells[ 0 ];
    for ( var i = 0; i < existingCell.attributes.length; i++ )
        td.setAttribute( existingCell.attributes[ i ].name, existingCell.attributes[ i ].value );

    var nextToLastCell = tbody.rows[ 0 ].cells[ tbody.rows[ 0 ].cells.length - 2 ];
    tbody.rows[ 0 ].cells[ tbody.rows[ 0 ].cells.length - 1 ].setAttribute( "style", nextToLastCell.getAttribute( "style" ) );

    td.innerHTML = statTitles[ iStat ];
    tbody.rows[ 0 ].appendChild( td );

    // Value
    td = document.createElement( 'td' );
    var existingCell = tbody.rows[ 1 ].cells[ 0 ];
    for ( var i = 0; i < existingCell.attributes.length; i++ )
        td.setAttribute( existingCell.attributes[ i ].name, existingCell.attributes[ i ].value );

    td.innerHTML = existingCell.innerHTML;
    var div = td.getElementsByTagName( 'div' )[ 0 ];
    div.innerHTML = statValues[ iStat ];
    tbody.rows[ 1 ].appendChild( td );
}

if ( statTitles[ 0 ] == 'AB' )
{
    var TYPICAL_SEASON_ABS = 550;
    var ab = stripTags( statValues[ 0 ] );
    for ( var i = 0; i < tbody.rows[ 0 ].cells.length; i++ )
    {
        var tdCaption = tbody.rows[ 0 ].cells[ i ];
        var tdValue = tbody.rows[ 1 ].cells[ i ];
        if ( /^(hr|rbi|runs|sb)$/i.test( tdCaption.innerHTML ) )
        {
            var v = parseInt( stripTags( tdValue.firstChild.innerHTML ), 10 );
            var ab = parseInt( ab, 10 );
            tdValue.firstChild.innerHTML +=
            '<div class="gncPerStat">' + ( ab == 0 ? '-' : Math.round( v * TYPICAL_SEASON_ABS / ab ) )  + '</div>' +
            '<div class="gncPerStat">' + ( v == 0 ? '-' : ( ab / v ).toFixed( 1 ) ) + '</div>';
        }
        else if ( /^avg$/i.test( tdCaption.innerHTML ) )
        {
            tdValue.firstChild.innerHTML += '<div class="gncPerStat" style="text-align: right; padding-right: 5px">n / ' + TYPICAL_SEASON_ABS + ' :</div><div class="gncPerStat" style="text-align: right; padding-right: 5px">ABs / n :</div>';
        }
        else
        {
            tdValue.firstChild.innerHTML += '<div class="gncPerStat">&nbsp;</div><div class="gncPerStat">&nbsp;</div>';
        }
    }
}


function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}

})();