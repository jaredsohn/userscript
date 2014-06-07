// ==UserScript==
// @name           Make Link for Femo
// @namespace      http://femo.jp/saitamanodoruji/
// @description    on public pages, make links to the corresponding private pages
// @include        http://femo.jp/*/*
// ==/UserScript==

(function() {
	function makeLink(cNode) {
		var headers = document.evaluate('.//h2[contains(concat(" ", normalize-space(@class), " "), " entry-header ")]', cNode, null, 7, null);
		for(i=0;i<headers.snapshotLength;i++) {
			var id = document.evaluate('./a', headers.snapshotItem(i), null, 7, null).snapshotItem(0).getAttribute('name');
			var linkObj = document.createElement('a');
			linkObj.href = 'http://' + document.location.host + '/#entry=' + id;
			linkObj.innerHTML = '[edit]';
			headers.snapshotItem(i).appendChild(linkObj);
		}
	}

	makeLink(document);

	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	    var node = evt.target;
	    var requestURL = evt.newValue;
	    var parentNode = evt.relatedNode;
	    makeLink(node);
	}, false);

})();