// ==UserScript==
// @name		Urban Dead Refresh Button
// @description		Adds a refresh button to the row of possible actions
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Profile Links
 * v1.2
 * 
 * Copyright (C) 2008 Ville Jokela -- midianian@mbnet.fi
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.2:
 *     * GM4IE, Opera and Greasemetal compatible
 *
 *   1.1:
 *     * placement-bug fixed
 */


function addRefresh() {
	input = document.createElement('input');
	input.className = 'm';
	input.type = 'submit';
	input.value = 'Refresh';

	form = document.createElement('form');
	form.action = 'map.cgi';
	form.method = 'post';
	form.className = 'a';
	form.appendChild(input);

	frag = document.createDocumentFragment();
	frag.appendChild(document.createTextNode(' '));		// seems to create the equivalent of &nbsp;
	frag.appendChild(form);

	actionButtons = document.evaluate('//td[@class="gp"]/form', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	firstForm = actionButtons.snapshotItem(0);
	firstForm.parentNode.insertBefore(frag, firstForm.nextSibling);
}

addRefresh();
