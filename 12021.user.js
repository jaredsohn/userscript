// ==UserScript==

// @name           4chan gsdv remover

// @namespace      lol

// @description    Removes gsdv.jpg spam from 4chan.

// @include        http://img.4chan.org/*

// ==/UserScript==





function xpath(expr, context)

{

	if (context == null) {

		context = document;

	}



	var result = document.evaluate(expr, context, null,

			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var resultArray = new Array();

	for (var i = 0; i < result.snapshotLength; ++i) {

		resultArray.push(result.snapshotItem(i));

	}



	return resultArray;

}





var gsdv = xpath("//span[@class='filesize']");

for (var i = 0; i < gsdv.length; ++i) {
	var tmp = gsdv[i].textContent;

	if (tmp.indexOf("-(14 KB, 209x349,") >= 0
			|| tmp.indexOf("-(14 KB, 154x261,") >= 0) {

		gsdv[i].parentNode.parentNode.parentNode.parentNode.removeChild(gsdv[i].parentNode.parentNode.parentNode);

	}

}