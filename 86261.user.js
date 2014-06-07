// ==UserScript==
// @name           LandGrab block highlighting
// @namespace      landgrab_show_posistions
// @include        http://landgrab.net/landgrab/RealtimeBoard
// @include        http://landgrab.net/landgrab/ViewBoard
// @version        1.5
// ==/UserScript==

if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	document.documentElement.appendChild(script);
}


function main() {

Layout();

function Layout()
{
	if( ! canSeePlayers() ) return;
	insertLink( 'player_status_tbody', '../thead/tr/td/span', ShowPlayerPositions);
	insertLink( 'cont_status_tbody', "../../following-sibling::*/table/thead/tr/td/span", ShowTeamPositions );
	insertLink( 'cont_status_tbody', '../thead/tr/td/span', ShowContinentPositions );
	insertLink( 'cont_status_tbody', '../thead/tr/td', ShowOwnedContinentPositions, "Owned continents" );
}


function canSeePlayers()
{
	return window.players != null;
}


function insertLink( nearestElementId, xpathToInsertion, fn, text )
{
	var elem = document.getElementById(nearestElementId);
	var xpathResult = document.evaluate(xpathToInsertion, elem, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
	
	var topRow = xpathResult.iterateNext();
	if( ! topRow ) return;

	insertLinkAt( topRow, fn, text );
}


function insertLinkAt( element, fn, text )
{
	var shadeIcon = document.createElement('span');
	shadeIcon.innerHTML = '<img style="padding-left:5px; padding-right:5px" src="images/selectable_notify.png">';
	element.appendChild(shadeIcon); 

	if( text ) {
		shadeIcon.innerHTML = '[' + text + ' ' + shadeIcon.innerHTML + ']';
		element = shadeIcon;	
	}
	
	element.style.cursor = 'pointer';
	element.addEventListener("click", fn, true);
}


function ShowPlayerPositions() 
{
	showPositions( "players", 
		function(_player, _continent) { return window.players[_player].color; } 
		);
}


function ShowTeamPositions() 
{
	showPositions( "teams", 
		function(_player, _continent) 
		{ 
			var _teamId = window.playerToTeamHashtable.get(_player);
			return window.teamColorsHashtable.get(_teamId);
		} );
}


function ShowContinentPositions() 
{
	showPositions( "continents", 
			function(_player, _continent) { return window.continents[_continent].color; } 
		);
}


function ShowOwnedContinentPositions()
{
	showPositions( "owned_continents", 
		function(_player, _continent) { 
			var continentOwner = window.continents[_continent].owner;
			return continentOwner != 0
				? window.players[continentOwner].color
				: false;
		} );
}


function showPositions( _highlight, _highlightColour )
{
	window.clearCanvas();

	if( window.borderShowingID == _highlight )
		return window.borderShowingID = "";
	
	window.borderShowingID = _highlight;
	highlightTerritoriesBlockColours( _highlightColour );
}


function highlightTerritoriesBlockColours(_highlightCheck)
{		
	var _fillOptions = {};
	_fillOptions.lineWidth = 14;
	//_fillOptions.diagPattern=true;

	var _territoryIds = window.armyOwnerHashtable.keys();
	for(var ndx=0; ndx < _territoryIds.length; ndx++)
	{
		var _territoryId = _territoryIds[ndx];
		var _playerId = window.armyOwnerHashtable.get(_territoryId);
		var _continentId = window.terrToContMap.get(_territoryId);
		var _continentColour = window.continents[_continentId].color;
		
		var highlightColor = _highlightCheck( _playerId, _continentId );
		if( highlightColor == false ) continue;

		_fillOptions.lineColor = _continentColour;
		_fillOptions.fillColor = highlightColor;
		
		window.highlightTerritory(_territoryId,255,255,255,_fillOptions);
	}
}

}