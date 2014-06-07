// ==UserScript==
// @name            d/Slash
// @namespace       http://bondagescouts.org/Tags/dSlash
// @description     R/remove A/annoying D/s P/protocol S/slashes
// @include         https://*.fetlife.com/*
// @include         https://fetlife.com/*
// @include         http://*.fetlife.com/*
// @include         http://fetlife.com/*
// ==/UserScript==

/*
$Date: 2011/08/27 21:15:28 $
$Revision: 1.20 $

Copyright (c) 2010 cryptocat <cryptocat@bondagescouts.org>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

/*
This script corrects certain ugly text constructs such as W/we, M/my, O/our,
etc. which are often used in D/s protocol writing. Say what you will about
Y/your R/relationship, B/but T/that T/typography M/makes M/my E/eyes B/bleed.

This script was tested on some simple local files and fetlife writing, I'm
not entirely sure I want to filter the entire web through it yet - it should
work if you "@include http://*" though... this script will prepend "[d/S]" to
the page title if the text is edited.

*/

var detector, ego, textnodes, node, nodedata, replaced;

/* regex to match a slashycap */
detector = new RegExp("\\b([a-z])/\\1", "i");
/* ego pronouns */
ego = new RegExp("[^!.?]\\s+\\b(He|She|Her|Him|His|Hers|Me|My|You|Your)\\b");

/* set when an actual replacement happens */
replaced = 0;

/* round up all the text-containing nodes in the document */
textnodes = document.evaluate("//text()", document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

/* then process each of these nodes */
for (var i = 0; i < textnodes.snapshotLength; i++) {
	var capture;

	node = textnodes.snapshotItem(i);
	nodedata = node.data;

	/* keep processing nodedata until all the slashycaps are gone */
	while (capture = nodedata.match(detector)){
		/* replace the slashed character */
		nodedata = nodedata.replace(capture[0], capture[0].charAt(0));
		replaced = 1;
	}
	/* keep processing nodedata until all the ego pronouns are gone */
	while (capture = nodedata.match(ego)){
		/* replace the slashed character */
		nodedata = nodedata.replace(capture[0], capture[0].toLowerCase());
		replaced = 1;
	}
	if(/\bi\b/.test(nodedata)){
		nodedata = nodedata.replace(/\bi\b/ig, "I");
		replaced = 1;
	}
	/* non-slashy character strings that look like pronouns */
	if(/\bWwe\b/.test(nodedata)){
		nodedata = nodedata.replace(/\bWwe\b/ig, "we");
		replaced = 1;
	}
	if(/\bOour/.test(nodedata)){
		nodedata = nodedata.replace(/\bOour/ig, "our");
		replaced = 1;
	}
	if(/\bUus\b/.test(nodedata)){
		nodedata = nodedata.replace(/\bUus\b/ig, "us");
		replaced = 1;
	}
	node.data = nodedata;
}

/* add a marker to the page title so the user knows we changed something */
if (replaced) {
	document.title = "[d/S] " + document.title;
}
