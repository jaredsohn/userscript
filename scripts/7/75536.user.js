// ==UserScript==
// @name    Heise ohne Äpfel
// @namespace    www.heise-ohne-äpfel.de
// @include    http://www.heise.de/*
// ==/UserScript==
var anchors = document.getElementsByTagName("a");
var keywords = new Array("Apple", "iPad", "iPhone", "iPod", "iTunes");
for ( var i = 0; i < anchors.length; i++) {
	var title = anchors[i].getAttribute("title");
	if (title != null) {
		for ( var index = 0; index < keywords.length; index++) {
			var key = keywords[index];
			if (title.indexOf(key) >= 0) {
				if (anchors[i].parentNode.nodeName.toLowerCase() == "h3")
					anchors[i].parentNode.parentNode.parentNode
							.removeChild(anchors[i].parentNode.parentNode);
				else
					anchors[i].parentNode.parentNode
							.removeChild(anchors[i].parentNode);
			}
		}
	}
}