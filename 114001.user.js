// ==UserScript==
// @name           AdFree Koc
// @description    Removes the advertisements from Kings Of Chaos site
// @namespace      http://psxlover.no-ip.info
// @include        http://www.kingsofchaos.com*
// @version        1.1
// ==/UserScript==

function removeXPath(XPath) {
	var elements = document.evaluate(XPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < elements.snapshotLength; i++) {
		var element = elements.snapshotItem(i);
		element.parentNode.removeChild(element);
	}
	//GM_log(elements.snapshotLength + " elements in " + XPath);
}

function removeAds() {
	if (document.location.pathname != "/recruit.php") {
		removeXPath('/html/body/table[1]/tbody/tr/td[2]');						//Top banner
		if (document.location.pathname != "/" && document.location.pathname != "/error.php"  && document.location.pathname != "/index.php")
			removeXPath('/html/body/table[2]/tbody/tr/td[3]');					//Right Banner
		else
			removeXPath('/html/body/table[2]/tbody/tr/td/p[3]');				//Left Banner
	}

	removeXPath('/html/body/table[2]/tbody/tr/td[1]/center');					// center[1] Bored? Play flash games && center[2] get firefox

	if (document.location.pathname == "/base.php") {
		removeXPath('/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td[2]/script/parent::*');// Share this
		removeXPath('/html/head/script[2]');
		removeXPath('/html/head/link[6]');
		removeXPath('//*[@id="stSegmentFrame"]');
		removeXPath('/html/body/iframe');
	}
	if (document.location.pathname == "/armory.php")
		removeXPath('/html/body/table[2]/tbody/tr/td[2]/p/table/tbody/tr/td/center/iframe/parent::*');// Armory Banner
}

removeAds();
