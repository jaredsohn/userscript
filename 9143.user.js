// ==UserScript==
// @name           Yahoo Fantasy Baseball Matchups
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @include        http://baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 629 $
// $LastChangedDate: 2012-04-23 19:46:10 -0500 (Mon, 23 Apr 2012) $
// ==/UserScript==
/*
    Updates:
    25-Jun-2008 - Fixed bug that was showing incorrect hitter data, added current season stats vs L/RHP pitching
     8-Jul-2008 - Removed debug textarea
    21-Jul-2008 - Fixed placement of 'retrieving...' status text so that rows wouldn't expand/contract as much
    21-Jul-2008 - Instead of automatically displaying the matchup status, added 'Show Details' link
     1-Aug-2008 - Show which way hitter bats (L,R,S)
     9-Apr-2009 - Fixed to work with Yahoo 2009 changes
    29-Apr-2009 - Minor tweaks: display message if preview link is available, minor UI changes
    12-Jun-2009 - Now displays last week of stats for hitter
     9-Jul-2009 - Fixed intermittent bug causing most last week of stats to not be displayed
    23-Jul-2011 - FF5 issue fixed - changed variable 'class' to 'cls' (thanks schnitzl...@gmail.com); changed 'alert's to 'GM_log's
    23-Apr-2012 - Applied fixes by Mike S. due to changes in Yahoo's game preview.  Thanks, Mike!
*/
(function(){

if ( !/http:\/\/baseball\.fantasysports\.yahoo\.com\/.+\/.+/i.test( location.href ) )
    return;

var table = document.getElementById( 'statTable0' );
if ( table == null )
    return;
var commentHeader = document.evaluate( "//table[@id='statTable0']//tr[@class='headerRow1']/th/div[contains(.,'Comment')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( commentHeader.snapshotLength == 0 )
    return;
commentHeader = commentHeader.snapshotItem( 0 );
commentHeader.innerHTML += '&nbsp;&nbsp;&nbsp;<a style="font-weight:normal" href="#">Show Details</a>';

// Change this to L14 or whatever if you want something other than last week's stats
var recentStatsUrl = location.href.replace( /(.+\/[^\/]+\/\d+\/\d+\/).+/i, '$1team?stat1=S&stat2=L7' );

var linkInvoke = commentHeader.getElementsByTagName( 'a' )[ 0 ];
linkInvoke.addEventListener( 'click', function(e) {
    e.preventDefault();
    if ( /show/i.test( this.innerHTML ) )
    {
        this.innerHTML = 'Hide Details';
        showData();
    }
    else
    {
        this.innerHTML = 'Show Details';
        hideData();
    }
}, false );

// Adjust these per your preference
var MIN_BAD_ERA = 5.0;
var MAX_GOOD_ERA = 3.0;
var MIN_GOOD_BA = 0.3;
var MAX_BAD_BA = 0.2;

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var gSpan = document.createElement( 'span' );

var HITTER_HIGHLIGHT = GM_getValue("hitter_highlight_color", "#FFFFA5");
GM_setValue("hitter_highlight_color", HITTER_HIGHLIGHT);
var PITCHER_HIGHLIGHT = GM_getValue("pitcher_highlight_color", "#E0FFFF");
GM_setValue("pitcher_highlight_color", PITCHER_HIGHLIGHT);
var GOOD_STAT_STYLES = GM_getValue("good_stat_styles", "color: green; font-weight: bold;");
GM_setValue("good_stat_styles", GOOD_STAT_STYLES);
var BAD_STAT_STYLES = GM_getValue("bad_stat_styles", "color: red; font-weight: bold;");
GM_setValue("bad_stat_styles", BAD_STAT_STYLES);

GM_addStyle( '\
.gncMatchupHitter { border-bottom: solid 1px #eee; margin-bottom: 1px; position:relative }\
.gncGoodStat { ' + GOOD_STAT_STYLES + ' }\
.gncBadStat { ' + BAD_STAT_STYLES + ' }\
.gncStatus { color: #666680; font-style: italic; position:absolute; right:0px; background:#E0FFFF; padding:2px 2px; border:solid 1px black }\
.gncRecentStats { }\
.gncRecentStats TABLE TD { padding: 0px; font-size: 10px }\
#gncMatchupComment { background: #FFFFA5; color: #333; font-style: italic; white-space: normal }\
' );

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
    "0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
    "02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
    "136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
    "2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
    "%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
    "00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
    "4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
    "3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";


var origCells = new Array();
var newCells = new Object();

function hideData()
{
    try {
    for ( var i = 0; i < origCells.length; i++ )
        origCells[ i ].cell.innerHTML = origCells[ i ].innerHTML;
    } catch ( e ) { GM_log( 'hideData: ' + e.description ); }
}
    
function showData()
{
	var recentStatElements = {};
    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];
        var rowClass = row.getAttribute( "class" );
        if ( /^(even|odd)/i.test( rowClass ) )
        {
            var hitterLink = null;
            var hitterCell = null;
            var previewLink = null;
            var hitterAtHome = true;
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = cell.getAttribute( "class" );
                if ( /^player/i.test( cellClass ) )
                {
                    var links = cell.getElementsByTagName( 'a' );
                    if ( links.length > 0 )
                    {
                        hitterLink = links[ 0 ].href;
                        hitterCell = cell;
                    }
                }
                if ( /^gametime/i.test( cellClass ) )
                {
                    var links = cell.getElementsByTagName( 'a' );
                    if ( links.length > 0 )
                        previewLink = links[ 0 ].href.replace( /boxscore|recap/i, 'preview' );
                }
                else if ( /^opp/i.test( cellClass ) )
                {
                    hitterAtHome = !/\@/i.test( cell.innerHTML );
                }
                else if ( /^auto/i.test( cellClass ) )
                {
                    if ( newCells.hasOwnProperty( hitterLink ) )
                        cell.innerHTML = newCells[ hitterLink ];
                    else
                    {
                        origCells.push( { cell:cell, innerHTML:cell.innerHTML } );
                        
                        // Create an element just for the status message
                        var elStatus = document.createElement( 'span' );
                        elStatus.setAttribute( "class", "gncStatus" );
                        if ( previewLink != null )
                        	elStatus.innerHTML = 'Retrieving game preview data... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
                        else
                        	elStatus.innerHTML = 'Game preview link not available.';
                        	
						var elMatchup = document.createElement( 'div' );
						elMatchup.setAttribute( "class", "gncMatchupHitter" );
						elMatchup.appendChild( elStatus );

                        // Create an element for the hitters most recent stats
                        var elRecentStats = document.createElement( 'div' );
                        elRecentStats.setAttribute( "class", "gncRecentStats" );
                        elRecentStats.style.display = 'none';
                        elMatchup.appendChild( elRecentStats );
                        recentStatElements[ hitterLink ] = elRecentStats;

						cell.innerHTML = '<div id="gncMatchupComment">' + cell.innerHTML + '</div>';
						cell.insertBefore( elMatchup, cell.firstChild )

                        // Fetch game preview link, passing this cell to the callback
                        if ( previewLink != null )
                        {
							GM_xmlhttpRequest({
								method: 'GET',
								url: previewLink,
								onload: getGamePreviewInfoHandler( handlePreviewInfo, elStatus, elMatchup, hitterAtHome, hitterLink, hitterCell ),
								});
                        }
                    }
                }
            }
        }
    }
    try {
	GM_xmlhttpRequest({
		method: 'GET',
		url: recentStatsUrl,
		onload: getRecentStatsHandler( handleRecentStats, recentStatElements ),
		});
	} catch ( e ) { GM_log( 'GM_xmlhttpRequest recentStatsUrl: ' +  e ) }
}

