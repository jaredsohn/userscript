	// ==UserScript==
	// @name			Display Hidden Form Fields
	// @namespace		http://diveintomark.org/projects/greasemonkey/
	// @description		un-hide hidden form fields and make them editable
	// @include			*
	// ==/UserScript==
		   
	   var snapHidden = document.evaluate("//input[@type='hidden']",
		   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   elmHidden.style.MozOutline = '1px dashed #666';
		   elmHidden.type = 'text';
		   elmHidden.title = 'Hidden field "' +
			   (elmHidden.name || elmHidden.id) + '"';
	   }
       