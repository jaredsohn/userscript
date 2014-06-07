// ==UserScript==
// @name           Yahoo Fantasy Baseball Roto Standings+
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Improve Yahoo fantasy baseball roto standings page
// @include        *baseball.fantasysports.yahoo.com/*/standings*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 644 $
// $LastChangedDate: 2013-05-30 17:38:40 -0500 (Thu, 30 May 2013) $
// ==/UserScript==
/*
    about:config settings:
        high_points_rgb_color - default: #33ff33 (green)
        low_points_rgb_color - default: #ff3333 (red)
        font_rgb_color - default: #000000 (black)

   Updates:
   18-May-2007 - Colorized the standings tables based on rankings
   24-May-2007 - Fixed so that ties would have same color; Added legend
   29-May-2007 - Changed include path to allow http://beta.
   30-May-2007 - Add link to colorize/decolorize instead of automatically colorizing
   02-Jun-2007 - Added link to show/hide innings pitched maximums for each team
   07-Jun-2007 - Added display of Innings Pitched and Innings Remaining
   17-Jul-2007 - Fix bug where working image was not removed if no minimum innings
    9-Jul-2008 - Remove maximums; Fix legend placement
   27-May-2009 - Fixed due to addition of IP and GP columns by Yahoo
    5-Aug-2010 - Fixed due to 'Total IP' caption
   30-May-2013 - Fixed bug
*/

(function() {

var idStandingsModifiers = 'gncStandingsModifiers';

var pointsTable = document.getElementById( 'statTable0' );
var statsTable = document.getElementById( 'statTable1' );
if ( pointsTable == null || statsTable == null )
    return;

var stats = new Array();

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

addLinks();

function colorizeStandings()
{
    stats = new Array();

    GM_addStyle( '\
    table#gncStatsLegend { font-size: 11px; } \
    table#gncStatsLegend td { width: 20px; text-align: center; font-weight: bold } \
    table#statTable0 sub, table#statTable1 sub { font-size: 8px; padding-bottom: 0px; margin-bottom: 0px } \
    ' );

    var HIGH_PTS_COLOR = GM_getValue("high_points_rgb_color", "#33cc33");
    GM_setValue("high_points_rgb_color", HIGH_PTS_COLOR);

    var LOW_PTS_COLOR = GM_getValue("low_points_rgb_color", "#ffff33");
    GM_setValue("low_points_rgb_color", LOW_PTS_COLOR);

    var FONT_COLOR = GM_getValue("font_rgb_color", "#000000");
    GM_setValue("font_rgb_color", FONT_COLOR);

    var DISPLAY_COMBINED = GM_getValue("display_combined_points_and_stats", true);
    GM_setValue("display_combined_points_and_stats", DISPLAY_COMBINED);

    if ( !DISPLAY_COMBINED )
        GM_addStyle( '\
        table#statTable0 sub, table#statTable1 sub { display: none } \
        ' );

    // Grab all the stats
    var statCaptions = new Array();
    for ( var iRow = 0; iRow < statsTable.rows.length; iRow++ )
    {
        var row = statsTable.rows[ iRow ];
        var rowClass = getClassName( row );
        if ( /headerRow1/i.test( rowClass ) )
        {
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = getClassName( cell );
                if ( /^stat/i.test( cellClass ) )
                {
                	var caption = cell.getElementsByTagName( 'a' )[ 0 ].innerHTML;
                	statCaptions.push( caption );
                }
                else
                	statCaptions.push( null );
            }
        }
        else if ( /^(odd|even)/i.test( rowClass ) )
        {
            var teamStats = new Array();
            stats.push( teamStats );
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = getClassName( cell );
                if ( /^stat/i.test( cellClass ) && !/^(<[^>]+>)?(Total GP|IP)(<[^>]+>)?$/i.test( statCaptions[ iCell ] ) )
                {
                    teamStats.push( { stat:stripTags( cell.innerHTML ),
                                      points:0,
                                      statsCell:cell,
                                      pointsCell:null,
                                      origStatsHTML:cell.innerHTML,
                                      origPointsHTML:null } );
                }
            }
        }
    }

    // Grab all the points
    var iTeam = 0;
    for ( var iRow = 0; iRow < pointsTable.rows.length; iRow++ )
    {
        var row = pointsTable.rows[ iRow ];
        var rowClass = getClassName( row );
        if ( /^(odd|even)/i.test( rowClass ) )
        {
            var iStat = 0;
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = getClassName( cell );
                if ( /^stat/i.test( cellClass ) )
                {
                    stats[ iTeam ][ iStat ].pointsCell = cell;
                    stats[ iTeam ][ iStat ].origPointsHTML = cell.innerHTML;
                    stats[ iTeam ][ iStat ].points = parseFloat( stripTags( cell.innerHTML ) );
                    cell.innerHTML += ( ' <SUB>(' + stats[ iTeam ][ iStat ].stat + ')</SUB>' );
                    iStat += 1;
                }
            }
            iTeam += 1;
        }
    }

    // Create legend
    var colors = ColorTransition(LOW_PTS_COLOR, HIGH_PTS_COLOR, stats.length);
    var header = document.getElementById( idStandingsModifiers );
    if ( header )
    {
        var legend = document.createElement( 'table' );
        legend.setAttribute( "align", "center" );
        legend.id = 'gncStatsLegend';
        var tr = document.createElement( 'tr' );
        legend.appendChild( tr );
        tr.appendChild( document.createElement( 'td' ) );
        for ( var i = colors.length - 1; i >= 0; i-- )
        {
            var td = document.createElement( 'td' );
            tr.appendChild( td );
            td.style.background = colors[ i ];
            td.innerHTML = '&nbsp;'
        }
        tr.appendChild( document.createElement( 'td' ) );
        tr.childNodes[ 0 ].innerHTML = 'High';
        tr.childNodes[ tr.childNodes.length - 1 ].innerHTML = 'Low';
        header.appendChild( legend );
    }

    // Colorize both tables
    for ( var iStat = 0; iStat < stats[ 0 ].length; iStat++ )
    {
        var statToSort = new Array();
        for ( var iTeam = 0; iTeam < stats.length; iTeam++ )
            statToSort.push( stats[ iTeam ][ iStat ] );
        statToSort.sort( sortStatValues );
        for ( var iTeam = 0; iTeam < stats.length; iTeam++ )
        {
            // Use same color if previous points are the same
            var colorIndex = iTeam;
            while ( colorIndex > 0 && statToSort[ iTeam ].points == statToSort[ colorIndex - 1 ].points )
                colorIndex -= 1;

            statToSort[ iTeam ].pointsCell.style.background = statToSort[ iTeam ].statsCell.style.background = colors[ colorIndex ];
            statToSort[ iTeam ].pointsCell.style.color = statToSort[ iTeam ].statsCell.style.color = FONT_COLOR;
        }
    }

    // Add points to stats table
    var iTeam = 0;
    for ( var iRow = 0; iRow < statsTable.rows.length; iRow++ )
    {
        var row = statsTable.rows[ iRow ];
        var rowClass = getClassName( row );
        if ( /^(odd|even)/i.test( rowClass ) )
        {
            var iStat = 0;
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = getClassName( cell );
                if ( /^stat/i.test( cellClass ) && !/^(<[^>]+>)?(Total GP|IP)(<[^>]+>)?$/i.test( statCaptions[ iCell ] ) )
                {
                    cell.innerHTML += ( ' <SUB>(' + stats[ iTeam ][ iStat ].points + ')</SUB>' );
                    iStat += 1;
                }
            }
            row.cells[ row.cells.length - 1 ].setAttribute( "class", "stat" );
            var td = document.createElement( 'TD' );
            td.innerHTML = '';
            td.setAttribute( "class", "pts sorted" );
            row.appendChild( td );

            iTeam += 1;
        }
    }
}

