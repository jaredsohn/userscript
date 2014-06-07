// ==UserScript==
// @name           Open Selected Image Links
// @version        1.01
// @include        *
// ==/UserScript==

(function(){

window.addEventListener("keypress", function(event){
	if(event.charCode == "o".charCodeAt(0)){
		var linkiterator, linknode;
		linkiterator = document.evaluate("//a[@href]", getSelection().getRangeAt(0).cloneContents().firstChild, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		while(linknode = linkiterator.iterateNext()){
			if(/(?:jpe?g|gif|png|bmp)$/.test(linknode.href)) GM_openInTab(linknode.href);
		}
	}
}, false);

})();