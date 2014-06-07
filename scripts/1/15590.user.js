// ==UserScript==
// @name           Yahoo Football Matchups
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @include        *football.fantasysports.yahoo.com/*
// @description    Display opposing defensive team passing or rushing rankings for Yahoo fantasy football leagues
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 549 $
// $LastChangedDate: 2009-09-24 18:09:00 -0500 (Thu, 24 Sep 2009) $
// ==/UserScript==
/*
    about:config settings:
        good_rgb_color - default: #33ff33 (green)
        bad_rgb_color - default: #ff3333 (red)
        font_rgb_color - default: #000000 (black)

   Updates:
   5-Dec-2007 - Added legend for colors
   5-Dec-2007 - Added message while fetching stats
   7-Dec-2007 - Moved color legend to bottom of page
   30-Sep-2008 - Updated to work with Yahoo 2008 changes
   12-Sep-2009 - Updated to display last year's stats for first week of the season
   24-Sep-2009 - Fixed accidental swap of New England and New Orleans abbreviations
*/

(function() {

// Show last week's stats if we're in the first week of the season.  Change (1) to (1|2) if you want to show last year's stats for weeks 1 and 2, change it to (1|2|3) to show last year's stats for weeks 1-3, etc.
var EARLY_WEEK = /week (1|2)\b/i;  

var PASSING_DEFENSE_URL = 'http://sports.yahoo.com/nfl/stats/byteam?group=Defense&cat=Passing';
var RUSHING_DEFENSE_URL = 'http://sports.yahoo.com/nfl/stats/byteam?group=Defense&cat=Rushing';

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

// Find the player tables
var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( playerTables.snapshotLength == 0 )
    return;

// Find week and display last year's stats if it's early in the season
var week = document.evaluate("//div[@id='weeknav']/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( week.snapshotLength == 0 )
	week = document.evaluate("//div[@id='matchup-h1']/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lastYear = null;
if ( week.snapshotLength > 0 )
{
	week = week.snapshotItem( 0 );
	if ( EARLY_WEEK.test( week.innerHTML ) )
	{
		lastYear = 1900 + new Date().getYear() - 1;
		PASSING_DEFENSE_URL += '&year=season_' + lastYear;
		RUSHING_DEFENSE_URL += '&year=season_' + lastYear;
	}
}

var tables = new Array();
for ( var i = 0; i < playerTables.snapshotLength; i++ )
{
    var table = playerTables.snapshotItem( i );
    tables.push( table );
}
playerTables = tables;

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

GM_addStyle( '\
IMG.gncTeam { padding-left: 2px } \
DIV#gncMatchupLegend { text-align: left; font-size: 77%; padding-left: 10px; background: #fff } \
TABLE#gncMatchupLegend { background: white; } \
TABLE#gncMatchupLegend TD { width: 15px; height: 15px; font-style: italic; padding: 0px; } \
' );

var legend = document.createElement( 'div' );
legend.id = 'gncMatchupLegend';
legend.innerHTML = 'Opposing Team Defense Colors Legend<br/>';
var legendTable = document.createElement( 'table' );
legendTable.id = 'gncMatchupLegend';
legendTable.setAttribute( "cellspacing", "2" );
legendTable.innerHTML = '<tr><td align="center" nowrap="nowrap">Retrieving team defensive stats... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/></td></tr>';
var yspcontent = document.getElementById( tables[ 0 ].id );
legend.appendChild( legendTable );
yspcontent.parentNode.insertBefore( legend, yspcontent.nextSibling );

var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nwe',NO:'nor',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };
var teamCells = new Array();

var GOOD_COLOR = GM_getValue("good_rgb_color", "#33ff33");
GM_setValue("good_rgb_color", GOOD_COLOR);

var BAD_COLOR = GM_getValue("bad_rgb_color", "#ff3333");
GM_setValue("bad_rgb_color", BAD_COLOR);

var FONT_COLOR = GM_getValue("font_rgb_color", "#000000");
GM_setValue("font_rgb_color", FONT_COLOR);

fetchMatchupData();

function fetchMatchupData()
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: PASSING_DEFENSE_URL,
        onload: getPassingDHandler( handlePassD ),
        });
}

function getPassingDHandler( responseHandler )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText );
    }
}