function decolorizeStandings()
{
    var legend = document.getElementById( 'gncStatsLegend' );
    if ( legend )
        legend.parentNode.removeChild(legend);

    for ( var iStat = 0; iStat < stats[ 0 ].length; iStat++ )
    {
        for ( var iTeam = 0; iTeam < stats.length; iTeam++ )
        {
            stats[ iTeam ][ iStat ].statsCell.innerHTML = stats[ iTeam ][ iStat ].origStatsHTML;
            stats[ iTeam ][ iStat ].pointsCell.innerHTML = stats[ iTeam ][ iStat ].origPointsHTML;
            stats[ iTeam ][ iStat ].statsCell.style.background = stats[ iTeam ][ iStat ].pointsCell.style.background = '';

        }
    }

    for ( var iRow = 0; iRow < statsTable.rows.length; iRow++ )
    {
        var row = statsTable.rows[ iRow ];
        var rowClass = getClassName( row );
        if ( /^(odd|even)/i.test( rowClass ) )
        {
            row.removeChild( row.lastChild )
            row.cells[ row.cells.length - 1 ].setAttribute( "class", "stat last" );
        }
    }

}

function sortStatValues( a, b )
{
    if ( a.points < b.points )
        return -1;
    else if ( a.points > b.points )
        return 1;
    return 0;
}

function getClassName( el )
{
    var className = el.getAttribute( 'class' );
    if ( className == null )
        className = el.getAttribute( 'className' );
    return className;
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
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

function addLinks()
{
    var ysppageheader = document.getElementById('ysppageheader');
    if ( !ysppageheader )
        return;

    var divLinks = document.createElement( 'div' );
    divLinks.style.marginLeft = '4px'
    divLinks.id = idStandingsModifiers;
    divLinks.setAttribute( 'class', 'navlist statsubnav' );
    ysppageheader.parentNode.insertBefore( divLinks, ysppageheader.nextSibling );
    divLinks.innerHTML = '<ul></ul>';
    var ul = divLinks.getElementsByTagName( 'ul' )[ 0 ];

    var li = document.createElement( 'li' );
    ul.appendChild( li );
    var a = document.createElement( 'a' );
    a.href = '#';
    a.innerHTML = 'Colorize';
    li.appendChild( a );

    a.addEventListener( 'click', function(e) {
        e.preventDefault();
        if ( /^colorize/i.test( this.innerHTML ) )
        {
            this.innerHTML = 'Decolorize';
            return colorizeStandings();
        }
        else
        {
            this.innerHTML = 'Colorize';
            return decolorizeStandings();
        }
    }, false );
}

})();