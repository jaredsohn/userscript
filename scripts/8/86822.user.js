// ==UserScript==
// @name           Yahoo Fantasy Football Defensive Stats
// @namespace      www.yahoo.com
// @include        http://football.fantasysports.yahoo.com/*
// @description    Display opposing defensive team passing or rushing rankings for Yahoo fantasy football leagues - updated to reflect fftoday.com stats
// @author         bbates
// $LastChangedDate: 2010-09-26
// ==/UserScript==
/*
    about:config settings:
        good_rgb_color - default: #33ff33 (green)
        bad_rgb_color - default: #ff3333 (red)
        font_rgb_color - default: #000000 (black)

	This is an update of Glenn Carr's script here: http://userscripts.org/scripts/show/15590
	The majority of the code is his, I just switched from Yahoo to FFToday, added the extra pages for the other player positions and massaged the data as needed.
	I split out the stats for QA, WR, RB, and TE as well as adding stats for K, DEF and IDP players (DL, LB, and DB).
	
	Notes:
	* fftoday uses numbers in the URL to specify the team.  Because of this, if they change the correlation at some point down the line the script will break. line 114 
	* Likewise they use numbers in the URL for the position stats.  These are set on lines 66-74 if they are changed in the future
	* There had to be more logic put in around how the tool tip was built because the stats for all of the players are different, there are multiple of the same stat for some positions (yard twice for RB for rushing and receiving) and also to change the totals for some stats to per game instead of season totals.
	
	Known issues:
	* Yahoo seems to have changed how they represent what week it is on the Players page.  Because of this showing Last Years stats for early weeks is not working on that page, only on the My Team page.
	* This script takes longer than the original script to load the stats, most likely because it is loading 8 pages instead of 2.  I am not sure if there is anything which can be done about that.
*/

(function() {
Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()-1)/7);
} 
	
var today = new Date();
var weekno = today.getWeek();
	
// Show last week's stats if we're in the first week of the season.  Change (1) to (1|2) if you want to show last year's stats for weeks 1 and 2, change it to (1|2|3) to show last year's stats for weeks 1-3, etc.
var EARLY_WEEK = /week (1|2)\b/i;  

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

// Find the player tables
var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( playerTables.snapshotLength == 0 )
    return;

