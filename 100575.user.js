// ==UserScript==
// @name           Torn Egg finder
// @namespace      http://userscripts.org/users/65879
// @include        http://www.torn.com/*
// @include        http://torn.com/*
// ==/UserScript==

var $egg_finder = true;
var $slut_mode = GM_getValue('slut_mode', 0);

function TornEggFinder() {
	this.init = function () {
		// reset dedline if not selected
		if($egg_finder) {
			var allLinks, thisLink;
			allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				thisLink = allLinks.snapshotItem(i);
				hrefas = thisLink.href;
				if (hrefas.match("step=eggfind")) {
					alert("Search for the Egg");
				}
			}
		}
	}

}

egg = new TornEggFinder();
egg.init();