function getRecentStatsHandler( responseHandler, recentStatElements )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, recentStatElements );
    }
}

function handleRecentStats( responseText, recentStatElements )
{
try {
	gSpan.innerHTML = responseText;
	var links = gSpan.getElementsByTagName( 'a' );
	var statCaptions = {};
	var captionsFound = false;
	for ( var iLink = 0; iLink < links.length; iLink++ )
	{
		var link = links[ iLink ];
		if ( /players\/\d+/i.test( link.href ) )
		{
			if ( recentStatElements.hasOwnProperty( link.href ) )
			{
				if ( !captionsFound )
				{
					var table = link;
					do
					{
						var table = table.parentNode;
					}
					while ( table != null && table.tagName != 'TABLE' );

					if ( table != null )
					{
						for ( var iCell = 0; iCell < table.rows[ 1 ].cells.length; iCell++ )
						{
							var cell = table.rows[ 1 ].cells[ iCell ];
							var cellClass = cell.getAttribute( "class" );
							var cellValue = cell.innerHTML.stripTags();
							if ( /^stat/i.test( cellClass ) && !/% started/i.test( cellValue ) )
							{
								statCaptions[ iCell ] = cellValue;
							}
						}
						captionsFound = true;
					}
				}
			
				var tr = link.parentNode.parentNode.parentNode;
				var html = 'Last week: ';
				var delim = '';
				for ( var iCell = 0; iCell < tr.cells.length; iCell++ )
				{
					var cellValue = tr.cells[ iCell ].innerHTML.stripTags();
					if ( statCaptions.hasOwnProperty( iCell ) )
					{
						if ( /^AVG/.test( statCaptions[ iCell ] ) )
							cellValue = formatHitterBattingAverage( cellValue );
						html += delim + cellValue + ' ' + statCaptions[ iCell ];
						delim = ', ';
					}
				}
				recentStatElements[ link.href ].style.display = '';
				recentStatElements[ link.href ].innerHTML = html;
			}
		}
	}
} catch ( e ) { GM_log( 'handleRecentStats: ' + e ); }
}

