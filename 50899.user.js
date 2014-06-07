// ==UserScript==
// @name           Kudosteller
// @namespace      http://userscripts.org/users/38722
// @description    Teller antall kudos på innlegg og kommentarer
// @include        http://*.underskog.no/*
// ==/UserScript==

function do_platypus_script() {
	var kudos_blocks;
	kudos_blocks = document.evaluate(
		'//span[@class="kudos_block"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
	);
	var num_blocks = kudos_blocks.snapshotLength;
	var re = /<a [^>]*class="username"/g;
	for (var i = 0; i < num_blocks; i++) {
		var kudos_block = kudos_blocks.snapshotItem(i);
		var matches = kudos_block.innerHTML.match(re);
		if (matches!=null) {
			num_matches = matches.length;
			var kudos_string = num_matches + " kudos: fra";
			// do_modify_html_it(document,kudos_block,/Kudos fra/,kudos_string);
			kudos_block.innerHTML = kudos_block.innerHTML.replace(/Kudos fra/,kudos_string);
		}
	}
}; // Ends do_platypus_script

window.addEventListener("load", function() { do_platypus_script() }, false);

//.user.js