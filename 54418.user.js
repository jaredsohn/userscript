// ==UserScript==
// @name           4Cache simplifier
// @namespace      com.aimedia
// @description    Makes 4cache links skip the intermediate page
// @include        http://4cache.lankyland.com/*
// ==/UserScript==

var i = 0;

function handler() {
	var imageElements = document.evaluate("//body//td/a[@target='_blank' and img]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

	for (var i = 0, element; element = imageElements.snapshotItem(i); i++) {
		imageElement = element.getElementsByTagName("img")[0]
		if (imageElement.nextSibling && imageElement.nextSibling.wholeText) {
			imageName = imageElement.nextSibling.wholeText;
		} else {
			imageSrc = imageElement.src;
			imageName = imageSrc.replace(/http:\/\/.*f=(.*\.(png|jpg|gif))/, "$1");
		}
		element.target = null;
		element.href = "http://4cache.lankyland.com/" + imageName;
		
	}

	imageElements = document.evaluate("//body/a[@target='_blank' and img]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0, element; element = imageElements.snapshotItem(i); i++) {
		imageElement = element.getElementsByTagName("img")[0]
		element.target = null;
		element.href = imageElement.src.replace(/\/t/, "");
	}
	
}

window.addEventListener('load', handler, false);