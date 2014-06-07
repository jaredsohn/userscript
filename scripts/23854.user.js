// ==UserScript==
// @name           ERepublik - Link inventory items to marketplace
// @namespace      arvid.jakobsson@gmail.com
// @description    Links inventory items to marketplace
// @include        http://www.erepublik.com/profile-*.html
// ==/UserScript==

(function () {
	function linkItem(name, node) {
		var baseUrl = 'http://www.erepublik.com/market-';
		var nameToLinkTbl = [
			{r: /House level \d+/, l: 'house-0-0-0-.html'},
			{r: /Moving/, l: 'moving-0-0-0-.html'},
			{r: /Weapons/, l: 'weapons-0-0-0-.html'},
			{r: /Food/, l: 'food-0-0-0-.html'}
		];
		
		nameToLinkTbl.forEach(function (v) {
			if (name.match(v.r)) {
				par = node.parentNode;
				var link = document.createElement('a');
				link.setAttribute('href', baseUrl + v.l);
				link.appendChild(node.cloneNode(true));
				par.replaceChild(link, node);
				
			}
		});
	}
	
	$x("//div[@class='core' and div[@class='qlevel']] | //div[@class='invitem']").forEach(function(v) {
		linkItem($xs("./img/@alt", v).value, v);
	});
})();

/* std functions */
function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	return $x(xpath, root)[0];
}
