// ==UserScript==
// @name           Darwin's Style
// @namespace      Darwin's Style
// @description    Estilo de Darwin's.
// @author         Monkey
// ==/UserScript==

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function replace_words() {
	var replacements, regex, key, textnodes, node, s;

	replacements = {"Capacitatea de locuire": "Capacitate"};
	regex = {};
	for (key in replacements) {
		regex[key] = new RegExp(key, 'g');
	}
	
	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
		for (key in replacements) {
			s = s.replace(regex[key], replacements[key]);
		}
		node.data = s;
	}
}

addAnimStyle('#GF_toolbar li.version {position:absolute;	top:0px; left:800px;}');
addAnimStyle('#GF_toolbar li.serverTime {position:absolute;	top:0px; left:860px;}');
//addAnimStyle('a.reportPlayer {display:none;}');