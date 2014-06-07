// ==UserScript==
// @name           Yahoo Basketball Flag Farm Players
// @description    Indicates players that are 'owned' outside of Yahoo's active roster
// $LastChangedRevision: 552 $
// $LastChangedDate: 2010-02-17 17:17:32 -0600 (Wed, 17 Feb 2010) $
// ==/UserScript==
/*
	Updates:
	11-Jul-2008 - Added farm team to bottom of each team page
	11-Jul-2008 - Changed lock image; lock image links to roster data; added roster data link to farm roster
	13-Jul-2008 - Added 'Farm' link to subnavigation menu for roster data spreadsheet
	16-Jul-2008 - If player name on the roster doesn't match the player name in the spreadsheet, display the name in red and add a note to the tooltip
	16-Jul-2008 - Fixed bug causing some interference with player drag-n-drop
	30-Sep-2008 - Added search next to farm player list at the bottom of the page
	16-Mar-2008 - Fix URL to not remove sheet ID
	20-Mar-2008 - Fixed bug causing farm roster to not display on team pages other than current owner's team
	28-Apr-2009 - Modify to show current owner's players in a different color
	 7-May-2009 - Highlight player's names that match those on the spreadsheet that don't have a Yahoo player ID assigned yet
	12-Feb-2010 - Display career innings pitched or at bats for farm players, and highlight players no longer rookie eligible
	14-Feb-2010 - Tweaked last mod a bit
	17-Feb-2010 - Modified to allow changing rookie eligibility requirements using games played
*/
/*
Usage:

1. Create a Google spreadsheet in this format:
Column 1:           Column 2:           Column 3:             Column 4:
------------------------------------------------------------------------------
Yahoo League ID:    [yahoo league id]

Team:               [team name 1]       [yahoo team number]
                    [player 1]          [yahoo player id]     [player note]
                    [player n]          [yahoo player id]     [player note]

Team:               [team name 1]       [yahoo team number]
                    [player 1]          [yahoo player id]     [player note]
                    [player n]          [yahoo player id]     [player note]
------------------------------------------------------------------------------
...then publish it.  Here's an example: http://spreadsheets.google.com/pub?key=pp2eo2emrjO-wLOVN8AjEPg

2. Click 'More publishing options' to get the 'TXT' version of the URL.
It will be something like this:
http://spreadsheets.google.com/pub?key=pp2eo2emrjO-wLOVN8AjEPg&output=txt&gid=0

3. Edit the spreadsheet so that it has the correct rosters and Yahoo player numbers.
Make sure the league identifier is correct in the first line.

4. Install this script and then change the included pages for this script to match your league in this format:
http://baseball.fantasysports.yahoo.com/bn/nnnn*

5. When you refresh the page the first time, you'll be prompted for the URL of the TXT version of the document.
Paste it in the dialog, and you should be good to go.

*/
(function(){
var ELIGIBILITY_FOOTNOTE = '*Exceeds rookie eligibility requirements (>50 IP or >130 AB)';
function BatterEligibility( ab, gamesPlayed )
{
	this.careerAtBats = ab;
	this.careerGamesPlayed = gamesPlayed;
	this.isEligible = function()
	{
		return ( this.careerAtBats <= 130 );
		//return ( this.careerGamesPlayed <= 150 );
	}
}

function PitcherEligibility( ip, gamesPlayed )
{
	this.careerInningsPitched = ip;
	this.careerGamesPlayed = gamesPlayed;
	this.isEligible = function()
	{
		return ( this.careerInningsPitched <= 50 );
		//return ( this.careerInningsPitched <= 50 || this.careerGamesPlayed <= 25 );
	}
}

function isBatterRookieEligible( careerAtBats, careerGames )
{
	return ( careerAtBats <= 130 );
}

function isPitcherRookieEligible( careerInningsPitched, careerGames )
{
	return ( careerInningsPitched <= 50 );
}

var matches = location.href.match( /^(http:\/\/basketball\.fantasysports\.yahoo\.com\/nba\/(\d+)).*/i );
if ( matches == null )
	return;

var leagueID = matches[ 2 ];
var leagueBaseURL = matches[ 1 ];
var LEAGUE_URL_NAME = "yahoo_farm_rosters_spreadsheet_" + leagueID;

var FARM_ROSTERS_URL = GM_getValue(LEAGUE_URL_NAME, '' );
if ( FARM_ROSTERS_URL == null || FARM_ROSTERS_URL == '' )
{
	FARM_ROSTERS_URL = prompt( "Enter URL of Google spreadsheet containing rosters:", '' );
	if ( FARM_ROSTERS_URL != null && FARM_ROSTERS_URL != '' )
		GM_setValue(LEAGUE_URL_NAME, FARM_ROSTERS_URL )
}
if ( FARM_ROSTERS_URL == null || FARM_ROSTERS_URL == '' )
	return;
	

window.setCookie = function (name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");

  document.cookie = curCookie;
}


window.getCookie = function (name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
 
  return unescape(dc.substring(begin + prefix.length, end));
}

window.deleteCookie = function (name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

window.fixDate = function (date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew); 
}


var currentOwnerID = document.evaluate( '//a[contains(.,"My Team")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( currentOwnerID.snapshotLength > 0 )
	currentOwnerID = currentOwnerID.snapshotItem( 0 ).href.match( /.+\/(\d+)/i )[ 1 ];
else
	currentOwnerID = null;

GM_addStyle( '#yspsubnav a, #yspsubnav strong {padding-right:3px;}' );
GM_addStyle( '.gncNotARookie { color: red; font-weight:bold !important } .gncFarmPlayerData { width: 150px; text-align: right !important; padding-right: 20px !important; }' );

var FARM_ROSTERS_DATA_URL = FARM_ROSTERS_URL.replace( /&output=txt/i, '' );

var subnav = document.getElementById( 'yspsubnav' );
if ( subnav != null && subnav.getElementsByTagName( 'li' ).length > 0 )
{
    var li = document.createElement( 'li' );
    li.innerHTML = '<a target="sports" href="' + FARM_ROSTERS_DATA_URL + '">Farm</a>';
    subnav.getElementsByTagName( 'li' )[ 0 ].parentNode.appendChild( li );
}

var gSpan = document.createElement( 'span' );

GM_xmlhttpRequest({
    method: 'GET',
    url: FARM_ROSTERS_URL,
    onload: getHttpRequestHandler( handleRosterData ),
    });

function getHttpRequestHandler( responseHandler )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails );
        else
        {
			alert( "The URL you've specified (" + FARM_ROSTERS_URL + ") doesn't appear to have valid roster data." );
			GM_setValue(LEAGUE_URL_NAME, "" )
			return;
        }
    }
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
var LOCK_IMG = "data:image/gif,GIF89a%0E%00%0E%00%D5%23%00%F1%E5%BB%DE%C2%5D%DC%BER%E3%CBv%AD%935%9D%9D%9D%DA%BAG%E0%C6h%F3%E9%C6%F0%E5%C0%E7%D3%8B%92%8C%7B%F0%E3%B4%E7%D1%85%DA%B9F%D7%B6%3C%E9%DB%A4%D8%B5%3B%ED%E1%B4%EA%DC%A7%DF%C4d%D5%B11%8F%86f%DE%C2%5E%EE%E2%B7%ED%DC%A3%E8%D5%90%EE%E4%BF%BA%B3%9D%85%85%85%D4%B5D%A0%A0%A0%E4%C3J%88%88%88%92%7B*%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%23%00%2C%00%00%00%00%0E%00%0E%00%00%06R%C0%91pH%2C%12%3F%85%82%F1%18%0AuBK%E1%07%DA%8C%8E%A6%A3%EA%12%C4%E5z%3CF%10%02%C0%C8%0C%0E%01QQ%0C%D8p%CE%E95F%92X%5C%04%0E5%D13%81%00%2C%02%06%11zC%1E%0A%0D%1A%14%06%0F%15%84B%04%22%91%92%22%04V%96%97%23A%00%3B";
var LOCK_QUESTION_IMG = "data:image/gif,GIF89a%0E%00%0E%00%F7%00%00%00%00%00%5C%00%00k%00%00z%00%00%9C%00%00%92%7B*%B3U%1D%9Fll%C3%00%00%DA%00%00%D4%2F%10%D9%2B%2B%EF%11%06%ED%13%13%FF%00%00%F9%1B" + 
						"%0B%FA%1C%0D%EB%22%0C%F5)%0B%F5*%0E%F7.%18%C6%40%15%AD%935%8F%86f%92%8C%7B%DF%90%2F%DC%906%E5%811%E1%948%D4%B5D%DC%BER%E1%AET%E3%B2%5D%DF%C4d%E4%C3J%E3%CBv%88%88%88%9D%9D%" + 
						"9D%BA%B3%9D%A0%A0%A0%E7%D1%85%E7%D3%8B%E8%D5%90%E9%DB%A4%EA%DC%A7%ED%DC%A3%ED%E1%B4%EE%E2%B7%EE%E4%BF%F0%E3%B4%F1%E5%BB%F0%E5%C0%F3%E9%C6%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" + 
						"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%FF%00%2C%00%00%00%00%0E%00%0E%00%00%08x%00%FF%09%1CH%B0%20%C1%13%25J%18" + 
						"%3CHbA%83%06%09%22%0E(x%82%04%02%07%183N%1CXq%C0%81%03%01%12%60D0P%84I%93%1D4%88t%B0Q%04%0D%191Z%8C%00%01ad%C9%970L%8C%A0%60%B3%E4%0B%1730%7Cx%E0%80A%C1%0E%2CV%C8%B8%E0%81" + 
						"C%06%03GS%A0P%11b%C3%04%09%0A%0AZ(%C0%B5%40%05%8C%11%16%0E%14%80%00%01%01%B1h%03%02%00%3B";
var SEARCHPLAYER_IMG = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%0D%08%03%00%00%00E5%14N%00%00%00%07tIME%07%D8%09%1E%0E%1E(d%05%CC%10%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%B4PLTE%00%00%00%B7%BC%C1%A1%AF%C1%20%3Eju%87%A3%DB%E1%E9%3C%5D%8F*N%85%7B%91%B4%DE%E4%EDCi%A41%5B%9B~%99%C0%CC%D6%E4%D1%DA%E6%DF%E5%EFIr%B37e%ACc%89%BEAl%B0%B0%C2%DD%DE%E5%F0An%B38g%AFFq%B4%91%AB%D1%8B%A7%CF%B0%C3%DE%D3%DE%EDSz%B9Cp%B4%3Fk%B1%A2%B9%DA8k%B1%B2%C6%E0%99%B3%D6%C0%CF%E4%9C%B8%D87q%B5%BB%CE%E4%A2%BC%DC%C3%D6%E97x%B8l%9D%CAW%8F%C3%E2%EA%F1l%A2%CE6%81%BDm%A3%CF%BF%D6%E8%B8%D2%E7a%9C%CB%7D%AD%D4i%A7%D06%89%C1x%AF%D4%C0%E6%F1%98%D7%EA%9E%DA%EC%C6%E8%F1%93%8E%8D%0C%00%00%00%01tRNS%00%40%E6%D8f%00%00%00sIDATx%DAc%60%00%03%0BK%2Bk%06%1805%03%02s(GO%DF%C0%D0%C8X%DF%04%CC%D1%D4%D2%06Q%3AZ%BA%20JUM%1DDi%40(%05E%25%10%A5%AC%A8%02%A2d%C4eA%94%9C%3CX%9F%A8%98%B8%84%A4%94%98%B84%88%C3%2F%20(%24(((%2C%02%E2prq%F300%F0%F2%81%95%B1%B2%B1s%C0%5D%C1%C0%C4%CC%C2%80%04%18%91%D8%00-%BE%08%CBE%B0%DB%D4%00%00%00%00IEND%AEB%60%82";

GM_addStyle( "\
a.gncOnFarm { background: #FEFD88; color: #008; padding: 1px } \
a.gncOnMyFarm { background: #B6FF00; color: #008; padding: 1px } \
img.gncOnFarmLock { border-width: 0px; vertical-align: text-bottom; height: 12px } \
img.gncPlayerSearch { border-width: 0px; vertical-align: absmiddle; height: 8px } \
a.gncFarmPlayerWarning { color: red; font-weight: bold } \
" );
var players = {};
var owners = {};

function handleRosterData( responseDetails )
{
    var records = responseDetails.responseText.split( /\n/ );
    var ownerName = null;
    var ownerID = null;
    var leagueIDFound = false;
    var reLeagueID = new RegExp( "^yahoo league id:\\t" + leagueID + "\\b", "i" );
    for ( var iRec = 0; iRec < records.length; iRec++ )
    {
        var rec = records[ iRec ];
        if ( /^\s*$/.test( rec ) || /^;/.test( rec ) ) // blank or comment (;)
            continue;

		if ( !leagueIDFound && !/^yahoo league id:/.test( rec ) )
		{
			if ( !/^yahoo league id:/i.test( rec ) )
			{
				alert( "The Google spreadsheet you've specified (" + FARM_ROSTERS_URL + ") doesn't have a league identifier (" + leagueID + ") specified in the first row.  Correct the URL or the spreadsheet, then refresh this page to re-enter the URL." );
				GM_setValue(LEAGUE_URL_NAME, "" )
				return;
			}
			if ( !reLeagueID.test( rec ) )
			{
				alert( "The Google spreadsheet you've specified (" + FARM_ROSTERS_URL + ") doesn't have the correct league identifier specified.\r\n\r\nIt should have " + leagueID + " specified, but instead has " + rec + ".\r\n\r\nCorrect the URL or the spreadsheet, then refresh this page to re-enter the URL." );
				GM_setValue(LEAGUE_URL_NAME, "" )
				return;
			}
		}
		leagueIDFound = true;

		var matches = rec.match( /^team:\s+([^\t]+)(?:\t(.*))?/i );
		if ( matches )
		{
			ownerName = matches[ 1 ];
			if ( typeof matches[ 2 ] == 'string' )
			{
				ownerID = matches[ 2 ];
				owners[ ownerID ] = { owner:ownerName, players:new Array() };
			}
			continue;
		}

		if ( ownerName != null )
		{
			var matches = rec.match( /^\t([^\t]+)(?:\t(\d+))?(?:\t(.*))?/i );
			if ( matches )
			{
				var playerName = matches[ 1 ];
				var playerID = typeof matches[ 2 ] == 'string' ? matches[ 2 ] : stripAccents( playerName ).toLowerCase();
				var playerComment = typeof matches[ 3 ] == 'string' ? matches[ 3 ] : '';
				var warning = ( players.hasOwnProperty( playerID ) ) ? 'Player is on more than one roster' : '';
				players[ playerID ] = { id:playerID, ownerID:ownerID, ownerName:ownerName, name:playerName, comment:playerComment, warning:warning, data:null, dataCell:null };
				if ( ownerID != null )
				{
					owners[ ownerID ].players.push( players[ playerID ] );
				}
			}
		}
    }

	var playerLinks = document.evaluate( '//a[contains(@href,"http://sports.yahoo.com/nba/players/")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for ( var i = 0; i < playerLinks.snapshotLength; i++ )
	{
		var link = playerLinks.snapshotItem( i );
		var matches = link.href.match( /.+players\/(\d+)$/ );
		if ( matches )
		{
			var playerID = matches[ 1 ];
			if ( players.hasOwnProperty( playerID ) )
			{
				var lockLink = document.createElement( 'a' );
				lockLink.href = FARM_ROSTERS_DATA_URL;
				lockLink.innerHTML = '<img src="' + LOCK_IMG + '"/>';
				var lockImg = lockLink.firstChild;
				lockImg.setAttribute( "class", "gncOnFarmLock" );
				lockImg.title = 'Owned by ' + players[ playerID ].ownerName;
				if ( players[ playerID ].comment != '' )
					lockImg.title += ( ', ' + players[ playerID ].comment );
				if ( players[ playerID ].warning != '' )
				{
					lockImg.title += ( ', WARNING: ' + players[ playerID ].warning );
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncFarmPlayerWarning" );
				}
				link.parentNode.insertBefore(lockLink, link.nextSibling);
				if ( players[ playerID ].ownerID == currentOwnerID )
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnMyFarm" );
				else
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm" );
				if ( stripAccents( link.innerHTML ).toLowerCase() != stripAccents( players[ playerID ].name ).toLowerCase() )
				{
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncFarmPlayerWarning" );
					lockImg.title += ", WARNING: Player name on Yahoo, " + link.innerHTML + ", doesn't match name on roster, " + players[ playerID ].name;
				}
				link.title = lockImg.title;
			}
			else // try to match the player name
			{
				var playerName = stripAccents( link.innerHTML ).toLowerCase();
				if ( players.hasOwnProperty( playerName ) )
				{
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm" );
					var lockLink = document.createElement( 'a' );
					lockLink.href = FARM_ROSTERS_DATA_URL;
					lockLink.innerHTML = '<img src="' + LOCK_QUESTION_IMG + '"/>';
					var lockImg = lockLink.firstChild;
					if ( players[ playerName ].ownerID == currentOwnerID )
						link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnMyFarm" );
					else
						link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm" );
					link.setAttribute( "class", link.getAttribute( "class" ) + " gncFarmPlayerWarning" );
					lockImg.title = 'This player name matches a name on the farm spreadsheet, and *might* be owned by ' + players[ playerName ].ownerName + ' but the player ID (' + playerID + ') for this player isn\'t yet set in the spreadsheet.  Click the lock image to edit the spreadsheet and add the player ID if needed.';
					link.parentNode.insertBefore(lockLink, link.nextSibling);
					link.title = lockImg.title;
				}
			}
		}
	}

	var ownerID = null;
	// http://baseball.fantasysports.yahoo.com/b1/26105/team?date=2009-03-20&week=1&mid=1
	var matches = location.href.match( /.*\/b\d+\/\d+\/(\d+).*/ );
	if ( !matches )
		matches = location.href.match( /.*\/b\d+\/\d+\/team.*&mid=(\d+).*/ );
	
	if ( matches )
		ownerID = matches[ 1 ];
	else
	{
		var matches = location.href.match( /.*[\?&]mid=(\d+).*/ );
		if ( matches )
			ownerID = matches[ 1 ];
	}
	if ( ownerID && owners.hasOwnProperty( ownerID ) )
	{
		var owner = owners[ ownerID ];
		var lastRoster = document.getElementById( 'statTable1' );
		var tableLegend = document.getElementById( 'tablelegend' );
		if ( lastRoster && tableLegend )
		{
			var farmRoster = document.createElement( 'table' );
			for ( var i = 0; i < lastRoster.attributes.length; i++ )
				farmRoster.setAttribute( lastRoster.attributes[ i ].name, lastRoster.attributes[ i ].value );
			farmRoster.id = "gncFarmRoster";

			tableLegend.parentNode.insertBefore( farmRoster, tableLegend );
			var header = document.createElement( 'h4' );
			header.setAttribute( "style", "margin: 0px 0px 0px 10px; padding: 0px 0px" );
			header.innerHTML = owner.owner + ' Farm: <a style="font-weight: normal; font-size: 11px" href="' + FARM_ROSTERS_DATA_URL + '">(All Farm Roster Data)</a>';
			farmRoster.parentNode.insertBefore( header, farmRoster );
			var html = new Array( '<tr class="headerRow1"><th>Player</th><th>Career MLB 	Stats</th><th>Notes</th></tr></thead>' );
			for ( var iPlayer = 0; iPlayer < owner.players.length; iPlayer++ )
			{
				var class = ( iPlayer % 2 == 0 ) ? "odd" : "even";
				if ( iPlayer == owner.players.length - 1 )
					class += " last";
				else if ( iPlayer == 0 )
					class += " first";
				
				var playerSearch = ' <a href="' + leagueBaseURL + '/playersearch?search=' + owner.players[ iPlayer ].name + 
									'"><img title="Search for this player" class="gncPlayerSearch" src="' + SEARCHPLAYER_IMG + '" /></a>';
		
				if ( !isNaN( parseInt( owner.players[ iPlayer ].id, 10 ) ) )
				{
					var playerHtml = '<a target="sports" href="http://sports.yahoo.com/nba/players/' + owner.players[ iPlayer ].id + '">' + owner.players[ iPlayer ].name + '</a>' + playerSearch;
				}
				else
					var playerHtml = owner.players[ iPlayer ].name + playerSearch;

				var img = '';
				if ( !isNaN( parseInt( owner.players[ iPlayer ].id, 10 ) ) )
				{
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://sports.yahoo.com/nba/players/' + owner.players[ iPlayer ].id + '/career',
						onload: getPlayerDataHandler( handlePlayerData, players[ owner.players[ iPlayer ].id ] ),
						});
					img = '<img src="' + WORKING_IMG_URL + '" />';
				}

				html.push( '<tr class="' + class + '"><td class="player""><div>' + playerHtml + '</div></td><td class="gncFarmPlayerData"><span id="' 
							+ owner.players[ iPlayer ].id + '">' + img + '</span></td><td class="auto stat">' 
							+ owner.players[ iPlayer ].comment + '</td></tr>' );

			}
			if ( iPlayer > 0 )
				html.push( '<tr><td colspan="3" class="gncNotARookie" style="font-size:70%">' + ELIGIBILITY_FOOTNOTE + '</td></tr>' );
			farmRoster.innerHTML = html.join( '' );
		}
		
		var playerElements = document.evaluate( '//td[contains(@class,"gncFarmPlayerData")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if ( playerElements.snapshotLength > 0 )
		for ( var iPlayer = 0; iPlayer < playerElements.snapshotLength; iPlayer++ )
		{
			var el = playerElements.snapshotItem( iPlayer );
			var playerID = parseInt( el.firstChild.id, 10 );
			if ( isNaN( playerID ) )
				continue;
			
			players[ playerID ].dataCell = el.firstChild;
		}
	}
}

function getPlayerDataHandler( responseHandler, player )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, player );
    }
}

function handlePlayerData( responseText, player )
{
	gSpan.innerHTML = responseText;
	var tables = gSpan.getElementsByTagName( 'table' );
	for ( var iTable = 0; iTable < tables.length; iTable++ )
	{
		var table = tables[ iTable ];
		var matches = table.rows[ 0 ].cells[ 0 ].innerHTML.match( /^(?:&nbsp;)*(batting|pitching)$/i );
		if ( matches )
		{
			var pitchingOrBatting = matches[ 1 ];
			var dataIndexes = {};
			var row = table.rows[ 1 ];
			for ( var iCell = 0; iCell < row.cells.length; iCell++ )
			{
				var caption = row.cells[ iCell ].innerHTML.replace( /\b([a-z])\b/i, '$1' ).toLowerCase();
				dataIndexes[ caption ] = iCell;
			}
			for ( var iRow = 2; iRow < table.rows.length; iRow++ )
			{
				var row = table.rows[ iRow ];
				if ( /no stats available/i.test( row.cells[ 0 ].innerHTML ) )
				{
					player.dataCell.innerHTML = '';
				}
				else if ( /career/i.test( row.cells[ 0 ].innerHTML ) )
				{
					if ( pitchingOrBatting.toLowerCase() == 'batting' )
					{
						var ab = getDataValue( row, 'ab' );
						if ( ab )
						{
							ab = parseInt( ab, 10 );
							player.dataCell.innerHTML = ab + ' AB';
							
							var games = getDataValue( row, 'g' );
							if ( games )
							{
								games = parseInt( games, 10 );
								player.dataCell.innerHTML += ', ' + games + ' games';
							}
							
							var eligibility = new BatterEligibility( ab, games );
							if ( !eligibility.isEligible() )
							{
								player.dataCell.setAttribute( "class", "gncNotARookie" );
								player.dataCell.innerHTML = '*' + player.dataCell.innerHTML;
								player.dataCell.title = 'Not rookie eligible';
							}
						}
					}
					else if ( pitchingOrBatting.toLowerCase() == 'pitching' )
					{
						var ipString = getDataValue( row, 'ip' );
						if ( ipString )
						{
							player.dataCell.innerHTML = ipString + ' IP';
							var games = getDataValue( row, 'g' );
							if ( games )
							{
								games = parseInt( games, 10 );
								player.dataCell.innerHTML += ', ' + games + ' games';
							}

							var eligibility = new PitcherEligibility( parseFloat( ipString ), games );
							if ( !eligibility.isEligible() )
							{
								player.dataCell.setAttribute( "class", "gncNotARookie" );
								player.dataCell.innerHTML = '*' + player.dataCell.innerHTML;
								player.dataCell.title = 'Not rookie eligible';
							}
						}
					}
				}
			}
			break;
		}
	}
	
	function getDataValue( row, caption )
	{
		var matches = row.cells[ dataIndexes[ caption ] ].innerHTML.match( /\b(\d+(?:\.?\d+)?)\b/i );
		if ( matches )
			return matches[ 1 ];
		else
			return null;
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

})();
