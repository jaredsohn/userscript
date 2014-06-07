// ==UserScript==
// @name        BitBeans
// @description replaces 'bitcoin' with 'magic beans'
// @include     http://*
// @include     https://*
// @version     0.5
// @updateURL http://userscripts.org/scripts/source/445349.meta.js
// @downloadURL https://userscripts.org/scripts/source/445349.user.js
// ==/UserScript==

function bitbean(str) {
	str = str.replace('bitcoins', 'magic beans');
	str = str.replace('BITCOINS', 'MAGIC BEANS');
	str = str.replace(/b[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'magic beans');
	str = str.replace(/B[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'Magic Beans');
	str = str.replace('a bitcoin', 'a magic bean');
	str = str.replace('a BITCOIN', 'a MAGIC BEAN');
	str = str.replace(/a b[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'a magic bean');
	str = str.replace(/a B[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'a Magic Bean');
	str = str.replace('A bitcoin', 'A magic bean');
	str = str.replace('A BITCOIN', 'A MAGIC BEAN');
	str = str.replace(/A b[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'A magic bean');
	str = str.replace(/A B[Ii][Tt][Cc][Oo][Ii][Nn][Ss]/g, 'A Magic Bean');
	str = str.replace('bitcoin', 'magic beans');
	str = str.replace('BITCOIN', 'MAGIC BEANS');
	str = str.replace(/b[Ii][Tt][Cc][Oo][Ii][Nn]/g, 'magic beans');
	str = str.replace(/B[Ii][Tt][Cc][Oo][Ii][Nn]/g, 'Magic Beans');
	return str;
}

function recbitbean(node) {
	if (node.nodeType == 3) {
		node.textContent = bitbean(node.textContent);
	} else {
		var childNodes = node.childNodes;
		for(var i = 0; i < childNodes.length; i++) {
			recbitbean(childNodes[i]);
		}
	}
}

recbitbean(document.body);
document.title = bitbean(document.title);
document.body.addEventListener("DOMNodeInserted", function(event) { recbitbean(event.target); }, false);
document.body.addEventListener("DOMCharacterDataModified", function(event) { bitbean(event.target); }, false);