function handlePassD( responseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: RUSHING_DEFENSE_URL,
        onload: getRushingDHandler( displayMatchups, responseText ),
        });
}

function getRushingDHandler( responseHandler, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, passingDResponseText );
    }
}

function displayMatchups( rushingDResponseText, passingDResponseText )
{
    // Find all the team abbreviations
    var reTeamAbbr = new RegExp( '^@?(' + teamAbbrevs.join( '|' ) + ')$' );
    for ( var iTable = 0; iTable < playerTables.length; iTable++ )
    {
        var playerTable = playerTables[ iTable ];
        for ( var iRow = 0; iRow < playerTable.rows.length; iRow++ )
        {
            var row = playerTable.rows[ iRow ];
            if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
            {
                for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                {
                    var cell = row.cells[ iCell ];
                    var cellText = cell.innerHTML.stripTags();
                    var matches = cellText.match( reTeamAbbr );
                    if ( matches )
                    {
                        cell.setAttribute( "gncTeam", teamUrlAbbrevs[ matches[ 1 ] ] );
                        teamCells.push( cell );
                    }
                    if ( /^player/i.test( cell.getAttribute( "class" ) ) )
                    {
                        var span = cell.getElementsByTagName( 'span' );
                        if ( span.length > 0 )
                        {
                            span = span[ 0 ];
                            var playerPos = span.innerHTML.stripTags().replace( /\(\S{2,3}\s+-\s+(\S+)\)/i, '$1' );
                            cell.style.paddingRight = '2px';
                            cell.parentNode.setAttribute( "gncPlayerPos", playerPos );
                        }
                    }
                }
            }
        }
    }

    var rushingStats = parseStats( rushingDResponseText );
    var passingStats = parseStats( passingDResponseText );

    var colors = ColorTransition( BAD_COLOR, GOOD_COLOR, rushingStats.teams.length );

    // Legend
    legendTable.innerHTML = '<tr><td align="left">Bad matchups</td><td align="right">Good matchups</td><td style="white-space: nowrap; padding-left: 2em; color: red">' + (lastYear != null ? '(Displaying matchups from last year)' : '' ) + '</td></tr>';
    var cols = Math.round( colors.length / 2 );
    var tr = legendTable.rows[ 0 ];
    tr.cells[ 0 ].setAttribute( "colspan", cols );
    tr.cells[ 1 ].setAttribute( "colspan", colors.length - cols );

    tr = document.createElement( 'tr' );
    tr.style.height = '5px';
    legendTable.appendChild( tr );
    for ( var i = 0; i < colors.length; i++ )
    {
        var td = document.createElement( 'td' );
        td.style.backgroundColor = colors[ i ];
        tr.appendChild( td );
    }

    for ( var iCell = 0; iCell < teamCells.length; iCell++ )
    {
        var cell = teamCells[ iCell ];
        var teamAbbr = cell.getAttribute( "gncTeam" );
        var playerPos = cell.parentNode.getAttribute( "gncPlayerPos" ).toLowerCase();
        var tip = '';
        switch( playerPos )
        {
            case 'qb':
            case 'wr':
            case 'te':
            case 'rb,te':
                tip = "Pass " + buildToolTip( teamAbbr, passingStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, passingStats ) - 1 ];
                break;
            case 'rb':
                tip = "Rush " + buildToolTip( teamAbbr, rushingStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, rushingStats ) - 1 ];
                break;

        }
        teamCells[ iCell ].setAttribute( "title", tip );
    }
}

