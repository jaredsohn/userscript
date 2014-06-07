// ==UserScript==
// @name           Feed2Dig 1.1
// @namespace      saurabhkumar.com
// @description    Converts feed URLs in Google Reader to simple Digg URLs
// @include        http://www.google.com/reader/view/*
// ==/UserScript==
//var allDivs, thisDiv;
window.processLink = function() {
       	allDivs = document.evaluate(
		"//a[@class='entry-title-link']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			var url1=thisDiv.href;
			var re = new RegExp(".*digg.*/([A-Za-z0-9_]+)$");
			var m = re.exec(url1);
			if (m != null)
			{
				url1reg= m[1] ;
				url1reg=url1reg.replace(/_/g,'+');
				url2='http://digg.com/search?section=all&s=' + url1reg;
				thisDiv.href=url2;			
			}
		}
}

document.addEventListener('click', function(event) {
	processLink();
}, true);