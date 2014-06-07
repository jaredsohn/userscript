// ==UserScript==
// @name			Livetuve TTP IMG
// @version			0.0.1
// @namespace		picle
// @description		Convert ttp to http link. Show image.
// @include			http://livetube.cc/*
// ==/UserScript==
//
// Linkify Custom
//  http://firefox.geckodev.org/index.php?plugin=attach&pcmd=open&file=linkifycustom.user.js&refer=Greasemonkey
// 2ch URL Modify
//  http://userscripts.org/scripts/show/39136
//

(function () {
	//const urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;
	const urlRegex = /(((h?t?t)?ps?):\/\/[^\s+\"\<\>]+)/ig;
	// tags we will scan looking for un-hyperlinked urls
	var allowedParents = ["span"];
	
	//var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +
	//			"contains(translate(., 'HTTP', 'http'), 'http')]";
	var xpath = "//text()[(parent::" + allowedParents.join(') or(parent::')+")]";

	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var t0 = new Date().getTime();
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		if (urlRegex.test(cand.nodeValue)) {
			var span = document.createElement("span");
			var source = cand.nodeValue;
			
			cand.parentNode.replaceChild(span, cand);

			urlRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
				
				//ttp or tp or p
				var uri = match[0].replace(/^(ttp|tp|p)/,'http');
				
				var a = document.createElement("a");
				//a.setAttribute("href", match[0]);
				a.setAttribute("href", uri);
				a.appendChild(document.createTextNode(match[0]));
				span.appendChild(a);

				lastLastIndex = urlRegex.lastIndex;
			}

			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize();
		}
	}
	var t1 = new Date().getTime();
	//alert((t1 - t0) / 1000);

})();


(function(){
	function createImage(src) {
		var img = document.createElement("img");
		img.src = src;
		img.height = 100;
		return img;
	}
	function modifyLinks() {
		var aTags = document.getElementsByTagName("a");
		var anchorRegExp = /^&gt;&gt;\d+$/;
		var imageRegExp = /\.(gif|jpeg|jpg|png)$/i;
		for (var i=0; i<aTags.length; i++) {
			var a = aTags[i];
			if (a.href.indexOf("http") != 0) continue;
			// Anchor like ">>100"
			if (anchorRegExp.test(a.innerHTML)) {
				a.addEventListener("click", showIframe, true);
				continue;
			}
			
			// Thumbnail
			if (imageRegExp.test(a.href)) {
				a.appendChild(document.createElement("br"));
				a.appendChild(createImage(a.href));
			}
		}
	}


	window.addEventListener("load", function(e){
		modifyLinks();
	}, false);
})();