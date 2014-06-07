// ==UserScript==
// @name          BBC News - Remove ticker CPU hog
// @description	  Removes the distracting and CPU eating "breaking news" ticker from the top of the BBC News homepage.  Verified as of 2009-06-30. Derived from userstyle to do similar by stephenw32768 but this one kills excessive CPU usage too
// @include       http://news.bbc.co.uk/*
// @include       https://news.bbc.co.uk/*
// @include       http://*.news.bbc.co.uk/*
// @include       https://*.news.bbc.co.uk/*
// ==/UserScript==

(function() {

	// See http://en.kioskea.net/faq/sujet-2095-personalize-web-pages-with-greasemonkey
	function removeElement(ElementXpath)
	{
		var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i<alltags.snapshotLength; i++)
		{
			element = alltags.snapshotItem(i);
			element.parentNode.removeChild(element); // Remove this element from its parent.
		}
	} 
	// This is a GM script equivalent of stephenw32768's userstyle code to make the ticker holder invisible
	var css = "@namespace url(http://www.w3.org/1999/xhtml); #tickerHolder { display: none !important; }";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}

	// I do not claim this to be beautiful but this appears to be what is needed to shut off CPU usage
	removeElement("//div[@id='tickerHolder']");
	removeElement("//div[@class='wideav']");
	removeElement("//script[@src contains(.,'ticker')]");

})();


