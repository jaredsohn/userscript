// ==UserScript==
// @name          TV.com Newzbin Search
// @namespace     http://blah.example/greasemonkeyscripts/TV.com.Newzbin.Link
// @description   Collection of enhancements to newzbin.com (v1.0.1)
// @include       http://www.tv.com/*/show/*
// ==/UserScript==

(function() {
	var prefs = [];

		function processPage() {
			// Show
			var show = evaluateXPath(unsafeWindow.document, "//div[@id='content-head']/h1[first()]").innerHTML;

			// Episodes
			var xpathQuery= "//div[@id='main-col']//div[@class='pod']/table[@class='f-11']//td[@class='f-bold']/a[first()]";

			var links = evaluateXPath(unsafeWindow.document, xpathQuery);
			for (var i=0; i < links.length; i++) {
				var link = links[i];
				
				var nblink = unsafeWindow.document.createElement("a");
				nblink.innerHTML = " [Newzbin]";
				nblink.href="http://v3.newzbin.com/search/query/?fpn=p&searchaction=Go&category=TV&q=" + show + " " + link.innerHTML;
			}
		}	
	}


	window.setTimeout(processPage, 10); 
})();



