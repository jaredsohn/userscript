// ==UserScript==
// @name          Steamcommunity anti-phishing script
// @namespace     http://zemn.me
// @description   Adds a clear warning to pages that load style reources from steam community.
// @match         http://*.com/*
// @version       1.0
// @run-at        document-end
// @grant         none
// ==/UserScript==
;(function(){



//Check if this site is whitelisted
if (/(?:steamcommunity|steampowered)\.com$/.test(document.location.host)){
	return
}

var v=document.styleSheets;


for(var q=v.length;q-->0;) {
	if (v[q].href){
		if (/^http:\/\/cdn\.steamcommunity\.com\/public(\/shared)?\/css\//g.test(v[q].href)) {
			var styleIt = function(el) {
				el.setAttribute(
					"style",
					Array.prototype.
						slice.call(arguments, 1).join(";")
				);

			}
			var panicbox = document.createElement("div");
			styleIt(
				panicbox,
				"position:fixed !important",
				"z-index:999",
				"width:50%",
				"height:50%",
				"overflow:auto",
				"margin:auto",
				"position:absolute",
				"background-color:#E74C3C",
				"border:10px solid #C0392B",
				"top:0",
				"left:0",
				"bottom:0",
				"right:0",
				"color:white",
				"padding:10px"
			)

			var warn = document.createElement("span");
			styleIt(
				warn,
				"font-size:200%",
				"font-weight:bold",
				"display:block"
			);
			panicbox.appendChild(warn).appendChild(
				document.createTextNode("Warning")
			);

			document.body.appendChild(panicbox).
				appendChild(document.createTextNode(
					"This is a suspected steamcommunity phishing site. If this is a false positive please report it to Zemnmez (http://steamcommunity.com/id/both)."
			));
			return
		}
	}
}
})();