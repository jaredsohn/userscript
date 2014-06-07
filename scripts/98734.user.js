// ==UserScript==
// @name           KJV Bible Refalizer
// @author         James N. Anderson
// @modifier	   Modded for KJV by Saibot
// @description    Adds hyperlinks from Bible references to Bible Gateways KJV translation
// @license        GPL
// @version        0.1k
// @include        *
// @exclude        http://www.biblegateway.com/passage/*
// @exclude        http://*.blogger.com/*
// @released       2006-11-13
// @updated        2011-03-10
// @compatible     Greasemonkey
// ==/UserScript==


//
// Copyright (C) 2006 James N. Anderson
// Released under the GPL license:
// http://www.gnu.org/copyleft/gpl.html
//
// This is a Greasemonkey user script.
//
// To install it, you need the Firefox extension "Greasemonkey":
// http://greasemonkey.mozdev.org/
//
// After you have installed the extension, restart Firefox and revisit this script.
//
// Please send feedback to: proginosko AT gmail DOT com
//
// Version 0.1k:
// - Mod for KJV by Saibot
// Version 0.1:
// - Initial version by James N. Anderson
//


var version = 'KJV';
var refSearchURL = 'http://www.biblegateway.com/passage/?version1=9&search=';

var twoBksPatt = '(?:1|2|II?)\\s*';
var threeBksPatt = '(?:1|2|3|II?I?)\\s*';

var bookPatts = [
	'Genesis', 'Gen?\\.?', 'Gn\\.?',
	'Exodus', 'Exo?d?\\.?',
	'Leviticus', 'Lev?\\.?',
	'Numbers', 'Num?\\.?',
	'Deuteronomy', 'Deut\\.?', 'Dt\\.?',
	'Joshua', 'Josh?\\.?',
	'Judges', 'Ju?dg\\.?',
	'Ruth', 'Ru\\.?',
	twoBksPatt + 'Samuel', twoBksPatt + 'Sam?\\.?',
	twoBksPatt + 'Kings', twoBksPatt + 'Ki\\.?',
	twoBksPatt + 'Chronicles', twoBksPatt + 'Chron\\.?', twoBksPatt + 'Chr?\\.?',
	'Ezra', 'Ezr\\.?',
	'Nehemiah', 'Neh?\\.?',
	'Esther', 'Es\\.?',
	'Job',
	'Psalms?', 'Psa?s?\\.?',
	'Proverbs', 'Pro?v?\\.?',
	'Ecclesiastes', 'Ecc?l?\\.?',
	'Song of Solomon', 'Song of Songs', 'Song',
	'Isaiah', 'Isa?\\.?',
	'Jeremiah', 'Jer?\\.?',
	'Lamentations', 'Lam?\\.?',
	'Ezekiel', 'Ezek?\\.?',
	'Daniel', 'Da?n\\.?',
	'Hosea', 'Hos?\\.?',
	'Joel', 'Joe\\.?',
	'Amos', 'Am\\.?',
	'Obadiah', 'Ob\\.?',
	'Jonah', 'Jon\\.?',
	'Micah', 'Mic\\.?',
	'Nahum', 'Nah?\\.?',
	'Habakkuk', 'Hab\\.?',
	'Zephaniah', 'Zeph?\\.?',
	'Haggai', 'Hagg?\\.?',
	'Zechariah', 'Zech?\\.?',
	'Malachi', 'Mal\\.?',
	'Matthew', 'Matt?\\.?', 'Mt\\.?',
	'Mark', 'Mk\\.?',
	'Luke', 'Lk\\.?',
	'John?', 'Jn\\.?',
	'Acts', 'Ac\\.?',
	'Romans', 'Rom?\\.?', 'Rm\\.?',
	twoBksPatt + 'Corinthians', twoBksPatt + 'Cor?\\.?',
	'Galatians', 'Gal?\\.?',
	'Ephesians', 'Eph?\\.?',
	'Philippians', 'Phil?\\.?',
	'Colossians', 'Col?\\.?',
	twoBksPatt + 'Thessalonians', twoBksPatt + 'Thess?\\.?', twoBksPatt + 'Th\\.?',
	twoBksPatt + 'Timothy', twoBksPatt + 'Tim?\\.?',
	'Titus', 'Tit\\.?',
	'Philemon', 'Philem\\.?',
	'Hebrews', 'He?b\\.?',
	'James', 'Jam?s?\\.?',
	twoBksPatt + 'Peter', twoBksPatt + 'Pet?\\.?',
	'Jude?',
	threeBksPatt + 'John?', threeBksPatt + 'Jn\\.?',
	'Revelation', 'Rev?\\.?'
];

// Create regular expression to match references
var fullRefPatt =
		'(' + bookPatts.join('|') + ')\\s*' +
		'(?:\\d{1,3}:\\s*)?\\d{1,3}' +
		'(?:-(?:\\d{1,3}:\\s*)?\\d{1,3}|ff)?' +
		'(?:,\\s*(?:\\d{1,3}:\\s*)?\\d{1,3}(?:-(?:\\d{1,3}:\\s*)?\\d{1,3}|ff)?)*';
var partRefPatt =
		'\\b\\d{1,3}:\\s*\\d{1,3}' +
		'(?:-(?:\\d{1,3}:\\s*)?\\d{1,3}|ff)?' +
		'(?:,\\s*(?:\\d{1,3}:\\s*)?\\d{1,3}(?:-(?:\\d{1,3}:\\s*)?\\d{1,3}|ff)?)*';
var regExp = new RegExp('(?:' + fullRefPatt + ')|(?:' + partRefPatt + ')');

var textNodes, textNode, textNode2, elemNode, parNode;
var matches, ref, textBeforeRef, textAfterRef, lastBook;

// Get all text nodes in document
textNodes = document.evaluate(
		'//text()',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < textNodes.snapshotLength; i++) {
	textNode = textNodes.snapshotItem(i);
	parNode = textNode.parentNode;
	lastBook = null;
	if (parNode.nodeName.toLowerCase() != 'a') {
		// Search for references in text
		while (matches = regExp.exec(textNode.data)) {
			// Get text of reference
			ref = matches[0];
			// Get text before and after reference
			textBeforeRef = matches.input.substring(0, matches.index);
			textAfterRef = matches.input.substring(matches.index + ref.length);

			if (matches[1]) {
				// Get text of book (for subsequent partial references)
				lastBook = matches[1];
				// Update text node to contain text before reference
				textNode.data = textBeforeRef;
				// Add hyperlink element containing reference
				elemNode = document.createElement('a');
				elemNode.innerHTML = '<a href="' + refSearchURL + ref
						+ '" title="' + ref + ' (' + version
						+ ')" target="_blank">' + ref + '</a>';
				parNode.insertBefore(elemNode, textNode.nextSibling);
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, elemNode.nextSibling);
			} else if (lastBook != null) {
				// Update text node to contain text before reference
				textNode.data = textBeforeRef;
				// Add hyperlink element containing reference
				elemNode = document.createElement('a');
				elemNode.innerHTML = '<a href="' + refSearchURL + lastBook + ' ' + ref
						+ '" title="' + lastBook + ' ' + ref + ' (' + version
						+ ')" target="_blank">' + ref + '</a>';
				parNode.insertBefore(elemNode, textNode.nextSibling);
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, elemNode.nextSibling);
			} else {
				// Update text node to contain text up to end of reference
				textNode.data = textBeforeRef + ref;
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, textNode.nextSibling);
			}

			// Continue to search for references in text after reference
			textNode = textNode2;
		}
	}
}
