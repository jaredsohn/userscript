// ==UserScript==
// @name           Yahoo Baseball Player Search All Leagues
// @namespace      http://glenncarr.com/greasemonkey/fantasybaseball
// @include        http://baseball.fantasysports.yahoo.com/*
// @description    Search all leagues for a player
// $LastChangedRevision: 542 $
// $LastChangedDate: 2009-07-31 15:23:46 -0500 (Fri, 31 Jul 2009) $
// ==/UserScript==
/*
	Updates:
	29-Jul-2009 - Added 'Clear' button to clear results from search
	31-Jul-2009 - Fixed clear functionality to work after revisting page
*/
(function(){

try {

function handleResults( responseText, league )
{
	setCookie( "gncSearchLeaguesCurrent_" + league.id, "yes" );
	GM_setValue( "gncSearchLeaguesResults_" + league.id, responseText  );
    league.div.innerHTML = '<div class="title"><a href="' + league.url + '">League ' + league.name + '</a>:</div>';
    gSpan.innerHTML = responseText;
    var tables = gSpan.getElementsByTagName( 'table' );
	league.div.style.border = 'inset 2px #aaa';
	league.div.style.padding = '.3em .3em';
	league.div.style.marginBottom = '.3em';
    var found = false;
    for ( var i = 0; i < tables.length; i++ )
    {
    	var table = tables[ i ];
        if ( /^teamtable/i.test( tables[ i ].getAttribute( "class" ) ) )
        {
        	found = true;
        	league.div.innerHTML += '<table class="teamTable" style="width:100%">' + table.innerHTML + '</table>';
            // league.div.appendChild( table );
            /*
        	var results = document.createElement( 'table' );
        	results.innerHTML = table.innerHTML;
        	for ( var i = 0; i < table.attributes.length; i++ )
        		results.setAttribute( table.attributes[ i ].name, table.attributes[ i ].value );
            league.div.appendChild( results );
            */
        }
    }
    if ( !found )
    {
    	league.div.innerHTML +='<div style="padding-right: 2em; font-size: 11px">Not found.</div>';
    }
}

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

var divTeams = document.getElementById( 'home-myleagues' );
if ( divTeams == null )
	return;

var leagueDivs = document.evaluate("//div[@class='league']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
if ( leagueDivs.snapshotLength == 0 )
	return;
	
GM_addStyle( 'DIV.gncSearchResults TABLE { width: 100%; } .gncSearchResults TD, .gncSearchResults TH { font-size: 11px } FORM#gncPlayerSearchForm { padding-bottom: .5em } \
FORM#gncPlayerSearchForm LABEL, DIV.gncSearchResults DIV.title A { color: #00; font-weight: bold; font-size: 12px; margin-top: 5px } \
FORM#gncPlayerSearchForm LABEL { font-weight: bold; } \
DIV#gncSearchResultsNote { font-size: 10px; font-style: italic; } \
' );

var searchForm = document.createElement( 'form' );
searchForm.id = 'gncPlayerSearchForm';
searchForm.innerHTML = 
'<label for="playersearchtext">Search All Leagues By First or Last Name: <input type="text" name="search" value="" class="text" id="gncPlayerSearchText" value=""></label> <input id="gncAllLeaguesSearchButton" type="submit" class="button" value="Find Player"> <input id="gncAllLeaguesSearchClearButton" type="button" class="button" value="Clear">';
searchForm.setAttribute( "onsubmit", "return false;" );
divTeams.parentNode.insertBefore( searchForm, divTeams );
var clearButton = document.getElementById( 'gncAllLeaguesSearchClearButton' );
if ( clearButton )
{
	clearButton.addEventListener( 'click', function(e)
	{
		var note = document.getElementById( 'gncSearchResultsNote' );
		if ( note )
			note.parentNode.removeChild( note );
		searchField.value = '';
		deleteCookie( "gncSearchLeaguesSearchField" );
		for ( var iLeague = 0; iLeague < leagues.length; iLeague++ )
		{
			leagues[ iLeague ].div.style.display = 'none';
			deleteCookie( "gncSearchLeaguesCurrent_" + leagues[ iLeague ].id );
		}
	}, 
	false );
}

var gSpan = document.createElement( 'span' );

var leagues = new Array();

for ( var iLeague = 0; iLeague < leagueDivs.snapshotLength; iLeague++ )
{
	var leagueLink = leagueDivs.snapshotItem( iLeague ).getElementsByTagName( 'a' );
	if ( leagueLink.length == 0 )
		continue;
	leagueLink = leagueLink[ 0 ];
	var div = document.createElement( 'div' );
	div.setAttribute( 'class', 'gncSearchResults' );
	searchForm.parentNode.insertBefore( div, searchForm.nextSibling );

	var league = { id:leagueLink.href.replace( /.*\/(\d+)$/i, '$1' ), name:leagueLink.innerHTML, url:leagueLink.href, div:div };
	leagues.push( league );

	var previousResults = getCookie( "gncSearchLeaguesCurrent_" + league.id );
	if ( previousResults != null )
	{
		handleResults( GM_getValue( "gncSearchLeaguesResults_" + league.id ), league );
	}
}

var searchButton = document.getElementById( 'gncAllLeaguesSearchButton' );
var searchField = document.getElementById( 'gncPlayerSearchText' );
var searchValue = getCookie( "gncSearchLeaguesSearchField" );
if ( searchValue )
{
	searchField.value = searchValue;
	searchField.focus();
	var note = document.createElement( 'div' );
	note.id = "gncSearchResultsNote";
	note.innerHTML = 'Results from last search (player status may be out-of-date):'
	searchForm.parentNode.insertBefore( note, searchForm.nextSibling );
}

function doSearch(e) 
{
	var note = document.getElementById( 'gncSearchResultsNote' );
	if ( note )
		note.parentNode.removeChild( note );
	
	if ( /^\s*$/i.test( searchField.value ) )
	{
		var note = document.createElement( 'div' );
		note.id = "gncSearchResultsNote";
		note.innerHTML = 'Enter a player name.'
		searchForm.parentNode.insertBefore( note, searchForm.nextSibling );
		return;
	}
	
	setCookie( "gncSearchLeaguesSearchField", searchField.value );
	for ( var iLeague = 0; iLeague < leagues.length; iLeague++ )
	{
		var league = leagues[ iLeague ];
		league.div.style.display = '';
		league.div.innerHTML = 'Searching ' + league.name + '...';
		GM_xmlhttpRequest( {
			method: 'GET',
			url: league.url + '/playersearch?search=' + searchField.value,
			onload: getResultsHandler( handleResults, league ),
			} );
	}
}

searchButton.addEventListener( 'click', doSearch, false );

function getResultsHandler( responseHandler, league )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200  )
            responseHandler( responseDetails.responseText, league );
        else
            divLeague.innerHTML = 'Error searching ' + league.name;
    }
}

} catch ( e ) { alert( e ); }

})();