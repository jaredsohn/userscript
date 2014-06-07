// Bug Cafe Big Board
// Version 1.2
// Feb 19, 2006
// Copyright (c) 2006, Pete Hanson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Replaces the board in Bug Cafe's "Bug Words" game with one a larger board.
// After installing this script, go to Tools, User Script Commands, Big Board
// Preferences to set your desired square size.
//
// TODO:  Automatch default size of board to the user's browser window size.
//
// TODO:  Make tile values appear on just played tiles when using the Indigo
//        board.
//
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
// @name          Bug Cafe Big Board
// @namespace     http://www.well.com/user/wolfy/
// @description	  Replaces the board in Bug Cafe's "Bug Words" game with a larger version
// @include       http*://*.bugcafe.net/
// @include       http*://*.bugcafe.net/enhanced/
// @include       http*://*.bugcafe.net/indigo/
// @include       http*://*.bugcafe.net/manager/board.bug?*
// @include       http*://*.bugcafe.net/messages/?sb_game=*
// ==/UserScript==
//
// Changelog:
// - 20060214: v0.1 BETA
//      + first working version
// - 20060215: v1.0:
//      + first public release
// - 20060217: v1.1:
//      + font size adjusts according to square size
// - 20060218: v1.1.1: 
//      + reworked font size adjustments
//      + added tile values when there is room
// - 20060219: v1.1.2:
//      + updated to use XPath for faster updates
// - 20060219: v1.2
//      + Added preference setting for box size
//      + Added preference for inclusion of tile values
//      + Confirmed operation with Enhanced, Indigo, and Standard boards
//
// Use tabsize=4

var DEFAULT_SQUARE_SIZE = 20 ;				// Default square size (in pixels)
var FONT_FAMILY = 'sans-serif' ;	// Font family (duh)
var FONT_WEIGHT = 'bold' ;					// font weight

var SQUARE_SIZE ;							// Actual square size
var DISPLAY_VALUES ;						// Display values on tiles?

var SQUARE_SIZE_SELECT_LIST = [				// Available square sizes
	20,
	24,
	28,
	32,
	36,
	40,
	44,
	48,
] ;
	
var VALUE = {								// Tile values
	A : 1,		B : 3,		C : 3, 
	D : 2,		E : 1,		F : 4,
	G : 2,		H : 4,		I : 1,
	J : 8,		K : 5,		L : 1,
	M : 3,		N : 1,		O : 1,
	P : 3,		Q : 10,		R : 1,
	S : 1,		T : 1,		U : 1,
	V : 4,		W : 4,		X : 8,
	Y : 4,		Z : 10,
} ;

var USED_BLANK_COLOR = '#008200' ;	// Used to detect blanks when assigning
									// tile values to played tiles
									
//-----------------------------------------------------------------------------
// Perform a simple XPath query.

function XPath(query)
{
	return document.evaluate(
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	) ;
}

//-----------------------------------------------------------------------------
// Add require styles

function AddStyles()
{
	var font_size  = Math.max(8, SQUARE_SIZE - 2 * 4) ;
	var value_size = Math.floor(SQUARE_SIZE / 3) ;

	GM_addStyle(
		// Class used to style tiles and empty squares
		'.BigBoard '										+
		'{'													+
		'  height: ' + SQUARE_SIZE + ' !important ; '		+
		'  width: ' + SQUARE_SIZE + ' !important ; '		+
		'  font-family: ' + FONT_FAMILY + ' !important ; '	+
		'  font-weight: ' + FONT_WEIGHT + ' !important ; '	+
		'  font-size: ' + font_size + 'px !important ; '	+
		'  line-height: ' + font_size + 'px !important ;'	+
		'  padding: 0px !important ; '						+
		'}'													+
		
		// Class used to style letter values on tiles
		'.BigBoardLetterValue '								+
		'{'													+
		'  font-size: ' + value_size + ' !important ; '		+
		'  letter-spacing: -1px !important ; '				+
		'  line-height: ' + value_size + 'px !important ;'	+
		'  margin: 0px !important ; '						+
		'  padding: 0px !important ; '						+
		'  vertical-align: bottom !important ; '			+
		'}'													+

		// Class used for preferences box
		'.BigBoardPreferences '								+
		'{'													+
		'  background-color: yellow ; '						+
		'  border: 1px solid black ; '						+
		'  font-family: Verdana, sans-serif ; '				+
		'  font-size: 80% ; '								+
		'  text-align: center ; '							+
		'  margin-top: 0.1in ; '							+
		'  margin-bottom: 0.1in ; '							+
		'  padding: 0.1in 0.333in ; '						+
		'}'													+
		
		// All done.
		''
	) ;
}

