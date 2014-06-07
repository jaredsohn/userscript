// ==UserScript==
// @name           ibdof main-menu
// @namespace      http://www.ibdof.com/
// @description    phpbbV2: ibdof mainmenu code... td span :link1: :link2: span :linkx: :linky: :etc: - remove the colon wrappers and fix spacing
// @include        *ibdof.com*
// ==/UserScript==

/**
	Remove the colon wrappers around the menu links
		and seperate each by a diamond character.
	Note: cell addresses are relative to cell[0] == class 'bodyline'
*/
(function () {
	/** 
		Is the loading document the review body from "posting.php?mode=reply"
			if so exit early so we don't try to fix a menu that isn't there
	*/
	if (document.getElementsByTagName('table')[0].hasAttribute('class'))
		return;

	/** 
		Remove extraneous empty text nodes
		These carriage-returns between html span coding make the menu formatting look unsightly
			with odd spaces between adjacent menu items
		(yes, I know... I'm also deleting ALL empty text nodes in the cell - but who cares!)
	*/
	// line 1
	var dev = document.evaluate(
			"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td//text()[not(parent::a) and not(parent::font)]", 
			document, 
			null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < dev.snapshotLength; i++)
		dev.snapshotItem(i).parentNode.removeChild(dev.snapshotItem(i));
	// line 2
	var dev = document.evaluate(
			"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]/td//text()[not(parent::a) and not(parent::font)]", 
			document, 
			null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < dev.snapshotLength; i++)
		dev.snapshotItem(i).parentNode.removeChild(dev.snapshotItem(i));


	/** 
		Ok, ready to tackle menu formatting
	*/
	// line 1
	a = document.getElementsByTagName('tr')[2].getElementsByTagName('a');
	for (i = 0; i < a.length; i++) {
		a[i].innerHTML = a[i].innerHTML.replace(/.*:(.+):.*/, '$1');
		if (i < a.length-1)
			// add diamond seperators between each - except for last item
			a[i].parentNode.insertBefore(document.createTextNode('\u00a0\u25CA\u00a0'), a[i].nextSibling);
	}
	// line 2
	a = document.getElementsByTagName('tr')[3].getElementsByTagName('a');
	for (i = 0; i < a.length; i++) {
		a[i].innerHTML = a[i].innerHTML.replace(/.*:(.+):.*/, '$1');
		if (i < a.length-1)
			// add diamond seperators between each - except for last item
			a[i].parentNode.insertBefore(document.createTextNode('\u00a0\u25CA\u00a0'), a[i].nextSibling);
	}
}());