// Find week and display last year's stats if it's early in the season
var week = document.evaluate("//div[@id='weeknav']/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var lastYear = null;
var YEAR;
if ( week.snapshotLength > 0 )
{
	week = week.snapshotItem( 0 );
	if ( EARLY_WEEK.test( week.innerHTML ) )
	{
		lastYear = 1;
		YEAR = 1900 + new Date().getYear() - 1;
	}
	else
	{
		YEAR = 1900 + new Date().getYear();
	}
}
else
{
	YEAR = 1900 + new Date().getYear();
}

var BASE_URL = 'http://fftoday.com/stats/fantasystats.php?Season=' + YEAR + '&GameWeek=Season&Side=Allowed&sort_order=ASC&PosID=';
var QB_DEFENSE_URL = BASE_URL + '10';
var RUSHING_DEFENSE_URL = BASE_URL + '20';
var WR_DEFENSE_URL = BASE_URL + '30';
var TE_DEFENSE_URL = BASE_URL + '40';
var K_DEFENSE_URL = BASE_URL + '80';
var DEF_DEFENSE_URL = BASE_URL + '99';
var DB_DEFENSE_URL = BASE_URL + '70';
var LB_DEFENSE_URL = BASE_URL + '60';
var DL_DEFENSE_URL = BASE_URL + '50';

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
DIV#gncMatchupLegend { text-align: left; font-size: 77%; padding-left: 10px; background: #fff; } \
TABLE#gncMatchupLegend { background: white; visibility: visible; } \
TABLE#gncMatchupLegend TD { width: 15px; height: 15px; font-style: italic; padding: 0px; } \
#fftodaylinks a:hover { text-decoration:underline; } \
#fftodaylinks a { padding:5px 10px 10px 10px; text-decoration:none; line-height:150%; } \
#fftodaylinks { border-top:0; font:bold 77% Verdana; zoom:1; background:#fff; } \
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

var myLinks = document.createElement('div');
myLinks.setAttribute("id","fftodaylinks");
myLinks.setAttribute("class","navlist");
myLinks.innerHTML = '<br/>FFToday Stats Links<br/>' +
	'<ul>' + 
    '<li style="padding-left:10px;"><a href="' + QB_DEFENSE_URL + '" target="_blank">QB</a></li>' + 
    '<li><a href="' + WR_DEFENSE_URL + '" target="_blank">WR</a></li>' + 
    '<li><a href="' + RUSHING_DEFENSE_URL + '" target="_blank">RB</a></li>' + 
    '<li><a href="' + TE_DEFENSE_URL + '" target="_blank">TE</a></li>' + 
    '<li><a href="' + K_DEFENSE_URL + '" target="_blank">K</a></li>' + 
    '<li><a href="' + DEF_DEFENSE_URL + '" target="_blank">D</a></li>' + 
    '<li><a href="' + DB_DEFENSE_URL + '" target="_blank">DB</a></li>' + 
    '<li><a href="' + DL_DEFENSE_URL + '" target="_blank">DL</a></li>' + 
    '<li><a href="' + LB_DEFENSE_URL + '" target="_blank">LB</a></li>' + 		 
    '</ul>'
      
legend.appendChild( myLinks );
yspcontent.parentNode.insertBefore( legend, yspcontent.nextSibling );

var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'9017',Atl:'9024',Bal:'9030',Buf:'9000',Car:'9028',Chi:'9019',Cin:'9005',Cle:'9006',Dal:'9014',Den:'9009',Det:'9020',GB:'9021',Hou:'9031',Ind:'9001',Jac:'9029',KC:'9010',Mia:'9002',Min:'9022',NE:'9003',NO:'9026',NYG:'9015',NYJ:'9004',Oak:'9011',Phi:'9016',Pit:'9008',SD:'9012',Sea:'9013',SF:'9027',StL:'9025',TB:'9023',Ten:'9007',Was:'9018' };
var teamCells = new Array();

var GOOD_COLOR = GM_getValue("good_rgb_color", "#33ff33");
GM_setValue("good_rgb_color", GOOD_COLOR);

var BAD_COLOR = GM_getValue("bad_rgb_color", "#ff3333");
GM_setValue("bad_rgb_color", BAD_COLOR);

var FONT_COLOR = GM_getValue("font_rgb_color", "#000000");
GM_setValue("font_rgb_color", FONT_COLOR);

var lastChecked = GM_getValue("weekno", "");
	if (lastChecked == weekno){
		var rushingDResponseText = GM_getValue("rushingStats", "");
		var passingDResponseText = GM_getValue("passingStats", "");	
		var wrDresponseText = GM_getValue("receivingStats", "");
		var teDresponseText = GM_getValue("tightendStats", "");
		var kDresponseText = GM_getValue("kickerStats", "");
		var DefresponseText = GM_getValue("defenseStats", "");
		var dlresponseText = GM_getValue("dlStats", "");
		var lbresponseText = GM_getValue("lbStats", "");
		var dbresponseText = GM_getValue("dbStats", "");
		if (dbresponseText != "" && lbresponseText != "" && dlresponseText != "" && DefresponseText != "" && kDresponseText != "" && teDresponseText != "" && wrDresponseText != "" && passingDResponseText != "" && rushingDResponseText != ""){
			displayMatchups( kDresponseText, dlresponseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
			}
	}
	
fetchMatchupData();

function fetchMatchupData()
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: QB_DEFENSE_URL,
		onload: getPassingDHandler(handlePassD),
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
        onload: getRushingDHandler( handleWRD, responseText ),
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

function handleWRD( responseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: WR_DEFENSE_URL,
        onload: getWrDHandler( handleTED, responseText, passingDResponseText ),
        });
}