//-----------------------------------------------------------------------------
// Returns true if the tile represented by "tile" is a blank tile.

function IsBlank(tile)
{
	return tile.getAttribute('bgcolor') == USED_BLANK_COLOR ;
}
	
//-----------------------------------------------------------------------------
// Append tile value to a tile.

function AppendValue(tile, value)
{
	if (DISPLAY_VALUES == 'checked')
	{
		var tileValue = document.createElement('span') ;
		tileValue.setAttribute('class', 'BigBoardLetterValue') ;
		tileValue.appendChild(document.createTextNode(value)) ;
		tile.appendChild(tileValue) ;
	}
}

//-----------------------------------------------------------------------------
// Parses the content of a tile.  If "tile" is an empty square, returns an
// empty object.  Otherwise, the returned object has the following properties:
//
// tag    - the node name for the outermost node in the cell
// color  - the color assigned to the tile (null if no color is set)
// letter - the letter on this tile
// value  - the letter value (an empty string if this tile is a blank)
//

function ParseTile(cell)
{
	var content = cell.innerHTML ;
	var data    = content.match( /^<(b)><font color="(\S*)".*?>(.)</ ) ||
				  content.match( /^<(font) color="(\S*)".*?><b>(.)</ ) ||
				  content.match( /^<(font) .*?><b>(.)</ )              ||
				  content.match( /^<(b)>(.)</ )                        ||
				  content.match( /^<(span).*?>(.)</ ) ;

	if (data)
	{
		var result = {
			tag    : data[1],
			color  : data.length == 3 ?  null   : data[2],
			letter : data.length == 3 ? data[2] : data[3],
		} ;
		
		result.value = IsBlank(cell) ? '' : VALUE[result.letter] ;
		return result ;
	}
	
	return null ;
}

//-----------------------------------------------------------------------------
// Perform adjustments to a single cell of class 'solid-black'.

function UpdateSolidBlackCell(cell)
{
	var info = ParseTile(cell) ;
	if (info)
	{
		var square = document.createElement('span') ;
		if (info.color)
		{
			square.style.color = info.color ;
		}

		var letter = document.createTextNode(info.letter) ;
		square.appendChild(letter) ;
		AppendValue(square, info.value) ;
		
		var element = cell.getElementsByTagName(info.tag) ;
		element[0].parentNode.replaceChild(square, element[0]) ;
	}
}

//-----------------------------------------------------------------------------
// Perform adjustments to a single cell of class 'solid-pointer'.

function UpdateSolidPointerCell(cell)
{
	var inputs = cell.getElementsByTagName('input') ;
	if (inputs.length == 1)
	{
		inputs[0].setAttribute('class', 'BigBoard') ;

		if (cell.childNodes[0].nodeName == 'FONT')
		{
			var fonts = cell.getElementsByTagName('font') ;
			if (fonts.length == 1)
			{
				fonts[0].parentNode.replaceChild(inputs[0], fonts[0]) ;
			}
		}
	}
}

//-----------------------------------------------------------------------------
// Update board by cell class.

function UpdateBoardByClass(cls, updateCell)
{
	var cells = XPath('//TD[@class="' + cls + '"]') ;
	for (var i = 0 ; i < cells.snapshotLength ; ++i)
	{
		var cell = cells.snapshotItem(i) ;
		if (! cls.match(/BigBoard$/))
		{
			cell.setAttribute('class', cls + ' BigBoard') ;
		}
		
		updateCell(cell) ;
	}
}

//-----------------------------------------------------------------------------
// Replace the board with a larger one.

function MakeBigBoard(redraw)
{
	AddStyles() ;

	var bigBoard = '' ;
	if (redraw)
	{
		bigBoard += ' BigBoard' ;
	}
	
	UpdateBoardByClass(
		'solid-black' + bigBoard, 
		function(cell) { UpdateSolidBlackCell(cell) ; }
	) ;

	UpdateBoardByClass(
		'solid-pointer' + bigBoard,
		function(cell) { UpdateSolidPointerCell(cell) ; }
	) ;
}

//-----------------------------------------------------------------------------
// Set the square size and any parameters that depend on the square size.

function SetSquareSize(size)
{
	SQUARE_SIZE = size ;
	GM_setValue('Square Size', size) ;
}

//-----------------------------------------------------------------------------
// Change event listener for square size drop down list in preferences.

function ChangeSquareSize(event)
{
	SetSquareSize(SQUARE_SIZE_SELECT_LIST[event.target.selectedIndex]) ;
	MakeBigBoard(true) ;
}

//-----------------------------------------------------------------------------
// Toggle tile value displays

function ToggleTileValues(event)
{
	DISPLAY_VALUES = event.target.checked ? 'checked' : '' ;
	SetSquareSize(GM_getValue('Square Size', DEFAULT_SQUARE_SIZE)) ;
	MakeBigBoard(true) ;
}

