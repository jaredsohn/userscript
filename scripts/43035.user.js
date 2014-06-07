// ==UserScript==



// @name           4chan spam remover


// @namespace      OH LAWDY


// @description    Removes the coloured box spam


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



	if (tmp.indexOf("-(1 KB, 2350x2313,") >= 0

			|| tmp.indexOf("-(1 KB, 2350x2313,") >= 0) {



		gsdv[i].parentNode.parentNode.parentNode.parentNode.removeChild(gsdv[i].parentNode.parentNode.parentNode);



	}



}