function getGamePreviewInfoHandler( responseHandler, elStatus, elMatchup, hitterAtHome, hitterLink, hitterCell )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elMatchup, hitterAtHome, hitterLink, hitterCell );
        else
            elStatus.innerHTML = 'Unable to retrieve game preview data';
    }
}

function handlePreviewInfo( responseText, elStatus, elMatchup, hitterAtHome, hitterLink, hitterCell )
{
	var PITCHER_HOME_OR_AWAY = hitterAtHome ? 'away' : 'home'; // pitcher's class name
	var regex = new RegExp( PITCHER_HOME_OR_AWAY, "i" );
	
	var wins = '';
	var losses = '';
	var era = '';
	var whip = '';
	var oppPitcher;
	
    gSpan.innerHTML = responseText;
	
	var divs = gSpan.getElementsByTagName( 'div' );
	for ( var iDiv = 0; iDiv < divs.length; iDiv++ ) {
	
		var id = divs[iDiv].getAttribute( "id" );
		if ( /^mediamodulemlbstartingpitchers/i.test( id ) )
		{
			var thPitchers = divs[iDiv].getElementsByTagName( 'th' );
			for (var iThPitchers = 0; iThPitchers < thPitchers.length; iThPitchers++)
			{
				var cls = thPitchers[iThPitchers].getAttribute( 'class' );		
				if ( regex.test( cls ) ) {
					oppPitcher = thPitchers[iThPitchers].getElementsByTagName( 'a' )[ 0 ];
					oppPitcher.removeChild(oppPitcher.firstChild);
				}
			}
			
			var trStats = divs[iDiv].getElementsByTagName( 'tr' );
			for ( var iTrStats = 0; iTrStats < trStats.length; iTrStats++ )
			{
				var tdStats = trStats[iTrStats].getElementsByTagName( 'td' );
				var currStatName = '';
				var currStatValue = '';
			
				for (var iTdStat = 0; iTdStat < tdStats.length; iTdStat++)
				{
					var tdStat = tdStats[iTdStat];
					var tdStatClass = tdStat.getAttribute( 'class' );
					if ( /^stat-name/i.test(tdStatClass) )
					{
						currStatName = tdStat.firstChild.innerHTML;
					}
					else if (regex.test(tdStatClass))
					{
						currStatValue = tdStat.innerHTML;
					}
				}
			
				switch (currStatName) 
				{
					case "W":
						wins = currStatValue;
						break;
					case "L":
						losses = currStatValue;
						break;
					case "ERA":
						era = currStatValue;
						break;
					case "WHIP":
						whip = currStatValue;
						break;
					default:
						break;
				}
			}	
	
			var elPitcherInfo = document.createElement( 'span' );
            elPitcherInfo.innerHTML =
            '<a href="' + oppPitcher.href + '">' + oppPitcher.innerHTML + '</a> ('
                + wins + '-' + losses
                + ', ' + era + ' ERA'
                + ', ' + whip + ' WHIP'
                + ')';
            elStatus.innerHTML = 'Retrieving opposing pitcher data... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
            GM_xmlhttpRequest({
                method: 'GET',
                url: oppPitcher.href,
                onload: getPitcherInfoHandler( handlePitcherInfo, elStatus, elMatchup, hitterAtHome, elPitcherInfo, hitterLink, hitterCell ),
                });
            return;
		}
	}
}

