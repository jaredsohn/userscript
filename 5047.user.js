// Have It Your Way for Bug Cafe
// Version 2.0
// Aug 6, 2006
// Copyright (c) 2006, Pete Hanson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Adds a secondary rack to Bug Cafe's "Bug Words" game that lets you rearrange
// the tile order (not just shuffling!) in any sequence you want.
//
// TODO:  Add drag-and-drop capability in addition to click-and-click.
// TODO:  Add drag-and-drop or click-and-click play.
// TODO:  Make double-rack Indigo board work with both racks, but each rack
//        should be treated differently.
// The TODO list should be treated as a wish list, not a list of promises for
// future functionality.
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later:
//
//     http://greasemonkey.mozdev.org/
//
// You also need Firefox 1.5 or later:
//
//     http://www.mozilla.com/
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bug Cafe Have It Your Way
// @namespace     http://www.well.com/user/wolfy/
// @description	  Add rearrangeable rack to Bug Cafe "Bug Words" game
// @include       http://us.bugcafe.net/boardgames/bugwords/
// @include       http://us.bugcafe.net/boardgames/letterbug/
// ==/UserScript==
//
// Changelog:
// - 20060203: work started
// - 20060205: v0.1 BETA: first working version
// - 20060206: v0.1.1 BETA:
//      + Added slightly better error handling for beta period
// - 20060206: v0.1.2 BETA:
//      + Now works with non-Indigo board (both Enhanced and not Enhanced)
//      + Now works with double-rack Indigo board, but only the first rack is
//        modified.
//      + Reworked error handling again
// - 20060209: v1.0
//      + Initial release
// - 20060228: v1.0.1
//      + Added code to detect when user does not have "Shuffle" option enabled
// - 20060806: v2.0
//      + Rewritten to use the new boards
//
// Use tabsize=4

// Color constants

var COLOR_ACTIVE   = 'red' ;
var COLOR_BORDER   = 'black' ;
var COLOR_RACK     = '#fff6dd' ;
var COLOR_SELECTED = 'green' ;

// Global variables

var gSelectedTile = -1 ;		// Currently selected tile number
var gTable ;					// The rearrangeable rack table

//-----------------------------------------------------------------------------
// Retrieves the rearrangeable rack.
	
function GetMyRack()
{
	if (gTable)
	{
		return gTable ;
	}
	
	var tables = document.getElementsByTagName('table') ;
	for (var i = 0 ; i < tables.length ; ++i)
	{
		if (tables[i].id == 'bcrr')
		{
			gTable = tables[i] ;
			break ;
		}
	}

	return gTable ;
}

//-----------------------------------------------------------------------------
// Retrieves the tile (a <td> element) in position "pos".  This assumes that
// the spacing gaps have already been inserted in the rack.
	
function GetTile(pos)
{
	var rack = GetMyRack() ;
	var cells = rack.getElementsByTagName('td') ;
	return cells[pos + 2] ;
}
	
//-----------------------------------------------------------------------------
// Handles clicks on the gaps in the rack

function GapClicked(pos)
{
	var rack     = GetMyRack() ;
	var cells    = rack.getElementsByTagName('td') ;
	var selected = cells[gSelectedTile + 2].innerHTML ;
	var selnum   = gSelectedTile ;
	TileUnclick() ;
	
	if (selnum >= 0 && selnum != pos)
	{
		if (pos < selnum)
		{
			for (var i = selnum ; i > pos + 2 ; i -= 2)
			{
				cells[i + 2].innerHTML = cells[i].innerHTML ;
			}
			
			cells[pos + 2 + 1].innerHTML = selected ;
		}
		else if (pos > selnum)
		{
			for (var i = selnum + 2 ; i < pos ; i += 2)
			{
				cells[i].innerHTML = cells[i + 2].innerHTML ;
			}
			
			cells[pos + 2 - 1].innerHTML = selected ;
		}
	}
}

//-----------------------------------------------------------------------------
// Deselect a tile.
	
function TileUnclick()
{
	if (gSelectedTile != -1)
	{
		var tile = GetTile(gSelectedTile) ;
		tile.setAttribute('class', 'bcrrTile') ;
		gSelectedTile = -1 ;
	}
}
	
//-----------------------------------------------------------------------------
// Handles clicks on the tiles in the rack
	
function TileClicked(pos)
{
	TileUnclick() ;
	gSelectedTile = pos ;
	GetTile(pos).setAttribute('class', 'bcrrTileSelected') ;
}
	
