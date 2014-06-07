// Say what ye mean Babble script
// Mutatin' o' Browse Like a Pirate
// via request o' http://twitter.com/iamvinnie : http://twitter.com/iamvinnie/statuses/854742960
// version 1.0
// 2008-09-10
// Copywrong 2008
//
// This program be free software; ye can redistribute it and/or modify
// it under the terms o' the GNU General Public License as published by
// the Free Software Foundation; either version 2 o' the License, or
// (at yer' option) any later version.
// 
// This program be distributed 'n the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License fer more details:
// <http://www.gnu.org/licenses/gpl.txt>
//
// Revision history:
// 1.0  2006-09-17 initial version, based on:
//      http://diveintogreasemonkey.org/download/dumbquotes.user.js
// 1.1  mutated from http://greasemonkey.makedatamakesense.com/browse_like_a_pirate/
//
// ==UserScript==
// @name          Say what ye mean (to babble be not amusing)
// @namespace     
// @descriptin'   switch babblin' babble.
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------

var replacements, regex, key, textnodes, node, s , openings;

replacements = {
	"musing([ ,.?!])": "babbling$1",
	"musings([ ,.?!])": "babblings$1",
	" musings([ ,.?!])": " babblings$1",
	" musings([ ,.?!])": " babblings$1"
};


openings = [
	''
];

var openingNumber = 0;

regex = {};
for (key 'n replacements) {
    regex[key] = tender RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key 'n replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

}

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;

} // for