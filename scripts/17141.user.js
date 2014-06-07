// ==UserScript==

// @name           The Nest

// @namespace      

// @description    Adds an image button to message boards on thenestbaby.com and boards.thenest.com
// @include        http://*.thenestbaby.com/*

// @include	   http://boards.thenest.com/*
// ==/UserScript==

//alert('started');
var underlineButton;
var newElement;
underlineButton = document.getElementById("ctl0_MainContent__ctl0_PostForm_PostBodyRichText_0_2");

if (underlineButton) {
	newElement = underlineButton.cloneNode(true);
	newImage = newElement.childNodes[0];
	newImage.src = 

"http://community.thenestbaby.com/cs/tiny_mce/jscripts/tiny_mce/themes/CommunityServer/images/image.gif";
	newImage.title = "Insert Image";
	underlineButton.parentNode.insertBefore(newElement, underlineButton.nextSibling);
	newImage.addEventListener('click', function() {	
		var imageSource = prompt("Enter the image location", "");
		GM_xmlhttpRequest({
		        method:'GET',
		        url: 'http://tinyurl.com/api-create.php?url=' + imageSource,
		        headers: {
		            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		            'Accept': 'application/atom+xml,application/xml,text/xml',
		        },
		        onload:function(results) {
				var postBox = 
				document.getElementById								

			("ctl0_MainContent__ctl0_PostForm_PostBodyRichText_designEditor");
				var postDoc = postBox.contentDocument;
				var oldHtml = postDoc.body.innerHTML;
				postDoc.open();
				postDoc.write(oldHtml + "[img]" + results.responseText + "[/img]");
				postDoc.close();
		        }
		    });		

		
	}, false);
}

