// ==UserScript==
// @name           MetaFilter No Poster Name
// @namespace      http://teiaoito.com.br/metafilter
// @description    Eliminates the poster name in the comment
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==


(function (){
	var xpath = "//div[@class='comments']//span"
	var nomes= document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var name=null,i=0;(name = nomes.snapshotItem(i)); i++){
		var parent = name.parentNode
		if (String(parent.tagName).toUpperCase() == 'A') {
			name = parent;
			parent = parent.parentNode;
		}	
		var src = name.innerHTML;
		var start=src.indexOf("#");
		if (start != -1){
			parent.insertBefore(document.createElement("<hr>"),name);
			parent.removeChild(name);
			
		}		
		
		
	}
	
})();

