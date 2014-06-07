// ==UserScript==
// @name			Basilmarket Opening Post Ad Remover
// @description		Removes the ad on the opening post.
// @author			BasilID: Fade2BlacK
// @version			1.2.2
// @include			http://*.basilmarket.com/forum/*
//	
// @history			1.2 Fixed inability to extend blue opening post
// @history			1.1 Improved getTagsByClass function
// @history			1.0 Initial release  
// ==/UserScript==

// function that finds the element based on class name.
function getTagsByClass(parent, tag_name, class_name) {
	var tags = parent.getElementsByTagName(tag_name); 
	for(i = 0; i < tags.length; i++) {
		if (tags[i].className == class_name) {
			return tags[i];
		}
	}
}

// removes the whole square space right of the opening post including
// text ("Please visit our sponsors" and "Why?").
var space = getTagsByClass(document, 'div', 'rf');
space.parentNode.removeChild(space);

// extends opening post and the line above it.
var ln = getTagsByClass(document, 'div', 'right fts mb10');
var op = getTagsByClass(document, 'div', 'postn fts ');
var opBlue = getTagsByClass(document, 'div', 'postn fts postnP');

ln.style.width = "1014px";
if (op) {
	op.style.width = "1014px";
} else {
	opBlue.style.width = "1014px";
}


