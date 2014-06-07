// ==UserScript==
// @name          TwitterAvatarHistory
// @description   Shows tweets with the avatar at time of posting
// @include       http://twitter.com/*
// ==/UserScript==

// Assumptions:
// -chinposin.com has a special date string under the pic
// -avatars are listed chronologically
// -many others regarding DOM position

const avatar_home = "http://www.chinposin.com/home/";
var twitter_images = document.evaluate('//.[contains(@class, "hentry")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
while (message = twitter_images.iterateNext()) {
	message = message.wrappedJSObject;
	
	// Read user name
	var url = message.getElementsByClassName("url")[0];
	if (!url) continue;
	var username = url.getAttribute("href").match("[^/]*$");
	
	// Read date of message and extract fields with a regexp
	var date_string = message.getElementsByClassName("published")[0].getAttribute("title");
	var match = date_string.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{2}):(\d{2})/);
	var date = new Date(match[1], match[2], match[3], match[4], match[5], match[6]);
	
	var http = function(responseDetails) {
		// add dummy element so we can operate on its DOM
		var elem = document.createElement("html");
		document.body.appendChild(elem);
		elem.innerHTML = responseDetails.responseText;

		try {
			// getElementById is only found in document object, will use XPath
			var gallery = document.evaluate('//.[@id="gallery"]', elem.wrappedJSObject, null,
					     XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.wrappedJSObject;
			
			var avatars = gallery.getElementsByTagName("div");;

			// Find avatar date not more recent than message date
			for (i = 1; i < avatars.length; i++) {
				var date_text = avatars[i].getElementsByTagName("span")[0].textContent;
				var image = avatars[i].getElementsByTagName("img")[0];
				
				var match = date_text.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
				var avatar_date = new Date(match[1], match[2], match[3], match[4], match[5], match[6]);
				
				if (avatar_date <= arguments.callee.date) {
					// Replace message pic with avatar corresponding to date
					arguments.callee.img.firstChild.setAttribute("src", image.getAttribute("src"))
					// TMTOWTDI:
					//~ arguments.callee.img.replaceChild(images[i].cloneNode(false), arguments.callee.img.firstChild);
					break;
				}
			}
		} catch (error) {
			GM_log(error);
		}
		
		// clean up temp structure
		document.body.removeChild(elem);

	}
	
	// Trick to pass data to the closure
	http.date = date;
	http.img = message.getElementsByClassName("url")[0];

	// Reach list of pix from user page
	GM_xmlhttpRequest({method : "GET", url : avatar_home + username, onload : http});

}