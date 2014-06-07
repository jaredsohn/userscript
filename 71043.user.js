// ==UserScript==
// @name           PureTnA Remove Multiple Items From Wishlist
// @namespace      http://www.userscripts.org
// @include        http://www.puretna.com/wishlist.php*
// @include        http://puretna.com/wishlist.php*
// @require        http://usocheckup.dune.net/71043.js
// ==/UserScript==

(function () {
	
	function removeFromWishlist(e) {
		e.preventDefault();
		var link = this;
		GM_xmlhttpRequest({
			method: "GET",
			url: this.href,
			onload: function(response) {
				var row1 = link.parentNode.parentNode;
				var row2 = row1.previousSibling.previousSibling;
				row1.parentNode.removeChild(row1);
				row2.parentNode.removeChild(row2);
				GM_log([
					response.status,
					response.statusText,
					response.readyState,
					response.responseHeaders,
					response.responseText,
					response.finalUrl,
					response.responseXML
					].join("\n"));
				}
		});
	}
	
	
	var links = document.getElementsByTagName('a');
	for (var i=0;i<links.length;i++) {
	if (links[i].href !== undefined && links[i].href.search('rmwishlist') != -1) {
		links[i].addEventListener('click', removeFromWishlist, false);
	}}
})();