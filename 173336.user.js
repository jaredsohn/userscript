// ==UserScript==
// @name			HKGalden - I agree and want to continue
// @namespace		galdenson
// @version			1.0.2.2
// @description		show jpg, png and gif
// @match			https://hkgalden.com/view*
// @match			http://hkgalden.com/view*
// @match			https://m.hkgalden.com/view*
// @match			http://m.hkgalden.com/view*
// @match			https://*.hkgolden.com/view*
// @updateURL		https://userscripts.org/scripts/source/173336.meta.js
// @downloadURL		https://userscripts.org/scripts/source/173336.user.js
// @run-at document start
// @run-at document-start
// ==/UserScript==

var fileType = [".jpg", ".png", ".gif", ".jpeg", ".JPG", ".PNG", ".GIF", ".JPEG"];
var imageChili = "imgchili.com/show/";
var urlShortener = ["na.cx"];

document.addEventListener('readystatechange', function(evt) {
	if (document.readyState == "interactive") {
		var links = document.querySelectorAll("a");
		var l = links.length;
		for (var i = 0; i < l; i++) {
			var href = links[i].href;
			if ((href.indexOf("http") == 0) && (href.indexOf("hkgalden.com") == -1) && (links[i].querySelectorAll("img").length == 0)) {
				var length = fileType.length;
				if (href.indexOf(imageChili) == -1) {
					for (var j = 0; j < length; j++) {
						if (href.lastIndexOf(fileType[j]) == href.length-fileType[j].length) {
							j = length;	// exit loop
							var img = document.createElement("img");
							img.src = href;
							links[i].parentNode.replaceChild(img, links[i]);
						}
					}
				}
			}
		}
	} else if (document.readyState == "complete") {
		var links = document.querySelectorAll("a");
		var l = links.length;
		for (var i = 0; i < l; i++) {
			var href = links[i].href;
			if ((href.indexOf("http") == 0) && (href.indexOf("hkgalden.com") == -1) && (links[i].querySelectorAll("img").length == 0)) {
				if (href.indexOf(imageChili) != -1) {
					href = href.substring(href.indexOf(imageChili)+imageChili.length);
					for (var j = 1; j < 10; j++) {
						var img = document.createElement("img");
						img.src = "http://i" + j + ".imgchili.net/" + href;
						(function (link) {img.addEventListener("load", function(evt) {if ((this.naturalWidth != "160") || (this.naturalHeight != "90")) {link.parentNode.replaceChild(this, link);}}, false);})(links[i]);
					}
				} else {
					var length = urlShortener.length;
					for (var j = 0; j < length; j++) {
						if (href.indexOf(urlShortener[j]) != -1) {
							var img = document.createElement("img");
							img.src = href;
							(function (link) {img.addEventListener("load", function(evt) {if (this.naturalWidth != "0") {link.parentNode.replaceChild(this, link);}}, false);})(links[i]);
						}
					}
				}
			}
		}
	}
}, false);