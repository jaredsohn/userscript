// ==UserScript==
// @name           bbs.archlinux.pl.solved
// @namespace
// @include        http://bbs.archlinux.pl/viewforum.php*
// @include        http://bbs.archlinux.pl/search.php*
// ==/UserScript==


function sn(xp, ct) {
	return document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}	
	
var n = document.evaluate('//tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var t = new Date();
var d = new Date();

for(i=0; i<n.snapshotLength; i++) {

	var a = sn('.//a[1]', n.snapshotItem(i));
	
	if(a.textContent.toUpperCase().indexOf('[SOLVED]') != -1) {
	
		var z = sn('.//span[@class="closedtext"]', n.snapshotItem(i));
		if(z != null) {
			// solved && zamkniety
			a.style.color = '#000';
		} else {
			// solved && otwarty
			var dt = sn('.//td[@class="tcr"]', n.snapshotItem(i)).textContent.substring(0, 10);
			var d= Date.parse(dt);

			if((t - d) > 2592000000) {
				// solved && otwarty && starszy niz miesiac
				a.style.color = '#f33';
			} else {
				// solved && otwarty && nie stary
				a.style.color = '#383';
			};
		};
		
	};
	

}