//-----------------------------------------------------------------------------
// Adds styles required by this script.
	
function AddStyles()
{
	GM_addStyle(
		// The table used for the rack
		'#bcrr'												+
		'{'													+
		'  background-color: #fffff0 ;'						+
		'  border-collapse: collapse ;'						+
		'  padding: 0 ;'									+
		'  margin: 1em 0 ;'									+
		'}'													+

		// Generic row info for our rack	
		'#bcrr tr'											+
		'{'													+
		'  padding: 0 ;'									+
		'  margin: 0 ;'										+
		'}'													+
		
		// The title row
		'#bcrr tr#bcrrTitleRow'								+
		'{'													+
		'  font-family: Verdana, sans-serif ;'				+
		'  font-size: 80% ;'								+
		'  font-weight: bold ;'								+
		'}'													+
		
		// Cell for the title row
		'#bcrr tr#bcrrTitleRow td'							+
		'{'													+
		'  line-height: .7em ;' +
		'}'													+

		// The instructions row
		'#bcrr tr#bcrrInstructionsRow'						+
		'{'													+
		'  font-family: Verdana, sans-serif ;'				+
		'  font-size: 75% ;'								+
		'  font-weight: lighter ;'							+
		'  color: #555555 ;'								+
		'  border-bottom: 1px solid black ;'					+
		'}'													+
		
		// Cell for the instructions row
		'#bcrr tr#bcrrInstructionsRow td'					+
		'{'													+
		'  line-height: .7em ;' 							+
		'}'													+

		// Row for the tiles
		'#bcrr tr#bcrrTiles'								+
		'{'													+
		'}'													+
		
		// A tile
		'#bcrr tr#bcrrTiles td.bcrrTile'					+
		'{'													+
		'  border-top: 1px solid black ;'					+
		'}'													+
		
		'#bcrr tr#bcrrTiles td.bcrrTile'					+
		'{'													+
		'  height: 36px ;'									+
		'  width: 32px ;'									+
		'  max-width: 32px ;'								+
		'  text-align: center ;'							+
		'  vertical-align: middle ;'						+
		'  font-family: Verdana, sans-serif ;'				+
		'  font-size: 160% ;'								+
		'  background-color: #fff0a0 ;'						+
		'}'													+

		'#bcrr tr#bcrrTiles td.bcrrTile:hover'				+
		'{'													+
		'  background-color: #ffd0d0 ;'						+
		'}'													+

		'#bcrr tr#bcrrTiles td.bcrrTileSelected'			+
		'{'													+
		'  border-top: 1px solid black ;'					+
		'  height: 36px ;'									+
		'  width: 32px ;'									+
		'  max-width: 32px ;'								+
		'  text-align: center ;'							+
		'  vertical-align: middle ;'						+
		'  font-family: Verdana, sans-serif ;'				+
		'  font-size: 160% ;'								+
		'  background-color: #a0ffa0 ;'						+
		'}'													+

		'#bcrr tr#bcrrTiles td.bcrrGap:hover'				+
		'{'													+
		'  background-color: #ffd0d0 ;'						+
		'}'													+

		'#bcrr tr#bcrrTiles td.bcrrEmpty'					+
		'{'													+
		'  height: 36px ;'									+
		'  width: 32px ;'									+
		'  max-width: 32px ;'								+
		'  border: none ;'									+
		'}'													+

		'#bcrr tr#bcrrTiles td.bcrrEmptyGap'					+
		'{'													+
		'  height: 36px ;'									+
		'  width: 8px ;'									+
		'  max-width: 8px ;'								+
		'  border: none ;'									+
		'}'													+

		// So we don't have to worry about the trailing + chars
		''
	) ;
}
	
//-----------------------------------------------------------------------------
// Locate and return the letter rack (the entire table for the rack).
// Throws an error if the letter rack cannot be found.
	
function LocateRack()
{
	var tables = document.getElementsByTagName('table') ;
	for (var i = 0 ; i < tables.length ; ++i)
	{
		var inner = tables[i].innerHTML ;
		if (inner.match(/^\s*<tbody>\s*<tr>\s*<td[^>]*>\s*<font[^>]*>\s*<b>\s*Letter Rack<\/b>/))
		{
			return tables[i] ;
		}
	}

	throw new Error("Failed to find letter rack in this page") ;
}

//-----------------------------------------------------------------------------

function MakeClickableGap(td, pos)
{
	var gapClicked = function()
	{
		GapClicked(pos) ;
	} ;
			
	td.addEventListener('click', gapClicked, true) ;
}

