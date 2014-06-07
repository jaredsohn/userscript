// ==UserScript==
// @name		Urban Dead Attack Links
// @description	Creates attack links (pistol, shotgun, knife, axe, tennis racket, maul, teeth) next to character's name.
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Attack Links
 * v1.1
 * 
 * Copyright (C) 2012 Spiderzed
 * (Large parts of the code based on Urban Dead Profile Links by Ville Jokela)
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *   1. The origin of this software must not be misrepresented; you must not
 *      claim that you wrote the original software. If you use this software
 *      in a product, an acknowledgment in the product documentation would be
 *      appreciated but is not required.
 *   2. Altered source versions must be plainly marked as such, and must not be
 *      misrepresented as being the original software.
 *   3. This notice may not be removed or altered from any source distribution.
 *
 */


function addLinksEverywhere() {
	switch (document.location.pathname) {
	case "/map.cgi":
		addLinksToXPath('//div[@class="gt"]/a');		// building description
		addLinksToXPath('//td[@class="gp"]/p/b/a');		// DNA scan
		addLinksToXPath('//td[@class="gp"]/ul/li/a');		// "Since last turn:"
		addLinksToXPath('//td[@class="gp"]/ul/li/b/a');		// "Since last turn:" bold
		break;
	case "/contacts.cgi":
		addLinksToXPath('//tr/td/a');
		break;
	}
}

function addLinksToXPath(xpath) {
	var profileLinks = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < profileLinks.snapshotLength; i++) {
		var link = profileLinks.snapshotItem(i);
		if (link.href.match("profile\\.cgi\\?id="))	// is this a profile link?
			addLinks(link);
	}
}

function addLinks(link) {
	var contact = false;
	var ID_RE = /id=(\d*)/;
	var ID = link.href.match(ID_RE)[1];
	
	var sup = document.createElement('sup');

	if (link.className != "")
		contact = true;		// contacts have class
	else if (link.firstChild.nodeType == link.ELEMENT_NODE
	&& link.firstChild.tagName == 'span'
	&& link.firstChild.className != "")
		contact = true;		// or sometimes a sub-span with class

	sup.appendChild(createLink(' P ', 'map.cgi?target=' + ID + '&weapon=pistol'));
	sup.appendChild(createLink(' S ', 'map.cgi?target=' + ID + '&weapon=shotgun'));
	sup.appendChild(createLink(' K ', 'map.cgi?target=' + ID + '&weapon=knife'));
	sup.appendChild(createLink(' A ', 'map.cgi?target=' + ID + '&weapon=axe'));
	sup.appendChild(createLink(' T ', 'map.cgi?target=' + ID + '&weapon=racket'));
	sup.appendChild(createLink(' M ', 'map.cgi?target=' + ID + '&weapon=maul'));
	sup.appendChild(createLink(' B ', 'map.cgi?target=' + ID + '&weapon=teeth'));
	sup.appendChild(createLink(' D ', 'map.cgi?target=' + ID + '&weapon=drag'));

	var frag = document.createDocumentFragment();
	frag.appendChild(link.cloneNode(true));
	var small = document.createElement('small');
	small.appendChild(sup);
	frag.appendChild(small);
	link.parentNode.replaceChild(frag, link);
}

function createLink(text, url) {
	var link = document.createElement('a');
	link.textContent = text;
	link.href = url;

	return link;
}

addLinksEverywhere();