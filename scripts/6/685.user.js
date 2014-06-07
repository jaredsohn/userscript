//5/23/2005 7:53AM JGD reviewed.  No warranty expressed or implied.
// ==UserScript==
// @name          Adjust article at Compulenta.ru after AdBlock
// @namespace     http://dunck.us/code/greasemonkey/
// @include       http://*compulenta.ru/*
// ==/UserScript==

(function() {
    var article = document.getElementById("article");

	if (!article) {
		return; // We haven't article
	}

	var content = article.parentNode;

	content.style.marginLeft = "0px"; // adjust article
})();