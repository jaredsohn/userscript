// ==UserScript==
// @name			Clean Font Families
// @namespace		http://userscripts.org
// @include			*
// @grant			GM_log
// @description		Changes Arial, Verdana, Tahoma, other sans-serif fonts to user's default sans-serif font
// @author			Ralf Helbing (ralf@pkmd.de), based on Sans-Serif Default by Pete Farmer <pfarmer at collaboros.com>
// ==/UserScript==

//	2013-04-11 Cross-CSS ignored, better handling for inherit
//	2013-04-12 Test for Monospace first (Stackoverflow.com)

var	sansSerif = [ 'sans-serif', 'arial', 'verdana', 'tahoma', 'geneva', 'helvetica'];
var	serif = [ 'serif', 'times', 'georgia'];
var	mono = [ 'monospace', 'fixed', 'courier'];

// set up regexps for font families
var sansSerifRegExps = new Array();
for ( var i = 0;  i < sansSerif.length;  i++) {
	var matchEx = new RegExp( sansSerif[ i], "i");
	sansSerifRegExps.push( matchEx);
}
var sansSerifRegExp = sansSerifRegExps.shift();

var serifRegExps = new Array();
for ( var i = 0;  i < serif.length;  i++) {
	var matchEx = new RegExp( serif[ i], "i");
	serifRegExps.push( matchEx);
}
var serifRegExp = serifRegExps.shift();

var monoRegExps = new Array();
for ( var i = 0;  i < mono.length;  i++) {
	var matchEx = new RegExp( mono[ i], "i");
	monoRegExps.push( matchEx);
}
var monoRegExp = monoRegExps.shift();

function	logThis( logString) {
	// GM_log( logString);
}

function cleanElementItem0( item, regex, itemInfo, replacement) {
	if ( itemInfo == replacement) {
		logThis( "already clean: " + item);
		return true;
	}
	if ( regex.test( itemInfo)) {
		var style;
		if ( typeof( item.setProperty) == "function") {
			style = item;
		} else {
			style = item.style;
		}
		style.setProperty( "font-family", replacement, "");
		logThis( "setting " + item + " with " + itemInfo + " to " + replacement + " ("  + regex + ")");
		return true;
	}
//	logThis( "not cleaning " + item + " with " + item.style.fontFamily + "(" + itemInfo + ") x " + regex);
	return false;
}

function cleanElementItem( elementItem, elementFontFamily) {
	logThis( "testing " + elementItem + " with '" + elementFontFamily + "'");
	// Monospace first: Stackoverflow uses ...'monospace', 'serif'
	if ( cleanElementItem0( elementItem, monoRegExp, elementFontFamily, 'monospace')) {
		return true;
	}
	if ( cleanElementItem0( elementItem, sansSerifRegExp, elementFontFamily, 'sans-serif')) {
		return true;
	}
	if ( cleanElementItem0( elementItem, serifRegExp, elementFontFamily, 'serif')) {
		return true;
	}
	var matched = false;
	// logThis( "testing " + elementItem + " with " + elementFontFamily);
	for ( var i = 0;  i < sansSerifRegExps.length;  i++) {
		matched = cleanElementItem0( elementItem, sansSerifRegExps[ i], elementFontFamily, 'sans-serif');
		if ( matched)
			return true;
	}
	if ( ! matched) {
		for ( var i = 0;  i < serifRegExps.length;  i++) {
			matched = cleanElementItem0( elementItem, serifRegExps[ i], elementFontFamily, 'serif');
			if ( matched)
				return true;
		}
	}
	if ( ! matched) {
		for ( var i = 0;  i < monoRegExps.length;  i++) {
			matched = cleanElementItem0( elementItem, monoRegExps[ i], elementFontFamily, 'monospace');
			if ( matched)
				return true;
		}
	}
	logThis( "no match for " + elementItem + " with " + elementFontFamily);
	return false;
}


function processStyleSheet(sheet) {
    logThis( "processing stylesheet: " + sheet + "/" + sheet.href);
	// FF does not like us to retrieve rules from disabled css
	if ( sheet.disabled) {
		logThis( "disabled");
		return;
	}
	var rulesLength = 0;
	try {
		rulesLength = sheet.cssRules.length;
	} catch ( ex) {
		logThis( "ignoring cross domain CSS " + sheet.href);	
	}
    for (var which=0; which < rulesLength; which++) {
        // logThis("sheet.cssRule "+ which +": "+sheet.cssRules[which].cssText);
		var rule = sheet.cssRules[which];
        if (rule.type == rule.STYLE_RULE) {
			var cssStyle = rule.style;
			var	elementFontFamily = cssStyle.getPropertyValue("font-family");
			if ( elementFontFamily != '') {
				cleanElementItem( cssStyle, elementFontFamily);
			}
        }
        if (rule.type == rule.IMPORT_RULE) {
            logThis("Recursing into an import rule: " + rule.cssText);
            processStyleSheet(rule.styleSheet);
        }
        if (rule.type == rule.MEDIA_RULE &&
            ( rule.media.mediaText == "screen" || rule.media.mediaText == "print")) {
            logThis("Recursing into media rule: " + rule.cssText);
            processStyleSheet(rule);
        }
    }
}

// Process all stylesheets
for(var i = 0; i < document.styleSheets.length; i++) {
    var sheet = document.styleSheets[i]
    processStyleSheet(sheet);
}
logThis("CSS finished");
var elementList = document.getElementsByTagName('*');
for (var eI = elementList.length - 1; eI >= 0; eI--) {
	// get computed font family
	var elementItem = elementList[ eI];
	var style = getComputedStyle(elementItem, null);
	if ( style == null) {
		continue;
	}
	var	elementFontFamily = style.fontFamily;
	if ( 'inherit' == elementFontFamily) {
		logThis( "Font " + elementFontFamily + " for " + elementItem);
		continue;	// change nothing if font family was inherited
	}
	// if parent exists, check if font family different
	var parent = elementItem.parentNode;
	if ( parent != null && parent.nodeType == Node.ELEMENT_NODE) {
		// logThis("parent type: " + parent.nodeType + " of " + elementItem);
		style = getComputedStyle(parent, null);
		if ( style != null) {
			var parentFontFamily = style.fontFamily;
			if ( parentFontFamily == elementFontFamily) {
				// logThis( "Font " + elementFontFamily + " for " + elementItem + " == " + parentFontFamily);
				continue;	// change nothing if font family was inherited
			} else {
				logThis( "Font " + elementFontFamily + " for " + elementItem + " != " + parentFontFamily);
			}
		}
	}
	if ( cleanElementItem( elementItem, elementFontFamily)) {
		continue;
	}
}
