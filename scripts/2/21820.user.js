// ==UserScript==
// @name           Style for iGoogle Hotmail Gadget
// @namespace      http://googatrix.googlepages.com
// @description    Look and feel enhancements for the iGoogle Hotmail gadget (http://www.google.com/ig/directory?url=googatrix.googlepages.com/HotmailGadget.xml)
// @include        http://mobile.live.com/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PART 1 - DECLARATIONS

// define a trim function for String - needed in part 4
String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g, '' ); }
// body tag referenced in part 1 and part 4
var oBody 		= document.getElementsByTagName( "body" )[0];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PART 2 - STYLE

// create a style element
var oStyle1		= document.createElement( "style" );
oStyle1.innerHTML	= "body{ font-family: Tahoma, sans-serif; font-size: smaller; } ";
oStyle1.innerHTML	+= "input, textarea{ margin: 2px 2px 2px 2px; border-width: 1px; border-style: solid; border-color: #c0c0c0; } ";
oStyle1.innerHTML	+= "hr{ border: 0px; color: #c0c0c0; background-color: #c0c0c0; height: 1px; } ";

// append style to body
oBody.appendChild( oStyle1 );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PART 3 - REMOVE LOGO

// remove Hotmail logo on top
var oLogo		= document.getElementsByTagName( "img" )[0];
if( oLogo.src == "http://mobile.live.com/content/images/WL_Mail_140.aimg" )
{
	var oBr		= oLogo.nextSibling;
	if( oBr.tagName.toLowerCase() == "br" )
	{
		oBr.parentNode.removeChild( oBr );
	}
	oLogo.parentNode.removeChild( oLogo );
}
// also remove the horizontal rule after the logo
var oHr			= document.getElementsByTagName( "hr" )[0];
oHr.parentNode.removeChild( oHr );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PART 4 - REMOVE CELL PHONE ACCESS KEYS (e.g. [1] etc.)

// remove access keys from images at the bottom of page
var oImages		= document.getElementsByTagName ( "img" );
var nImgLen		= oImages.length;
// loop backwards to speed things up - images are at the bottom of the page
for( var i = nImgLen - 1; i >= 0; i-- )
{
	// get the text node before the image
	var oText	= oImages[i].previousSibling;
	// check whether text begins with [ and ends with ]
	if( oText.nodeValue.trim().charAt( 0 ) == "[" && oText.nodeValue.trim().charAt( 2 ) == "]" )
	{
		// set the text to blank
		oText.nodeValue = "";
	}
	// break after the 'New message' image, no need to check further images
	if( oImages[i].src == "http://mobile.live.com/content/images/hm/NewMail.aimg" )
	{
		break;
	}
}

// remove access keys on Delete and Move buttons
var oInputs		= document.getElementsByTagName( "input" );
var nInpLen		= oInputs.length;
// loop backwards to speed things up - the two buttons are at the bottom of the page
for( var i = nInpLen - 1; i >= 0; i-- )
{
	// check whether we have the right buttons
	if( ( oInputs[i].name == "DeleteButton" || oInputs[i].name == "MoveButton" ) && oInputs[i].value.charAt( 0 ) == "[" )
	{
		// remove the access key text
		oInputs[i].value = oInputs[i].value.substr( 4 );
	}
	// break after the 'Move' button, no need to check further inputs
	if( oInputs[i].name == "MoveButton" )
	{
		break;
	}
}

// remove access keys from the Prev and Next links and the Hint text in Inbox
// there are two cases for each link - either it is enclosed in font tags (if disabled) or it is simply text outside of tags (if enabled)

var bPrevDone		= false;
var bNextDone		= false;

// case 1 - font tags
var oFonts		= document.getElementsByTagName( "font" );
for( var i = 0; i < oFonts.length; i++ )
{
	if( oFonts[i].color && oFonts[i].color.toLowerCase() == "gray" )
	{
		if( oFonts[i].firstChild.nodeValue == "[1]Prev" )
		{
			oFonts[i].firstChild.nodeValue = "Prev ";
			bPrevDone = true;
		}
		if( oFonts[i].firstChild.nodeValue == "[3]Next" )
		{
			oFonts[i].firstChild.nodeValue = " Next";
			bNextDone = true;
			break;
		}
	}
	if( oFonts[i].size && oFonts[i].size == "-1" )
	{
		if( oFonts[i].firstChild.nodeValue == "Hint: To use shortcut keys, press # to access the menu, or * to go to the top of the page." )
		{
			oFonts[i].firstChild.nodeValue = "";
		}
	}
}

// case 2 - text (only run if font tags haven't already removed both access keys)
if( !bPrevDone || !bNextDone )
{
	var oChildNodes	= document.forms[0].childNodes;
	var nChiLen	= oChildNodes.length;

	// loop backwards
	for( var i = nChiLen - 1; i >= 0; i-- )
	{
		if( !oChildNodes[i].tagName )
		{
			if( oChildNodes[i].nodeValue == "|[3]" )
			{
				oChildNodes[i].nodeValue = " | ";
			}
			if( oChildNodes[i].nodeValue.trim() == "[1]" )
			{
				oChildNodes[i].nodeValue = "";
			}
		}
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// end of script

