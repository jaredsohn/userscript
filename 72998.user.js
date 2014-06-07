// ==UserScript==
// @name           Yahoo Show All League Activity
// @namespace      http://glenncarr.com/greasemonkey
// @description    Show activity for all leagues
// @include        http://*.fantasysports.yahoo.com/*
// $LastChangedRevision: 611 $
// $LastChangedDate: 2011-12-08 22:07:31 -0600 (Thu, 08 Dec 2011) $
// ==/UserScript==
(function(){

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}


String.prototype.parseDate = function() {
    var date = this.replace( /^([a-z]{3}\s+\d+).*/i, '$1' ) + ' ' + (new Date()).getFullYear();
    var matches = this.match( /(\d+):(\d+)(am|pm)/i );
    if ( matches == null )
    	return null;

    var hours = parseInt( matches[ 1 ], 10 );
    switch ( matches[ 3 ] )
    {
    case 'am':
    	if ( hours == 12 )
    		hours = 0;
    	break;
    case 'pm':
    	hours += 12;
    	if ( hours == 24 )
    		hours = 12;
    	break;
    }
    return Date.parse( date + ' ' + hours + ':' + matches[ 2 ] );
}

function findAncestor(o, tag)
{
    for(tag = tag.toLowerCase(); o = o.parentNode;)
        if(o.tagName && o.tagName.toLowerCase() == tag)
            return o;
    return null;
}

var divTeams = document.getElementById( 'home-myleagues' );
if ( divTeams == null )
    return;

var leagueDivs = document.evaluate("//div[@class='league']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
if ( leagueDivs.snapshotLength == 0 )
    return;
    
var myTeamsHeader = document.evaluate("//div[@id='home-myleagues']//div[@class='hd']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
if ( myTeamsHeader.snapshotLength == 0 )
    return;
myTeamsHeader = myTeamsHeader.snapshotItem( 0 );

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

try {

GM_addStyle( 'BUTTON#gncGetRecentTransactions { font-size: 9px } td#gncRecentTransactions table td { font-size: 10px; padding: 1px 1px } #gncWorking { font-size: 11px; font-style: italic }' );
GM_addStyle( 'DIV.gncRecentTransactions TABLE TD { padding: 1px 1px }' );

var gSpan = document.createElement( 'span' );
var leagues = new Array();

var button = document.createElement( 'button' );
button.id = 'gncGetRecentTransactions';
button.innerHTML = 'Get Recent Transactions';
myTeamsHeader.parentNode.insertBefore( button, myTeamsHeader.nextSibling );

for ( var iLeague = 0; iLeague < leagueDivs.snapshotLength; iLeague++ )
{
    var leagueLink = leagueDivs.snapshotItem( iLeague ).getElementsByTagName( 'a' );
    if ( leagueLink.length == 0 )
        continue;
    leagueLink = leagueLink[ 0 ];

    var tr = findAncestor( leagueLink, 'tr' );
    if ( tr )
    {
        var trActivity = document.createElement( 'tr' );
        tr.parentNode.insertBefore( trActivity, tr.nextSibling );
        trActivity.innerHTML = '<td id="gncRecentTransactions" colspan="' + tr.cells.length + '"></td>';
        trActivity.style.display = 'none';
        var league = { id:leagueLink.href.replace( /.*\/(\d+)$/i, '$1' ), name:leagueLink.innerHTML, url:leagueLink.href, element:trActivity };
        leagues.push( league );
    }
}

button.addEventListener( 'click', function(e)
{
    for ( var iLeague = 0; iLeague < leagues.length; iLeague++ )
    {
        var league = leagues[ iLeague ];
        league.element.style.display = '';
        league.element.cells[ 0 ].innerHTML = '<span id="gncWorking">Getting recent transactions for ' + league.name + '... <img src="' + WORKING_IMG_URL + '" /></span>';
        GM_xmlhttpRequest( {
            method: 'GET',
            url: league.url + '/transactions',
            onload: getResultsHandler( handleResults, league ),
            } );    
        // return; // *****
    }
}, 
false );

function getResultsHandler( responseHandler, league )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200  )
            responseHandler( responseDetails.responseText, league );
        else
            divLeague.innerHTML = 'Error getting transactions for  ' + league.name;
    }
}

colors = ColorTransition( '#ffff00', '#ffffff', 24 );

function handleResults( responseText, league )
{
    league.element.cells[ 0 ].innerHTML = '<div class="title"><a href="' + league.url + '/transactions">Recent Transactions</a></div>';
    gSpan.innerHTML = responseText;
    var divs = gSpan.getElementsByTagName( 'div' );

    var now = new Date();
    var one_day=1000*60*60*24

    var found = false;
    for ( var i = 0; !found && i < divs.length; i++ )
    {
        var div = divs[ i ];
        if ( /data-table/i.test( div.getAttribute( "class" ) ) )
        {
            found = true;
            league.element.cells[ 0 ].innerHTML += '<div class="gncRecentTransactions" style="height: 200px; overflow: auto">' + div.innerHTML + '</div>';
            var table = league.element.cells[ 0 ].getElementsByTagName( 'table' )[ 0 ];
            var hoursOld = 0;
            for ( var iRow = 0; iRow < table.rows.length; iRow++ )
            {
                var row = table.rows[ iRow ];
                var cell = row.cells[ 0 ];
                if ( iRow == 0 )
                    continue;

                var time = cell.innerHTML.stripTags().parseDate();
                if ( time )
					var hoursOld = parseInt( ( now.getTime() - time ) / (1000 * 60 * 60), 10 );
                cell.style.backgroundColor = colors[ hoursOld ];
            }
        }
    }
    if ( !found )
    {
        league.element.cells[ 0 ].innerHTML ='<div style="padding-right: 2em; font-size: 11px">Not found.</div>';
    }
}

} catch ( e ) { alert( e ); }


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