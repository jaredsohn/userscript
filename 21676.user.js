// ==UserScript==

// @name           Del.icio.us: Bundle sorter   
// @namespace      http://userscripts.org/users/43921
// @description    Changes del.icio.us's tag bundle manager so unbundled tags are listed at the top. 
// @include			https://secure.delicious.com/settings/tags/bundle*
// ==/UserScript==

	unbundledElements = document.evaluate(
		'//li[not(contains(@class, \'inBundle\')) and contains(@class, \'0\')]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
// Insert the unbundled tags at the top.
	var firstElement;
	if (unbundledElements) {
	for (var i=unbundledElements.snapshotLength-1; i>=0; i--) {
			thisElement = unbundledElements.snapshotItem(i);
			if (!(firstElement)) {	
				liElement = document.evaluate(
					'//div[@id=\'alphacloud\']/ul[1]/li[1]',
					document,
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null);
					firstElement = liElement.snapshotItem(0);
			}
			firstElement.parentNode.insertBefore(thisElement, firstElement);
			firstElement = thisElement;
		}
	}