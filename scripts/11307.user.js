// ==UserScript==
// @name           Google Docs for small screens
// @namespace      Syndicate36
// @description    Opens documents in a new window without toolbar and statusbar 
// @include        http://docs.google.com
// ==/UserScript==            

var documentWndProp = "status=no,toolbar=no,width=800,resizable=yes"
var spreadsheetWndProp = "status=no,toolbar=no,resizable=yes"

var doclistContainer, documentNameDivs, docLink, windowProperties;

// find the element that is ajax updated on document list refresh 
var doclistContainer = document.evaluate("//div[@class='doclistview-inner']",document,null,
										XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// if found register update listener                        
if (doclistContainer.snapshotLength > 0) {
	doclistContainer.snapshotItem(0).addEventListener('DOMNodeInserted', modifyAnchorTags, true);
}
        
function modifyAnchorTags() 
{    
	documentNameDivs = document.evaluate("//div[@class='doclist-name']", 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);       

	for (var i = 0; i < documentNameDivs.snapshotLength; i++) {
		docLink = documentNameDivs.snapshotItem(i).parentNode;  
		windowProperties = isSpreadsheet(docLink) ? spreadsheetWndProp : documentWndProp;
		docLink.setAttribute("onclick", 
			"window.open(this.href, this.target, '" + windowProperties + "'); return false;")
	}
}

function isSpreadsheet(anchorElement) {
	return anchorElement.href.indexOf("spreadsheet") > 0;
} 

modifyAnchorTags();
             