function getPitcherInfoHandler( responseHandler, elStatus, elMatchup, hitterAtHome, elPitcherInfo, hitterLink, hitterCell )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elMatchup, hitterAtHome, elPitcherInfo, hitterLink, hitterCell );
        else
            elStatus.innerHTML = 'Unable to retrieve opposing pitcher data';
    }
}

function handlePitcherInfo( responseText, elStatus, elMatchup, hitterAtHome, elPitcherInfo, hitterLink, hitterCell )
{
    gSpan.innerHTML = responseText;
    var divs = gSpan.getElementsByTagName( 'div' );
    var pitcherThrows = ''; // L or R
    for ( var iDiv = 0; iDiv < divs.length; iDiv++ )
    {
        var cls = divs[ iDiv ].getAttribute( "class" );
        if ( /^player-info/i.test( cls ) )
        {
            var div = divs[ iDiv ];
            var lis = div.getElementsByTagName( 'li' );
            for ( var i = 0; i < lis.length; i++ )
            {
                var li = lis[ i ];
                if ( /^throws/i.test( li.getAttribute( "class" ) ) )
                {
                    pitcherThrows = li.lastChild.nodeValue.stripTags();
                    elPitcherInfo.innerHTML = pitcherThrows + 'HP ' + elPitcherInfo.innerHTML;
                    break;
                }
            }
            break;
        }
    }

    //elPitcherInfo.appendChild( document.createElement( 'br' ) );
    elMatchup.appendChild( elPitcherInfo );

    elStatus.innerHTML = 'Retrieving basic hitter vs pitcher data... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
    var elHitterInfo = document.createElement( 'span' );
    GM_xmlhttpRequest({
        method: 'GET',
        url: hitterLink,
        onload: getHitterInfoHandler( handleHitterInfo, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows, hitterCell ),
        });
}

function getHitterInfoHandler( responseHandler, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows, hitterCell )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows, hitterCell );
        else
            elStatus.innerHTML = 'Unable to retrieve basic hitter vs pitcher data';
    }
}

function handleHitterInfo( responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows, hitterCell )
{
    // Get hitter's career numbers vs pitcher from main profile page
    var matches = responseText.match( /(Career\s+vs\s+<a[^>]+>[^<]+<\/a>)\s*<\/td>((?:\s*<td[^>]+>[^<]+<\/td>)+)\s*(?:<\/tr>)/mi );
    if ( matches )
    {
        var values = matches[ 2 ].split( /<\/td>\s*<td[^>]+>/i );
        var parts = new Array();
        parts.push( '<br/>' ); parts.push( matches[ 1 ] ); // Career vs [pitcher name]
		parts.push( ': ' ); parts.push( formatHitterBattingAverage( values[ 12 ], values[ 3 ], values[ 1 ] ) ); // Avg
		parts.push( ', ' ); parts.push( values[ 15 ] ); parts.push( ' OPS' );
		parts.push( ', ' ); parts.push( values[ 6 ] ); parts.push( ' HR' );
		parts.push( ', ' ); parts.push( values[ 7 ] ); parts.push( ' RBI' );
		parts.push( ', ' ); parts.push( values[ 8 ] ); parts.push( ' BB' );
		parts.push( ', ' ); parts.push( values[ 9 ] ); parts.push( ' K' );
		parts.push( ', ' ); parts.push( values[ 10 ] ); parts.push( ' SB' );
		parts.push( ', ' ); parts.push( values[ 11 ] ); parts.push( ' CS' );
    	elHitterInfo.innerHTML = parts.join( '' );
    }
    elMatchup.appendChild( elHitterInfo );
    
    var matches = responseText.match( /<li\s+class="bats">\s*<strong>\s*Bats:\s*<\/strong>\s*(\S+)<\/li>/mi );
    if ( matches )
    {
    	hitterCell.getElementsByTagName( 'div' )[ 0 ].innerHTML += ' (' + matches[ 1 ] + ')';
    }
    
    // Get hitter's career splits vs left/right-handed pitchers
    elStatus.innerHTML = 'Retrieving career hitter vs pitcher data... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
    var hitterSplitsLink = hitterLink + '/splits?year=career&type=Batting';
    GM_xmlhttpRequest({
        method: 'GET',
        url: hitterSplitsLink,
        onload: getHitterCareerSplitsInfoHandler( handleHitterCareerSplitsInfo, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows ),
        });
}

