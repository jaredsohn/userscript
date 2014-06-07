// ==UserScript==
// @name           Volokh Conspiracy INCIF
// @version        2
// @description    Indisputably Non-Coercive Idiot Filter for The Volokh Conspiracy
// @namespace      com.volokh/INCIF
// @include        http://volokh.com/*
// @include        http://www.volokh.com/*
// ==/UserScript==


// filter based on these names (edit this)
// case insensitive, names can be partial
var filters = [
	"Sarcastro",
	"jukeboxgrad",
	"Leo Marvin"
];


// don't need to edit this

var f = filters.length;
for (var j=0; j < f; j++) {
	filters[j] = filters[j].toLowerCase();
}

var class_add = "INCIF-Ignore";
GM_addStyle( 
	"."+class_add+" { opacity: 0.5 !important; }"+
	"."+class_add+":not(:hover) * { display: none !important; }"+
	"."+class_add+"::before { content: '(' attr(title) ')' !important; }"
);
  

var selected = document.evaluate(
	"//div[@id='comments']/ol//h4/cite", document, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
);
var len = selected.snapshotLength;
for (var i=0; i < len; i++) {
	var cite = selected.snapshotItem(i);
	var name = cite.textContent.toLowerCase();
	for (var j=0; j < f; j++) {
		var filter = filters[j];
		if (name.indexOf(filter) != -1) {
			var comment = 
			cite.parentNode // h4
			    .parentNode // div
			    .parentNode;// li
			comment.className += " " + class_add;
			comment.title = filter;
			break;
		}
	}
}	


