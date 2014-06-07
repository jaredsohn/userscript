// ==UserScript==
// @name           NZCity TVNOW listing autolinker
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Autolinks listings on the nzcity.co.nz TV guide - the first half to IMDB.com and the second half to Wikipedia.
// @include        http://home.nzcity.co.nz/tvnow/tvguide.asp*
// ==/UserScript==

(function() {
	var PREFIX = ': ';
	
	String.prototype.trim = new Function("return this.replace(/^\\s+|\\s+$/g, '')");

	var linkNodes = function(nodes) {
		// Take a copy of the nodes list as it may mutate during traversal.
		var temp = [];
		for (var i = 0; i < nodes.length; i++) {
			temp[i] = nodes[i];
		}
		nodes = temp;

		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.nodeType == 1) {
				linkNodes(node.childNodes);
			} else if (node.nodeType == 3) {
				if (node.nodeValue.indexOf(PREFIX) != -1) {
					node.splitText(node.nodeValue.indexOf(PREFIX) + PREFIX.length);
					node = node.nextSibling;
					createLinks(node);
				} else if (node.parentNode.tagName == 'FONT' && node.parentNode.face == 'tahoma' && node.nodeValue.trim() != '') {
					createLinks(node);
				}
			}
		}
	};

	var createLinks = function(node) {
		var name = node.nodeValue.replace(/\s*$/, '');

		var imdbLink = document.createElement('a');
		imdbLink.href = 'http://www.imdb.com/find?q=' + name;
		imdbLink.appendChild(document.createTextNode(name.substring(0, name.length / 2)));
		
		var wikipediaLink = document.createElement('a');
		wikipediaLink.href = 'http://en.wikipedia.org/wiki/Special:Search?search=' + name;
		wikipediaLink.appendChild(document.createTextNode(name.substring(name.length / 2)));

		node.parentNode.insertBefore(imdbLink, node);
		node.parentNode.insertBefore(wikipediaLink, node);
		
		node.nodeValue = ' ';
	};

	linkNodes(document.body.childNodes);
})();