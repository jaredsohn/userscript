// ==UserScript==
// @name           IMDB Telecine autolinker
// @namespace      http://userscripts.org
// @description    Autolinks listings on the www.telecine.com.br to IMDB.com.
// @include        http://globosat.globo.com/telecine/canais/filmes.asp*
// ==/UserScript==


String.prototype.trim = new Function("return this.replace(/^\\s+|\\s+$/g, '')");
var filme = new Array();
var j = 0;
function linkNodes(nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.nodeType == 3 &&
	               node.parentNode.tagName == 'FONT' &&
								 node.parentNode.face == 'Verdana, Arial, Helvetica, sans-serif' &&
								 node.parentNode.color == "#424242"){
					filme[++j] = node.nodeValue;
			}else{
				linkNodes(node.childNodes);
			}
	}
}

function createImdbLink(nodes) {
	for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.nodeName == 'IMG' && node.getAttribute('name') == 'ImageMarcar'){
				var image = document.createElement('img');
				image.src = 'http://summerz.pe.kr/img/icon-imdb-small.gif';
				image.boder = 0;
				image.alt = 'Internet Movie Data Base';
				
				var link = document.createElement('a');
				link.href = 'http://www.imdb.com/Find?' + filme[1];
				link.target = '_blank';
				link.appendChild(image);
				link.title = 'Internet Movie Data Base';
				
				var newnode = node.parentNode.parentNode.parentNode;
				newnode.appendChild(document.createElement('BR'));
				newnode.parentNode.appendChild(document.createElement('BR'));
				newnode.parentNode.appendChild(link);
			}else{
				createImdbLink(node.childNodes);
			}			
	}
}

(function() {
	linkNodes(document.body.childNodes);
	createImdbLink(document.body.childNodes);
})();



