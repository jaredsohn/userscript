// ==UserScript==

// @name          Kaskus to Old changer

// @namespace

// @description   

// @include       *

// ==/UserScript==


(function() {
	var newkaskus = "http://www.kaskus.co.id"
	var oldkaskus = "http://old.kaskus.co.id"

	if (document.evaluate) {    // Firefox, Opera, Google Chrome and Safari
		var container = document.getElementById ("container");
		var xPathRes = document.evaluate ( '//text()', container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < xPathRes.snapshotLength; i++) {
			var actualSpan = xPathRes.snapshotItem (i);
			var s = actualSpan.data;
			var n = s.search("postcount");
			if (n != -1){
				s = s.replace (newkaskus, oldkaskus);
			} 
		}
	}
	else {  // Internet Explorer
		message = "Your browser does not support the evaluate method!";
	}
        return s;

}
	
})();