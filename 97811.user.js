// ==UserScript==
// @name		MusicBrainz: Display sortnames for non-latin artists
// @description		This uses the sortname from the title attribute and displays it in the page. It doesn't work everywhere because the sortname isn't always available.
// @version		2010-12-11
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://musicbrainz.org/*

// ==/UserScript==
//**************************************************************************//
// Configuration!

// If set to "true", this replaces the name with the latin name
// If set to "false", it shows the latin name after the non-latin name
var replace = false;

// Text colour to use for the latin name
var colour = "blue";

// If set to "true", it tries to reverse forenames and surnames
// If set to "false", it uses the sortname as it is
var reverse = true;

//**************************************************************************//

function insertAfter(newNode,oldNode) {
	oldNode.nextSibling ? oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling) : oldNode.parentNode.appendChild(newNode);
} 

var classes = Array("linkentity", "linkentity-strong");

for (x = 0; x < classes.length; x++) {
	var all = document.getElementsByClassName(classes[x]);

	var re = /^Artist \(Sortname: (.*?)\)( \(Comment: (.*?)\))?$/; 
	var re_script = /[^ -~\u00A0-\u024F\u1E00-\u1EFF\u02BB\uFF5E\u2103’]/;

	for (var i = 0; i < all.length; i++) {
		if (all[i].innerHTML.match(re_script) && all[i].title.match(re)) {
			var text = all[i].title.replace(re, "$1");

			if (reverse) {
				text = text.replace(/(^|; | (?:&|with|and|vs\.?|y|=|\+|starring|\/|to) |\()([A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF'-]+), ([A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF'-]+( [A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF'-]+)?)(?=$|; | ?\(|\)| (?:&|with|and|vs\.?|y|=|\+|starring|\/|to) )/g, "$1$3 $2");
			}

			if (replace) {
				all[i].innerHTML = "<span title=\"" + all[i].innerHTML + "\" style=\"color:" + colour + "\">" + text + "</span>";
			} else {
				var span = document.createElement("span");
				span.innerHTML = " <span style=\"color:" + colour + "\">(" + text + ")</span>";
				insertAfter(span, all[i]);
			}
		}
	}
}

