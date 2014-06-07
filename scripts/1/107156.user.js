// ==UserScript==
// @name          Sachalayatan-Anti-Disabler
// @description   Restore context menu and highliging functionality in sachalayatan :|
// @include       *sachalayatan.com*
// ==/UserScript==

var RemoveDisability = {
	alerter : "alert(\"I am alerter\")"
	,
	
	replacer : function() {
		var contentDivs, currentDiv;
		contentDivs = document.evaluate(
				"//div[@unselectable='on']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
		//alert(contentDivs.snapshotLength);
		var i;
		for (i=0; i<contentDivs.snapshotLength; i++) {
			currentDiv = contentDivs.snapshotItem(i);
			if (currentDiv != null) {
				var htmlContent = currentDiv.innerHTML;
				//alert(htmlContent);
				var parent = currentDiv.parentNode;
				var sibling = currentDiv.nextSibling;
				var newDiv = document.createElement("div");
				newDiv.innerHTML = htmlContent;
				parent.removeChild(currentDiv);
				parent.insertBefore(newDiv, sibling);
			}
		}
	}
};

RemoveDisability.replacer();
