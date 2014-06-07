// ==UserScript==
// @name           studiVZ - freunde schnell hinzufügen
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://www.studivz.net/*
// @include        http://studivz.net/*
// ==/UserScript==

var links = document.evaluate("//a[contains(@href, '/Friends/Add')]", document, null, 6, null), i, link;
for (i=0; i<links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	link.addEventListener("click", function(e) {
		e.stopPropagation();
		e.preventDefault();
		GM_xmlhttpRequest({
			method: "get",
			url: this.href,
			onload: handler(i)
		});
	}, false);
}

function handler(i) {
	return function(e) {
		var text = e.responseText, parser = new DOMParser(), div = parser.parseFromString(text, "text/xml"), box = div.getElementById("AddFriend"), random = Math.random();
		box.style.cssText = "position: fixed; z-index: 25; background: white; border: 3px solid #FF4040; padding: 10px; height: 300px; width: 450px; top: 50%; left: 50%; margin: -150px 0 0 -225px; -moz-border-radius: 20px";
		box.id = "AddFriend"+random; // so we have unique IDs
		document.body.appendChild(box); // append
		var link = box.getElementsByTagName("form")[0].getElementsByTagName("a")[0];
		link.textContent = "schlie"+unescape("%DF")+"en";
		link.title = i;
		link.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			document.getElementById("AddFriend"+random).style.display = "none";
		}, false);
	}
}