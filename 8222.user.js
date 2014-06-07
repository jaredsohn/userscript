// ==UserScript==
// @name           CSMmail quote
// @namespace      http://n.chunkybacon.org/userscripts/csm-quote
// @description    Automatically quotes messages in CSM
// @include        http://www*.cs-manager.com/csm/?p=manager_mail&s=new&m=*
// ==/UserScript==

window.addEventListener("load", function(){

	var textField = document.getElementById('text');

	var quotee = document.evaluate("//form[@id=\"form\"]/table/tbody/tr[7]/td", 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	quotee = quotee.snapshotItem(0).textContent;
	var quoteElement = document.evaluate("//form[@id=\"form\"]/table/tbody/tr[8]/td/p", document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var quoteText = "\n>";
	quoteElement = quoteElement.snapshotItem(0);

	for(var i = 0; i < quoteElement.childNodes.length; ++i){
		var child = quoteElement.childNodes[i];

		switch(child.nodeType){
			case document.TEXT_NODE:
				quoteText += child.textContent;
				break;

			
			//Line break.
			case document.ELEMENT_NODE:
				quoteText += "\n>";
				break;

			default: 
		}
	}

	textField.value = quotee + quoteText + "\n\n";
	textField.focus();

}, false);
