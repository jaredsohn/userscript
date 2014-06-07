// ==UserScript==
// @name           Yahoo Baseball Show Last Pitcher Appearances
// @namespace      http://glenncarr.com/greasemonkey/fantasybaseball
// @include        http://baseball.fantasysports.yahoo.com/*
// @description    Displays data about the most recent appearances for pitchers
// $LastChangedRevision: 533 $
// $LastChangedDate: 2009-07-11 17:50:59 -0500 (Sat, 11 Jul 2009) $
// ==/UserScript==
/*
	Updates:
	 9-Jul-2008 - Modified to work for both starters and relievers, and to work on the 'Players' page as well as roster pages.  Also fixed a couple of bugs.
	11-Jul-2009 - Modified to display pitch counts for each appearance and link to appearance boxscore
*/
(function(){

if ( !/http:\/\/baseball\.fantasysports\.yahoo\.com\/.+\/.+/i.test( location.href ) )
    return;

var table = document.getElementById( 'statTable1' );
if ( table == null )
{
    table = document.getElementById( 'statTable0' );
    if ( table == null )
        return;
}

var statusHeader = document.evaluate( '//table[contains(@id,"statTable1")]//th[contains(.,"Status")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( statusHeader.snapshotLength == 0 )
{
	statusHeader = document.evaluate( '//table[contains(@id,"statTable")]//th[contains(.,"Owner")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	if ( statusHeader.snapshotLength == 0 )
	    return;
}

statusHeader = statusHeader.snapshotItem( 0 ).getElementsByTagName( 'div' )[ 0 ];
statusHeader.innerHTML += '&nbsp;&nbsp;&nbsp;<a style="font-weight:normal" href="#">Show Recent Appearances</a>';

var linkInvoke = statusHeader.getElementsByTagName( 'a' )[ 0 ];
linkInvoke.addEventListener( 'click', function(e) {
    e.preventDefault();
    if ( /show/i.test( this.innerHTML ) )
    {
        this.innerHTML = 'Hide Recent Appearances';
        showData();
    }
    else
    {
        this.innerHTML = 'Show Recent Appearances';
        hideData();
    }
}, false );

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
    "0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
    "02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
    "136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
    "2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
    "%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
    "00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
    "4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
    "3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";
    
var gSpan = document.createElement( 'span' );

GM_addStyle( '.gncAppearanceStatus { font-style: italic; color: #666 } .gncPitchCount { font-size: 7.5px; font-style: italic }' );

var HOT_COLOR = GM_getValue("hot_rgb_color", "#ff0000");
//GM_setValue("hot_rgb_color", HOT_COLOR);

var COLD_COLOR = GM_getValue("cold_rgb_color", "#0000ff");
//GM_setValue("cold_rgb_color", COLD_COLOR);

var colors = ColorTransition(HOT_COLOR, COLD_COLOR, 5);

GM_addStyle( 'sup.gncAppearances { font-size: 8px }' );

var origCells = new Array();
var newCells = new Object();

function hideData()
{
    try {
    for ( var i = 0; i < origCells.length; i++ )
        origCells[ i ].cell.innerHTML = origCells[ i ].innerHTML;
    } catch ( e ) { alert( e.description ); }
}

function showData()
{
    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];
        var rowClass = row.getAttribute( "class" );
        if ( /^(even|odd)/i.test( rowClass ) )
        {
            var pitcherLink = null;
            var pitchName = null;
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = cell.getAttribute( "class" );
                if ( /^player/i.test( cellClass ) )
                {
                    if ( !/\b(P|RP|SP)\b/.test( cell.innerHTML ) )
                        break;

                    var links = cell.getElementsByTagName( 'a' );
                    if ( links.length > 0 )
                    {
                        pitcherLink = links[ 0 ].href;
                        pitcherName = links[ 0 ].innerHTML;
                    }
                }
                if ( /^gametime/i.test( cellClass ) || /^owner/i.test( cellClass ) )
                {
                    if ( newCells.hasOwnProperty( pitcherLink ) )
                        cell.innerHTML = newCells[ pitcherLink ];
                    else
                        {
                        var elAppearances = document.createElement( 'div' );
                        elAppearances.setAttribute( "class", "gncAppearances" );

                        var elStatus = document.createElement( 'span' );
                        elStatus.setAttribute( "class", "gncAppearanceStatus" );
                        elStatus.innerHTML = 'Retrieving recent appearances... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/><br/>';
                        elAppearances.appendChild( elStatus );

                        origCells.push( { cell:cell, innerHTML:cell.innerHTML } );

                        cell.insertBefore( elAppearances, cell.lastChild.nextSibling )
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: pitcherLink,
                            onload: getAppearancesDataHandler( handleAppearancesData, elStatus, elAppearances, pitcherLink, pitcherName ),
                            });
                        }
                }
            }
        }
    }
}

function getAppearancesDataHandler( responseHandler, elStatus, elAppearances, pitcherLink, pitcherName )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elAppearances, pitcherLink, pitcherName );
        else
            elStatus.innerHTML = 'Unable to retrieve pitcher appearance data';
    }
}

var today = new Date();
var MINUTES = 1000 * 60;
var HOURS = MINUTES * 60;
var DAYS = HOURS * 24;