function parseStats( responseText )
{
    var table = document.getElementById( 'gncStatTable' );
    if ( table == null )
    {
        table = document.createElement( 'table' );
        table.style.display = 'none';
        table.id = 'gncStatTable';
        document.body.appendChild( table );
    }

    var tables = responseText.replace( /\r\n+/g, '' ).split( /<table[^>]+>/i );
    for ( var iTable = 0; iTable < tables.length; iTable++ )
    {
        if ( /class="ysptblthbody1"/i.test( tables[ iTable ] ) )
        {
            table.innerHTML = tables[ iTable ].replace( /<\/table>/i, '' );
            return extractTableStats( table );
        }
    }
}

function extractTableStats( table )
{
    var statNames = new Array();
    var teams = new Array();
    var stats = {};
    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];

        // header
        if ( iRow == 0 )
        {
            statNames.push( 'Rank' );
            for ( var iCell = 1; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellText = cell.innerHTML.stripTags();
                if ( cellText.length > 0 )
                    statNames.push( cellText );
            }
        }

        // data
        else
        {
            var teamStats = new Array();
            var teamAbbr = '';
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellText = cell.innerHTML.stripTags();

                // team
                if ( iCell == 0 )
                {
                    teamAbbr = cell.getElementsByTagName( 'a' )[ 0 ].href.replace( /^.*\/([a-z]+$)/i, '$1' );
                    teamStats.push( iRow ); // rank
                    teams.push( teamAbbr );
                }
                else
                {
                    if ( cellText.length > 0 )
                        teamStats.push( cellText );
                }
            }
            stats[ teamAbbr ] = teamStats;
        }
    }
    return { teams:teams, statNames:statNames, stats:stats };
}

function buildToolTip( teamAbbr, teamStats )
{
	if ( !teamStats.stats.hasOwnProperty( teamAbbr ) )
		return '<no stats yet for ' + teamAbbr + '>';
		
    var tip = new Array();
    var stats = teamStats.stats[ teamAbbr ];
    var statNames = teamStats.statNames;
    for ( var i = 0; i < stats.length; i++ )
    {
        switch( statNames[ i ].toLowerCase() )
        {
            case 'rank':
            case 'avg':
            case 'rushyds/g':
            case 'passyds/g':
            case 'td':
            case 'int':
            case 'sack':
                tip.push( statNames[ i ].replace( /pass|rush/i, '' ) + ': ' + stats[ i ] );
                break;
            default:
                break;
        }
    }
    return tip.join( ', ' );
}

function getRank( teamAbbr, teamStats )
{
	if ( !teamStats.stats.hasOwnProperty( teamAbbr ) )
		return -1;

    var stats = teamStats.stats[ teamAbbr ];
    var statNames = teamStats.statNames;
    for ( var i = 0; i < stats.length; i++ )
    {
        switch( statNames[ i ].toLowerCase() )
        {
            case 'rank':
                return parseInt( stats[ i ], 10 );
        }
    }
}

function ColorTransition(start, end, steps)
{
    var patterns = {};
    patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
    patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
    patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;

   var parseColor = function(s)
   {
      if (s.length == 3) { return s; }

      var c = patterns.hex.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16) ];
      }

      c = patterns.rgb.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10) ];
      }

      c = patterns.hex3.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16) ];
      }

      return null;
   };

   var outputColors = [];
   var startColor = currentColor = parseColor(start);
   var endColor = parseColor(end);
   var deltas = [];
   for (var rgbIndex = 0; rgbIndex < currentColor.length; rgbIndex++)
   {
      deltas[rgbIndex] = Math.abs(currentColor[rgbIndex] - endColor[rgbIndex]) / steps;
   }

   for (var step = 0; step < steps; step++)
   {
       if (step == steps -1)
       {
          currentColor = endColor;
       }

       outputColors[step] = 'rgb('+Math.floor(currentColor[0])+','+Math.floor(currentColor[1])+','+Math.floor(currentColor[2])+')';

       for (var rgbIndex = 0; rgbIndex < currentColor.length; rgbIndex++)
       {
          if ( startColor[rgbIndex] < endColor[rgbIndex] )
            currentColor[rgbIndex] += deltas[rgbIndex];
          else
            currentColor[rgbIndex] -= deltas[rgbIndex];
       }
   }

   return outputColors;
}

})();
