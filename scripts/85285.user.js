// ==UserScript==
// @name           Yahoo Baseball Show Today's Team Totals
// @namespace      http://glenncarr.com/greasemonkey/fantasybaseball
// @description    Show today's team totals for all teams
// @include        http://baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 588 $
// $LastChangedDate: 2010-09-02 23:51:30 -0500 (Thu, 02 Sep 2010) $
// ==/UserScript==

(function(){


String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

function findAncestor(o, tag)
{
	for(tag = tag.toLowerCase(); o = o.parentNode;)
		if(o.tagName && o.tagName.toLowerCase() == tag)
			return o;
	return null;
}

try {

var divTeams = document.getElementById( 'home-myleagues' );
if ( divTeams == null )
	return;

var teamLinks = document.evaluate("//div[@class='teams']//a[@class='team']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
if ( teamLinks.snapshotLength == 0 )
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

GM_addStyle( 'BUTTON#gncGetTeamTotals { font-size: 9px }' );

var gSpan = document.createElement( 'span' );
var teams = new Array();

var button = document.createElement( 'button' );
button.id = 'gncGetTeamTotals';
button.innerHTML = 'Get Team Totals';
myTeamsHeader.parentNode.insertBefore( button, myTeamsHeader.nextSibling );

for ( var iTeam = 0; iTeam < teamLinks.snapshotLength; iTeam++ )
{
	var teamLink = teamLinks.snapshotItem( iTeam );
	var tr = findAncestor( teamLink, 'tr' );
	if ( tr )
	{
		var trTeamTotals = document.createElement( 'tr' );
		tr.parentNode.insertBefore( trTeamTotals, tr.nextSibling );
		trTeamTotals.innerHTML = '<td id="gncTeamTotals" colspan="' + tr.cells.length + '"></td>';
		trTeamTotals.style.display = 'none';
		var team = { url:teamLink.href, name:teamLink.innerHTML, element:trTeamTotals };
		teams.push( team );
	}
}

button.addEventListener( 'click', function(e)
{
	for ( var iTeam = 0; iTeam < teams.length; iTeam++ )
	{
		var team = teams[ iTeam ];
		team.element.style.display = '';
		team.element.cells[ 0 ].innerHTML = '<span id="gncWorking">Getting totals for ' + team.name + '... <img src="' + WORKING_IMG_URL + '" /></span>';
		GM_xmlhttpRequest( {
			method: 'GET',
			url: team.url,
			onload: getResultsHandler( handleResults, team ),
			} );	
		
		/***************** break; */
	}

	var matchupLinks = document.evaluate("//td[@class='opp']//a[@class='score']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for ( var iMatchup = 0; iMatchup < matchupLinks.snapshotLength; iMatchup++ )
	{
		var matchupLink = matchupLinks.snapshotItem( iMatchup );
		matchupLink.innerHTML = '<img src="' + WORKING_IMG_URL + '" /></span>'
		GM_xmlhttpRequest( {
			method: 'GET',
			url: matchupLink.href,
			onload: getMatchupHandler( handleMatchups, matchupLink ),
			} );	
	}
}, 
false );


function getMatchupHandler( responseHandler, matchupLink )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200  )
            responseHandler( responseDetails.responseText, matchupLink );
        else
            link.innerHTML = 'Error';
    }
}

function handleMatchups( responseText, matchupLink )
{
	gSpan.innerHTML = responseText;
	
	var tables = gSpan.getElementsByTagName( 'table' );
	for ( var iTable = 0; iTable < tables.length; iTable++ )
	{
		var table = tables[ iTable ];
		if ( table.getAttribute( 'id' ) == 'matchup-summary-table' )
		{
			matchupLink.style.fontWeight = "bold";
			matchupLink.style.color = "#aa0000";
			matchupLink.innerHTML = 
				table.rows[ 2 ].cells[ table.rows[ 2 ].cells.length - 1 ].innerHTML
				+ ' - ' +
				table.rows[ 3 ].cells[ table.rows[ 3 ].cells.length - 1 ].innerHTML;
			break;
		}
	}
}


function getResultsHandler( responseHandler, team )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200  )
            responseHandler( responseDetails.responseText, team );
        else
            team.element.innerHTML = 'Error getting totals for  ' + team.name;
    }
}

function handleResults( responseText, team )
{
	gSpan.innerHTML = responseText;
	
	var headers = new Array();
	
	var trs = gSpan.getElementsByTagName( 'tr' );
	for ( var iTr = 0; iTr < trs.length; iTr++ )
	{
		var tr = trs[ iTr ];
		if ( tr.getAttribute( 'class' ) == 'headerRow1' )
		{
			headers.push( tr );
		}
	}
	
	
	var divs = gSpan.getElementsByTagName( 'div' );
	var totals = team.element.cells[ 0 ];
    totals.innerHTML = '';

	var html = new Array();
	html.push( '<table cellpadding="2" width="100%"><tr>' );

	iHeader = 0;
	for ( var iDiv = 0; iDiv < divs.length; iDiv++ )
	{
		var div = divs[ iDiv ];
		if ( div.getAttribute( 'class' ) == 'sum' )
		{
			var tmp = document.createElement( 'span' );
			tmp.innerHTML = div.innerHTML
			var statCells = tmp.getElementsByTagName( 'li' );

			var headerCells = headers[ iHeader++ ].cells;

			html.push( '<td style="border-top:0px; padding: 3px 3px" width="50%"><table style="margin-top: 5px; width: 100%"><tr>' );

			for ( var i = ( headerCells.length - tmp.getElementsByTagName( 'li' ).length ); i < headerCells.length; i++ )
			{
				html.push( '<th style="text-align: right; padding: 3px 5px; font: 85% Verdana;">' + headerCells[ i ].innerHTML.stripTags() + '</th>' );
			}
			html.push( '</tr><tr>' );
			for ( var i = 0; i < statCells.length; i++ )
			{
				html.push( '<td style="text-align: right; padding: 3px 5px; font: 85% Verdana;">' + statCells[ i ].innerHTML.stripTags() + '</td>' );
			}

			html.push( '</tr></table></td>' );
		}
	}

	html.push( '</tr><table>' );

	totals.innerHTML += html.join( '' );
}

} catch ( e ) { GM_log( e ); }

})();