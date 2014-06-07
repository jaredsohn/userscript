// ==UserScript==
// @name           Squelch the Boring Writer
// @namespace      idonothaveawebsitetouseasaniftynamespacesothisismyawesomenamespace
// @description    Quiet, you.
// @include        http://www.shacknews.com/*
// @include        http://*.shacknews.com/*
// ==/UserScript==

var these_nodes_can_fuck_right_off = document.evaluate('//div[ul[li[div[@class="fullpost fpmod_stupid fpauthor_213652"]]]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < these_nodes_can_fuck_right_off.snapshotLength; i++) 
{
	var current_node = these_nodes_can_fuck_right_off.snapshotItem(i);
	current_node.style.display='none';
}