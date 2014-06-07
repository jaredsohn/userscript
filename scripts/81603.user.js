// ==UserScript==
// @name           No Ads -- For Baidu
// @author         pure baidu 
// @version        1.0
// @namespace      http://userscripts.org
// @description    Removes all promotion ads from Baidu.
// @include        *baidu.com*
// ==/UserScript==
(function(){
		
		var elements = document.evaluate(
			"//td[contains(@class,'EC_PP')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		for (var i = 0; i < elements.snapshotLength; i++) {
			var thisElement = elements.snapshotItem(i);
			//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
			//thisElement.parentNode.removeChild(thisElement);
			var tableNode = thisElement.parentNode.parentNode.parentNode;
			tableNode.style.display = "none";
			var nextNode = next(tableNode);
			if(nextNode)
			{
				nextNode.style.display = "none";
			}
			
		}
})();

function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;                
}
