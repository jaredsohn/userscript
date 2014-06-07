// ==UserScript==
// @name           Iowa League Prospect Eligible
// @namespace      http://glenncarr.com/greasemonkey/fantasybaseball
// @include        http://baseball.fantasysports.yahoo.com/b1/150*
// @description    Italicizes players that did not exceed 150AB/30IP before 2012 (are Prospect Eligible in 2013)
// $LastChangedRevision: 632 $
// $LastChangedDate: 2012-09-18 14:50:54 -0600 (Tue, 18 Sep 2012) $
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
     6-Aug-2010 - Modified to only display career stats when clicking header link
    23-Jul-2011 - FF5 issue fixed - changed variable 'class' to 'cls' (thanks schnitzl...@gmail.com)
    16-Feb-2012 - Call GM_xmlhttpRequest from setTimeout to prevent it from being blocked.
    14-May-2012 - Removed setTimeout experiment which started causing a bug due to FF changes in global variable scoping
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

var matches = location.href.match( /^(http:\/\/baseball\.fantasysports\.yahoo\.com\/(b\d+\/\d+)).*/i );
if ( matches == null )
    return;
    
var leagueID = matches[ 2 ];
var leagueBaseURL = matches[ 1 ];
var LEAGUE_URL_NAME = "yahoo_farm_rosters_spreadsheet_" + leagueID;

var FARM_ROSTERS_URL = GM_getValue(LEAGUE_URL_NAME, '' );
if ( FARM_ROSTERS_URL == null || FARM_ROSTERS_URL == '' )
{
    FARM_ROSTERS_URL = prompt( "Enter URL of Google spreadsheet containing prospect eligible players (if a URL is already in the box below, just press OK):", "https://docs.google.com/spreadsheet/pub?key=0AmkBNPY405WAdFVObWxzeWZwMDVTZXQ3bVBsbHpJeHc&output=txt" );
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
var LOCK_IMG = "data:image/png;base64,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";
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
a.gncOnFarm1 { font-style:italic; } \
a.gncOnMyFarm1 { font-style:italic; } \
img.gncOnFarmLock { border-width: 0px; vertical-align: text-bottom; height: 10px } \
img.gncPlayerSearch { border-width: 0px; vertical-align: absmiddle; height: 8px } \
a.gncFarmPlayerWarning { font-style:italic; } \
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

        var matches = rec.match( /^team:\s+([^\t]+)(?:\t([^\t]*))?/i );      
        if ( matches )
        {
            ownerName = matches[ 1 ];
            if ( typeof matches[ 2 ] == 'string' )
            {
                ownerID = matches[ 2 ];
                GM_log( '[' + ownerID + ']' );
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

    var playerLinks = document.evaluate( '//a[contains(@href,"http://sports.yahoo.com/mlb/players/")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
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
                lockImg.title = players[ playerID ].ownerName;
                if ( players[ playerID ].comment != '' )
                    lockImg.title += ( ', ' + players[ playerID ].comment );
                if ( players[ playerID ].warning != '' )
                {
                    lockImg.title += ( ', WARNING: ' + players[ playerID ].warning );
                    link.setAttribute( "class", link.getAttribute( "class" ) + " gncFarmPlayerWarning" );
                }
                link.parentNode.insertBefore(lockLink, link.nextSibling);
                if ( players[ playerID ].ownerID == currentOwnerID )
                    link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnMyFarm1" );
                else
                    link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm1" );
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
                    link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm1" );
                    var lockLink = document.createElement( 'a' );
                    lockLink.href = FARM_ROSTERS_DATA_URL;
                    lockLink.innerHTML = '<img src="' + LOCK_QUESTION_IMG + '"/>';
                    var lockImg = lockLink.firstChild;
                    if ( players[ playerName ].ownerID == currentOwnerID )
                        link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnMyFarm1" );
                    else
                        link.setAttribute( "class", link.getAttribute( "class" ) + " gncOnFarm1" );
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
            header.innerHTML = owner.owner + ' Iowa Minors Players: <a style="font-weight: normal; font-size: 11px" href="' + FARM_ROSTERS_DATA_URL + '">(All Farm Roster Data)</a>';
            farmRoster.parentNode.insertBefore( header, farmRoster );
            var html = new Array( '<tr class="headerRow1"><th>Player</th><th>Notes</th><th><a id="gncGetCareerStats" href="#">Get Career Stats</a></th></tr></thead>' );
            for ( var iPlayer = 0; iPlayer < owner.players.length; iPlayer++ )
            {
                var cls = ( iPlayer % 2 == 0 ) ? "odd" : "even";
                if ( iPlayer == owner.players.length - 1 )
                    cls += " last";
                else if ( iPlayer == 0 )
                    cls += " first";
                
                var playerSearch = ' <a href="' + leagueBaseURL + '/playersearch?search=' + owner.players[ iPlayer ].name + 
                                    '"><img title="Search for this player" class="gncPlayerSearch" src="' + SEARCHPLAYER_IMG + '" /></a>';
        
                if ( !isNaN( parseInt( owner.players[ iPlayer ].id, 10 ) ) )
                {
                    var playerHtml = '<a target="sports" href="http://sports.yahoo.com/mlb/players/' + owner.players[ iPlayer ].id + '">' + owner.players[ iPlayer ].name + '</a>' + playerSearch;
                }
                else
                    var playerHtml = owner.players[ iPlayer ].name + playerSearch;

                html.push( '<tr class="' + cls + '"><td class="player""><div>' + playerHtml + '</div></td>' + 
                            '<td class="auto stat">' + owner.players[ iPlayer ].comment + '</td>' + 
                            '<td class="gncFarmPlayerData"><span id="' + owner.players[ iPlayer ].id + '"></span></td>' + 
                            '</tr>' 
                            );

            }
            if ( iPlayer > 0 )
                html.push( '<tr><td colspan="3" class="gncNotARookie" style="font-size:70%">' + ELIGIBILITY_FOOTNOTE + '</td></tr>' );
            farmRoster.innerHTML = html.join( '' );

            try {
            var getCareerStatsButton = document.getElementById( 'gncGetCareerStats' );
            if ( getCareerStatsButton )
            {
                getCareerStatsButton.addEventListener( 'click', function(e)
                {
                    e.preventDefault();

                    var playerElements = document.evaluate( '//td[contains(@class,"gncFarmPlayerData")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                    if ( playerElements.snapshotLength > 0 )
                    for ( var iPlayer = 0; iPlayer < playerElements.snapshotLength; iPlayer++ )
                    {
                        var el = playerElements.snapshotItem( iPlayer );
                        var playerID = parseInt( el.firstChild.id, 10 );
                        if ( isNaN( playerID ) )
                            continue;
                            
                        var player = players[ playerID ];

                        player.dataCell = el.firstChild;
                        if ( !isNaN( parseInt( owner.players[ iPlayer ].id, 10 ) ) )
                        {
                            player.dataCell.innerHTML = '<img src="' + WORKING_IMG_URL + '" />';
                            GM_xmlhttpRequest({
                                method: 'GET',
                                url: 'http://sports.yahoo.com/mlb/players/' + owner.players[ iPlayer ].id + '/career',
                                onload: getPlayerDataHandler( handlePlayerData, players[ owner.players[ iPlayer ].id ] ),
                                });
                        }
                    }
                }, 
                false );
            }
            } catch ( e ) { alert( e ); }
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