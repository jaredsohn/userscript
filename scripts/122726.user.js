// ==UserScript==
// @name           common
// @namespace      zero
// @include        *
// ==/UserScript==


var GMZ = {};
GMZ.getXPath = function(query,node) {
    node = node ? node : document;
    return document.evaluate(
            query,
            node,
            null,        
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
};

GMZ._removeNode = function(thisDiv){
    if (thisDiv) {
        thisDiv.parentNode.removeChild(thisDiv);
	}
};

GMZ.removeXPath = function(xpath_string){
    var allDivs = GMZ.getXPath(xpath_string);
    for (var i = 0; i < allDivs.snapshotLength; i++){     
    	GMZ._removeNode(allDivs.snapshotItem(i));
    }
};

GMZ.xPath = function(xpath_string,fun){
    var allDivs = GMZ.getXPath(xpath_string);
    for (var i = 0; i < allDivs.snapshotLength; i++){     
    	fun(allDivs.snapshotItem(i));
    }
};



