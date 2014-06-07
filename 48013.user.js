// ==UserScript==
// @name           Helgon Adremover
// @namespace      http://www.helgon.net/gm
// @description    Removes the ads from helgon.net
// @include        http://www.helgon.net/*
// ==/UserScript==

if (document.URL == "http://www.helgon.net/")
{
	var table = document.getElementsByTagName("table")[1];
	table.deleteRow(2);
	table.deleteRow(1);
}
else
{
	var adFrame = document.evaluate("//iframe[@class='frameborder']", document, null,
					  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	var adImage = document.evaluate("//img[contains(@src,'lankar.gif')]", document, null,
					  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					  
	if (adFrame) adFrame.style.visibility = "hidden";
	if (adImage) adImage.style.visibility = "hidden";
}