function getHitterCareerSplitsInfoHandler( responseHandler, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows );
        else
            elStatus.innerHTML = 'Unable to retrieve career hitter vs pitcher data';
    }
}

function handleHitterCareerSplitsInfo( responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows )
{
    var re = new RegExp( 'vs\\.?\\s+' + (pitcherThrows == 'L' ? 'Left' : 'Right') + '\\s*<\\/td>((?:\\s*<td[^>]+>[^<]+<\\/td>)+)\\s*(?:<\\/tr>)', "mi" );
    var matches = responseText.match( re );
    if ( matches )
    {
        var values = matches[ 1 ].split( /<\/td>\s*<td[^>]+>/i );
        elHitterInfo.innerHTML += '<br/>Career vs ' + pitcherThrows + 'HP: ' 
                               + formatHitterBattingAverage( values[ 13 ], values[ 4 ], values[ 2 ] ) // Avg
                               + ', ' + values[ 16 ] + ' OPS'
                               + ', ' + values[ 7 ] + ' HR'
                               ;
    }

    // Get hitter's current season splits vs left/right-handed pitchers
    elStatus.innerHTML = 'Retrieving current season hitter vs pitcher data... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
    var hitterSplitsLink = hitterLink + '/splits?type=Batting';
    GM_xmlhttpRequest({
        method: 'GET',
        url: hitterSplitsLink,
        onload: getHitterCareerSplitsInfoHandler( handleHitterSeasonSplitsInfo, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows ),
        });
}

function getHitterSeasonSplitsInfoHandler( responseHandler, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows );
        else
            elStatus.innerHTML = 'Unable to retrieve current season hitter vs pitcher data';
    }
}

function handleHitterSeasonSplitsInfo( responseText, elStatus, elMatchup, hitterAtHome, elHitterInfo, hitterLink, pitcherThrows )
{
    var re = new RegExp( 'vs\\.?\\s+' + (pitcherThrows == 'L' ? 'Left' : 'Right') + '\\s*<\\/td>((?:\\s*<td[^>]+>[^<]+<\\/td>)+)\\s*(?:<\\/tr>)', "mi" );
    var matches = responseText.match( re );
    if ( matches )
    {
        var values = matches[ 1 ].split( /<\/td>\s*<td[^>]+>/i );
        elHitterInfo.innerHTML += '; This year: ' // vs ' + (pitcherThrows == 'L' ? 'left' : 'right') + '-handers: ' 
                               + formatHitterBattingAverage( values[ 13 ], values[ 4 ], values[ 2 ] ) // Avg
                               + ', ' + values[ 16 ] + ' OPS'
                               + ', ' + values[ 7 ] + ' HR'
                               ;
    }
    elStatus.innerHTML = '';
    newCells[ hitterLink ] = elMatchup.parentNode.innerHTML;
    elStatus.style.display = 'none';
}

function formatHitterBattingAverage( avg, h, ab )
{
    var favg = parseFloat( avg );
    if ( typeof h == 'undefined' )
	    var displayAvg = avg;
	else
		var displayAvg = avg + ' (' + h + '/' + ab + ')';
    if ( favg >= MIN_GOOD_BA )
        return '<span class="gncGoodStat">' + displayAvg + '</span>'
    else if ( favg < MAX_BAD_BA )
        return '<span class="gncBadStat">' + displayAvg  + '</span>'
    return displayAvg;
}

})();