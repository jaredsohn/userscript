// ==UserScript==
// @name           4chan Text-to-Image fix
// @namespace      4chan_t2i
// @description    The Text-to-Image Firefox add-on will no longer display double images on 4chan
// @version 		1.0
// ==/UserScript==

if (location.href.split("/")[2] == "boards.4chan.org") {
	var filesizeHeaders = new Array();
	
	var spans = document.getElementsByTagName("span");
	for (var i in spans) {
		if (spans[i].className == "filesize")
			filesizeHeaders[filesizeHeaders.length] = spans[i];
	}
	
	for (var i in filesizeHeaders) {
		var link = filesizeHeaders[i].getElementsByTagName("a")[0];
		var fileName = link.href.split("/")[5];
		var parts = filesizeHeaders[i].innerHTML.split("</a>");
		parts[0] = "File:"+fileName;
		filesizeHeaders[i].innerHTML = parts.join("");
	}
}