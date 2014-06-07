// ==UserScript==
// @name           Font Substitution v2
// @namespace      FontSub2
// @description    Substitutes arbitrary fonts on webpages (based on the original FontSub by Arithon Kelis)
// @include        *
// @version        2.0.7
// @grant          none
// @run-at         document-start
// ==/UserScript==

// Array of fonts you want to nuke
var badFonts = [
	'(?:arial|helvetica)',
	'courier(?:\\s*new)'
];

// Array of fonts to replace the bad fonts with -- directly correlates, so don't screw it up. </lazy>
var replacementFonts = [
	'sans-serif',
	'monospace'
];

var globalDebug = false;

// Function crap follows
////////////////////////////////////////////////////////////////////////////////////////////////////////

function MakeFontRegex(badFont)
{
	return new RegExp("(^|,)\\s*[\\\"\\']?\\s*" + badFont + "\\s*[\\\"\\']?\\s*(?=,|$)", 'gi');
}

function ReplaceFontsInElement(element)
{
	var computedFontFamily = getComputedStyle(element, null).fontFamily;
	var replacedFontFamily = null;

	// Loop through the list of fonts to nuke
	var badFontsLen = badFonts.length;
	for (var i = 0; i < badFontsLen; ++i)
	{
		var regex = badFontRegexps[i];

		var fontFamilyToReplace = ((null == replacedFontFamily) ? computedFontFamily : replacedFontFamily);

		if (fontFamilyToReplace.match(regex))
			replacedFontFamily = fontFamilyToReplace.replace(regex, '$1' + replacementFonts[i]);
	}

	if (null != replacedFontFamily)
	{
		if (globalDebug) console.log("Computed: " + computedFontFamily + " Replaced: " + replacedFontFamily);

		element.style.fontFamily = replacedFontFamily;
	}
}

function StripFonts(element)
{
	if (1 == element.nodeType)
	{
		if (globalDebug) console.log("Top level element " + element.nodeName + " " + element.className);
		ReplaceFontsInElement(element);
	}

	// Loop through the child elements
	var childElements = element.getElementsByTagName('*');
	var nElements = childElements.length;
	for (var i = 0; i < nElements; ++i)
	{
		if (globalDebug) console.log("Element loop " + i + "; " + childElements[i].nodeName + " " + childElements[i].className);
		ReplaceFontsInElement(childElements[i]);
	}
}

// Script starts here
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Construct bad font regexps
var badFontLen = badFonts.length;
var badFontRegexps = new Array(badFontLen);
for (var i = 0; i < badFontLen; ++i)
{
	badFontRegexps[i] = MakeFontRegex(badFonts[i]);
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		for (var i = 0; i < mutation.addedNodes.length; ++i)
		{
			if (1 == mutation.addedNodes[i].nodeType)
			{
				var element = mutation.addedNodes[i];
				if (globalDebug) console.log("Element inserted " + element.nodeName + " " + element.className);
				StripFonts(element);
			}
		}
	});
});

observer.observe(document, { childList: true, attributes: false, characterData: false, subtree: true });
