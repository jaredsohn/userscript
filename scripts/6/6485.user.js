// ==UserScript==
// @name          Rearrange the website of Defence Facilities Administration Agency
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Rearrange the website of Defence Facilities Administration Agency(Japan)
// @include       http://www.dfaa.go.jp/*
// ==/UserScript==

(function(){
	var main = document.evaluate("//div[@class='main']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(main){
		main.style.cssFloat = "left";
		main.style.width = "76%";
		main.style.marginRight = "10px";
	}
})();