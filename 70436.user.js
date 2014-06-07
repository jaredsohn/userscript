// ==UserScript==
// @name           Social Me Tags++
// @namespace      http://mathemaniac.org
// @description    Adds more tags to Social Me.
// @include        http://apps.facebook.com/socialme/
// @include        http://apps.facebook.com/socialme/?*
// @include        http://apps.facebook.com/socialme/tag/*
// @require        http://updater.usotools.co.cc/53845.js
// ==/UserScript==

(function() {
	//////////////////
	// Add your own tags here
	// The number corresponds to a color.
	//////////////////
	var custom_tags = new Array(
		["cute smile", 10],
		["adorable", 15],
		["so cute", 15],
		["seductive", 7],
		["mysterious", 13],
		["very pretty", 8],
		["intense", 9],
		["attractive", 2],
		["oh my", 4],
		["alluring", 3],
		["delicate", 11],
		["appealing", 12],
		["charming", 10],
		["cheerful", 15],
		["darling", 14],
		["foxy", 15],
		["good-looking", 7],
		["graceful", 13],
		["lovely", 8],
		["amazing", 9],
		["pleasing", 2],
		["tasteful", 14],
		["magnetic", 4],
		["provocative", 3],
		["tempting", 11],
		["gorgeous", 6]
	);
	////////////////////
	// DO NOT TOUCH BEYOND THIS POINT
	// (unless you know what you're doing)
	////////////////////
	
	/* Last official tag is "silly", so let's find that. */
	var sillyBtn = document.evaluate('//span[@class="tag_item" and descendant::a[contains(@id,"tag_silly")]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	// In fact, the id is "appXXXXXXXXXXXX_tag_silly", so let's find the exact ID and mimic it.
	var idPrefix = sillyBtn.children[0].id.match(/app\d+_/);
	var fbContext = sillyBtn.children[0].getAttribute('fbcontext');
	
	var docFrag = document.createDocumentFragment();
	var spacerNode = sillyBtn.previousSibling;
	
	for each (var tag in custom_tags) {
		var containingSpan = document.createElement('span');
		containingSpan.className = 'tag_item';
		
		var tagLink = document.createElement('a'); 
		tagLink.id = idPrefix+"tag_"+tag[0].replace(" ","-");
		tagLink.className = "tag_color"+tag[1];
		tagLink.setAttribute('alt',tag[0]);
		tagLink.setAttribute('fbcontext', fbContext);
		tagLink.appendChild(document.createTextNode("    "+tag[0]+"\n"));
		
		/*
			My hacky way of doing it:
			To avoid messing with FB's AJAX stuff, I simply feed the tag I wanna use into the custom tag box, click the Tag! button, then reset the value of the box.
		*/
		tagLink.addEventListener("click",
			function(event) {
				var inputField = document.evaluate('//input[@id="'+idPrefix+'custom_tags"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var oldVal = inputField.value;
				inputField.value = event.target.getAttribute('alt');
				var submitBtn = inputField.nextSibling.nextSibling;
				submitBtn.click();
				inputField.value = oldVal;
			},true
		);
		
		containingSpan.appendChild(tagLink);
		
		docFrag.appendChild(containingSpan);
		docFrag.appendChild(spacerNode.cloneNode(true));
	}
	
	sillyBtn.parentNode.insertBefore(docFrag, sillyBtn.nextSibling);
})();