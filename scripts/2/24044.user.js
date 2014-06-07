// ==UserScript==
// @name           Yahoo Fantasy Baseball Team Notes
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Display team notes on league overview page
// @include        *.fantasysports.yahoo.com/*
// $LastChangedRevision: 573 $
// $LastChangedDate: 2010-07-29 23:34:03 -0500 (Thu, 29 Jul 2010) $
// ==/UserScript==
/*
    Updates:
     4-Aug-2008 - Tweaked UI styles to better match rest of fonts; Removed restriction for baseball
     29-Jul-2010 - Fixed due to Yahoo changes
*/

(function() {

if (!location.href.match(/\.fantasysports\.yahoo\.com\/b\d\/\d+/i))
    return;

var standings = document.getElementById( 'leaguehomestandings' );
if ( standings == null )
    return;
    
var myTeamLink = document.evaluate( '//div[@id="yspnav"]//li/a[contains(.,"My Team")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( myTeamLink.snapshotLength == 0 )
    return;
myTeamLink = myTeamLink.snapshotItem( 0 ).href;


var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

var divTeamNotes = document.createElement( 'DIV' );
divTeamNotes.setAttribute( "id", "leaguenotes" );
divTeamNotes.innerHTML = '<h4>Team Notes</h4><ul><li class="first last">Retrieving team notes... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/></li></ul>';

standings.parentNode.insertBefore( divTeamNotes, standings );

GM_xmlhttpRequest({
    method: 'GET',
    url: myTeamLink,
    onload: function( responseDetails )
    {
		if ( !/<div\s+id="teamnotes">/mi.test( responseDetails.responseText ) )
		{
			divTeamNotes.innerHTML = '<h4>Team Notes</h4><ul><li class="first last">There are no team notes.</li></ul>';
		}
		else
		{
			var parts = responseDetails.responseText.split( /<div\s+id="teamnotes">/im );
			divTeamNotes.innerHTML = parts[ 1 ].split( /<\/div>/im )[ 0 ];
		}
		divTeamNotes.id = "leaguenotes";
    },
    });


})();