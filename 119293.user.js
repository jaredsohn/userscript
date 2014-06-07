// ==UserScript==
// @name           bw.de - Starban
// @namespace      starban
// @description    Replaces ban avatars with stars, yay!
// @include        http://starcraft2.ingame.de/forum/*
// ==/UserScript==


var snapResults = document.evaluate("//div[@class='smallfont']//a[@href='http://starcraft2.ingame.de/bwforum/ban/']//font[@color='red']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		var rep = document.createTextNode('Outstanding!');

		elm.replaceChild(rep,elm.lastChild);
		var snapResults2 = document.evaluate("//img[@src='images/avatars/banned.png']", elm.parentNode.parentNode.parentNode,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = snapResults2.snapshotLength - 1; j >= 0; j--) {
			var elm2 = snapResults2.snapshotItem(j);
			var rep2 = document.createElement('img');
			rep2.title="Dieser Benutzer erhielt einen Starban für besondere Verdienste!"
			rep2.src="http://www.abload.de/img/starbig5noou0.png";
			elm2.parentNode.replaceChild(rep2,elm2);
		
		}
	}

