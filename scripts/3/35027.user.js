// ==UserScript==
// @name		Urban Dead Victim Link
// @description		Creates a link to the profile database from the victim of an observed PK.
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Victim Link
 * v1.3
 * 
 * Copyright (C) 2008 Ville Jokela -- midianian@penny-craal.org
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.3:
 *     * no longer messes with speech
 *     * getting dragged yourself is no longer linked
 *   1.2:
 *     * feeding drag victim also linked
 *   1.1:
 *     * GM4IE, Opera and Greasemetal compatible
 */

var messages = [
	{ rex: /^ killed (.*)\. $/,				textPre: ' killed ',	textPost: '. '				},
	{ rex: /^ dragged (.*) out into the street\. $/,	textPre: ' dragged ',	textPost: ' out into the street. '	},
];

function LinkifyVictims() {
	var items = document.evaluate('//td[@class="gp"]/ul/li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < items.snapshotLength; i++)
		LinkifyItem(items.snapshotItem(i));
}

function LinkifyItem(item) {
	for (child = item.firstChild; child != null; child = child.nextSibling) {
		if (child.nodeType == child.TEXT_NODE) {
			for (var i = 0; i < messages.length; i++) {
				matches = child.textContent.match(messages[i].rex);
				if (matches) {
					if (matches[1] == 'a zombie')			// just a zombie or the character 'a zombie'?
						if (messages[i].textPre == ' killed ')	// if killed, probably just a zombie. zombies can't be dragged, so it must've been the character
							return;
					if (matches[1] == 'you')			// just you or the character 'you'?
						if (messages[i].textPre == ' dragged ')	// if dragged, probably just you. getting killed gives different flavour, so it must've been the character
							return;
					frag = document.createDocumentFragment();
					link = document.createElement('a');
					link.href = 'http://profiles.urbandead.info/index.php?name=' + matches[1];
					link.appendChild(document.createTextNode(matches[1]));
					frag.appendChild(document.createTextNode(messages[i].textPre));
					frag.appendChild(link);
					frag.appendChild(document.createTextNode(messages[i].textPost));
					item.replaceChild(frag, child);
					return;
				}
			}
		}
	}
}

LinkifyVictims();
