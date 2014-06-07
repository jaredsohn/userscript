// ==UserScript==
// @name           Bacon, ikke kudos!
// @namespace      http://userscripts.org/users/38722
// @description    Erstatter kudos med bacon på underskog.no
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
	var re1 = /Kudos!/g;
	var re2 = /Gi kudos/g;
	for (var i = 0; i < num_blocks; i++) {
		var kudos_block = kudos_blocks.snapshotItem(i);
		kudos_block.innerHTML = kudos_block.innerHTML.replace(re1,"Bacon!");
		kudos_block.innerHTML = kudos_block.innerHTML.replace(re2,"Gi bacon");
	}
}; // Ends do_platypus_script

window.addEventListener("load", function() { do_platypus_script() }, false);

//.user.js