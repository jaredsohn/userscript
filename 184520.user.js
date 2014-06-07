// ==UserScript==
// @name        PBWorks Fixer
// @namespace   https://userscripts.org/users/yokljo
// @include     http://*.pbworks.com/w/browse/*
// @version     1
// @grant       none
// ==/UserScript==

// Make sidebar scrollable
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "#objectbrowser .content { height: 470px; width: 255px; overflow: scroll; }\n";
css.innerHTML += "#objectbrowser .right { margin-left: 255px !important; height: 470px; overflow: scroll; }\n";
document.body.appendChild(css);

ready = function() {
	// Re-add strictEncodeURIComponent to the prototype, because of separate greasemonkey JS context
	String.prototype.strictEncodeURIComponent = function() {
		return encodeURIComponent(this).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
	}

	// Modified version of getObjectLink function which forces a download instead to taking you to another download page
	window.Util.getObjectLink = function(F) {
		var E = "";
		if (typeof F.oid !== "undefined") {
			E = F.oid + "/";
		}
		var D = "?force_download=1";
		if (typeof F.revision !== "undefined") {
			D += "&rev=" + F.revision;
		}
		var G = "";
		switch (F.type) {
			case "page":
				var C = encodeURIComponent(F.name + "");
				G = "/w/page/" + E + C + D;
				break;
			case "file":
				var B = "/w/file/fetch/" + E;
				var C = (F.name + "").strictEncodeURIComponent();
				G = B + C + D;
				break;
			case "folder":
				var A = "ViewFolder";
				var C = (F.name + "").strictEncodeURIComponent();
				G = "/w/browse/#view=" + A + "&param=" + C;
				break;
			default:
				return false;
		}
		if (typeof F.wiki !== "undefined") {
			return Util.URLRelativeToContext(G, F);
		}
		return G;
	}
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ ready +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
