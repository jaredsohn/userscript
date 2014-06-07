// ==UserScript==
// @name           ISBN4SFMasterworks
// @namespace      http://googatrix.googlepages.com
// @description    Shows ISBN for Gollanz SF Masterworks books
// @include        http://www.orionbooks.co.uk/Masterworks-SF-list.aspx
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// WARNING: this is a quick-and-dirty (TM) script
// There are more elegant ways of achieving the same functionality

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// main body of script
// it all works off a few global variables...

// get reference to the set of all rows in the books table
var gTopTD	= document.getElementById( "resultsCon" );
var gRows	= gTopTD.childNodes[0].childNodes[1].childNodes;

// build array of links
var gLinks 	= getLinks( gRows );

// get and display the ISBN numbers
var gCounter	= 0;
processLinks( gLinks, gCounter );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function definitions

function getLinks( oRows )
{
	var sLinks = new Array();

	// loop through the rows to build up an array of links to book pages
	// first row is excluded (header) as are text nodes and pages without links
	for( var i = 1; i < oRows.length; i = i + 2 )
	{
		// get the href value from book link
		var oLink = oRows[i].childNodes[3].childNodes[0];
		// books out of print don't have links, so need to check
		if( oLink.nodeType == 1 && oLink.tagName.toLowerCase() == "a" )
		{
			sLinks[i] = oLink.href;
			//GM_log( sLinks[i] );	
		}

		// append an additional cell - this will be used later to display the ISBN number
		var oTD		= document.createElement( 'td' );
		oTD.className	= oRows[i].childNodes[3].className;
		// first row is a header
		if( i == 1 )
		{
			oTD.innerHTML	= "ISBN-13";
		}
		oRows[i].insertBefore( oTD, oRows[i].lastChild );
	}
	return sLinks;
}

function processLinks( sLinks, i )
{
	//GM_log( "processLinks: i = " + i );
	//GM_log( "processLinks: link = " + sLinks[i] );

	// if the current row does not have a link then recurse
	if( sLinks[gCounter] == null )
	{
		if( ++gCounter < gLinks.length )
		{
			processLinks( gLinks, gCounter );
		}
	}
	// process the link on current row
	else
	{
		GM_xmlhttpRequest( 
		{
			method: 'GET',
			url: sLinks[gCounter],
			headers: 
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html'
			},
			onload: function( responseDetails )
			{
				callbackISBN( responseDetails );
			}
		});
	}
}

function callbackISBN( responseDetails ) 
{
	//GM_log( "callbackISBN: gCounter = " + gCounter );

	var sResponseText	= responseDetails.responseText.toLowerCase();
	var sISBN13StartTag	= '<TD id="TDisbn13" class="biblio">';
	var sISBN13EndTag	= '<\/td>';
	var nISBN13Start	= sResponseText.indexOf( sISBN13StartTag.toLowerCase() ) + sISBN13StartTag.length;
	var nISBN13End		= sResponseText.indexOf( sISBN13EndTag.toLowerCase(), nISBN13Start );

	//GM_log( sResponseText.substring( nISBN13Start, nISBN13End ) );

	var sLead		= "ISBN-13: ";
	var sText		= sResponseText.substring( nISBN13Start, nISBN13End );
	sText			= sText.substr( sText.indexOf( sLead ) + sLead.length );

	//GM_log( sText );

	var oTD			= gRows[gCounter].lastChild.previousSibling;
	oTD.innerHTML		= sText;

	// ..and recurse
	if( ++gCounter < gLinks.length )
	{
		processLinks( gLinks, gCounter );
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~