// ==UserScript===
// @name           PAPAZ UnQuestionmark
// @namespace      http://www.w3.org/1999/xhtml
// ==/UserScript===

var links = document.links;

for (var i = 0; i < links.length; i++) {
    var link = links[i];

      	var linkString = link.toString();
	var indexOf2 = linkString.indexOf('?');


        if (indexOf2 !== -1) { 
	link.href = linkString.substring(0, indexOf2);
	}
}