//-----------------------------------------------------------------------------

function MakeClickableTile(td, pos)
{
	var tileClicked = function()
	{
		TileClicked(pos) ;
	} ;
			
	td.addEventListener('click', tileClicked, true) ;
}

//-----------------------------------------------------------------------------
// Make a new rearrangeable rack.

function MakeNewRack(rack)
{
	// Retrieve the table rows.
	var rows = rack.getElementsByTagName('tr') ;
	if (rows.length < 2)
	{
		throw new Error("Could not parse rows from rack") ;
	}

	// Parse the tiles from the row
	var tiles = rows[1].getElementsByTagName('td') ;
	if (tiles.length != 7)
	{
		throw new Error("Tile row has " + tiles.length + " cells, not 7") ;
	}

	var letters = new Array ;
	for (var i = 0 ; i < 7 ; ++i)
	{
		var letter = tiles[i].innerHTML ;
		letter = letter.replace(/\s/g, ' ') ;
		letter = letter.replace(
			/^.*?<font size="4">(?:<font color="red">)?/,
			''
		) ;
		letter = letter.replace(
			/^.*?<font color="#cc0000" face="Verdana" size="3"><b>/,
			''
		) ;
		letter = letter.replace(/<.*/, '') ;
		letters.push(letter) ;
	}
	
	// Construct the table user for our rack.
	var newrack = document.createElement('table') ;
	newrack.setAttribute('border', '1') ;
	newrack.setAttribute('id', 'bcrr') ;
	
	// Construct the title row.
	var tr = document.createElement('tr') ;
	var td = document.createElement('td') ;
	td.appendChild(document.createTextNode('Have It Your Way')) ;
	td.setAttribute('colspan', '15') ;
	td.setAttribute('align', 'left') ;
	tr.setAttribute('id', 'bcrrTitleRow') ;
	tr.appendChild(td) ;
	newrack.appendChild(tr) ;

	// Construct the instructions row.
	tr = document.createElement('tr') ;
	td = document.createElement('td') ;
	td.appendChild(document.createTextNode('To rearrange tiles, click a tile, then click a gap')) ;
	td.setAttribute('colspan', '15') ;
	td.setAttribute('align', 'left') ;
	tr.setAttribute('id', 'bcrrInstructionsRow') ;
	tr.appendChild(td) ;
	newrack.appendChild(tr) ;
	
	// Construct the tiles row for the tack
	tr = document.createElement('tr') ;
	tr.setAttribute('id', 'bcrrTiles') ;
	var more = true ;
	for (var i = 0 ; i < 15 ; ++i)
	{
		td = document.createElement('td')

		if ((i % 2) == 0)
		{
			// Gap
			td.setAttribute('width', '8') ;
			if (more)
			{
				td.setAttribute('class', 'bcrrGap') ;
				MakeClickableGap(td, i) ;
			}
			else
			{
				td.setAttribute('class', 'bcrrEmptyGap') ;
			}
		}
		else
		{
			// Tile
			var j = Math.floor(i / 2) ;
			
			if (letters[j] == '&nbsp;')
			{
				td.setAttribute('class', 'bcrrEmpty') ;
				more = false ;
			}
			else
			{
				td.setAttribute('class', 'bcrrTile') ;
				td.appendChild(document.createTextNode(letters[j])) ;
				MakeClickableTile(td, i) ;
			}
		}
	
		tr.appendChild(td) ;
	}

	newrack.appendChild(tr) ;

	// Insert the new rack just above the "Enter Letters" form.
	
	var insertionPoint = rack.nextSibling ;
	var sibling        = insertionPoint ;
	do
	{
		var nextsib = sibling.nextSibling ;
		if (nextsib && nextsib.innerHTML)
		{
			if (nextsib.innerHTML.match(/Enter Letters/))
			{
				sibling = nextsib ;
				break ;
			}
		}
		else if (nextsib.innerHTML == '')
		{
			insertionPoint = nextsib ;
		}
		
		sibling = nextsib ;
	}
	while (1) ;
	
	rack.parentNode.insertBefore(newrack, insertionPoint) ;
} ;

//-----------------------------------------------------------------------------
// Main program begins here.

// Add styles required by this script
AddStyles() ;
	
// Locate and modify the rack
var rack = LocateRack() ;

// Perform the page update (but only after the page has loaded).
window.addEventListener(
	"load",
	function()
	{
		MakeNewRack(rack) ; 
	},
	true
) ;
