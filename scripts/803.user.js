// ==UserScript==
// @name          RSSAdFilter
// @namespace     <a href="http://philmccluskey.com/projects/greasemonkey/RSSAdFilter">http://philmccluskey.com/projects/greasemonkey/RSSAdFilter</a>
// @description	  Removes feedburner and feedster inserted RSS ads 
// @include       *

// ==/UserScript==


(function() {

    var xpath = "//img[contains(@src, 'iBag?')]";
    var imgs = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elm, i;
    
    for(elm = null, i = 0; (elm = imgs.snapshotItem(i)); i++) 
    {
		elmID = elm.getAttribute('id');
		elm.setAttribute("style", "display:none");
		}
	
    var xpath2 = "//a[contains(@href, 'feedstermedia')]";
    var hrefs = document.evaluate(xpath2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(elm = null, i = 0; (elm = hrefs.snapshotItem(i)); i++) 
    {
		elmID = elm.getAttribute('id');
		elm.setAttribute("style", "display:none");
    }
    
    var xpath3 = "//a[contains(@href, 'googleadservices')]";
    hrefs = document.evaluate(xpath3, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(elm = null, i = 0; (elm = hrefs.snapshotItem(i)); i++) 
    {
		elmID = elm.getAttribute('id');
		elm.setAttribute("style", "display:none");
    }
    
    var xpath4 = "//a[contains(@href, 'http://www.google.com/ads_by_google.html')]";
    hrefs = document.evaluate(xpath4, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(elm = null, i = 0; (elm = hrefs.snapshotItem(i)); i++) 
    {
		elmID = elm.getAttribute('id');
		elm.setAttribute("style", "display:none");
    }
    
    var xpath5 = "//img[contains(@src, 'full?')]";
    var imgs = document.evaluate(xpath5, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elm, i;
    
    for(elm = null, i = 0; (elm = imgs.snapshotItem(i)); i++) 
    {
		elmID = elm.getAttribute('id');
		elm.setAttribute("style", "display:none");
		}
 

})();
