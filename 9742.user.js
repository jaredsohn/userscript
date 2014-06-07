// Imdb.com Info Hide Script
// version 0.4b
// 2007-07-03
// Copyright (c) 2007, Ken Murdock
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Imdb.com Info Hide Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Imdb.com Info Hide Script
// @author         Ken Murdock
// @namespace      http://www.badaids.com
// @description    Provides a menu with which to toggle the display of several lines of information from Imdb.com title pages.
// @include        http://imdb.com/title/tt*/
// @include        http://*.imdb.com/title/tt*/
// ==/UserScript==

// Check we are able to store persistent data
if( typeof GM_getValue == 'undefined' || typeof GM_setValue == 'undefined' )
{
	alert('Unable to create persistent data. Please upgrade Greasemonkey to the latest version.');
	return;
}

// Get the current language idx
var language = GM_getValue( 'lang', 0 );
var languagesCount = 1;

// Langs: English-US, 
var langMenuArr = [
	'Rating',
	'Photo Gallery',
	'Director',
	'Writer',
	'Release Date',
	'Genre',
	'Tagline',
	'Plot Outline',
	'Plot Synopsis',
	'Plot Keywords',
	'Awards',
	'User Comments (Snippet)',
	'Cast',
	'Runtime',
	'Country',
	'Language',
	'Color',
	'Aspect Ratio',
	'Sound Mix',
	'Certification',
	'Filming Locations',
	'MOVIEmeter',
	'Company',
	'Trivia',
	'Goofs',
	'Quotes',
	'Movie Connections',
	'Soundtrack',
	'User Comments (Full)',
	'Message Boards',
	'Recommendations',
];

// Langs: English-US, 
var langSearchArr = [
	'tn15rating',
	'tn15recent',
	'Director',
	'Writer',
	'Release Date',
	'Genre',
	'Tagline',
	'Plot Outline',
	'Plot Synopsis',
	'Plot Keywords',
	'Awards',
	'User Comments',
	'cast',
	'Runtime',
	'Country',
	'Language',
	'Color',
	'Aspect Ratio',
	'Sound Mix',
	'Certification',
	'Filming Locations',
	'MOVIEmeter',
	'Company',
	'Trivia',
	'Goofs',
	'Quotes',
	'Movie Connections',
	'Soundtrack',
	'idComments',
	'idMessages',
	'idRecommendations',
];

// AccessIdx, VarName, Type, Object
var objectTagsArr = [
	0,	'Rating',		'id',		undefined,
	1,	'PhotoGallery',		'id',		undefined,
	2,	'Director',		'h5',		undefined,
	3,	'Writer',		'h5',		undefined,
	4,	'ReleaseDate',		'h5',		undefined,
	5,	'Genre',		'h5',		undefined,
	6,	'Tagline',		'h5',		undefined,
	7,	'PlotOutline',		'h5',		undefined,
	8,	'PlotSynopsis',		'h5',		undefined,
	9,	'PlotKeywords',		'h5',		undefined,
	10,	'Awards',		'h5',		undefined,
	11,	'UserCommentsSnippet',	'h5',		undefined,
	12,	'Cast',			'table',	undefined,
	13,	'Runtime',		'h5',		undefined,
	14,	'Country',		'h5',		undefined,
	15,	'Language',		'h5',		undefined,
	16,	'Color',		'h5',		undefined,
	17,	'AspectRatio',		'h5',		undefined,
	18,	'SoundMix',		'h5',		undefined,
	19,	'Certification',	'h5',		undefined,
	20,	'FilmingLocations',	'h5',		undefined,
	21,	'MOVIEmeter',		'h5',		undefined,
	22,	'Company',		'h5',		undefined,
	23,	'Trivia',		'h5',		undefined,
	24,	'Goofs',		'h5',		undefined,
	25,	'Quotes',		'h5',		undefined,
	26,	'MovieConnections',	'h5',		undefined,
	27,	'Soundtrack',		'h5',		undefined,
	28,	'UserCommentsFull',	'id',	undefined,
	29,	'MessageBoards',	'id',	undefined,
	30,	'Recommendations',	'id',	undefined,
];

