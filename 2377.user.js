// ==UserScript==
// @name           MetaFilter Poster Name First
// @namespace      http://teiaoito.com.br/metafilter
// @description    Inserts the poster name before the comment
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
		var end=src.indexOf("\"",start);
		var num=src.substring(start+1,end);
		if (start != -1){
			var xpath2 = "//div[@class='comments']//a[@name='"+num+"']"
			
			var places = document.evaluate(xpath2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
			var newplace=places.snapshotItem(0);
			var newname=name.cloneNode(true);
			newname.appendChild(document.createElement("br"));
			
			parent.insertBefore(newname,newplace);
			parent.removeChild(name);
			
		}		
		
		
	}
	
})();