function getWrDHandler( responseHandler, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, rushingDResponseText, passingDResponseText );
    }
}

function handleTED( responseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: TE_DEFENSE_URL,
        onload: getTEDHandler( handleDef, responseText, rushingDResponseText, passingDResponseText ),
        });
}

function getTEDHandler( responseHandler, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleDef( responseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: DEF_DEFENSE_URL,
        onload: getDefHandler( handleLB, responseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getDefHandler( responseHandler, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleLB( responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: LB_DEFENSE_URL,
        onload: getLBHandler( handleDB, responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getLBHandler( responseHandler, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleDB( responseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: DB_DEFENSE_URL,
        onload: getDBHandler( handleDL, responseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getDBHandler( responseHandler, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleDL( responseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: DL_DEFENSE_URL,
        onload: getDLHandler( handleKD, responseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getDLHandler( responseHandler, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}
function handleKD( responseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: K_DEFENSE_URL,
        onload: getKDHandler( displayMatchups, responseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getKDHandler( responseHandler, dlresponseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, dlresponseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function displayMatchups( kDresponseText, dlresponseText, dbresponseText, lbresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
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
    var receivingStats = parseStats( wrDresponseText );
	var tightendStats = parseStats( teDresponseText );
	var kickerStats = parseStats( kDresponseText );
	var defenseStats = parseStats( DefresponseText );
	var dlStats = parseStats( dlresponseText );
	var lbStats = parseStats( lbresponseText );
	var dbStats = parseStats( dbresponseText );
	GM_setValue("rushingStats", rushingDResponseText);
	GM_setValue("passingStats", passingDResponseText);	
	GM_setValue("receivingStats", wrDresponseText);
	GM_setValue("tightendStats", teDresponseText);
	GM_setValue("kickerStats", kDresponseText);
	GM_setValue("defenseStats", DefresponseText);
	GM_setValue("dlStats", dlresponseText);
	GM_setValue("lbStats", lbresponseText);
	GM_setValue("dbStats", dbresponseText);
	GM_setValue("weekno", weekno);		
		
	var colors = ColorTransition( BAD_COLOR, GOOD_COLOR, passingStats.teams.length );

    // Legend
    legendTable.innerHTML = '<tr><td align="left">Bad matchups</td><td align="right">Good matchups</td><td style="white-space: nowrap; padding-left: 2em; color: red; visibility: visible">' + (lastYear != null ? '(Displaying matchups from last year)' : '' ) + '</td></tr>';
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
			    tip = "VS QB " + buildToolTip( teamAbbr, playerPos, passingStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, passingStats ) - 1 ];
                break;
            case 'wr':
            case 'wr,rb' :
			    tip = "VS WR " + buildToolTip( teamAbbr, playerPos, receivingStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, receivingStats ) - 1 ];
                break;
            case 'te':			    
				tip = "VS TE " + buildToolTip( teamAbbr, playerPos, tightendStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, tightendStats ) - 1 ];
                break;
            case 'rb,te':
            case 'rb':
                tip = "VS RB " + buildToolTip( teamAbbr, playerPos, rushingStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, rushingStats ) - 1 ];
                break;
            case 'k':
                tip = "VS K " + buildToolTip( teamAbbr, playerPos, kickerStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, kickerStats ) - 1 ];
                break;
            case 'dt':
            case 'de':
            	tip = "VS DL " + buildToolTip( teamAbbr, playerPos, dlStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, dlStats ) - 1 ];
                break;	
			case 'lb':
            	tip = "VS LB " + buildToolTip( teamAbbr, playerPos, lbStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, lbStats ) - 1 ];
                break;			
			case 's':
			case 'cb':
			case 's,cb':
            	tip = "VS DB " + buildToolTip( teamAbbr, playerPos, dbStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, dbStats ) - 1 ];
                break;
			case 'def':
				tip = "VS DEF " + buildToolTip( teamAbbr, playerPos, defenseStats );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, defenseStats ) - 1 ];
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
        if ( /class='tablehdr'/i.test( tables[ iTable ] ) )
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
    for ( var iRow = 1; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];

        // header
        if ( iRow == 1 )
        {
            statNames.push( 'Rank' );
            for ( var iCell = 1; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellText = cell.innerHTML.stripTags().replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
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
                var cellText = cell.innerHTML.stripTags().replace(/,/, "");

                // team
                if ( iCell == 0 )
                {
			if (cell.getElementsByTagName( "A" )[ 0 ])
			{
				Abbr = cell.getElementsByTagName( "A" )[ 0 ].href.replace( /http.*&TeamID=/i, "" );
				teamAbbr = Abbr.replace(/&Season.*ID=1/i, "");
				teamStats.push( iRow - 1 ); // rank
				teams.push( teamAbbr );
			}
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

function buildToolTip( teamAbbr, playerPos, teamStats )
{
	if ( !teamStats.stats.hasOwnProperty( teamAbbr ) )
		return '<no stats yet for ' + teamAbbr + '>';
	
    var tip = new Array();
    var stats = teamStats.stats[ teamAbbr ];
    var statNames = teamStats.statNames;
	var yardCount = 1;
	var tdCount = 1;
	for ( var i = 0; i < stats.length; i++ )
    {
		if (statNames[ i ].toLowerCase() == 'g')
			var games = stats[ i ];
	}
    for ( var i = 0; i < stats.length; i++ )
    {

		switch(playerPos)
		{
		    case 'qb':
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'int':
					case 'sack':
					case 'ffpts/g':
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'yard':
						if (yardCount == 1) {
							yardCount = 0;
							tip.push( 'Pass Yd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						}
						else {
							yardCount = 1;
							tip.push( 'QB Rush Yd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
							}
						break;
					case 'td':
						if (tdCount == 1) {
							tdCount = 0;
							tip.push( 'Pass Td/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						}
						else {
							tdCount = 1;
							tip.push( 'QB Rush Td/G: ' + Math.round((stats[ i ]/games)*100)/100 );
							}
						break;
					default:
						break;
				}
				break;
			case 'te':
            case 'wr':
            case 'wr,rb' :
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'ffpts/g':
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'yard':
					case 'td':
						tip.push( 'Rec' + statNames[ i ] + '/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					default:
						break;
				}
			break;
            case 'rb,te':
            case 'rb':
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'ffpts/g':
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'yard':
						if (yardCount == 1) {
							yardCount = 0;
							tip.push( 'RushYd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						}
						else {
							yardCount = 1;
							tip.push( 'RecYd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
							}
						break;
					case 'td':
						if (tdCount == 1) {
							tdCount = 0;
							tip.push( 'RushTd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						}
						else {
							tdCount = 1;
							tip.push( 'RecTd/G: ' + Math.round((stats[ i ]/games)*100)/100 );
							}
						break;
					default:
						break;
				}
			break;
            case 'k':
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'ffpts/g':
					case 'fg%':					
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'fgm':
					case 'epm':
						tip.push( statNames[ i ] + '/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					default:
						break;
				}
			break;
			case 'lb':	
			case 's':
			case 'cb':
			case 's,cb':
            case 'dt':
            case 'de':
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'ffpts/g':
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'int':
					case 'sack':
					case 'tackle':
					case 'safety':
						tip.push( statNames[ i ] + '/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					case 'fr':
						tip.push( 'FumR/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					case 'ff':
						tip.push( 'FumF/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					default:
						break;
				}
			break;
            case 'def':
				switch( statNames[ i ].toLowerCase() )
				{
					case 'rank':
					case 'ffpts/g':
						tip.push( statNames[ i ] + ': ' + stats[ i ] );
						break;
					case 'int':
					case 'sack':
					case 'deftd':
					case 'safety':
						tip.push( statNames[ i ] + '/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					case 'pa':
							tip.push( 'Points/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					case 'fr':
							tip.push( 'Fum/G: ' + Math.round((stats[ i ]/games)*100)/100 );
						break;
					default:
						break;
				}
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