// Use these vars to index the above array
var objectTagsIdxAccessIdx = 0;
var objectTagsIdxVarName = 1;
var objectTagsIdxType = 2;
var objectTagsIdxObject = 3;
var objectTagsMax = 4;

// The number of actual info items
var infoCount = objectTagsArr.length / objectTagsMax;

// Id of the menu we'll be adding
var infoMenuId = 'imdbInfoToggleDiv';
var togIdStr = 'tog';

// Create vars if not initialised - default to false
var varName;
for( var i=0; i<infoCount; i++ )
{
	varName = objectTagsArr[ i*objectTagsMax + objectTagsIdxVarName ];
	GM_setValue( varName, GM_getValue( varName, true ) );
}
GM_setValue( 'showMenu', GM_getValue( 'showMenu', true ) );
GM_setValue( 'lang', GM_getValue( 'lang', 0 ) );

// Assign the relevant objects to each info type
function GM_assignObjects()
{
	// Fill an array with all div objects
	var arrDiv = document.getElementsByTagName('div');

	for( var i=0; i<infoCount; i++ )
	{
		// Predefine a var to hold our div
		var objectToToggle = undefined;
		var searchType = objectTagsArr[ i*objectTagsMax + objectTagsIdxType ];
		var accessIdx = objectTagsArr[ i*objectTagsMax + objectTagsIdxAccessIdx ];
		var searchText = langSearchArr[ ( accessIdx * languagesCount ) + language ];

		// Choose search method by type, and find our object
		if( searchType == 'id' )
		{
			for( var j=0; j<arrDiv.length; j++ )
			{
				if( arrDiv[ j ].id == searchText )
				{
					objectToToggle = arrDiv[ j ];
				}
			}
		
		}
		else if( searchType == 'table' )
		{
			for( var j=0; j<arrDiv.length; j++ )
			{
				// Only test div objects which contain exactly one <table> tag
				if( arrDiv[ j ].getElementsByTagName('table').length == 1 )
				{
					if( arrDiv[ j ].getElementsByTagName('table')[0].className == searchText )
					{
						objectToToggle = arrDiv[ j ];
					}
				}
			}
		}
		else if( searchType == 'class' )
		{
			for( var j=0; j<arrDiv.length; j++ )
			{
				if( arrDiv[ j ].className == searchText )
				{
					objectToToggle = arrDiv[ j ];
				}
			}
		}
		else if( searchType == 'h5' )
		{
			for( var j=0; j<arrDiv.length; j++ )
			{
				// Only test div objects which contain exactly one <h5> tag
				if( arrDiv[ j ].getElementsByTagName('h5').length == 1 )
				{
					if( arrDiv[ j ].getElementsByTagName('h5')[0].textContent.substring( 0, searchText.length ) == searchText )
					{
						objectToToggle = arrDiv[ j ];
					}
				}
			}
		}

		objectTagsArr[ i*objectTagsMax + objectTagsIdxObject ] = objectToToggle;
	}
}

// Sets the initial states of all objects
function GM_setInitialStates()
{
	for( var i=0; i<infoCount; i++ )
	{
		var object = objectTagsArr[ i*objectTagsMax + objectTagsIdxObject ];
		var menuLink = document.getElementById( togIdStr + i );
		var showObject = GM_getValue( objectTagsArr[ i*objectTagsMax + objectTagsIdxVarName ], true );
		GM_setObjectDisplay( object, menuLink, showObject );
	}

	// Set menu visibility
	GM_toggleMenu( false );
}