function handleAppearancesData( responseText, elStatus, elAppearances, pitcherLink, pitcherName )
{
	if ( !/last\s+\d+\s+games/mi.test( responseText ) )
	{
        elStatus.innerHTML = 'No recent appearances';
	}
	else
	{
		var matches = responseText.replace( /[\r\n]+/g, '' ).match( /.*(<table[^>]*>\s*<tr[^>]*>\s*<td[^>]*>[^<]*last\s+\d+\s+games.*?(<\/table>)).*/i );
		if ( !matches )
		{
			elStatus.innerHTML = 'Unable to parse pitcher appearance data';
		}
		else
		{
			gSpan.innerHTML = matches[ 1 ];
			var table = gSpan.getElementsByTagName( 'table' )[ 0 ];
			var delim = document.createTextNode( '' );
			for ( var iRow = 2; iRow <= Math.min( 5, table.rows.length - 1 ); iRow++ )
			{
				var row = table.rows[ iRow ];
				var date = row.cells[ 0 ].innerHTML.stripTags();
				if ( /\D+\s+\d+/.test( date ) )
				{
					dt = new Date();
					dt.setTime( Date.parse( date + ' ' + today.getFullYear() ) );
					var daysSince = Math.floor( ( today.getTime() - dt.getTime() ) / DAYS );
					var color = daysSince < colors.length ? colors[ daysSince - 1 ] : COLD_COLOR;
					var fontWeight = daysSince == 1 ? 'bold' : 'normal';

					var opp = row.cells[ 1 ].innerHTML.stripTags();
					if ( !/@/i.test( opp ) )
						opp = 'vs ' + opp;
					var score = row.cells[ 2 ].innerHTML.stripTags()
					var gameLink = row.cells[ 2 ].getElementsByTagName( 'a' )[ 0 ].href.replace( /;_ylt=[^?]+/i, '' );
					var dec = 'D:' + row.cells[ 3 ].innerHTML.stripTags()
					var ip = 'IP:' + row.cells[ 4 ].innerHTML.stripTags()
					var h = 'H:' + row.cells[ 5 ].innerHTML.stripTags()
					var r = 'R:' + row.cells[ 6 ].innerHTML.stripTags()
					var er = 'ER:' + row.cells[ 7 ].innerHTML.stripTags()
					var hr = 'HR:' + row.cells[ 8 ].innerHTML.stripTags()
					var bb = 'BB:' + row.cells[ 9 ].innerHTML.stripTags()
					var k = 'K:' + row.cells[ 10 ].innerHTML.stripTags()
					var title = new Array( ( daysSince == 1 ? 'Yesterday' : ( daysSince + ' days ago' ) ) + ' ' + opp, score, dec, ip, h, r, er, hr, bb, k ).join( ', ' );

					var elAppearance = document.createElement( 'span' );
					elAppearance.setAttribute( "title", title );
					elAppearance.style.color = color;
					elAppearance.style.fontWeight = fontWeight;
					elAppearance.innerHTML = '<a style="color:' + color + '" href="' + gameLink + '">' + date + '</a>';
					elAppearances.appendChild( delim );
					elAppearances.appendChild( elAppearance );
					elAppearances.setAttribute( "count", parseInt( "0" + elAppearances.getAttribute( "count" ), 10 ) + 1 );
					delim = document.createTextNode( ', ' );

					GM_xmlhttpRequest({
						method: 'GET',
						url: gameLink,
						onload: getPitchCountHandler( handlePitchCount, elStatus, elAppearance, pitcherName ),
						});
				}
			}
			//elStatus.innerHTML = '';
		}
	}
	newCells[ pitcherLink ] = elAppearances.parentNode.innerHTML;
}

function getPitchCountHandler( responseHandler, elStatus, elAppearance, pitcherName )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, elStatus, elAppearance, pitcherName );
        else
            elStatus.innerHTML = 'Unable to retrieve pitcher appearance data';
    }
}

function handlePitchCount( responseText, elStatus, elAppearance, pitcherName )
{
	pitcherName = stripAccents( pitcherName ).replace( /(\S)\S*\s+(.*)/, '$1 $2' );
	var re = new RegExp( 'Pitches-strikes.+' + pitcherName + '\\D+((\\d+)-\\d+)[;.].*', 'im' );
	var matches = responseText.match( re );
	if ( matches )
	{
		var sup = document.createElement( 'sup' );
		sup.setAttribute( 'class', 'gncPitchCount' );
		sup.innerHTML = ' (' + matches[ 2 ] + ')';
		elAppearance.getElementsByTagName( 'a' )[ 0 ].appendChild( sup );
		elAppearance.setAttribute( "title", elAppearance.getAttribute( "title" ) + ", P-S:" + matches[ 1 ] );
	}

	var elAppearances = elAppearance.parentNode;
	var count = parseInt( "0" + elAppearances.getAttribute( "count" ), 10 );
	if ( count == 1 )
		elStatus.innerHTML = '';
	else
		elAppearances.setAttribute( "count",  count - 1 );
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

/* Based on code by (C)Stephen Chalmers
* Strips grave, acute & circumflex accents
* http://www.thescripts.com/forum/thread145532.html
*/
function stripAccents(str)
{
	var s=str;

	var rExps=[
	/[\xC0-\xC2]/g, /[\xE0-\xE2]/g,
	/[\xC8-\xCA]/g, /[\xE8-\xEB]/g,
	/[\xCC-\xCE]/g, /[\xEC-\xEE]/g,
	/[\xD2-\xD4]/g, /[\xF2-\xF4]/g,
	/[\xD9-\xDB]/g, /[\xF9-\xFB]/g,
	/[\xD1]/g, /[\xF1]/g ];

	var repChar=['A','a','E','e','I','i','O','o','U','u','N','n'];

	for(var i=0; i<rExps.length; i++)
		s=s.replace(rExps[i],repChar[i]);

	return s;
}

})();