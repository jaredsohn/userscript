// --------------------------------------------------------------------
// ==UserScript==
// @name            Splinder Photo Link replacer
// @namespace       http://www.userscripts.org
// @description     Replace window.open function with simple html link in photos
// @include         http://www.splinder.com/*
// @version					0.1
// ==/UserScript==

//<div
//		title="io-guenda1"
//		class="media-thumb"
//		onclick="window.open('http://www.splinder.com/mediablog/sAiMoon/media/8314356?context=album')"/>

var processPhotoDiv = function() {
    var xpathQry = "//div[@class='media-thumb']";
    var rsDivs = document.evaluate(xpathQry, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var pippo = false;

    var divIdx, selDiv;
    for (divIdx = 0; divIdx < rsDivs.snapshotLength; divIdx++) {
    	selDiv = rsDivs.snapshotItem(divIdx);

			//purge address from javascript;
			var realAddress = selDiv.getAttribute("onClick").substring("window.open('".length);
			realAddress = realAddress.substring(0, realAddress.length - 2);
    	var imgLink = document.createElement('a');
    	imgLink.innerHTML = "link";
    	imgLink.href = realAddress;

			selDiv.setAttribute("onClick", null);
			selDiv.appendChild(imgLink);

			/*
			if (!pippo) {
						alert(onclickText);
						alert(purged);
						pippo = true;
			}
			*/
    }
}
processPhotoDiv();