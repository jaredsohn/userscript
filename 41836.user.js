// ==UserScript==
// @name		Urban Dead Radio Accelerator
// @description		Removes one step (and thus one AP and IP) from retuning a radio reciever.
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Radio Accelerator
 * v1.0
 *
 * Copyright (C) 2008 Ville Jokela -- midianian@penny-craal.org
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 */

function askForFreq(evt) {
	var newFreq = prompt('Input new frequency', '');
	var address = location.protocol + '//' + location.host + '/map.cgi?newfreq=' + newFreq + '&oldfreq=' + evt.target.parentNode.lastChild.value;
	location.assign(address);
}

function insertCheckers() {
	 var radios = document.evaluate('//input[@value="radio"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	 for (var i = 0; i < radios.snapshotLength; i++) {
	 	var form = radios.snapshotItem(i).parentNode;
		form.firstChild.type = 'button';
		form.addEventListener('click', function(evt) { askForFreq(evt); }, true);
	 }
}

insertCheckers();
