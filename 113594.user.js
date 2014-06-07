// ==UserScript==
// @name           konulu videolar--
// @description    konulu videolar--
// @version        1.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/show.asp*
// @include        https://antik.eksisozluk.com/show.asp*
// ==/UserScript==


	function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
	var nodes = xpath(".//div[@class='rel-vid']");
	
	if(nodes.snapshotLength > 0 ) {
			var adds = nodes.snapshotItem(0);
			adds.style.display = "none";
		}