function GM_toggleDisplayVariable( menuLink )
{
	if( menuLink == undefined )
		return;

	// Get the array index
	var index = menuLink.id.substring( togIdStr.length, menuLink.id.length );

	// Find variable name
	var varName = objectTagsArr[ index*objectTagsMax + objectTagsIdxVarName ];

	// Get visibility and toggle it
	var setVisible = !GM_getValue( varName, true )
	
	// Write back
	GM_setValue( varName, setVisible );

	// Handle display
	GM_setObjectDisplay( objectTagsArr[ index*objectTagsMax + objectTagsIdxObject ], menuLink, setVisible );
}

function GM_setObjectDisplay( object, menuLink, showObject )
{
	// Set menu link display
	if( menuLink != undefined )
	{
		menuLink.style.color = showObject ? '#000000' : '#888888';
		menuLink.parentNode.style.background = showObject ? '#deffde' : '#ffdede';
	}

	// Set object display
	if( object != undefined )
	{
		// Toggle visibility
		object.style.visibility = showObject ? document.getElementById( 'tn15main' ).style.visibility : 'collapse';
		object.style.maxHeight = showObject ? document.getElementById( 'tn15main' ).style.maxHeight : '0px';
		object.style.marginTop = showObject ? document.getElementById( 'tn15main' ).style.marginTop : '0';
		object.style.marginBottom = showObject ? document.getElementById( 'tn15main' ).style.marginBottom : '0';	
	}
}

function GM_toggleMenu( doToggle )
{
	// Get value, and toggle it if necessary
	var showMenu = GM_getValue( 'showMenu', true );
	if( doToggle )
		showMenu = !showMenu;

	// Write it back
	GM_setValue( 'showMenu', showMenu );

	// Get the menu object and set visibility
	var obj = document.getElementById( 'imdbInfoToggleDivMenu' );
	obj.style.visibility = showMenu ? document.getElementById( 'tn15main' ).style.visibility : 'collapse';
	obj.style.maxHeight = showMenu ? document.getElementById( 'tn15main' ).style.maxHeight : '0px';
	obj.style.marginTop = showMenu ? document.getElementById( 'tn15main' ).style.marginTop : '0';
	obj.style.marginBottom = showMenu ? document.getElementById( 'tn15main' ).style.marginBottom : '0';
	obj.style.borderwidth = showMenu ? document.getElementById( 'tn15main' ).style.borderwidth : '0 0 0 0';
}

