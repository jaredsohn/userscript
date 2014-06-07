// ==UserScript==
// @name           Yahoo MLB Player Search
// @namespace      http://glenncarr.com/greasemonkey
// @include        http://baseball.fantasysports.yahoo.com/*
// @description    Adds a search icon to search for a player on mlb.com
// @author         Glenn Carr
// $LastChangedRevision: 511 $
// $LastChangedDate: 2009-03-26 19:58:19 -0500 (Thu, 26 Mar 2009) $
// ==/UserScript==

/*

Credit: The basis for this script was a script by Tim Wilson.

Updates:
26-Mar-2009 - Fixed conflict with gamelog script

*/

var leagueURL;
var sport;
var searchXPath;
var allElements;

leagueURL = String(window.location).replace(/(.*\.fantasysports\.yahoo\.com\/.*\/\d+).*/i, '$1');
sport = '';

if( leagueURL.indexOf('baseball') != -1 ) {
	sport='MLB';
	searchXPath = "//*[contains(@href, 'http://sports.yahoo.com/mlb/players/')]";
}

// Make sure we matched one of the supported sports.
if( sport != '' ) {
	allElements = document.evaluate(searchXPath, document, null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null);


	// Add the Game Log icon to all players.
	addPlayerSearchIcon(allElements);
}

function addPlayerSearchIcon(allElements) {
	var playerLink;
	var gameLogLink;

	var searchIconUrl = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%0D%08%03%00%00%00E5%14N%00%00%00%07tIME%07%D8%09%1E%0E%1E(d%05%CC%10%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%B4PLTE%00%00%00%B7%BC%C1%A1%AF%C1%20%3Eju%87%A3%DB%E1%E9%3C%5D%8F*N%85%7B%91%B4%DE%E4%EDCi%A41%5B%9B~%99%C0%CC%D6%E4%D1%DA%E6%DF%E5%EFIr%B37e%ACc%89%BEAl%B0%B0%C2%DD%DE%E5%F0An%B38g%AFFq%B4%91%AB%D1%8B%A7%CF%B0%C3%DE%D3%DE%EDSz%B9Cp%B4%3Fk%B1%A2%B9%DA8k%B1%B2%C6%E0%99%B3%D6%C0%CF%E4%9C%B8%D87q%B5%BB%CE%E4%A2%BC%DC%C3%D6%E97x%B8l%9D%CAW%8F%C3%E2%EA%F1l%A2%CE6%81%BDm%A3%CF%BF%D6%E8%B8%D2%E7a%9C%CB%7D%AD%D4i%A7%D06%89%C1x%AF%D4%C0%E6%F1%98%D7%EA%9E%DA%EC%C6%E8%F1%93%8E%8D%0C%00%00%00%01tRNS%00%40%E6%D8f%00%00%00sIDATx%DAc%60%00%03%0BK%2Bk%06%1805%03%02s(GO%DF%C0%D0%C8X%DF%04%CC%D1%D4%D2%06Q%3AZ%BA%20JUM%1DDi%40(%05E%25%10%A5%AC%A8%02%A2d%C4eA%94%9C%3CX%9F%A8%98%B8%84%A4%94%98%B84%88%C3%2F%20(%24(((%2C%02%E2prq%F300%F0%F2%81%95%B1%B2%B1s%C0%5D%C1%C0%C4%CC%C2%80%04%18%91%D8%00-%BE%08%CBE%B0%DB%D4%00%00%00%00IEND%AEB%60%82";

	for ( var i = 0; i < allElements.snapshotLength; i++) 
	{
		var playerLink = allElements.snapshotItem(i);
		if ( /\d+$/.test( playerLink.href ) )
		{
			var fullPlayerName = playerLink.innerHTML;

			var matches = fullPlayerName.match( /(?:.+)\s+(\S+)/i );
			if ( matches == null )
				continue;
			var lastName = matches[ 1 ];

			var gameLogForm = document.createElement( 'form' );
			gameLogForm.style.display = 'inline';
			gameLogForm.innerHTML = '<input type="hidden" name="playerLocator" value="' + stripAccents( lastName ) + '" /><input height="10" type="image" src="' + searchIconUrl + '" title="Search for ' + fullPlayerName + ' on mlb.com" />';
			gameLogForm.setAttribute( "action", "http://www.mlb.com/stats/player_locator_results.jsp" );
			gameLogForm.setAttribute( "target", "mlb" );
			playerLink.parentNode.appendChild(gameLogForm, playerLink.nextSibling);
		}
	}

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
