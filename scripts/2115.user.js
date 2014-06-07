// ==UserScript==
// @name           "Alt" attribute tooltips
// @namespace      http://www.websandbox.net/
// @description    Shows "alt" attribute text in tooltips
// @include        *
// ==/UserScript==

(function() { 
var prefix = "";
prefix = "Alt: "; // this will be displayed in the tooltip before the alternate text
var myElements = getNodesFromXpath("//*[@alt][not(@title)]");
myElements.forEach( function(element) { element.title = prefix + element.getAttribute("alt");} );

function getNodesFromXpath(xpath) {
	var rs = document.evaluate(xpath,document,null,5,null);
	var nodes = [];
	var currentNode = rs.iterateNext();
	while(currentNode) {
		nodes.push(currentNode);
		currentNode = rs.iterateNext();
	}
	return nodes;
}

})();