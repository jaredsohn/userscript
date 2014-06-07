// ==UserScript==
// @name		Urban Dead Building State Colourizer
// @description		Colorizes a building's barricade level, door, ransack and ruin status, and presence, damage-level and status of machinery.
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Building State Colorizer
 * v1.3
 * 
 * Copyright (C) 2008 Ville Jokela -- midianian@mbnet.fi
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.3:
 *     * new phrases: "low on fuel", "only has a little fuel left", "enough to power"
 *     * changed machinery highlighting because "damaged" could also be found elsewhere in building descriptions
 *     * fix: spraypainted messages were still highlighted
 *     * "ransacked" in museums in the description "ransacked by looters" is no longer colourized
 *   1.2:
 *     * Opera and Greasemetal compatible
 *   1.1:
 *     * machinery damage now highlighted
 *     * doesn't highlight phrases in spraypainted messages anymore
 *     * colours tweaked
 */

function colorizeBarricades() {
	var div = document.evaluate('//div[@class="gt"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	processElement(div);
}

function processElement(element) {
	for (var i = 0; i < element.childNodes.length; i++) {
		var el = element.childNodes[i];
		switch (el.nodeType) {
		case el.ELEMENT_NODE:
			if (el.tagName == 'I')	// HTML returns all-caps
				return;
		case el.DOCUMENT_NODE:
		case el.DOCUMENT_FRAGMENT_NODE:
			processElement(el);
			break;
		case element.TEXT_NODE:
			processText(el);
			break;
		}
	}
}

function processText(element) {
	var highlights = [
		// darkness
		{ str: 'lights out',				colour: '#000000' },

		// barricade levels. must be in this order, otherwise HB will override VHB and EHB.
		{ str: 'extremely heavily barricaded',		colour: '#0000CC' },
		{ str: 'very heavily barricaded',		colour: '#0066CC' },
		{ str: 'heavily barricaded',			colour: '#00CCCC' },
		{ str: 'very strongly barricaded',		colour: '#00CC00' },
		{ str: 'quite strongly barricaded',		colour: '#66CC00' },
		{ str: 'lightly barricaded',			colour: '#CCCC00' },
		{ str: 'loosely barricaded',			colour: '#CC6600' },

		// doors
		{ str: 'have been secured',			colour: '#CC2200' },
		{ str: 'left wide open',			colour: '#CC0000' },
		{ str: 'ragged rectangle has been cut',		colour: '#CC0000' },	// junkyards
		{ str: 'opens directly onto the street',	colour: '#CC0000' },	// churches & cathedrals
		// TODO: zoo enclosures

		// ransack
		// KLUDGE: takes precedence over 'ransacked' to avoid highlighting it in museum descriptions that aren't actually ransacked
		{ str: 'ransacked by looters',			colour: '#inherit', noBold: true },
		{ str: 'ransacked',				colour: '#660000' },

		// ruined
		{ str: 'has been ruined',			colour: '#000000' },
		{ str: 'has fallen into ruin',			colour: '#000000' },
		{ str: 'are ruined',				colour: '#000000' },	// malls

		// damaged machinery
		{ str: 'badly damaged portable generator',	colour: '#CC0000' },
		{ str: 'damaged portable generator',		colour: '#CC4400' },
		{ str: 'battered portable generator',		colour: '#CC8800' },
		{ str: 'dented portable generator',		colour: '#CCCC00' },
		{ str: 'badly damaged radio transmitter',	colour: '#CC0000' },
		{ str: 'damaged radio transmitter',		colour: '#CC4400' },
		{ str: 'battered radio transmitter',		colour: '#CC8800' },
		{ str: 'dented radio transmitter',		colour: '#CCCC00' },
		// unharmed machinery
		{ str: 'portable generator',			colour: '#00CC00' },
		{ str: 'radio transmitter',			colour: '#00CC00' },
		// machinery power
		{ str: 'is out of fuel',			colour: '#222222' },
		{ str: 'powered-down',				colour: '#222222' },
		{ str: 'is running',				colour: '#2222CC' },
		{ str: 'powering',				colour: '#2222CC' },
		{ str: 'enough to power',			colour: '#2222CC' },
		{ str: 'low on fuel',				colour: '#CC4400' },
		{ str: 'only has a little fuel left',		colour: '#CC4400' },
	];

	for (var i = 0; i < highlights.length; i++) {
		var hl = highlights[i];
		var text = element.textContent;
		var index = text.indexOf(hl.str);
		if (index != -1) {
			if (index == 0 && text.length == hl.str.length)
				return;
			var frag = document.createDocumentFragment();
			frag.appendChild(document.createTextNode(text.substring(0, index)));
			var span = document.createElement('span');
			if (!hl.noBold)
				span.style.fontWeight = 'bold';
			span.style.color = hl.colour;
			span.textContent = hl.str;
			frag.appendChild(span);
			frag.appendChild(document.createTextNode(text.substring(index + hl.str.length)));
			processElement(frag);
			element.parentNode.replaceChild(frag, element);
			return;
		}
	}
}

colorizeBarricades();
