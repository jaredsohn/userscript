// ==UserScript==
// @name           Font Substitution
// @namespace      FontSub
// @description    Substitutes arbitrary fonts on webpages (inspired by boredom and a dislike of Comic Sans)
// @include        *
// ==/UserScript==


// Array of fonts you want to nuke
var badFonts=[
	"comic sans",
	"papyrus"
];

// Array of fonts to replace the bad fonts with -- directly correlates, so don't screw it up. </lazy>
var replacementFonts = [
	'sans-serif',
	'sans-serif'
];


// Function crap follows
////////////////////////////////////////////////////////////////////////////////////////////////////////

var globalDebug = false;

function myLog(msg)
{
	var stackFrameStrings = new Error().stack.split('\n');
	var layer = stackFrameStrings.length - 2;
	var newP = document.createElement("div");
	var str = "";
	while (layer > 0)
	{
		str = str + ("\t");
		layer--;
	}
	str = str + msg;
	var newT = document.createTextNode(str);
	newP.appendChild(newT);
	var theBody = document.getElementsByTagName('body')[0];
	theBody.appendChild(newP); 
}

function MakeFontRegex (badFont)
{
	badFont.replace(/\s+/g, '\\s+');
	var r = new RegExp("(^|,)*(\"*|\s*)*" + badFont + "(\"*|\s*)*(,|$)", 'i');
	return r;	
}

function ReplaceFontInElementStyle(element, regex, replacementFont)
{
	// Grab the style
	var style = getComputedStyle(element, '');
	// Compare the entire style string against the "bad" font -- possible false positives, but quicker than splitting everything.
	// Split the bad font out so we don't accidentally replace "Bob's Font 2" if we search for "Bob's Font"
	var fonts = style.fontFamily.split(',');
	// Loop through the fonts
	var fontsLen = fonts.length;

	for ( var fontIndex = 0; fontIndex < fontsLen; fontIndex++ )
	{
		// Compare the entire string
		if (fonts[fontIndex].match(regex)) {
			if (globalDebug)
			{
				myLog("Found a match: '" + fonts[fontIndex] + "'");
				myLog("Replacing with: '" + replacementFont + "'");
			}
			// Swap the font out for the replacement font.
			fonts[fontIndex] = replacementFont;
		}
	}
	//Combine it back together.
	element.style.fontFamily = fonts.join(',');
}

function IsFontInElementStyle(element, regex)
{
	var retval;

	// Grab the style of the element.
	var style = getComputedStyle(element, '');

	if (globalDebug) myLog("IsFontInElementStyle: regex = '" + regex + "', comparing against '" + style.fontFamily + "'");

	// Compare the entire style string against the "bad" font.
	if (style.fontFamily.match(regex) != null)
	{ 
		retval = true;
	}
	else
	{
		retval = false;
	}

	if (globalDebug) myLog("IsFontInElementStyle: return value: " + retval);

	return retval;
}

function StripFonts ()
{
	
	var debug=0;
	// Snag all of the elements
	var docElements = document.getElementsByTagName('*');
	// Loop through the list of fonts to nuke
	var badFontLen = badFonts.length;
	for ( var replacementIndex = 0; replacementIndex < badFontLen; replacementIndex++ )
	{
		if (globalDebug) myLog("Font loop " + replacementIndex + ": Scanning for '" + badFonts[replacementIndex] + "'");
		
		var regex = MakeFontRegex(badFonts[replacementIndex]);
		// Loop through the elements
		var docElementLen = docElements.length;
		for ( var elementIndex = 0; elementIndex < docElementLen; elementIndex++ )
		{
			if (globalDebug) myLog("Element loop " + elementIndex + "; node '" + docElements[elementIndex].nodeName + "'");
			
			if (IsFontInElementStyle(docElements[elementIndex],regex))
			{
				if (globalDebug) myLog("--Element matches");
				ReplaceFontInElementStyle(docElements[elementIndex], regex, replacementFonts[replacementIndex]);
			}
			else
			{
				if (globalDebug) myLog("--Element does not match");
			}
		}
	}
}

StripFonts();