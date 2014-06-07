// ==UserScript==
// @name TotalRankings on Newzbin v.1
// @namespace http://mywebsite.com/myscripts
// @description Display Movie, game rankings on Newzbin
// @include http://www.newzbin.com/*
// ==/UserScript==
//
//
// Orginal script by CrewOne
// Adapated to disply Games by Roman
//   Game sites: GameRankings.com, IGN.com & Gamespot.com


(function()
{
function getIGNScore( IGN_url, node )
{
	GM_xmlhttpRequest({
	method: 'GET',
	
	url: IGN_url,
	
	headers: { 'User-agent': 'Mozilla/4.0 (compatible)' },
	
	onload: function(responseDetails)
	{
	
		var re_scoreIGN = /<div id="scoresBoxIgn">\n<div><a href=\"[^\"]*\">([0-9]{1}\.[0-9]{1})<\/a>/i;
		
		var re_scoreRDR = /<div id="scoresBoxReaderAvgNum"><a href=\"[^\"]*\">([0-9]{1}\.[0-9]{1})<\/a>/i;		
		var re_votesRDR = /<div id="scoresBoxReaderAvgNfo"><strong>([0-9,]+)<\/strong> ratings/i;
		
		var re_scorePR = /<div id="scoresBoxPressAvgNum"><a href=\"[^\"]*\">([0-9]{1}\.[0-9]{1})<\/a>/i;
		var re_votesPR = /<div id="scoresBoxPressAvgNfo"><a href=\"[^\"]*\"><strong>([0-9,]+)<\/strong> press ratings/i;		
		
		var IGN_result = responseDetails.responseText;		
		try
		{
			var arr = re_scoreIGN.exec( IGN_result );
			var scoreIGN = arr[ 1 ];
			
			var arr = re_scoreRDR.exec( IGN_result );
			var scoreRDR = arr[ 1 ];
			
			var arr = re_votesRDR.exec( IGN_result );
			var votesRDR = arr[ 1 ];
			
			var arr = re_scorePR.exec( IGN_result );
			var scorePR = arr[ 1 ];
						
			var arr = re_votesPR.exec( IGN_result );
			var votesPR = arr[ 1 ];
		}
		catch( e )
		{
		}
		
		AddIGNScore( scoreIGN, scoreRDR, votesRDR, scorePR, votesPR, node );
	}
	});
}

function AddIGNScore( scoreIGN, scoreRDR, votesRDR, scorePR, votesPR, node )
{
	if( window.location.href.indexOf( "/post/" ) != -1 )
	{
		newElement = document.createElement('div');
		newElement.appendChild( document.createTextNode( "IGN:" + scoreIGN + "/10, Reader:" + scoreRDR + "/10 (" + votesRDR + "), Press:" + scorePR + "/10 (" + votesPR + ")") );
		node.parentNode.insertBefore(newElement, node.nextSibling);
	}
	else
	{
		node.parentNode.parentNode.cells[ 9 ].innerHTML = node.parentNode.parentNode.cells[ 9 ].innerHTML + "<DIV>IGN: " + scoreIGN + "</DIV>";
	}
}
function getGRScore( GR_url, node )
{
	GM_xmlhttpRequest({
	method: 'GET',
	
	url: GR_url,
	
	headers: { 'User-agent': 'Mozilla/4.0 (compatible)' },
	
	onload: function(responseDetails)
	{
		var re_score = /<b>([0-9]{1}\.[0-9]{1})<\/b>/i;
		var re_votes = /([0-9,]+) Votes/i;
		
		var GR_result = responseDetails.responseText;
		
		try
		{
			var arr = re_score.exec( GR_result );
			var score = arr[ 1 ];
			
			var arr = re_votes.exec( GR_result );
			var votes = arr[ 1 ];
		}
		catch( e )
		{
		}
		
		AddGRScore( score, votes, node );
	}
	});
}

function AddGRScore( score, votes, node )
{
	if( window.location.href.indexOf( "/post/" ) != -1 )
	{
		newElement = document.createElement('div');
		newElement.appendChild( document.createTextNode( "GameRankings: " + score + "/10 (" + votes + ")") );
		node.parentNode.insertBefore(newElement, node.nextSibling);
	}
	else
	{
		node.parentNode.parentNode.cells[ 9 ].innerHTML = node.parentNode.parentNode.cells[ 9 ].innerHTML + "<DIV>GR: " + score + "</DIV>";
	}
}

function getGSScore( GS_url, node )
{
	GM_xmlhttpRequest({
	method: 'GET',
	
	url: GS_url,
	
	headers: { 'User-agent': 'Mozilla/4.0 (compatible)' },
	
	onload: function(responseDetails)
	{
	
	var scoreGSold = "";
	var scoreGS = "";
	var scoreRDR = "";
	var votesRDR = "";
	var scorePR = "";
	var votesPR = "";
	
	var re_scoreGSold = /<div class="number">\n\s*<a href=\"[^\"]*\">\n\s*([0-9]{1}\.[0-9]{1})\n\s*<\/a>/i;
	var re_scoreGS = /We Say<\/a><br \/>\n\s*<span class=\"f18 fwb txt1\">([0-9]{1}\.[0-9]{1})<\/span>/i;

	var re_scoreRDR = /You Say<\/a><br \/>\n\s*<span class=\"f18 fwb txt1\">([0-9]{1}\.[0-9]{1})<\/span>/i;
	var re_votesRDR = /You Say<\/a><br \/>\n\s*<span class=\"f18 fwb txt1\">[0-9]{1}\.[0-9]{1}<\/span><br \/>\n\s*\(([0-9,]+) votes\)/i;	

	var re_scorePR = /They Say<\/a><br \/>\n\s*<span class=\"f18 fwb txt1\">([0-9]{1}\.[0-9]{1})<\/span>/i;
	var re_votesPR = /They Say<\/a><br \/>\n\s*<span class=\"f18 fwb txt1\">[0-9]{1}\.[0-9]{1}<\/span><br \/>\n\s*\(([0-9,]+) reviews\)/i;
	

	var GS_result = responseDetails.responseText;	
	try
	{			
		var arr = re_scoreGSold.exec( GS_result );
		if (arr != undefined)
			scoreGSold = arr[ 1 ];

		var arr = re_scoreGS.exec( GS_result );
		if (arr != undefined)
			scoreGS = arr[ 1 ];

		var arr = re_scoreRDR.exec( GS_result );
		if (arr != undefined)
			scoreRDR = arr[ 1 ];

		var arr = re_votesRDR.exec( GS_result );
		if (arr != undefined)
			votesRDR = arr[ 1 ];

		var arr = re_scorePR.exec( GS_result );
		if (arr != undefined)
			scorePR = arr[ 1 ];

		var arr = re_votesPR.exec( GS_result );
		if (arr != undefined)
			votesPR = arr[ 1 ];
	}
	catch( e )
	{
	}
	
	

	AddGSScore( scoreGSold, scoreGS, scoreRDR, votesRDR, scorePR, votesPR, node );
	}
	});
}

function AddGSScore(scoreGSold, scoreGS, scoreRDR, votesRDR, scorePR, votesPR, node)
{
	if( window.location.href.indexOf( "/post/" ) != -1 )
	{
		newElement = document.createElement('div');
		
		if(scoreGSold == "") {
			newElement.appendChild( document.createTextNode( "GameSpot:" + scoreGS + "/10, Reader:" + scoreRDR + "/10 (" + votesRDR + "), Press:" + scorePR + "/10 (" + votesPR + ")") );
		} else {
			newElement.appendChild( document.createTextNode( "GameSpot:" + scoreGSold + "/10") );
		}
		node.parentNode.insertBefore(newElement, node.nextSibling);
	}
	else
	{
		if(scoreGSold == "") {
			node.parentNode.parentNode.cells[ 9 ].innerHTML = node.parentNode.parentNode.cells[ 9 ].innerHTML + "<DIV>GS: " + scoreGS + "</DIV>";
		} else {
			node.parentNode.parentNode.cells[ 9 ].innerHTML = node.parentNode.parentNode.cells[ 9 ].innerHTML + "<DIV>GS: " + scoreGSold + "</DIV>";
		}
	}
}



function getIMDBScore( imdb_url, node )
{
	GM_xmlhttpRequest({
	method: 'GET',
	
	url: imdb_url,
	
	headers: { 'User-agent': 'Mozilla/4.0 (compatible)' },
	
	onload: function(responseDetails)
	{
		var re_score = /([0-9]{1}\.[0-9]{1})\/10/i;
		var re_votes = /\(([0-9,]+) votes\)/i;		
		
		var imdb_result = responseDetails.responseText;
		
		try
		{
			var arr = re_score.exec( imdb_result );
			var score = arr[ 1 ];
			
			var arr = re_votes.exec( imdb_result );
			var votes = arr[ 1 ];
		}
		catch( e )
		{
		}
		
		AddIMDBScore( score, votes, node );
	}
	});
}

function AddIMDBScore( score, votes, node )
{
	if( window.location.href.indexOf( "/post/" ) != -1 )
	{
		newElement = document.createElement('div');
		newElement.appendChild( document.createTextNode( "IMDB: " + score + "/10 (" + votes + ")") );
		node.parentNode.insertBefore(newElement, node.nextSibling);
	}
	else
	{
		node.parentNode.parentNode.cells[ 9 ].innerHTML = node.parentNode.parentNode.cells[ 9 ].innerHTML + "<DIV>IMDB: " + score + "</DIV>";
	}
}

var anchors = document.getElementsByTagName("a");
for (var i=0; i<anchors.length; i++)
{
	var anchor = anchors[i];
	var url = anchor.href;
	
	var exist = url.indexOf( "imdb.com" );
		
	if (exist != -1 )
	{
		getIMDBScore( url, anchor );
	}
	
	var exist = url.indexOf( "ign.com" );
	
	if (exist != -1 )
	{
		getIGNScore( url, anchor );
	}
	
	var exist = url.indexOf( "gamerankings.com" );
		
	if (exist != -1 )
	{
		getGRScore( url, anchor );
	}
	
	var exist = url.indexOf( "gamespot.com" );
			
	if (exist != -1 )
	{
		getGSScore( url, anchor );
	}
}

})();