//-----------------------------------------------------------------------------
// Close the preferences box.

function ClosePreferencesBox()
{
	var table = document.getElementById('Big Board Preferences Table') ;
	if (table)
	{
		table.parentNode.removeChild(table) ;
	}
}

//-----------------------------------------------------------------------------
// Add a row element to the preferences box

function AddRowToPreferences(prefs)
{
	var td = document.createElement('td') ;
	var tr = document.createElement('tr') ;
	
	for (var i = 1 ; i < arguments.length ; ++i)
	{
		td.appendChild(arguments[i]) ;
	}
	
	tr.appendChild(td) ;
	prefs.appendChild(tr) ;
}

//-----------------------------------------------------------------------------
// Display the preferences box.

function DisplayPreferencesBox()
{
	// Don't do anything if the preferences box is already displayed
	if (document.getElementById('Big Board Preferences Table'))
	{
		return ;
	}
	
	// Create the table
	var prefsTable = document.createElement('table') ;
	prefsTable.setAttribute('border', '0') ;
	prefsTable.setAttribute('align', 'center') ;
	prefsTable.setAttribute('class', 'BigBoardPreferences')
	prefsTable.setAttribute('id', 'Big Board Preferences Table') ;
	
	// Fill out the title line
	var title = document.createElement('h4') ;
	title.appendChild(document.createTextNode('Big Board Preferences')) ;
	AddRowToPreferences(prefsTable, title) ;
	
	// Set up drop down list for setting the square size
	var squareSizeDropDown = document.createElement('select') ;
	squareSizeDropDown.setAttribute('name', 'square size') ;
	squareSizeDropDown.addEventListener('change', ChangeSquareSize, true) ;
	for (var i = 0 ; i < SQUARE_SIZE_SELECT_LIST.length ; ++i)
	{
		var size   = SQUARE_SIZE_SELECT_LIST[i] ;
		var option = document.createElement('option') ;
		option.setAttribute('value', size) ;
		if (size == GM_getValue('Square Size'))
		{
			option.setAttribute('selected', 'selected') ;
		}
		
		option.appendChild(document.createTextNode(size)) ;
		squareSizeDropDown.appendChild(option) ;
	}

	// Fill out the row where we set the square size
	var setSize = document.createElement('b') ;
	var label = document.createTextNode('Desired square size (in pixels): ') ;
	setSize.appendChild(label) ;
	AddRowToPreferences(prefsTable, setSize, squareSizeDropDown)

	// Add checkbox for inclusion of tile values
	var showTileValues = document.createElement('b') ;
	var label = document.createTextNode('Show values on played tiles? ') ;
	showTileValues.appendChild(label) ;
	var showTileValuesCheckbox = document.createElement('input') ;
	showTileValuesCheckbox.setAttribute('type', 'checkbox') ;
	showTileValuesCheckbox.setAttribute('name', 'show tile values') ;
	showTileValuesCheckbox.setAttribute('checked', DISPLAY_VALUES) ;
	showTileValuesCheckbox.addEventListener('change', ToggleTileValues, true) ;
	AddRowToPreferences(prefsTable, showTileValues, showTileValuesCheckbox) ;
	
	// Create close button
	var closeButton = document.createElement('input') ;
	closeButton.setAttribute('type', 'submit') ;
	closeButton.setAttribute('name', 'close') ;
	closeButton.setAttribute('value', 'Close Preferences') ;
	closeButton.addEventListener('click', ClosePreferencesBox, true) ;
	AddRowToPreferences(prefsTable, closeButton) ;
	
	// Add the preferences table to the top of the screen
	document.body.insertBefore(prefsTable, document.body.firstChild) ;
}

//-----------------------------------------------------------------------------
// Install preferences menu item

function MakePreferencesMenu()
{
	GM_registerMenuCommand(
		'Big Board Preferences',
		function()
		{
			DisplayPreferencesBox() ;
		}
	) ;
}

//-----------------------------------------------------------------------------
// Main program begins here.

if (GM_registerMenuCommand && GM_setValue && GM_getValue)
{
	DISPLAY_VALUES = GM_getValue('Display Values', 'checked') ;
	SetSquareSize(GM_getValue('Square Size', DEFAULT_SQUARE_SIZE)) ;
	MakePreferencesMenu() ;
	MakeBigBoard(false) ;	// Since we make no innerHTML changes we can make
							// the update without using an event listener.
}
else
{
	alert('Please upgrade Greasemonkey to the latest release to use this script.') ;
}
							
//window.addEventListener(
//	"load",
//	function()
//	{
//		MakeBigBoard() ; 
//	},
//	true
//) ;

