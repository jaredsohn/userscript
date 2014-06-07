// ==UserScript==
// @name           cosmiq - favicons
// @description    Zeigt ein favicon vor den links an.
// @namespace      http://userscripts.org/scripts/admin/66913
// @include        http://www.cosmiq.de/lili/my*
// @include        http://www.cosmiq.de/lili/srch*
// @version        20100121
// ==/UserScript==
(function(d){
	function getElementsByXPath(obj, xPathString){
		if (obj.ownerDocument)  {
			xPathString = xPathString.replace(/^\/\//, '/descendant::')
		}
		var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var xPathArray = [];
		for (var i = 0; i < xPathSnapshot.snapshotLength; i++) {
			xPathArray[i] = xPathSnapshot.snapshotItem(i);
		}
		return (xPathArray || []);
	}
	var linkUrls = getElementsByXPath(d.body,'//li[@class="link"]//div[@class="headline"]/a[@target="blank"]');
	linkUrls.forEach(function(linkUrl) {
		var favImg = d.createElement('img');
		favImg.setAttribute('src','http://getfavicon.appspot.com/'+linkUrl.href);
		favImg.setAttribute('border','0');
		favImg.setAttribute('width','16');
		favImg.setAttribute('height','16');
		linkUrl.parentNode.insertBefore(favImg,linkUrl);
	});
}(document));