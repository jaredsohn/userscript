// ==UserScript==
// @name           eCSFR 
// @namespace      conta
// @description    maly vylepsovak na eRepublik nech sa citime ako v skutocnej federacii ;] 
// @include        *erepublik.com/*
// ==/UserScript==

(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;    
	      
		  s = s.replace(/\bSlovakia\b/gi, "Czech and Slovak Federation");
	      //s = s.replace(/Slovakia/gi, "Czech and Slovak Federation");
          //s = s.replace(/Lawyee/gi, "Mr. President");
		  s = s.replace(/SKK/gi, "CSK");
		  s = s.replace(/Eastern Czech and Slovak Federation/gi, "Eastern Slovakia "); //aby neukazovalo zle regiony. upravte podla toho ako mate nech ukaze Slovakia
		  s = s.replace(/Western Czech and Slovak Federation/gi, "Western Slovakia ");
		  s = s.replace(/Central Czech and Slovak Federation/gi, "Central Slovakia ");
		  


      node.data = s;
   } 
   


var allImages = document.getElementsByTagName("img");
for(var v=0;v<allImages.length;v++){
	var src = allImages[v].getAttribute("src");
	 allImages[v].setAttribute("src", src.replace(/Slovakia.gif/, "Czech-Republic.gif") ) ;
	 
	 
}
var allImages = document.getElementsByTagName("img");
for(var v=0;v<allImages.length;v++){
	var src = allImages[v].getAttribute("src");
	 allImages[v].setAttribute("src", src.replace(/Slovakia.png/, "Czech-Republic.png") ) ;
	 
	 
}




})();

