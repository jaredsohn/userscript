// ==UserScript==
// @name           _@/ google images
// @author         Chris Porter
// @version        0.2
// @date           2008-04-13
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://images.google.*/images?*
// @include        http://images.google.*/imgres?*
// ==/UserScript==

document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};


// =================================================================================================
// GoogleImages
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

var GoogleImages = {


// -------------------------------------------------------------------------------------------------
// nowViewing

	nowViewing: {

		get searchResults() { return (location.pathname.indexOf("/images") == 0); },
		get imageTopFrame() { return ((location.pathname.indexOf("/imgres") == 0) && (document.getElementByXPath("//font[text()='Remove Frame']") != undefined)); }

	},


// -------------------------------------------------------------------------------------------------
// copyNavBar

	copyNavBar: function()
	{
	var elements = {
		bottomNavBar: document.getElementByXPath("//div[@id='navbar']"),
		topNavBar: document.createElement("div")
	};

	with (elements.topNavBar)
		{
		id = "navbar";
		className = "n";
		innerHTML = elements.bottomNavBar.innerHTML;
		}
	elements.bottomNavBar.parentNode.insertBefore(elements.topNavBar, elements.bottomNavBar.parentNode.firstChild);
	},


// -------------------------------------------------------------------------------------------------
// formatLinks

	formatLinks: function()
	{
	var elements = {
		imageLinks: document.getElementsByXPath("//div[@id='ImgContent']//td[contains(@id,'tDataImage')]/a"),
		imageDescs: document.getElementsByXPath("//div[@id='ImgContent']//td[contains(@id,'tDataText')]/font")
	};

	for ( var i = 0 ; i < elements.imageLinks.length ; i++ )
		{
		var s = elements.imageDescs[i].innerHTML;
		s = s.substr(0, s.indexOf("<br>"));
		elements.imageLinks[i].href += "&imgDesc=" + escape(s);
		}

	},


// -------------------------------------------------------------------------------------------------
// addImageDescription

	addImageDescription: function()
	{
	var getImageDesc = function() {
		var a = window.parent.location.search.split("&");
		var s = unescape(a.filter(function(element, index, array) { return (element.indexOf("imgDesc=") == 0); })[0].split("=")[1]);
		return s;
	};

	var elements = {
		imageURL: document.getElementByXPath("/html/body/table/tbody/tr/td[3]/font"),
		imageDesc: document.createElement("font")
	};

	elements.imageDesc.innerHTML = "<br />" + getImageDesc();
	elements.imageURL.parentNode.insertBefore(elements.imageDesc, elements.imageURL.nextSibling);
	},


// -------------------------------------------------------------------------------------------------
// onCreate

	onCreate: function()
	{
	if (this.nowViewing.searchResults)
		{
		this.copyNavBar();
		this.formatLinks();
		}
	if (this.nowViewing.imageTopFrame)
		{
		this.addImageDescription();
		}
	}

};
GoogleImages.onCreate();


