// ==UserScript==
// @name           AddAvatar
// @namespace      Dhruva Sagar
// @include        *
// @description	 This replaces anything on the page within [Avatar]*[/Avatar]
//			 with the image of the text within the tags, assuming that it
//			 is a url of an image.
// @author		 Dhruva Sagar 
// @version		 1.0
// ==/UserScript==

/*
	Author :	Dhruva Sagar
	Version:	1.0
*/

function addAvatarImage() {
	try {
		var avatar = document.evaluate("//text()[not(ancestor::script) " +
							 "and not(ancestor::style) " +
							 "and not(ancestor::textarea) " +
							 "and contains(.,'[Avatar]')]",
							document,
							null,
							XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							null);
		var acRegex = /(\[Avatar\])(.*)(\[\/Avatar\])/ig;

		for(var i=avatar.snapshotLength - 1; i>=0 ; i--) {
			var elm = avatar.snapshotItem(i);
			if(acRegex.test(elm.nodeValue)) {
				var elmSpan = document.createElement("span");
				elm.parentNode.replaceChild(elmSpan, elm);
				var text = elm.nodeValue;
				acRegex.lastIndex = 0;
				for(var match = null, lastLastIndex = 0; (match = acRegex.exec(text)); ) {
					elmSpan.appendChild(document.createTextNode(text.substring(lastLastIndex, match.index)));
					var image = document.createElement("img");
					image.setAttribute("src", RegExp.$2);
					image.setAttribute("title", RegExp.$2);
					image.setAttribute("height", "100");
					image.setAttribute("width", "100");
					elmSpan.appendChild(image);
					lastLastIndex = acRegex.lastIndex;
				}
				elmSpan.appendChild(document.createTextNode(text.substring(lastLastIndex)));
				elmSpan.normalize();
			}
		}
	} catch(e) {
		GM_log(e);
	}
}

addAvatarImage();