function GM_fixPage()
{
	//Find the comments section
	var arrDiv = document.getElementsByTagName('div');
	var commentsObj;
	for( var j=0; j<arrDiv.length; j++ )
		if( arrDiv[ j ].className == 'comment' )
			commentsObj = arrDiv[ j ];
			
	// Fine for most pages, see below for exception
	var sliceStartIdx = 0;
	var tempIdx;
	var innerString;
	var superNode;
			
	// NOTE: Sometimes the comments section will be empty, and so defined differently in the page source
	// Handle this issue when commentsObj is undefined
	if( commentsObj == undefined )
	{
		var arrAnchor = document.getElementsByTagName('a');
		var anchorObj;
		for( var j=0; j<arrAnchor.length; j++ )
			if( arrAnchor[ j ].name == 'comment' )
				anchorObj = arrAnchor[ j ];
				
		superNode = anchorObj.parentNode;
		innerString = superNode.innerHTML;
		
		// Find where in the innerHTML string we need to start from
		tempIdx = innerString.indexOf( 'name="comment"' );
		sliceStartIdx = innerString.lastIndexOf( '<a', tempIdx );
		
	}
	else
	{
		// Store the contents of the object
		innerString = commentsObj.innerHTML;
	}
	
	// Get the string indexes for each section
	// We'll splice the innerHTML string with these to get the content we need
	tempIdx = innerString.indexOf( 'alt="Message Boards"' );
	var commentsEndIdx = innerString.lastIndexOf( '<img', tempIdx );
	tempIdx = innerString.indexOf( 'alt="Recommendations"' );
	var messagesEndIdx = innerString.lastIndexOf( '<img', tempIdx );
	var extraEndIdx = innerString.indexOf( '<div id="tn15bot">' );
	
	
	// Create a div to hold the comments content
	var divComments = document.createElement('div');
	divComments.innerHTML = innerString.slice( sliceStartIdx, commentsEndIdx );
	divComments.setAttribute( 'id', 'idComments' );
	
	// Create a div to hold the message board content
	var divMessages = document.createElement('div');
	divMessages.innerHTML = innerString.slice( commentsEndIdx, messagesEndIdx );
	divMessages.setAttribute( 'id', 'idMessages' );
	
	// Create a div to hold the recommendations
	var divRecommendations = document.createElement('div');
	divRecommendations.innerHTML = innerString.slice( messagesEndIdx, extraEndIdx );
	divRecommendations.setAttribute( 'id', 'idRecommendations' );
	
	// Create a div to hold everything after (ads and such)
	var divExtra = document.createElement('div');
	divExtra.innerHTML = innerString.slice( extraEndIdx );
	divExtra.setAttribute( 'id', 'idExtra' );
	
	if( commentsObj == undefined )
	{
		// Remove the old content
		superNode.innerHTML = superNode.innerHTML.slice( 0, sliceStartIdx );
		
		superNode.appendChild( divComments );
		superNode.appendChild( divMessages );
		superNode.appendChild( divRecommendations );
		superNode.appendChild( divExtra );
	}
	else
	{
		var previousSibling = commentsObj.previousSibling;
		
		// Remove the old content
		commentsObj.parentNode.removeChild( commentsObj );
	
		// Add in reverse order
		previousSibling.parentNode.insertBefore( divExtra, previousSibling.nextSibling );
		previousSibling.parentNode.insertBefore( divRecommendations, previousSibling.nextSibling );
		previousSibling.parentNode.insertBefore( divMessages, previousSibling.nextSibling );
		previousSibling.parentNode.insertBefore( divComments, previousSibling.nextSibling );
	}
}

// Create the menu we toggle from
if( document.getElementById( infoMenuId ) == undefined )
{
	var div, divMenu, title, showHide;
	div = document.createElement('div');
	div.setAttribute( 'class', 'info' );
	div.setAttribute( 'id', 'imdbInfoToggleDivToggle' );

	title = div.appendChild( document.createElement( 'h5' ) );
	title.appendChild( document.createTextNode('Toggle Info:') );
	title.addEventListener( "click", function(e){ GM_toggleMenu( true ); }, true );
	title.style.cursor = 'pointer';

	divMenu = div.appendChild( document.createElement('div') );
	divMenu.setAttribute( 'id', 'imdbInfoToggleDivMenu' );

	var table = divMenu.appendChild( document.createElement( 'table' ) );
	table.cellPadding = '1';
	table.cellSpacing = '1';
	table.style.background = '#999999';

	// Add toggle links
	var rowSplitOn = 4;
	var splitCellWidthPerc = ( 100 / rowSplitOn ) + '%';
	var row, cell;
	for( var i=0; i<infoCount; i++ )
	{
		if( i % rowSplitOn == 0 )
			row = table.insertRow( -1 );
		
		cell = row.insertCell( -1 );
		cell.width =  splitCellWidthPerc;
		var link = cell.appendChild( document.createElement( 'a' ) );
		link.id = togIdStr+i;
		link.appendChild( document.createTextNode( langMenuArr[ ( objectTagsArr[ i*objectTagsMax + objectTagsIdxAccessIdx ] * languagesCount ) + language] ) );
		link.addEventListener( "click", function(e){ GM_toggleDisplayVariable(this); }, true );
		link.style.cursor = 'pointer';
	}

	document.getElementById( 'tn15main' ).insertBefore( div, document.getElementById( 'tn15main' ).firstChild );
}

// Add closing </div> tags where needed so we can toggle object correctly
GM_fixPage();

// Grab the objects we need to toggle
GM_assignObjects();

// Apply defaults to current page
GM_setInitialStates();