// ==UserScript==
// @name           Gmail Checker
// @namespace      royhan gmail
// @include        https://mail.google.com/*
// ==/UserScript==


		   var elmCurrentCheckbox = null;
		   
		   function NSResolver(prefix) {
			   return 'http://www.w3.org/1999/xhtml';
		   }

		   function selectCheckboxRange(elmStart, elmEnd) {
			  var sQuery, elmLast;
	
			  if (document.documentElement.namespaceURI) {
				  sQuery = "//xhtml:input[@type='checkbox']";
			  } else {
			      sQuery = "//input[@type='checkbox']";
			  }

			  var snapCheckboxes = document.evaluate(sQuery, document, NSResolver,
				  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			  var i;
			  for (i = 0; i < snapCheckboxes.snapshotLength; i++) {
				  var elmCheckbox = snapCheckboxes.snapshotItem(i);
				  if (elmCheckbox == elmEnd) {
				  elmLast = elmStart;
				  break;
				  }
				  if (elmCheckbox == elmStart) {
				  elmLast = elmEnd;
				  break;
				  }
			   }
				   
			   // note: intentionally re-using counter variable i
			   for (; (elmCheckbox = snapCheckboxes.snapshotItem(i)); ++i) {
				if (elmCheckbox != elmStart &&
				elmCheckbox != elmEnd &&
				elmCheckbox.checked != elmStart.checked) {
				// Fire are onclick event instead of modifying the checkbox's
				// value directly, fire an onclick event. Yahoo! Mail and
				// Google Personalize have onclick handlers on their
				// checkboxes. This will also trigger an onchange event,
				// which some sites rely on.
				var event = document.createEvent("MouseEvents");
				event.initEvent("click", true, false);
				elmCheckbox.dispatchEvent(event);
				 }
				 if (elmCheckbox == elmLast) { break; }
				 }
			 }

			 function handleChange(event) {
				var elmTarget = event.target;
				if (isCheckbox(elmTarget) &&
				   (event.button == 0 || event.keyCode == 32)) {
				if (event.shiftKey && elmCurrentCheckbox) {
				selectCheckboxRange(elmCurrentCheckbox, elmTarget);
				}
				elmCurrentCheckbox = elmTarget;
				 }
			 }

			 function isCheckbox(elm) {
			 return (elm.tagName.toUpperCase()=="INPUT" && elm.type=="checkbox"); 
			 }

			 document.documentElement.addEventListener("keyup", handleChange, true);
			 document.documentElement.addEventListener("click", handleChange, true);