// ==UserScript==
// @name           LiveJournal/SquirrelMail support for international characters
// @namespace      http://henrik.nyh.se
// @description    SquirrelMail normally does not show international characters correctly in LiveJournal comment notification mails, nor does the reply form work when you input such characters. This script fixes the latter issue for anyone (I hope), and the first issue only for the basic Swedish international characters. More character conversions can easily be added by modifying the code. Please share conversions at the userscripts.org page for this script: http://www.userscripts.org/scripts/show/1628
// @include        http://*/src/read_body.php?*
// ==/UserScript==

// If you see "xy" where a "z" should appear, then look each of these characters up
// at e.g. http://www.macchiato.com/unicode/chart/ and then add a line below like
// conversionTable["\uCODE_FOR_X\uCODE_FOR_Y"] = "\uCODE_FOR_Z";

var conversionTable = {};
conversionTable["\u00C3\u00A5"] = "\u00e5";  // Swedish aa
conversionTable["\u00C3\u00A4"] = "\u00e4";  // Swedish ae
conversionTable["\u00C3\u00B6"] = "\u00f6";  // Swedish oe
conversionTable["\u00C3\u2026"] = "\u00c5";  // Swedish AA
conversionTable["\u00C3\u201E"] = "\u00c4";  // Swedish AE
conversionTable["\u00C3\u2013"] = "\u00d6";  // Swedish OE

var xpSenderEmail = "/html/body/table[3]/tbody/tr[2]/td/table/tbody/tr[2]/td[2]";
var xpForm = "//form[1]";


function xpath(query) { return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function xpath_single(query) { return document.evaluate(query, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }

var sender = xpath_single(xpSenderEmail);  // This is where the sender address goes
if (sender.innerHTML.indexOf('lj_notify@livejournal.com') == -1) return;  // Only proceed if this is a mail from LJ

// Someone set us up the regexp!

var regexp = [];
for (utf in conversionTable)
	regexp.push(utf);
regexp = new RegExp("(" + regexp.join('|') + ")", 'g');

// Make the textarea submit as UTF-8

xpath_single(xpForm).setAttribute("accept-charset", "UTF-8");

// Since we can't seem to change browser encoding this late, convert it to Latin-1 in the most elegant way imaginable

textnodes = xpath("//text()");
    
for (var i = 0, j = textnodes.snapshotLength; i < j; i++) {  // Loop through text nodes
    node = textnodes.snapshotItem(i);  // This text node
    node.data = node.data.replace(regexp, function(str, character) { return conversionTable[character] });
}