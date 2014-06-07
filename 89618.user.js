// ==UserScript==
// @name           Wikimg
// @namespace      http://userscripts.org/scripts/show/89618
// @description    Makes wiki img gallery thumb links direct and uses a more appropriate measurement unit for file size
// @include        http://wiki*
// @include        https://wiki*
// @include        http://*.wiki*
// @include        https://*.wiki*
// @author         420MuNkEy
// @license        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
// ==/UserScript==
/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 * Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 *
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO. 
 */
(function() {
	function getElementsByClass(searchClass, domNode, tagName) { 
		if (domNode === null) {
			domNode = document;
		}
		if (tagName === null) {
			tagName = '*';
		}
		var el = [];
		var tags = domNode.getElementsByTagName(tagName);
		var tcl = " "+searchClass+" ";
		var i,j;
		for (i=0,j=0; i<tags.length; i++) { 
			var test = " " + tags[i].className + " ";
			if (test.indexOf(tcl) !== -1) {
				el[j++] = tags[i];
			}
		}
		return el;
	}
	function readablizeBytes(bytes) {
		var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
	}
	function runIt() {
		var rows = getElementsByClass("gallerybox", document, "div");
		var i;
		for (i=0;i<rows.length;i++) {
			if (getElementsByClass("thumb", rows[i], "div").length === 1) {
				var txt = rows[i].childNodes[3].childNodes[3];
				var bytes = txt.textContent.replace(/(?:\,|[^\d])/g,"");
				txt.textContent = readablizeBytes(bytes);
				// To Do: Find way to handle unusual thumbnails
				if (getElementsByClass("MediaTransformError", rows[i], "table").length < 1) {
					var thmb = rows[i].childNodes[1].firstChild.firstChild.firstChild;
					thmb.parentNode.href = thmb.src.replace(/(^.*\/?)thumb\/(.*)\/.+$/, "$1$2");
				}
			}
		}
	}
	runIt();
})();