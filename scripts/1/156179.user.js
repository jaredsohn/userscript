// ==UserScript==
// @id             Weasyl_dot_com_Big_Images
// @name           Weasyl better images
// @version        4.0
// @updateURL	   http://userscripts.org/scripts/source/156179.meta.js
// @downloadURL    http://userscripts.org/scripts/source/156179.user.js
// @namespace      WeasylBigArt
// @author         Michael Ooms
// @description    Loads the full hd images (see: http://userscripts.org/scripts/show/156179)
// @include        http*://www.weasyl.com/character/*
// @include        http*://www.weasyl.com/submission/*
// ==/UserScript==
// change to false if you don't want to start with the big images
var bigSize = true;
// current version
var version = "4.0";


// Logs the script info
var ret = GM_xmlhttpRequest({
	method: "GET",
	url: "http://michaelooms.nl/userscriptupdater.php?id=156179",
	onload: function (res) {
		GM_log(res.responseText);
		var info = res.responseText.split("\n");

		function compareVersion(v1, v2) {
			var v1parts = v1.split('.');
			var v2parts = v2.split('.');

			for (var i = 0; i < v1parts.length; ++i) {
				if (v2parts.length === i) {
					return 1;
				}
				if (v1parts[i] === v2parts[i]) {
					continue;
				}
				if (v1parts[i] > v2parts[i]) {
					return 1;
				}
				return -1;
			}
			if (v1parts.length != v2parts.length) {
				return -1;
			}
			return 0;
		}


		var updated = compareVersion(info[4], version);
		if (updated && confirm('A new version of ' + info[3] + ' is available.\nDo you wish to install the latest version?')) {
			GM_openInTab('https://userscripts.org/scripts/show/' + info[1]);
		}
	}
});


// the if statement checks if this isn't a media or text based submission
if (!(document.getElementById('detail-art-text')) && !(document.getElementById("multimedia"))) {
	// acquiring the full sized image url from the download link
	var fi = document.getElementById("detail-actions").getElementsByTagName("li")[1].firstChild.getAttribute("href");
	// acquiring the standard sized imaged that Weasyl produced
	var si = document.getElementById("detail-art").getElementsByTagName("img")[0].getAttribute("src");
	// now that we have the full url we'll simple replace the url's
	if (bigSize) {
		document.getElementById('detail-art').getElementsByTagName("img")[0].setAttribute("src", fi);
		document.getElementById('detail-art').getElementsByTagName("img")[0].style.width = "100%";
	}
	// Here we create the button element and add it to the page
	var bb = document.getElementById('detail-actions');
	var liBtn = document.createElement("li");
	liBtn.innerHTML = "<a href=\"#detail-art\" id=\"image-change-button\"> <span class=\"icon icon-20 icon-pencil\"></span> Change quality</a>";
	bb.appendChild(liBtn);
	// This function switches the image sizes
	function switchQuality() {
		if (document.getElementById("detail-art").getElementsByTagName("img")[0].getAttribute("src") === fi) {
			document.getElementById('detail-art').getElementsByTagName("img")[0].setAttribute("src", si);
		} else {
			document.getElementById('detail-art').getElementsByTagName("img")[0].setAttribute("src", fi);
			document.getElementById('detail-art').getElementsByTagName("img")[0].style.width = "100%";
		}
	}
	// Function to add event listener to the button and image(see: https://developer.mozilla.org/en/docs/DOM/element.addEventListener)
	function load() {
		// button part
		var btn = document.getElementById("image-change-button");
		if (btn.addEventListener) {
			btn.addEventListener('click', switchQuality, false);
		} else if (btn.attachEvent) {
			btn.attachEvent('onclick', switchQuality);
		}
		// image part
		var img = document.getElementById("detail-art").getElementsByTagName("img")[0];
		if (img.addEventListener) {
			img.addEventListener('click', switchQuality, false);
		} else if (img.attachEvent) {
			img.attachEvent('onclick', switchQuality);
		}
	}

	document.addEventListener("DOMContentLoaded", load, false);
}